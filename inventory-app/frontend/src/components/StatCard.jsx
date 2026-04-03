import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, isUp, icon, color }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    red: 'bg-red-50 text-red-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.indigo}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}%
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;