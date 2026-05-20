import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Bell } from 'lucide-react';

const Topbar: React.FC<{ title: string }> = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b border-batik-brown/10 flex items-center justify-between px-8 sticky top-0 z-40">
      <h1 className="text-xl font-bold text-batik-brown">{title}</h1>
      
      <div className="flex items-center space-x-6">
        <button className="text-batik-brown/40 hover:text-batik-brown transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-3 pl-6 border-l border-batik-brown/10">
          <div className="text-right">
            <p className="text-sm font-bold text-batik-brown">Admin</p>
            <p className="text-[10px] text-batik-brown/50">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-batik-cream rounded-full flex items-center justify-center text-batik-gold">
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
