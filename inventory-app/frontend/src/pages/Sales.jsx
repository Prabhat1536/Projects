import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShoppingCart, Save, Info } from 'lucide-react';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [salesData, setSalesData] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await api.get('/inventory');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateSales = async (product) => {
    const productId = product._id;
    setUpdatingId(productId);
    
    try {
      // Logic: Use typed data OR fall back to existing data if no changes were made
      const inputString = salesData[productId] || product.salesHistory?.join(', ');
      
      if (!inputString) {
        alert("Please enter sales values (e.g., 5, 10, 2, 8, 4)");
        setUpdatingId(null);
        return;
      }

      const historyArray = inputString
        .split(',')
        .map(num => Number(num.trim()))
        .filter(n => !isNaN(n))
        .slice(0, 5);

      // This is the call that was giving the 404
      await api.put(`/inventory/${productId}`, { 
        salesHistory: historyArray 
      });

      alert(`Success! Sales history for ${product.name} updated.`);
      fetchProducts(); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed. Make sure your backend is running.");
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center gap-3">
        <ShoppingCart className="text-indigo-600" size={28} />
        <h1 className="text-2xl font-bold text-slate-800">Sales Data Entry</h1>
      </div>

      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex gap-3 items-start text-indigo-700">
        <Info size={20} className="mt-1 flex-shrink-0" />
        <p className="text-sm">
          Update the 5-day sales history to calculate **Average Daily Usage**.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Product</th>
              <th className="p-4 font-semibold text-slate-600">Stock</th>
              <th className="p-4 font-semibold text-slate-600">5-Day Sales History</th>
              <th className="p-4 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-slate-50 transition">
                <td className="p-4">
                  <p className="font-bold text-slate-800">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.category}</p>
                </td>
                <td className="p-4 font-mono text-indigo-600 font-bold">{product.currentStock}</td>
                <td className="p-4">
                  <input 
                    type="text" 
                    placeholder="e.g. 10, 5, 12, 4, 8"
                    defaultValue={product.salesHistory?.join(', ')}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={(e) => setSalesData({ ...salesData, [product._id]: e.target.value })}
                  />
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleUpdateSales(product)}
                    disabled={updatingId === product._id}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-slate-300 shadow-sm"
                  >
                    {updatingId === product._id ? 'Saving...' : <><Save size={16} /> Save</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;