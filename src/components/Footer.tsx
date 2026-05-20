import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Flame, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { WhatsAppLink } from './WhatsAppButtons';

const Footer: React.FC = () => {
  const { siteInfo } = useData();
  return (
    <footer className="bg-batik-dark text-batik-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <img 
                  src={siteInfo.footerLogoUrl || siteInfo.logoUrl} 
                  alt={`Logo ${siteInfo.siteName}`} 
                  className="h-14 w-auto object-contain group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold leading-none">
                  {siteInfo.siteName ? siteInfo.siteName.split(' ').slice(0, 2).join(' ') : 'Oemah Batik'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-batik-gold font-bold">
                  {siteInfo.siteName ? siteInfo.siteName.split(' ').slice(2).join(' ') : 'Lentera Mandiri'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-batik-cream/70 leading-relaxed italic">
              "{siteInfo.motto}"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-batik-gold transition-colors">Beranda</Link></li>
              <li><Link to="/about" className="hover:text-batik-gold transition-colors">Tentang Kami</Link></li>
              <li><Link to="/activities" className="hover:text-batik-gold transition-colors">Aktivitas Kami</Link></li>
              <li><Link to="/gallery" className="hover:text-batik-gold transition-colors">Galeri Batik</Link></li>
              <li><Link to="/destinations" className="hover:text-batik-gold transition-colors">Destinasi Lain</Link></li>
              <li><Link to="/contact" className="hover:text-batik-gold transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-batik-gold shrink-0" />
                <span>{siteInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-batik-gold shrink-0" />
                <span>{siteInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-batik-gold shrink-0" />
                <span>{siteInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a 
                href={`https://instagram.com/${siteInfo.instagram ? siteInfo.instagram.replace('@', '') : 'oemahbatik_lm'}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-batik-brown/30 p-3 rounded-full hover:bg-batik-gold hover:text-batik-dark transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={siteInfo.facebook && siteInfo.facebook.startsWith('http') ? siteInfo.facebook : `https://facebook.com/${siteInfo.facebook || 'oemahbatikpetahunan'}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-batik-brown/30 p-3 rounded-full hover:bg-batik-gold hover:text-batik-dark transition-all"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={WhatsAppLink()} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-batik-brown/30 p-3 rounded-full hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-batik-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-batik-cream/50">
          <p>© {new Date().getFullYear()} Oemah Batik Lentera Mandiri. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Dibuat dengan ❤️ untuk Budaya Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
