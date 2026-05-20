import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { uploadGalleryImage } from '../../services/galleryService';
import { Plus, Edit2, Trash2, X, Save, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GalleryManager: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ 
    title: '', 
    category: 'Tulis' as 'Tulis' | 'Cap' | 'Kombinasi', 
    description: '', 
    imageUrl: '',
    philosophy: ''
  });

  const openAdd = () => {
    setFormData({ title: '', category: 'Tulis', description: '', imageUrl: '', philosophy: '' });
    setEditingId(null);
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    const item = gallery.find(g => g.id === id);
    if (item) {
      setFormData({ 
        title: item.title, 
        category: item.category, 
        description: item.description, 
        imageUrl: item.imageUrl,
        philosophy: item.philosophy || ''
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
      const publicUrl = await uploadGalleryImage(file);
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
    console.log("HANDLE SUBMIT editingId:", editingId);
    if (!formData.imageUrl) {
      setError('Harap unggah gambar terlebih dahulu.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      let success = false;
      if (editingId) {
        success = await updateGalleryItem(editingId, formData);
      } else {
        success = await addGalleryItem(formData);
      }

      if (success) {
        setIsModalOpen(false);
      } else {
        setError('Gagal menyimpan data ke database.');
      }
    } catch (err: any) {
      console.error("Submit handler catch:", err);
      setError(`Gagal menyimpan: ${err.message || 'Terjadi kesalahan'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("HANDLE DELETE item:", id);
    if (window.confirm('Apakah Anda yakin ingin menghapus karya ini? Gambar juga akan dihapus dari server.')) {
      try {
        const success = await deleteGalleryItem(id);
        if (!success) {
          alert('Gagal menghapus karya dari server.');
        }
      } catch (err: any) {
        console.error("Delete handler catch:", err);
        alert(`Gagal menghapus: ${err.message || 'Terjadi kesalahan'}`);
      }
    }
  };

  return (
    <AdminLayout title="Manajemen Galeri">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest">Daftar Karya</h2>
            <p className="text-xl font-bold text-batik-brown">Total {gallery.length} Karya</p>
          </div>
          <button 
            onClick={openAdd}
            className="bg-batik-dark text-batik-cream px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-batik-brown transition-all shadow-lg flex items-center"
          >
            <Plus size={18} className="mr-2" /> Tambah Karya
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className="bg-white rounded-3xl border border-batik-brown/5 shadow-sm overflow-hidden group flex flex-col h-full"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-batik-cream">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-batik-brown/20">
                    <ImageIcon size={48} />
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(item.id);
                    }} 
                    className="p-2 bg-white/90 backdrop-blur-sm text-blue-500 rounded-xl shadow-lg hover:scale-110 transition-transform"
                    title="Edit Item"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }} 
                    className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-lg hover:scale-110 transition-transform"
                    title="Hapus Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-batik-gold text-batik-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-batik-brown mb-1 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-batik-brown/40 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                {item.philosophy && (
                  <p className="text-[10px] italic text-batik-gold mt-3 line-clamp-1 border-t border-batik-brown/5 pt-2">
                    "{item.philosophy}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}
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
                <h3 className="text-2xl font-bold text-batik-brown">{editingId ? 'Edit Karya' : 'Tambah Karya'}</h3>
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
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Nama Karya</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Contoh: Batik Tulis Parang Banyumasan"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Jenis Batik</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark"
                  >
                    <option value="Tulis">Batik Tulis</option>
                    <option value="Cap">Batik Cap</option>
                    <option value="Kombinasi">Batik Kombinasi</option>
                  </select>
                </div>

                {/* Image Upload Block */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1 block">Gambar Karya</label>
                  
                  <div className="flex flex-col items-center justify-center bg-batik-cream/50 p-6 rounded-3xl border border-dashed border-batik-brown/10 relative overflow-hidden min-h-[200px]">
                    {formData.imageUrl ? (
                      <div className="relative w-full aspect-[3/4] max-w-[180px] rounded-2xl overflow-hidden shadow-md">
                        <img 
                          src={formData.imageUrl} 
                          className="w-full h-full object-cover" 
                          alt="Gallery Preview"
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
                        <ImageIcon className="text-batik-brown/20" size={48} />
                        <div>
                          <p className="text-sm font-bold text-batik-brown">Pilih Gambar Batik</p>
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
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Filosofi Batik (Opsional)</label>
                  <input 
                    value={formData.philosophy}
                    onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Contoh: Menggambarkan keindahan harmoni alam..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Deskripsi Karya</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark resize-none leading-relaxed" 
                    placeholder="Ceritakan sejarah atau karakteristik dari batik ini..."
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
                        <Save size={18} className="mr-2" /> {editingId ? 'Simpan Perubahan' : 'Tambah ke Galeri'}
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

export default GalleryManager;
