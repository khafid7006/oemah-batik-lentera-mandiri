import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ContactPreview: React.FC = () => {
  const { siteInfo } = useData();

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Halo Oemah Batik Lentera Mandiri, saya ingin bertanya mengenai kunjungan atau produk.`);
    window.open(`https://wa.me/${siteInfo.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-32 bg-batik-cream px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-batik-dark rounded-[4rem] p-12 sm:p-24 relative overflow-hidden shadow-2xl text-center"
        >
          {/* Background element */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-batik-gold/10 blur-[100px] rounded-full" />
          <div className="batik-pattern absolute inset-0 opacity-[0.03]" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em]">Hubungi Kami</span>
              <h2 className="text-4xl sm:text-6xl font-serif font-bold text-batik-cream leading-tight">
                Mari Bertemu & <br /> Membuat Kenangan
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-batik-cream/70">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-batik-gold">
                  <MapPin size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-batik-gold">Lokasi Kami</p>
                  <p className="text-sm font-medium max-w-[200px]">Petahunan, Pekuncen, Banyumas</p>
                </div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-batik-gold">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-batik-gold">Respon Cepat</p>
                  <p className="text-sm font-medium">WhatsApp: {siteInfo.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleWhatsApp}
                className="inline-flex items-center bg-batik-gold text-batik-dark px-12 py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl group"
              >
                Kirim Pesan WhatsApp <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPreview;
