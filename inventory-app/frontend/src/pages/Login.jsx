import React, { useState, useContext } from 'react'; // Added useState and useContext
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Import your Context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from Context

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear old errors
    
    try {
      // Logic: This calls the login function in your AuthContext.js
      await login(email, password);
      navigate('/'); // If successful, go to Dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">CloudStock AI</h2>
          <p className="text-indigo-100 mb-8">
            The world's first predictive inventory system driven by real-time data.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">✓</div>
              <span>Predictive Restocking Alerts</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">✓</div>
              <span>Multi-Warehouse Support</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h3>
          <p className="text-slate-500 mb-8 text-sm">Enter your credentials to access your warehouse.</p>
          
          {error && <p className="mb-4 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center group transition">
              Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;