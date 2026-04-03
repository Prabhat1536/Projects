import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  ShoppingCart, // Replaced Users with ShoppingCart
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Package size={20} />, label: 'Inventory', path: '/inventory' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    // Updated from Suppliers to Sales
    { icon: <ShoppingCart size={20} />, label: 'Sales', path: '/sales' }, 
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">CloudStock</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;