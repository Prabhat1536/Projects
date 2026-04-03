import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, AlertTriangle, IndianRupee } from 'lucide-react';

// Helper function for Indian Currency Formatting
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const StatBox = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>{icon}</div>
  </div>
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '', category: '' });

  // FETCH DATA FROM BACKEND
  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newProduct.name,
        sku: `SKU-${Date.now()}`,
        currentStock: Number(newProduct.quantity),
        price: Number(newProduct.price),
        category: newProduct.category,
        // Default empty history for new items (updated via Sales tab later)
        salesHistory: [0, 0, 0, 0, 0] 
      };

      await api.post('/inventory', payload);
      setShowModal(false);
      fetchInventory(); 
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Overview</h1>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">+ Add Product</button>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox 
          title="Total Items" 
          value={products.length} 
          icon={<Package className="text-indigo-600" />} 
          color="bg-indigo-600" 
        />
        <StatBox 
          title="Low Stock" 
          value={products.filter(p => p.currentStock < 10).length} 
          icon={<AlertTriangle className="text-red-600" />} 
          color="bg-red-600" 
        />
        <StatBox 
          title="Total Value" 
          value={formatINR(products.reduce((acc, p) => acc + (p.price * p.currentStock), 0))} 
          icon={<IndianRupee className="text-green-600" />} 
          color="bg-green-600" 
        />
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Product Name</th>
              <th className="p-4 font-semibold text-slate-700">Category</th>
              <th className="p-4 font-semibold text-slate-700">Stock Status</th>
              <th className="p-4 font-semibold text-slate-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-800 font-medium">{product.name}</td>
                  <td className="p-4 text-slate-500">{product.category}</td>
                  <td className="p-4">
                    <span className={`font-bold ${product.currentStock < 10 ? 'text-red-600' : 'text-indigo-600'}`}>
                      {product.currentStock} Units
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{formatINR(product.price)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-12 text-center text-slate-400 italic">No products found. Add your first item!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                  <input type="text" placeholder="e.g. Wireless Mouse" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e)=>setNewProduct({...newProduct, name: e.target.value})} required/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                    <input type="number" placeholder="0" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e)=>setNewProduct({...newProduct, quantity: e.target.value})} required/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                    <input type="number" placeholder="₹" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})} required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input type="text" placeholder="e.g. Electronics" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e)=>setNewProduct({...newProduct, category: e.target.value})} required/>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Save Product</button>
                  <button type="button" onClick={()=>setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg font-semibold hover:bg-slate-200 transition">Cancel</button>
                </div>
              </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default Dashboard;