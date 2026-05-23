import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { MapPin, Compass, ArrowRight, Search } from 'lucide-react';
import DestinationModal from '../components/DestinationModal';
import { Destination } from '../services/destinationsService';

const ImageWithFade: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <img 
      src={src} 
      alt={alt} 
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      referrerPolicy="no-referrer"
    />
  );
};

const Destinations: React.FC = () => {
  const { destinations, siteInfo } = useData();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <div className="pt-24 min-h-screen bg-batik-cream">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-serif font-bold text-batik-brown mb-6"
        >
          Destinasi Sekitar
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-batik-dark/70 text-lg max-w-3xl mx-auto"
        >
          Setelah mendalami seni batik di workshop kami, lengkapi perjalanan Anda 
          dengan mengeksplorasi keindahan alam tersembunyi di Desa Wisata Petahunan.
        </motion.p>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {destinations.map((dest) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedDestination(dest)}
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-batik-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-batik-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="p-4 bg-batik-gold text-batik-dark rounded-full shadow-xl transform scale-50 group-hover:scale-110 transition-all duration-500">
                    <Search size={26} strokeWidth={2.4} />
                   </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <div className="flex items-center space-x-2 text-batik-gold mb-2">
                    <MapPin size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{dest.location || 'Petahunan, Banyumas'}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">{dest.title}</h3>
                </div>
              </div>
              <div className="px-4 space-y-4">
                <div className="flex items-center space-x-3 text-batik-gold">
                  <Compass size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">{dest.activity}</span>
                </div>
                <p className="text-batik-dark/70 text-lg leading-relaxed line-clamp-2">
                  {dest.description}
                </p>
                <div className="pt-4 border-t border-batik-brown/5">
                  <button className="flex items-center text-batik-brown font-bold text-xs uppercase tracking-[0.2em] group">
                    Eksplorasi Lebih Lanjut 
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended Itinerary Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-batik-dark rounded-[4rem] p-12 sm:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-batik-gold/10 blur-[100px] rounded-full" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-batik-cream">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">Rencana Perjalanan Ideal</h2>
              <p className="text-batik-cream/70 text-lg">
                Jadikan kunjungan Anda ke Oemah Batik Lentera Mandiri sebagai paket wisata budaya dan alam yang tak terlupakan.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-batik-gold flex items-center justify-center font-bold text-batik-dark shrink-0">1</div>
                  <p className="text-sm font-medium">Pagi: Belajar membatik edukatif di workshop kami.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-batik-gold flex items-center justify-center font-bold text-batik-dark shrink-0">2</div>
                  <p className="text-sm font-medium">Siang: Menikmati udara segar dan gemericik air di Curug Nangga.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-batik-gold flex items-center justify-center font-bold text-batik-dark shrink-0">3</div>
                  <p className="text-sm font-medium">Sore: Melihat matahari terbenam dari Area Paralayang.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-batik-cream/50 aspect-[4/5]">
              {siteInfo.destinationImageUrl && (
                <ImageWithFade 
                  src={siteInfo.destinationImageUrl} 
                  alt="Wisata Desa" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Destination Detail Modal */}
      <DestinationModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
    </div>
  );
};

export default Destinations;
