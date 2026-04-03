import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Added this missing import
import api from '../services/api'; // Added this for the actual registration call

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. First, call the backend to create the account
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 2. If registration is successful, log them in automatically
      await login(formData.email, formData.password); 
      
      // 3. Send them to the dashboard
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 text-sm">Join CloudStock to start predicting demand.</p>
        </div>

        {error && <p className="mb-4 text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="text" 
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Prabhat Prajapati"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="prabhat@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-200 shadow-lg shadow-indigo-200">
            Get Started
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;