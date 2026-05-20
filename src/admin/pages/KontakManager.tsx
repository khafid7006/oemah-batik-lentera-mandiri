import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getContactMessages, markMessageAsRead, deleteContactMessage, ContactMessage } from '../../services/contactService';
import { Trash2, Check, MessageSquare, Mail, Phone, Calendar, Eye, Loader2, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const KontakManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const success = await markMessageAsRead(id);
      if (success) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(prev => prev ? { ...prev, status: 'read' } : null);
        }
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesan ini secara permanen?')) {
      try {
        const success = await deleteContactMessage(id);
        if (success) {
          setMessages(prev => prev.filter(m => m.id !== id));
          if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage(null);
          }
        }
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  const filteredMessages = messages.filter(m => {
    if (activeTab === 'unread') return m.status === 'unread';
    if (activeTab === 'read') return m.status === 'read';
    return true;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <AdminLayout title="Pesan Masuk (Kontak)">
      <div className="space-y-8">
        
        {/* Header and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest">Kotak Masuk Pelanggan</h2>
            <p className="text-xl font-bold text-batik-brown">
              {unreadCount > 0 ? `${unreadCount} Pesan Baru Belum Dibaca` : 'Semua Pesan Telah Dibaca'}
            </p>
          </div>
          <button 
            onClick={fetchMessages}
            disabled={loading}
            className="bg-batik-cream hover:bg-batik-brown/10 text-batik-brown px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-batik-brown transition-all shadow-sm flex items-center gap-2 border border-batik-brown/5 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Segarkan
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-batik-brown/10 gap-6">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'all' ? 'text-batik-brown font-black' : 'text-batik-brown/40 hover:text-batik-brown'}`}
          >
            Semua ({messages.length})
            {activeTab === 'all' && <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-batik-gold rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('unread')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative flex items-center gap-1.5 ${activeTab === 'unread' ? 'text-batik-brown font-black' : 'text-batik-brown/40 hover:text-batik-brown'}`}
          >
            Belum Dibaca
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
            {activeTab === 'unread' && <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-batik-gold rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('read')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'read' ? 'text-batik-brown font-black' : 'text-batik-brown/40 hover:text-batik-brown'}`}
          >
            Sudah Dibaca ({messages.filter(m => m.status === 'read').length})
            {activeTab === 'read' && <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-batik-gold rounded-full" />}
          </button>
        </div>

        {/* Message Container */}
        {loading ? (
          <div className="bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm p-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-batik-gold" size={40} />
            <p className="text-sm font-bold text-batik-brown/50">Memuat kotak masuk...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Message List */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm overflow-hidden divide-y divide-batik-brown/5">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === 'unread') {
                        handleMarkAsRead(msg.id);
                      }
                    }}
                    className={`p-6 cursor-pointer hover:bg-batik-cream/20 transition-all flex justify-between items-start gap-4 ${selectedMessage?.id === msg.id ? 'bg-batik-cream/30' : ''} ${msg.status === 'unread' ? 'border-l-4 border-batik-gold pl-5' : ''}`}
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${msg.status === 'unread' ? 'text-batik-dark' : 'text-batik-brown/70'}`}>
                          {msg.name}
                        </span>
                        {msg.status === 'unread' && (
                          <span className="bg-batik-gold/15 text-batik-brown text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            Baru
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-batik-brown/40 gap-3">
                        <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                        {msg.created_at && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-batik-brown/60 line-clamp-2 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg.id);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Hapus Pesan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-sm text-batik-brown/40 flex flex-col items-center gap-2">
                  <MessageSquare size={32} className="opacity-30" />
                  Tidak ada pesan di kategori ini.
                </div>
              )}
            </div>

            {/* Message Detail Viewer */}
            <div className="lg:col-span-5">
              {selectedMessage ? (
                <div className="bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm p-8 space-y-6 sticky top-6">
                  <div className="flex justify-between items-start border-b border-batik-brown/5 pb-6">
                    <div>
                      <h4 className="font-bold text-batik-brown text-base">{selectedMessage.name}</h4>
                      <p className="text-xs text-batik-gold font-medium mt-1">Pengirim Kontak</p>
                    </div>
                    <button 
                      onClick={() => setSelectedMessage(null)}
                      className="text-batik-brown/40 hover:text-batik-brown p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-center gap-3 text-batik-brown/70 bg-batik-cream/40 p-3 rounded-2xl">
                      <Mail size={16} className="text-batik-gold" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-batik-brown/40">Email</p>
                        <a href={`mailto:${selectedMessage.email}`} className="hover:underline font-bold text-batik-brown">{selectedMessage.email}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-batik-brown/70 bg-batik-cream/40 p-3 rounded-2xl">
                      <Phone size={16} className="text-batik-gold" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-batik-brown/40">Telepon / WhatsApp</p>
                        <a href={`https://wa.me/${selectedMessage.phone}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-batik-brown">{selectedMessage.phone}</a>
                      </div>
                    </div>

                    {selectedMessage.created_at && (
                      <div className="flex items-center gap-3 text-batik-brown/70 bg-batik-cream/40 p-3 rounded-2xl">
                        <Calendar size={16} className="text-batik-gold" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-batik-brown/40">Tanggal Masuk</p>
                          <span className="font-bold text-batik-brown">
                            {new Date(selectedMessage.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 border-t border-batik-brown/5 pt-6">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-batik-brown/40">Isi Pesan:</h5>
                    <p className="text-xs text-batik-brown leading-relaxed bg-batik-cream/30 p-4 rounded-3xl border border-batik-brown/5 min-h-[120px] whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    {selectedMessage.status === 'unread' && (
                      <button 
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <Check size={16} /> Tandai Dibaca
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
                      title="Hapus Pesan"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-batik-cream/35 border border-dashed border-batik-brown/10 rounded-[2.5rem] p-12 text-center text-batik-brown/40 flex flex-col items-center justify-center min-h-[300px]">
                  <Eye size={36} className="opacity-20 mb-3" />
                  <p className="text-sm font-bold">Pilih Pesan</p>
                  <p className="text-xs">Klik pada daftar pesan untuk melihat detail isi pesan.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default KontakManager;
