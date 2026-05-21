import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WhatsAppLink } from './WhatsAppButtons';
import { useData } from '../context/DataContext';

const FALLBACK_LOGO = "/images/logo/oemah-batik-logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteInfo } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Aktivitas', path: '/activities' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Destinasi', path: '/destinations' },
    { name: 'Kontak', path: '/contact' },
  ];

  // Split siteName into top line and bottom line (e.g. "Oemah Batik" and "Lentera Mandiri")
  const nameParts = siteInfo.siteName ? siteInfo.siteName.split(' ') : [];
  const topBrandText = nameParts.slice(0, 2).join(' ') || 'Oemah Batik';
  const bottomBrandText = nameParts.slice(2).join(' ') || 'Lentera Mandiri';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="relative transition-transform"
            >
              {siteInfo.logoUrl ? (
                <img
                  key={siteInfo.logoUrl}
                  src={siteInfo.logoUrl}
                  alt={`Logo ${siteInfo.siteName}`}
                  className="h-10 sm:h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
                />
              ) : (
                <img
                  src={FALLBACK_LOGO}
                  alt={`Logo ${siteInfo.siteName}`}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              )}
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold text-batik-brown leading-none">
                {topBrandText}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-batik-gold font-bold">
                {bottomBrandText}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-bold uppercase tracking-widest transition-colors hover:text-batik-gold ${
                  location.pathname === link.path ? 'text-batik-gold' : 'text-batik-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={WhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center hover:bg-emerald-500 transition-colors shadow-sm ml-4"
            >
              <MessageCircle size={16} className="mr-2" /> Tanya WA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-batik-brown p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-batik-brown/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-[13px] font-bold uppercase tracking-widest border-b border-batik-brown/5 ${
                    location.pathname === link.path ? 'text-batik-gold' : 'text-batik-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <a 
                  href={WhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center shadow-lg"
                >
                   <MessageCircle size={20} className="mr-3" /> Chat WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
