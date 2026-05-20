import React from 'react';
import { motion } from 'motion/react';
import { GalleryItem } from '../data/batikData';

interface BatikCardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
}

const BatikCard: React.FC<BatikCardProps> = ({ item, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="card-cultural cursor-pointer group"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-batik-gold text-batik-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-batik-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-white text-sm font-medium">Lihat & Pesan</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-batik-brown mb-2">{item.title}</h3>
        <p className="text-sm text-batik-dark/60 line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default BatikCard;
