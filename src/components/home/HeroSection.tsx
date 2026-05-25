import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const HeroSection: React.FC = () => {
  const { siteInfo } = useData();

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        {siteInfo.heroImageUrl && (
          <img 
            src={siteInfo.heroImageUrl} 
            alt="Batik Background" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Cinematic Gradient: Dark Top -> Transparent Middle -> Light Bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 via-80% to-batik-cream md:from-black/80 md:via-black/20 md:to-batik-cream shadow-inner" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <span className="inline-block text-batik-gold font-bold text-[10px] sm:text-xs uppercase tracking-[0.5em] bg-black/20 py-3 px-8 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
            Wastra Nusantara • Sejak 2025
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
            {siteInfo.motto}
          </h1>
          <p className="text-batik-cream/90 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            {siteInfo.philosophy}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={scrollToNext}
              className="w-full sm:w-auto bg-batik-gold text-batik-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl flex items-center justify-center group"
            >
              Jelajahi Informasi <ChevronDown size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </button>
            <Link
              to="/activities"
              className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all backdrop-blur-md flex items-center justify-center group"
            >
              Lihat Aktivitas <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
