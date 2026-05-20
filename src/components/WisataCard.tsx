import React from 'react';
import { Destination } from '../data/batikData';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface WisataCardProps {
  wisata: Destination;
}

const WisataCard: React.FC<WisataCardProps> = ({ wisata }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-lg"
    >
      <img 
        src={wisata.imageUrl} 
        alt={wisata.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-batik-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex items-center text-batik-gold mb-2">
          <MapPin size={16} className="mr-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Desa Petahunan</span>
        </div>
        <h4 className="text-xl font-bold text-white mb-2 leading-tight">{wisata.title}</h4>
        <p className="text-white/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
          {wisata.description}
        </p>
      </div>
    </motion.div>
  );
};

export default WisataCard;
