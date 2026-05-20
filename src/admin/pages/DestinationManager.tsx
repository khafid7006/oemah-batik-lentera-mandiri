import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { uploadDestinationImage } from '../../services/destinationsService';
import { Plus, Edit2, Trash2, X, Save, Upload, Loader2, Image as ImageIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DestinationManager: React.FC = () => {
  const { destinations, addDestination, updateDestination, deleteDestination } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    imageUrl: '',
    activity: '',
    maps_url: ''
  });

  const openAdd = () => {
    setFormData({ title: '', description: '', imageUrl: '', activity: '', maps_url: '' });
    setEditingId(null);
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    const d = destinations.find(i => i.id === id);
    if (d) {
      setFormData({ 
        title: d.title, 
        description: d.description, 
        imageUrl: d.imageUrl,
        activity: d.activity,
        maps_url: d.maps_url || ''
      });
      setEditingId(id);
      setError('');
      setIsModalOpen(true);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal adalah 5MB.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const publicUrl = await uploadDestinationImage(file);
      if (publicUrl) {
        setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
      } else {
        setError('Gagal mengunggah gambar ke storage.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setError('Harap unggah gambar terlebih dahulu.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      let success = false;
      if (editingId) {
        success = await updateDestination(editingId, formData);
      } else {
        success = await addDestination(formData);
      }

      if (success) {
        setIsModalOpen(false);
      } else {
        setError('Gagal menyimpan destinasi ke database.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus destinasi ini? Gambar juga akan dihapus dari server.')) {
      try {
        const success = await deleteDestination(id);
        if (!success) {
          alert('Gagal menghapus destinasi dari server.');
        }
      } catch (err: any) {
        alert(err.message || 'Terjadi kesalahan saat menghapus.');
      }
    }
  };

  return (
    <AdminLayout title="Manajemen Destinasi Wisata">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest">Destinasi Wisata Sekitar</h2>
            <p className="text-xl font-bold text-batik-brown">Total {destinations.length} Destinasi</p>
          </div>
          <button 
            onClick={openAdd}
            className="bg-batik-dark text-batik-cream px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-batik-brown transition-all shadow-lg flex items-center"
          >
            <Plus size={18} className="mr-2" /> Tambah Destinasi
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl border border-batik-brown/5 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="aspect-[4/3] relative overflow-hidden bg-batik-cream">
                {t.imageUrl ? (
                  <img 
                    src={t.imageUrl} 
                    alt={t.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-batik-brown/20">
                    <ImageIcon size={48} />
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => openEdit(t.id)} 
                    className="p-2 bg-white/90 backdrop-blur-sm text-blue-500 rounded-xl shadow-md hover:scale-110 transition-transform"
                    title="Edit Destinasi"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)} 
                    className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-md hover:scale-110 transition-transform"
                    title="Hapus Destinasi"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-batik-gold text-batik-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {t.activity}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-batik-gold mb-2">
                    <MapPin size={14} className="mr-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Desa Wisata Petahunan</span>
                  </div>
                  <h4 className="font-bold text-batik-brown mb-2 line-clamp-1">{t.title}</h4>
                  <p className="text-xs text-batik-brown/60 line-clamp-3 leading-relaxed">{t.description}</p>
                </div>
                {t.maps_url && (
                  <a 
                    href={t.maps_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-500 hover:underline mt-4 flex items-center font-bold tracking-wider uppercase border-t border-batik-brown/5 pt-3"
                  >
                    Buka Google Maps &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
          {destinations.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl border border-batik-brown/5 p-12 text-center text-batik-brown/40">
              Belum ada data destinasi. Klik "Tambah Destinasi" untuk membuat baru.
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-batik-dark/60 backdrop-blur-sm" 
              onClick={() => !saving && !uploading && setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 overflow-auto max-h-[90vh] z-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-batik-brown">{editingId ? 'Edit Destinasi' : 'Tambah Destinasi'}</h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  disabled={saving || uploading}
                  className="text-batik-brown/40 hover:text-batik-brown disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Nama Destinasi</label>
                  <input 
                    required 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Contoh: Curug Nangga"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Aktivitas Utama</label>
                  <input 
                    required 
                    placeholder="Contoh: Wisata Alam, Paralayang" 
                    value={formData.activity} 
                    onChange={e => setFormData({ ...formData, activity: e.target.value })} 
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Link Google Maps (Opsional)</label>
                  <input 
                    placeholder="Contoh: https://maps.google.com/..." 
                    value={formData.maps_url} 
                    onChange={e => setFormData({ ...formData, maps_url: e.target.value })} 
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                {/* Image Upload Block */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1 block">Gambar Destinasi</label>
                  
                  <div className="flex flex-col items-center justify-center bg-batik-cream/50 p-6 rounded-3xl border border-dashed border-batik-brown/10 relative overflow-hidden min-h-[180px]">
                    {formData.imageUrl ? (
                      <div className="relative w-full aspect-video max-w-[240px] rounded-2xl overflow-hidden shadow-md">
                        <img 
                          src={formData.imageUrl} 
                          className="w-full h-full object-cover" 
                          alt="Destination Preview"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:scale-105 transition-transform shadow-md"
                          title="Hapus Gambar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-3">
                        <ImageIcon className="text-batik-brown/20" size={40} />
                        <div>
                          <p className="text-sm font-bold text-batik-brown">Pilih Gambar Destinasi</p>
                          <p className="text-xs text-batik-brown/40">Format JPG, PNG, atau WEBP (Maksimal 5MB)</p>
                        </div>
                        <label className="inline-flex items-center bg-batik-dark text-batik-cream px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-pointer hover:bg-batik-brown transition-all shadow-md">
                          <Upload size={14} className="mr-2" /> Pilih Berkas
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    )}

                    {uploading && (
                      <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center space-y-2">
                        <Loader2 className="animate-spin text-batik-gold" size={32} />
                        <span className="text-xs font-bold text-batik-brown">Mengunggah gambar...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Deskripsi Singkat</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.description} 
                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold resize-none leading-relaxed text-batik-dark" 
                    placeholder="Tulis penjelasan singkat mengenai destinasi wisata ini..."
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={saving || uploading}
                    className="w-full bg-batik-dark text-batik-cream py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-batik-brown transition-all shadow-xl flex items-center justify-center disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} /> Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" /> Simpan Destinasi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default DestinationManager;
