import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

const WhatsAppButton: React.FC = () => {
  const { siteInfo } = useData();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Halo Oemah Batik Lentera Mandiri, saya ingin bertanya lebih lanjut mengenai layanan dan produk Anda.");
    window.open(`https://wa.me/${siteInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold uppercase tracking-widest text-xs">
        Hubungi Kami
      </span>
    </motion.button>
  );
};

export default WhatsAppButton;
