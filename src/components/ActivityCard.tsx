import React from 'react';
import { Activity } from '../data/batikData';
import { Calendar, Users, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WhatsAppLink } from './WhatsAppButtons';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const icons = {
    workshop: <Users size={18} />,
    kunjungan: <Calendar size={18} />,
    pelatihan: <Briefcase size={18} />
  };

  const typeLabels = {
    workshop: 'Workshop',
    kunjungan: 'Kunjungan',
    pelatihan: 'Pelatihan'
  };

  const waMessage = `Halo, saya tertarik untuk mengikuti kegiatan "${activity.title}" di Oemah Batik Lentera Mandiri. Bisa minta info lebih lanjut?`;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-batik-brown/5 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={activity.imageUrl} 
          alt={activity.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur-md text-batik-brown text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg flex items-center">
            <span className="mr-2 text-batik-gold">{icons[activity.type]}</span>
            {typeLabels[activity.type]}
          </span>
        </div>
      </div>
      <div className="p-10">
        <h3 className="text-2xl font-bold text-batik-brown mb-4 leading-tight group-hover:text-batik-gold transition-colors">{activity.title}</h3>
        <p className="text-batik-dark/60 text-sm leading-relaxed mb-8 line-clamp-3">
          {activity.description}
        </p>
        <a 
          href={WhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-batik-brown font-bold text-xs uppercase tracking-widest hover:text-batik-gold transition-colors"
        >
          Daftar Sekarang <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
