import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const GalleryPreview: React.FC = () => {
  const { gallery } = useData();

  return (
    <section className="py-32 bg-batik-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] block"
          >
            Karya Pilihan
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-batik-brown"
          >
            Galeri Batik Eksklusif
          </motion.h2>
          <p className="text-batik-dark/60 max-w-2xl mx-auto">
            Setiap motif dilukis dengan penuh kesabaran, menghasilkan karya visual yang mengandung doa dan filosofi mendalam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {gallery.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mb-8 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-batik-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Link to="/galeri" className="p-4 bg-batik-gold text-batik-dark rounded-full shadow-xl transform scale-50 group-hover:scale-110 transition-all duration-500">
                    <Search size={26} strokeWidth={2.4} />
                   </Link>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-batik-brown">{item.title}</h3>
                <p className="text-batik-dark/50 text-sm line-clamp-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/galeri"
            className="inline-flex items-center text-batik-brown font-bold text-sm uppercase tracking-widest border-2 border-batik-brown/10 px-10 py-5 rounded-2xl hover:bg-batik-brown hover:text-white transition-all group"
          >
            Lihat Koleksi Lengkap <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
