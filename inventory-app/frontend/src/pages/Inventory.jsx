import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, Search, Trash2, Edit, IndianRupee, X } from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Helper for Currency
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching inventory", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/inventory/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  // ACTIVE SEARCH LOGIC
  // We filter the original 'products' array to create 'filteredProducts' 
  // on every keystroke.
  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.sku?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Product Inventory</h1>
          <p className="text-sm text-slate-500">Manage and track your current stock levels.</p>
        </div>
        
        {/* ACTIVATED SEARCH BAR */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={19} />
          <input 
            type="text" 
            placeholder="Search by name, category, or SKU..." 
            className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition shadow-sm"
            // Link the value to state
            value={searchTerm} 
            // Update state as you type
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          {/* Quick Clear Button */}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Product Info</th>
                <th className="p-4 font-semibold text-slate-600">Category</th>
                <th className="p-4 font-semibold text-slate-600">Price</th>
                <th className="p-4 font-semibold text-slate-700">Stock Status</th>
                <th className="p-4 font-semibold text-slate-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading inventory...
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{product.name}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">{product.sku}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">{formatINR(product.price)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.currentStock < 10 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        <span className={`font-bold ${product.currentStock < 10 ? 'text-red-600' : 'text-slate-700'}`}>
                          {product.currentStock} Units
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <Package size={48} className="text-slate-200" />
                      <p className="text-lg font-medium">No results found for "{searchTerm}"</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-indigo-600 hover:underline text-sm font-semibold"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;