import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const AboutPreview: React.FC = () => {
  const { siteInfo } = useData();

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-batik-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-batik-gold/5 rounded-full blur-3xl" />
          
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10">
            <img 
              src={siteInfo.aboutImageUrl || "https://picsum.photos/seed/about-preview/800/1000"} 
              alt="Sejarah Batik Oemah Batik" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute -bottom-8 -left-8 bg-batik-gold p-10 rounded-[2rem] shadow-2xl z-20 hidden md:block">
            <p className="text-batik-dark font-serif text-3xl font-bold italic leading-tight">
              Sejak <br /> 2012
            </p>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] block">Cerita Kami</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-batik-brown leading-tight">
            Dari Tradisi Menjadi <br /> Ruang Berbagi Inspirasi
          </h2>
          <div className="space-y-6 text-batik-dark/70 text-lg leading-relaxed">
            <p>
              {siteInfo.description ? siteInfo.description.split('\n')[0] : 'Berawal dari keinginan untuk melestarikan warisan leluhur, Oemah Batik Lentera Mandiri kini berkembang lebih dari sekadar rumah produksi.'}
            </p>
            <p>
              {siteInfo.description && siteInfo.description.split('\n').length > 1 ? siteInfo.description.split('\n').slice(1).join(' ') : 'Kami bertransformasi menjadi pusat edukasi di Desa Wisata Petahunan, tempat di mana setiap goresan canting memiliki cerita dan setiap jiwa bisa belajar menghargai budaya.'}
            </p>
          </div>
          <div className="pt-6">
            <Link 
              to="/about"
              className="inline-flex items-center text-batik-brown font-bold text-sm uppercase tracking-widest border-b-2 border-batik-gold pb-2 hover:text-batik-gold transition-colors group"
            >
              Baca Selengkapnya <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
