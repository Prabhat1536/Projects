import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TrendingUp, Calendar, AlertTriangle, ArrowUpRight, Loader2 } from 'lucide-react';

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/inventory');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Predictive Analytics</h1>
        <div className="bg-white border px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
           <Calendar size={16} /> Real-time Forecast
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Sales Velocity logic */}
<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
  <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
    <TrendingUp size={20} className="text-indigo-500" /> Stock Velocity
  </h3>
  <div className="space-y-4">
    {products.length > 0 ? products.slice(0, 4).map(p => (
      <div key={p._id} className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-slate-600 font-medium">{p.name}</span>
        {/* Make sure you are using p.calculatedAvgUsage here! */}
        <span className="font-bold text-indigo-600">
          {p.calculatedAvgUsage || "0.0"} units/day
        </span>
      </div>
    )) : (
      <p className="text-slate-400 italic text-sm">No sales data recorded yet.</p>
    )}
  </div>
</div>
        {/* Prediction Insights - DYNAMIC */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" /> Smart Restock Forecasts
          </h3>
          <div className="space-y-4">
            {products.length > 0 ? (
              products
                .filter(p => p.daysUntilOut < 15 || p.currentStock <= p.minStockLevel)
                .map(p => (
                  <InsightCard 
                    key={p._id}
                    product={p.name} 
                    confidence={p.confidence} 
                    action={p.forecastAction} 
                    urgent={p.urgent} 
                  />
                ))
            ) : (
              <p className="text-center text-slate-400 py-10">No data available to forecast.</p>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-xl text-white">
          <p className="text-indigo-100 text-sm">Inventory Health</p>
          <div className="text-3xl font-bold mt-1">
            {Math.round((products.filter(p => !p.urgent).length / products.length) * 100 || 0)}%
          </div>
          <p className="text-xs text-indigo-200 mt-4">Percentage of items above safety levels</p>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ product, confidence, action, urgent }) => (
  <div className={`p-4 rounded-lg border flex justify-between items-center ${urgent ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
    <div>
      <p className="font-bold text-slate-800">{product}</p>
      <p className="text-xs text-slate-500 tracking-tighter">AI CONFIDENCE: {confidence}</p>
    </div>
    <div className="text-right">
      <p className={`text-sm font-bold ${urgent ? 'text-red-600' : 'text-indigo-600'}`}>{action}</p>
      <p className="text-[10px] text-slate-400 uppercase font-bold">Recommended</p>
    </div>
  </div>
);

export default Analytics;