import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { CheckCircle2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Activities: React.FC = () => {
  const { activities, siteInfo } = useData();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Halo Oemah Batik Lentera Mandiri, saya ingin bertanya tentang aktivitas dan kegiatan di workshop.");
    window.open(`https://wa.me/${siteInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-24 min-h-screen bg-batik-cream">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-batik-brown/5">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-serif font-bold text-batik-brown mb-6"
        >
          Aktivitas Kami
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-batik-dark/70 text-lg max-w-3xl mx-auto"
        >
          Dari proses produksi yang penuh dedikasi hingga ruang belajar bagi generasi muda, 
          setiap aktivitas kami adalah wujud pelestarian warisan nusantara.
        </motion.p>
      </section>

      {/* Main Activities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-32">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-batik-gold/10 rounded-[3rem] blur-xl group-hover:bg-batik-gold/20 transition-all duration-700" />
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-batik-gold text-batik-dark text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-batik-brown leading-tight">
                  {activity.title}
                </h2>
                <p className="text-batik-dark/70 text-lg leading-relaxed">
                  {activity.description}
                </p>
                <ul className="space-y-4 pt-4">
                  {['Proses Tradisional', 'Edukasi Budaya', 'Pemberdayaan Lokal'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-batik-brown font-bold text-sm tracking-wide">
                      <CheckCircle2 size={18} className="text-batik-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-batik-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
          <img 
            src={siteInfo.logoUrl} 
            alt="" 
            className="w-full max-w-lg h-full object-contain filter grayscale invert scale-120 rotate-12"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-batik-cream leading-tight">
            Ingin merasakan pengalaman <br /> membatik di workshop kami?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/gallery" 
              className="w-full sm:w-auto bg-batik-gold text-batik-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-batik-cream transition-all shadow-xl flex items-center justify-center group"
            >
              <ShoppingBag size={18} className="mr-3 group-hover:scale-110 transition-transform" />
              Lihat Galeri Produk
            </Link>
            <button 
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-transparent border-2 border-batik-cream text-batik-cream px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-batik-cream hover:text-batik-dark transition-all flex items-center justify-center group"
            >
              <MessageCircle size={18} className="mr-3 group-hover:scale-110 transition-transform" />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
