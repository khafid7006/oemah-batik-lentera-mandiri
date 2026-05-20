import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteInfo } = useData();

  // Helper functions for maps URLs
  const getEmbedMapUrl = (url: string) => {
    if (url && (url.includes('google.com/maps/embed') || url.includes('google.com/maps/embed/v1'))) {
      return url;
    }
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.427670693574!2d109.0733877!3d-7.4646706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656046e7f8303f%3A0x64e4024f2ca3beee!2sPetahunan%2C%20Pekuncen%2C%20Banyumas%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1714107572000!5m2!1sen!2sid";
  };

  const getClickableMapUrl = (url: string, address: string) => {
    if (url && !url.includes('google.com/maps/embed')) {
      return url;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // Format WhatsApp Link
  const getWhatsAppNumber = (num: string) => {
    if (!num) return "6281390244921";
    return num;
  };

  const getWhatsAppUrl = (num: string) => {
    const cleanNum = getWhatsAppNumber(num).replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent("Halo Oemah Batik Lentera Mandiri, saya ingin berkonsultasi mengenai produk/workshop.")}`;
  };

  // Convert "6281390244921" or similar to local "081390244921" format for display
  const formatDisplayPhone = (num: string) => {
    if (!num) return "081390244921";
    if (num.startsWith('62')) {
      return '0' + num.slice(2);
    }
    return num;
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-batik-cream">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-serif text-batik-brown mb-6"
        >
          Kontak Kami
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-batik-dark/70 text-sm max-w-2xl mx-auto leading-relaxed"
        >
          Hubungi kami untuk pemesanan produk, pendaftaran workshop edukasi, atau koordinasi kunjungan ke Desa Wisata Petahunan.
        </motion.p>
      </section>

      {/* Main Contact Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-batik-brown">Mari Berdiskusi</h2>
              <p className="text-batik-dark/60 text-sm leading-relaxed">
                Punya pertanyaan tentang koleksi kami, ingin memesan batik custom, atau tertarik mengikuti workshop edukasi? Kami siap melayani Anda.
              </p>
            </div>

            {/* Contact Rows */}
            <div className="space-y-6 mt-10">
              {/* Row 1: Address */}
              <div className="flex items-start space-x-5">
                <div className="bg-white border border-batik-brown/10 p-3.5 rounded-2xl text-batik-gold shadow-sm shrink-0 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-batik-brown text-xs uppercase tracking-wider mb-1">Workshop & Galeri</h4>
                  <p className="text-batik-dark/70 text-xs leading-relaxed">{siteInfo.address}</p>
                </div>
              </div>

              {/* Row 2: Phone/WhatsApp */}
              <div className="flex items-start space-x-5">
                <div className="bg-white border border-batik-brown/10 p-3.5 rounded-2xl text-batik-gold shadow-sm shrink-0 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-batik-brown text-xs uppercase tracking-wider mb-1">WhatsApp Kami</h4>
                  <p className="text-batik-dark/70 text-xs">
                    Ingin respon lebih cepat? Hubungi kami di {formatDisplayPhone(siteInfo.whatsapp || siteInfo.phone)}
                  </p>
                </div>
              </div>

              {/* Row 3: Email */}
              <div className="flex items-start space-x-5">
                <div className="bg-white border border-batik-brown/10 p-3.5 rounded-2xl text-batik-gold shadow-sm shrink-0 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-batik-brown text-xs uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-batik-dark/70 text-xs">{siteInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Separator and Social Media */}
            <div className="mt-10 pt-8 border-t border-batik-brown/10">
              <h4 className="font-bold text-batik-brown/50 text-xs uppercase tracking-wider mb-4">Media Sosial</h4>
              <div className="flex space-x-4">
                {siteInfo.instagram && (
                  <a 
                    href={`https://instagram.com/${siteInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white w-11 h-11 rounded-full flex items-center justify-center text-batik-brown hover:bg-batik-gold hover:text-batik-dark transition-all shadow-sm border border-batik-brown/5"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {siteInfo.facebook && (
                  <a 
                    href={siteInfo.facebook.startsWith('http') ? siteInfo.facebook : `https://facebook.com/${siteInfo.facebook.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white w-11 h-11 rounded-full flex items-center justify-center text-batik-brown hover:bg-batik-gold hover:text-batik-dark transition-all shadow-sm border border-batik-brown/5"
                  >
                    <Facebook size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="bg-white p-10 sm:p-12 rounded-[2.5rem] shadow-xl border border-batik-brown/5 flex flex-col items-center text-center space-y-6 w-full max-w-md">
              <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#25D366] flex items-center justify-center shadow-inner">
                <MessageCircle size={32} />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-batik-brown">Respon Lebih Cepat</h3>
                <p className="text-batik-dark/60 text-xs leading-relaxed max-w-xs mx-auto">
                  Kami lebih aktif melayani melalui WhatsApp. Silakan klik tombol di bawah untuk memulai percakapan langsung dengan admin kami.
                </p>
              </div>

              <div className="w-full pt-2">
                <a 
                  href={getWhatsAppUrl(siteInfo.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 gap-2"
                >
                  <MessageCircle size={16} />
                  CHAT ADMIN SEKARANG
                </a>
              </div>

              <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>ADMIN ONLINE ({siteInfo.openingHours || '08:00 - 17:00'})</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
        <div className="rounded-[2.5rem] overflow-hidden shadow-xl h-[360px] border border-batik-brown/5">
          <iframe 
            src={getEmbedMapUrl(siteInfo.mapsUrl)} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Oemah Batik Lentera Mandiri"
          ></iframe>
        </div>
        <div className="mt-6 text-center">
          <a 
            href={getClickableMapUrl(siteInfo.mapsUrl, siteInfo.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-batik-gold hover:text-batik-brown font-bold text-xs uppercase tracking-widest transition-colors gap-2"
          >
            <MapPin size={16} />
            BUKA DI GOOGLE MAPS
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
