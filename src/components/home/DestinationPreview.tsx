import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const DestinationPreview: React.FC = () => {
  const { destinations } = useData();

  return (
    <section className="relative py-32 bg-batik-dark text-batik-cream overflow-hidden">
      {/* Background visual accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-batik-gold/5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] block"
            >
              Jelajahi Sekitar
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-serif font-bold leading-tight"
            >
              Pesona Alam <br /> Desa Petahunan
            </motion.h2>
            <p className="text-batik-cream/60 text-lg leading-relaxed">
              Kunjungan Anda tidak hanya berakhir di workshop. Nikmati gemericik Curug Nangga atau pacu adrenalin di Area Paralayang yang tersohor di Banyumas.
            </p>
            <div className="pt-6">
              <Link 
                to="/destinasi"
                className="bg-batik-gold text-batik-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center w-fit group"
              >
                Jelajahi Destinasi <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
            {destinations.slice(0, 2).map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 50, rotate: idx === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group"
              >
                <img 
                  src={dest.imageUrl} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-batik-dark/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-2 text-batik-gold mb-1">
                    <Compass size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{dest.activity}</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white">{dest.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationPreview;
