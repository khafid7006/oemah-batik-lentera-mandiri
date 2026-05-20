import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { uploadEducationImage } from '../../services/educationService';
import { Plus, Edit2, Trash2, X, Save, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EdukasiManager: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    imageUrl: '' 
  });

  const openAdd = () => {
    setFormData({ title: '', excerpt: '', content: '', imageUrl: '' });
    setEditingId(null);
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setFormData({ 
        title: article.title, 
        excerpt: article.excerpt, 
        content: article.content, 
        imageUrl: article.imageUrl 
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
      const publicUrl = await uploadEducationImage(file);
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
        success = await updateArticle(editingId, formData);
      } else {
        success = await addArticle(formData);
      }

      if (success) {
        setIsModalOpen(false);
      } else {
        setError('Gagal menyimpan artikel ke database.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini? Gambar juga akan dihapus dari server.')) {
      try {
        const success = await deleteArticle(id);
        if (!success) {
          alert('Gagal menghapus artikel dari server.');
        }
      } catch (err: any) {
        alert(err.message || 'Terjadi kesalahan saat menghapus.');
      }
    }
  };

  return (
    <AdminLayout title="Manajemen Edukasi">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-batik-brown/40 uppercase tracking-widest">Daftar Artikel</h2>
            <p className="text-xl font-bold text-batik-brown">Total {articles.length} Artikel</p>
          </div>
          <button 
            onClick={openAdd}
            className="bg-batik-dark text-batik-cream px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-batik-brown transition-all shadow-lg flex items-center"
          >
            <Plus size={18} className="mr-2" /> Tambah Artikel
          </button>
        </div>

        {/* Article Table/List */}
        <div className="bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-batik-cream/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-batik-brown/40">Artikel</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-batik-brown/40">Ringkasan</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-batik-brown/40">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-batik-brown/5">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-batik-cream/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      {article.imageUrl ? (
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-12 h-12 rounded-xl object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-batik-cream flex items-center justify-center text-batik-brown/20">
                          <ImageIcon size={20} />
                        </div>
                      )}
                      <span className="font-bold text-batik-brown">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-batik-brown/60 max-w-md line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => openEdit(article.id)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit Artikel"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus Artikel"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-8 py-10 text-center text-sm text-batik-brown/40">
                    Belum ada artikel edukasi. Klik "Tambah Artikel" untuk membuat baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 overflow-auto max-h-[90vh] z-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-batik-brown">{editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h3>
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
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Judul Artikel</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Contoh: Mengenal Teknik Canting Tulis"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Ringkasan (Excerpt)</label>
                  <input 
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Deskripsi singkat artikel..."
                  />
                </div>

                {/* Image Upload Block */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1 block">Gambar Artikel</label>
                  
                  <div className="flex flex-col items-center justify-center bg-batik-cream/50 p-6 rounded-3xl border border-dashed border-batik-brown/10 relative overflow-hidden min-h-[180px]">
                    {formData.imageUrl ? (
                      <div className="relative w-full aspect-video max-w-[280px] rounded-2xl overflow-hidden shadow-md">
                        <img 
                          src={formData.imageUrl} 
                          className="w-full h-full object-cover" 
                          alt="Article Preview"
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
                          <p className="text-sm font-bold text-batik-brown">Pilih Gambar Artikel</p>
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
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Konten Lengkap</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold resize-none leading-relaxed text-batik-dark" 
                    placeholder="Tulis artikel lengkap di sini..."
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
                        <Save size={18} className="mr-2" /> {editingId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
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

export default EdukasiManager;
