import React from 'react';
import { motion } from 'motion/react';
import { Palette, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActivityPreview: React.FC = () => {
  const previewActivities = [
    {
      icon: <Palette size={32} />,
      title: 'Produksi Batik',
      desc: 'Proses kreatif mulai dari desain hingga pewarnaan tradisional.'
    },
    {
      icon: <GraduationCap size={32} />,
      title: 'Edukasi Teknik',
      desc: 'Kelas mencanting bagi pemula hingga tingkat mahir.'
    },
    {
      icon: <Users size={32} />,
      title: 'Kunjungan Wisata',
      desc: 'Menerima tamu rombongan untuk studi budaya batik.'
    }
  ];

  return (
    <section className="py-32 bg-batik-dark relative overflow-hidden">
      <div className="batik-pattern absolute inset-0 opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
            >
              Apa yang Kami Lakukan
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-serif font-bold text-batik-cream"
            >
              Pelestarian Karya Seni Batik
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Link 
              to="/aktivitas"
              className="bg-batik-gold text-batik-dark px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center"
            >
              Semua Aktivitas <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewActivities.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-sm group hover:bg-batik-gold hover:border-batik-gold transition-all duration-500"
            >
              <div className="text-batik-gold group-hover:text-batik-dark transition-colors mb-8">
                {act.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-batik-cream group-hover:text-batik-dark transition-colors mb-4">
                {act.title}
              </h3>
              <p className="text-batik-cream/60 group-hover:text-batik-dark/80 transition-colors leading-relaxed">
                {act.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityPreview;
