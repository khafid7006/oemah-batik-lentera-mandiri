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
    <div className="min-h-screen bg-[#f6f4ef]">
      {/* Upper Ivory Section */}
      <div className="bg-[#f6f4ef] pt-12 pb-4">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-batik-brown mb-6"
          >
            Kontak Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-batik-dark/70 text-lg max-w-3xl mx-auto"
          >
            Hubungi kami untuk pemesanan produk, pendaftaran workshop edukasi, atau kordinasi kunjungan ke Desa Wisata Petahunan.
          </motion.p>
        </section>

        {/* Main Contact Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h2 className="text-[28px] font-serif text-[#4a3525] font-bold">Mari Berdiskusi</h2>
                <p className="text-[#6c5a4b] text-[13px] leading-relaxed">
                  Punya pertanyaan tentang koleksi kami, ingin memesan batik custom, atau tertarik mengikuti workshop edukasi? Kami siap melayani Anda.
                </p>
              </div>

              {/* Contact Rows */}
              <div className="space-y-6 mt-8">
                {/* Row 1: Address */}
                <div className="flex items-center space-x-4">
                  <div className="bg-white border border-[#e5dfd3] p-3 rounded-[15px] text-batik-gold shadow-[0_4px_12px_rgba(0,0,0,0.02)] shrink-0 flex items-center justify-center w-12 h-12">
                    <MapPin size={20} className="stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#4a3525] text-[15px] mb-0.5">Workshop & Galeri</h4>
                    <p className="text-[#6c5a4b] text-[13px] leading-relaxed">{siteInfo.address}</p>
                  </div>
                </div>

                {/* Row 2: Phone/WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="bg-white border border-[#e5dfd3] p-3 rounded-[15px] text-batik-gold shadow-[0_4px_12px_rgba(0,0,0,0.02)] shrink-0 flex items-center justify-center w-12 h-12">
                    <Phone size={20} className="stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#4a3525] text-[15px] mb-0.5">WhatsApp Kami</h4>
                    <p className="text-[#6c5a4b] text-[13px] leading-relaxed">
                      Ingin respon lebih cepat? Hubungi kami di {formatDisplayPhone(siteInfo.whatsapp || siteInfo.phone)}
                    </p>
                  </div>
                </div>

                {/* Row 3: Email */}
                <div className="flex items-center space-x-4">
                  <div className="bg-white border border-[#e5dfd3] p-3 rounded-[15px] text-batik-gold shadow-[0_4px_12px_rgba(0,0,0,0.02)] shrink-0 flex items-center justify-center w-12 h-12">
                    <Mail size={20} className="stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#4a3525] text-[15px] mb-0.5">Email</h4>
                    <p className="text-[#6c5a4b] text-[13px] leading-relaxed">{siteInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Separator and Social Media */}
              <div className="mt-8 pt-6 border-t border-[#e5dfd3]/60">
                <h4 className="font-sans font-medium text-[#8c7a6b] text-[11px] uppercase tracking-wider mb-3">Media Sosial</h4>
                <div className="flex space-x-3">
                  {siteInfo.instagram && (
                    <a 
                      href={`https://instagram.com/${siteInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-[#4a3525] hover:bg-batik-gold hover:text-white transition-all duration-300 shadow-sm border border-[#e5dfd3]"
                    >
                      <Instagram size={16} className="stroke-[1.75]" />
                    </a>
                  )}
                  {siteInfo.facebook && (
                    <a 
                      href={siteInfo.facebook.startsWith('http') ? siteInfo.facebook : `https://facebook.com/${siteInfo.facebook.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-[#4a3525] hover:bg-batik-gold hover:text-white transition-all duration-300 shadow-sm border border-[#e5dfd3]"
                    >
                      <Facebook size={16} className="stroke-[1.75]" />
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
              className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full"
            >
              <div className="bg-white p-10 sm:p-12 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-[#e5dfd3]/50 flex flex-col items-center text-center space-y-6 w-full max-w-sm">
                <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#25D366] flex items-center justify-center shadow-inner">
                  <MessageCircle size={28} className="fill-[#25D366] text-white stroke-[1]" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif text-[#4a3525] font-bold">Respon Lebih Cepat</h3>
                  <p className="text-[#6c5a4b] text-[13px] leading-relaxed max-w-xs mx-auto">
                    Kami lebih aktif melayani melalui WhatsApp. Silakan klik tombol di bawah untuk memulai percakapan langsung dengan admin kami.
                  </p>
                </div>

                <div className="w-full pt-2">
                  <a 
                    href={getWhatsAppUrl(siteInfo.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-6 rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 gap-2"
                  >
                    <MessageCircle size={16} className="fill-white" />
                    CHAT ADMIN SEKARANG
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                  </span>
                  <span>ADMIN ONLINE ({siteInfo.openingHours || '08:00 - 17:00'})</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>

      {/* Lower White Section */}
      <div className="bg-white pt-16 pb-20">
        {/* Map Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-serif font-bold text-batik-brown tracking-wide mb-3"
            >
              Lokasi Kami
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-0.5 bg-batik-gold mx-auto"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] h-[380px] border border-[#e5dfd3]/30"
          >
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
          </motion.div>
          <div className="mt-8 text-center">
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
    </div>
  );
};

export default Contact;

