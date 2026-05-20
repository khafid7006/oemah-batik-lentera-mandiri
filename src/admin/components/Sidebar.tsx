import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Image, Phone, Settings, LogOut, Flame, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Edukasi', path: '/admin/education', icon: <BookOpen size={20} /> },
    { name: 'Kegiatan', path: '/admin/activities', icon: <Calendar size={20} /> },
    { name: 'Destinasi', path: '/admin/destinations', icon: <MapPin size={20} /> },
    { name: 'Galeri Batik', path: '/admin/gallery', icon: <Image size={20} /> },
    { name: 'Kontak', path: '/admin/contact', icon: <Phone size={20} /> },
    { name: 'Pengaturan', path: '/admin/settings', icon: <Settings size={20} /> },
    { name: 'Lihat Website', path: '/', icon: <Flame size={20} />, external: true },
  ];

  return (
    <div className="w-64 bg-batik-dark text-batik-cream h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-batik-cream/10 flex items-center space-x-3">
        <div className="bg-batik-gold p-2 rounded-full text-batik-dark">
          <Flame size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold leading-none">Oemah Batik</span>
          <span className="text-[10px] uppercase tracking-widest text-batik-gold font-bold">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-2 pt-8">
        {links.map((link) => (
          link.external ? (
            <a
              key={link.path}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5 text-batik-cream/70"
            >
              {link.icon}
              <span className="text-sm tracking-wide">{link.name}</span>
            </a>
          ) : (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-batik-gold text-batik-dark font-bold shadow-lg' 
                    : 'hover:bg-white/5 text-batik-cream/70'
                }`
              }
            >
              {link.icon}
              <span className="text-sm tracking-wide">{link.name}</span>
            </NavLink>
          )
        ))}
      </nav>

      <div className="p-4 border-t border-batik-cream/10">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
