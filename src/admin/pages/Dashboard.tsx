import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { getContactMessages } from '../../services/contactService';
import { Image, Eye, Calendar, MapPin, MessageSquare, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Dashboard: React.FC = () => {
  const { gallery, activities, destinations } = useData();
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const msgs = await getContactMessages();
        const count = msgs.filter(m => m.status === 'unread').length;
        setUnreadCount(count);
      } catch (err) {
        console.error('Error fetching messages count for dashboard:', err);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchUnread();
  }, [gallery, activities, destinations]); // Refresh when main states update

  const stats = [
    { title: 'Aktivitas', value: activities.length, icon: <Calendar size={24} />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Galeri Batik', value: gallery.length, icon: <Image size={24} />, color: 'bg-amber-100 text-amber-600' },
    { title: 'Destinasi', value: destinations.length, icon: <MapPin size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { 
      title: 'Pesan Baru', 
      value: loadingMessages ? '...' : unreadCount, 
      icon: <MessageSquare size={24} />, 
      color: unreadCount > 0 ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600' 
    },
  ];

  // Combine items for recent logs
  const recentLogs = [
    ...gallery.slice(0, 2).map(item => ({
      type: 'Galeri',
      title: item.title,
      info: 'Baru ditambahkan ke Katalog Galeri'
    })),
    ...activities.slice(0, 2).map(item => ({
      type: 'Kegiatan',
      title: item.title,
      info: 'Baru ditambahkan ke Program & Aktivitas'
    })),
    ...destinations.slice(0, 1).map(item => ({
      type: 'Destinasi',
      title: item.title,
      info: 'Baru ditambahkan ke Wisata Sekitar'
    }))
  ].slice(0, 4);

  return (
    <AdminLayout title="Overview Dashboard">
      <div className="space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-batik-brown/5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-4xl font-bold text-batik-brown">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-batik-brown/5 shadow-sm">
              <h3 className="text-xl font-bold text-batik-brown mb-8 flex items-center gap-2">
                <Sparkles size={20} className="text-batik-gold" /> Konten Terbaru
              </h3>
              <div className="space-y-6">
                {recentLogs.length > 0 ? (
                  recentLogs.map((log, i) => (
                    <div key={i} className="flex items-center space-x-4 pb-6 border-b border-batik-brown/5 last:border-0 last:pb-0">
                      <div className="w-12 h-12 bg-batik-cream rounded-2xl flex items-center justify-center text-batik-gold font-bold text-[10px] uppercase tracking-wider">
                        {log.type[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-batik-brown">{log.title}</p>
                        <p className="text-xs text-batik-brown/40">{log.info}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-batik-brown/40 text-center py-4">Belum ada konten yang dibuat.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest pl-2">Aksi Cepat</h3>
            
            <Link to="/admin/gallery" className="block p-6 bg-batik-dark text-batik-cream rounded-3xl hover:bg-batik-brown transition-all group shadow-lg">
              <Plus className="mb-4 text-batik-gold group-hover:scale-125 transition-transform" />
              <p className="font-bold">Kelola Galeri</p>
              <p className="text-xs text-white/50 mt-1">Update katalog batik terbaru</p>
            </Link>

            <Link to="/admin/contact" className="block p-6 bg-white text-batik-brown rounded-3xl border border-batik-brown/5 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <MessageSquare className="text-batik-gold group-hover:scale-125 transition-transform" />
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full animate-pulse">
                    {unreadCount} Baru
                  </span>
                )}
              </div>
              <p className="font-bold">Kotak Masuk</p>
              <p className="text-xs text-batik-brown/40 mt-1">Lihat dan tanggapi pesan masuk</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
