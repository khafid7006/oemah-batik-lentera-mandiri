import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { GalleryItem } from '../data/batikData';
import { WhatsAppButton } from './WhatsAppButtons';

interface ImageModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-batik-dark/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-batik-cream max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="md:w-1/2 aspect-[3/4] md:aspect-auto">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-batik-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                {item.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-batik-brown mb-6">
                {item.title}
              </h2>
              <div className="w-12 h-1 bg-batik-gold mb-8" />
              <p className="text-batik-dark/80 leading-relaxed text-lg mb-8">
                {item.description}
              </p>

              <div className="mb-8">
                <WhatsAppButton 
                  label="Pesan Produk Ini"
                  message={`Halo, saya tertarik dengan produk "${item.title}" yang ada di galeri website. Bisa minta info harganya?`}
                  className="w-full"
                />
              </div>
              
              <div className="mt-auto pt-8 border-t border-batik-brown/10">
                <p className="text-sm text-batik-brown/60 italic">
                  Karya asli Oemah Batik Lentera Mandiri
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
