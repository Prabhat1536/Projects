import React from 'react';
import { Bell, Search, Command } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Quick Search */}
      <div className="relative w-96 group">
        <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Quick find items... (Cmd + K)" 
          className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
        />
        <div className="absolute right-3 top-2 flex gap-1">
          <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] text-slate-400 shadow-sm">⌘</kbd>
          <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] text-slate-400 shadow-sm">K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700">Prabhat Prajapati</p>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
            PP
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;