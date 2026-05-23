import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { Destination } from '../services/destinationsService';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose }) => {
  const getMapsSearchUrl = (title: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ' Petahunan Pekuncen Banyumas')}`;
  };

  const ctaUrl = destination?.maps_url || (destination ? getMapsSearchUrl(destination.title) : '');

  return (
    <AnimatePresence>
      {destination && (
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
            className="relative bg-batik-cream max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] lg:max-h-none overflow-y-auto md:overflow-y-auto lg:overflow-y-visible"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[450px]">
              <img
                src={destination.imageUrl}
                alt={destination.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto">
              <span className="text-batik-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                {destination.activity}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-batik-brown mb-6">
                {destination.title}
              </h2>
              <div className="w-12 h-1 bg-batik-gold mb-8" />
              <p className="text-batik-dark/80 leading-relaxed text-lg mb-8">
                {destination.description}
              </p>

              {destination.location && (
                <div className="flex items-center space-x-2 text-batik-brown/70 mb-8">
                  <MapPin size={18} className="text-batik-gold shrink-0" />
                  <span className="text-sm font-medium">{destination.location}</span>
                </div>
              )}

              {ctaUrl && (
                <div className="mb-8">
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-batik-dark text-batik-cream py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-batik-gold hover:text-batik-dark transition-all flex items-center justify-center group"
                  >
                    <MapPin size={16} className="mr-2 group-hover:scale-110" /> Buka di Google Maps
                  </a>
                </div>
              )}
              
              <div className="mt-auto pt-8 border-t border-batik-brown/10">
                <p className="text-sm text-batik-brown/60 italic">
                  Destinasi Wisata Sekitar Desa Petahunan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DestinationModal;
