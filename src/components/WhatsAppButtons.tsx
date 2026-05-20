import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
  variant?: 'solid' | 'outline';
}

const WA_NUMBER = '6281390244921';
const DEFAULT_MESSAGE = 'Halo, saya tertarik dengan batik dan program edukasi di Oemah Batik Lentera Mandiri';

export const WhatsAppLink = (message: string = DEFAULT_MESSAGE) => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  message = DEFAULT_MESSAGE, 
  className = "", 
  label = "Hubungi WhatsApp",
  variant = 'solid'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg group";
  const variants = {
    solid: "bg-[#25D366] text-white hover:bg-[#20ba59]",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
  };

  return (
    <a 
      href={WhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <MessageCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
      {label}
    </a>
  );
};

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href={WhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba59] transition-colors"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-batik-dark px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-batik-brown/5 hidden md:block">
        Tanya Kami di WhatsApp
      </span>
    </motion.a>
  );
};
