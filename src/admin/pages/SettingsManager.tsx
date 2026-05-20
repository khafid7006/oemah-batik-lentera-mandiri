import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { Save, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SettingsManager: React.FC = () => {
  const { siteInfo, updateSiteInfo } = useData();
  const [formData, setFormData] = useState(siteInfo);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout title="Pengaturan Website">
      <div className="max-w-4xl space-y-8">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start space-x-4">
          <div className="text-amber-500 mt-1"><Info size={20} /></div>
          <p className="text-sm text-amber-800 leading-relaxed">
            Pengaturan ini akan mengubah teks utama di halaman beranda dan tentang kami. Pastikan deskripsi mencerminkan identitas branding Oemah Batik.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Motto Website</label>
              <input 
                value={formData.motto}
                onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold font-serif text-lg italic" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Filosofi Singkat</label>
              <textarea 
                value={formData.philosophy}
                onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                rows={3}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold resize-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Deskripsi Profil (About)</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold resize-none" 
              />
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button 
                type="submit"
                className="bg-batik-dark text-batik-cream px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-batik-brown transition-all shadow-xl flex items-center"
              >
                <Save size={18} className="mr-2" /> Simpan Pengaturan
              </button>
              
              <AnimatePresence>
                {saved && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center text-emerald-500 font-bold text-sm"
                  >
                    <CheckCircle size={20} className="mr-2" /> Pengaturan diperbarui!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsManager;
