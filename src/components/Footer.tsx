import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Flame, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { WhatsAppLink } from './WhatsAppButtons';

const Footer: React.FC = () => {
  const { siteInfo } = useData();
  return (
    <footer className="bg-[#111111] text-[#f6f4ef] pt-16 pb-8 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative animate-fadeIn">
                <img 
                  src={siteInfo.footerLogoUrl || siteInfo.logoUrl || "/images/logo/oemah-batik-logo.png"} 
                  alt={`Logo ${siteInfo.siteName}`} 
                  className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = "/images/logo/oemah-batik-logo.png"; }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold leading-none text-white tracking-wide">
                  {siteInfo.siteName ? siteInfo.siteName.split(' ').slice(0, 2).join(' ') : 'Oemah Batik'}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-batik-gold font-bold mt-1">
                  {siteInfo.siteName ? siteInfo.siteName.split(' ').slice(2).join(' ') : 'Lentera Mandiri'}
                </span>
              </div>
            </Link>
            <p className="text-[12px] text-batik-cream/50 leading-relaxed italic font-serif">
              "Goresan Canting Melestarikan Budaya"
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:pl-4">
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Navigasi</h4>
            <ul className="space-y-3 text-[13px] text-batik-cream/70">
              <li><Link to="/" className="hover:text-batik-gold transition-colors">Beranda</Link></li>
              <li><Link to="/about" className="hover:text-batik-gold transition-colors">Tentang Kami</Link></li>
              <li><Link to="/activities" className="hover:text-batik-gold transition-colors">Aktivitas Kami</Link></li>
              <li><Link to="/gallery" className="hover:text-batik-gold transition-colors">Galeri Batik</Link></li>
              <li><Link to="/destinations" className="hover:text-batik-gold transition-colors">Destinasi Lain</Link></li>
              <li><Link to="/contact" className="hover:text-batik-gold transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Hubungi Kami</h4>
            <ul className="space-y-4 text-[13px] text-batik-cream/70">
              <li className="flex items-start space-x-3 leading-relaxed">
                <MapPin size={16} className="text-batik-gold shrink-0 mt-1" />
                <span>
                  Desa Petahunan RT.03 RW.02<br />
                  Kecamatan Pekuncen
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-batik-gold shrink-0" />
                <span>{siteInfo.whatsapp || siteInfo.phone || '081390244921'}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-batik-gold shrink-0" />
                <span>{siteInfo.email || 'oemahbatik.pt@gmail.com'}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg font-bold mb-6 text-batik-gold">Ikuti Kami</h4>
            <div className="flex space-x-3">
              <a 
                href={`https://instagram.com/${siteInfo.instagram ? siteInfo.instagram.replace('@', '') : 'oemahbatik_lm'}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] p-2.5 rounded-full text-batik-cream hover:bg-batik-gold hover:text-batik-dark transition-all duration-300 shadow-sm"
              >
                <Instagram size={16} />
              </a>
              <a 
                href={siteInfo.facebook && siteInfo.facebook.startsWith('http') ? siteInfo.facebook : `https://facebook.com/${siteInfo.facebook || 'oemahbatikpetahunan'}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] p-2.5 rounded-full text-batik-cream hover:bg-batik-gold hover:text-batik-dark transition-all duration-300 shadow-sm"
              >
                <Facebook size={16} />
              </a>
              <a 
                href={WhatsAppLink()} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] p-2.5 rounded-full text-batik-cream hover:bg-batik-gold hover:text-batik-dark transition-all duration-300 shadow-sm"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-batik-cream/40 tracking-wide">
          <p>© {new Date().getFullYear()} Oemah Batik Lentera Mandiri. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Dibuat dengan ❤️ untuk Budaya Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
