import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useData, SiteInfo } from '../../context/DataContext';
import { uploadSiteImage } from '../../services/siteService';
import { Save, CheckCircle, Info, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SiteSettings: React.FC = () => {
  const { siteInfo, updateSiteInfo } = useData();
  const [formData, setFormData] = useState(siteInfo);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploadingField, setUploadingField] = useState<keyof SiteInfo | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(siteInfo);
  }, [siteInfo]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: keyof SiteInfo, folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran gambar maksimal adalah 2MB.');
      return;
    }

    setUploadingField(fieldKey);
    setError('');

    try {
      const publicUrl = await uploadSiteImage(file, folder);
      if (publicUrl) {
        setFormData(prev => ({ ...prev, [fieldKey]: publicUrl }));
      } else {
        setError('Gagal mengunggah gambar ke storage.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setUploadingField(null);
    }
  };

  const renderImageUploader = (label: string, fieldKey: keyof SiteInfo, folder: string, description: string = "Format JPG, PNG, atau WEBP. Maksimal 2MB.") => {
    const isUploading = uploadingField === fieldKey;
    const value = formData[fieldKey] as string;

    return (
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1 block">{label}</label>
        <div className="flex flex-col sm:flex-row items-center gap-8 bg-batik-cream/50 p-6 rounded-3xl border border-dashed border-batik-brown/10 h-full">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner relative overflow-hidden border border-batik-brown/5 shrink-0">
            {value ? (
              <img 
                src={value} 
                alt={label} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xs text-batik-brown/20 font-bold text-center">Belum Ada</span>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="animate-spin text-batik-gold" size={24} />
              </div>
            )}
          </div>
          
          <div className="flex-grow space-y-2 text-center sm:text-left">
            <p className="text-sm font-bold text-batik-brown">{label}</p>
            <p className="text-xs text-batik-brown/40">{description}</p>
            <label className="inline-flex items-center bg-batik-dark text-batik-cream px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-pointer hover:bg-batik-brown transition-all shadow-md mt-2">
              <Upload size={14} className="mr-2" /> Pilih File
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, fieldKey, folder)} 
                className="hidden" 
                disabled={uploadingField !== null}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const success = await updateSiteInfo(formData);
      if (success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError('Gagal memperbarui konfigurasi di database.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Pengaturan Website">
      <div className="max-w-4xl space-y-8 pb-12">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start space-x-4">
          <div className="text-amber-500 mt-1"><Info size={20} /></div>
          <p className="text-sm text-amber-800 leading-relaxed">
            Pengaturan ini mengontrol konfigurasi global situs, termasuk logo instansi, teks hero beranda, dan seluruh tautan kontak (WhatsApp/Sosial Media) yang aktif di website.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] border border-batik-brown/5 shadow-sm p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Media & Gambar Website */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-batik-gold mb-6 border-b border-batik-brown/5 pb-2">Logo & Media Website</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderImageUploader("Logo Instansi (Navbar)", "logoUrl", "logos")}
                {renderImageUploader("Logo Footer", "footerLogoUrl", "logos")}
                {renderImageUploader("Background Hero Utama", "heroImageUrl", "hero")}
                {renderImageUploader("Gambar Cerita Utama (Tentang)", "aboutImageUrl", "about")}
                {renderImageUploader("Grid Tentang - Foto 1", "aboutImage2Url", "about")}
                {renderImageUploader("Grid Tentang - Foto 2", "aboutImage3Url", "about")}
                {renderImageUploader("Grid Tentang - Foto 3", "aboutImage4Url", "about")}
                {renderImageUploader("Grid Tentang - Foto 4", "ctaImageUrl", "about")}
                {renderImageUploader("Ilustrasi Rencana Perjalanan Wisata", "destinationImageUrl", "destinations")}
              </div>
            </div>

            {/* General Settings */}
            <div className="border-t border-batik-brown/5 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Nama Website</label>
                <input 
                  required
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Motto Utama (Hero Title)</label>
                <input 
                  required
                  value={formData.motto}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark font-medium" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Filosofi Singkat (Hero Subtitle)</label>
              <textarea 
                required
                value={formData.philosophy}
                onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                rows={3}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark resize-none leading-relaxed" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Deskripsi Profil Tentang Kami (About Page)</label>
              <textarea 
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark resize-none leading-relaxed" 
              />
            </div>

            {/* Contact details */}
            <div className="border-t border-batik-brown/5 pt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-batik-gold mb-6">Informasi Kontak & Sosial Media</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Nomor Telepon</label>
                  <input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Email</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Nomor WhatsApp (Format: 6281xxx)</label>
                  <input 
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Username Instagram (Contoh: @oemahbatik_lm)</label>
                  <input 
                    required
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Halaman Facebook</label>
                  <input 
                    required
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Jam Operasional / Kunjungan</label>
                  <input 
                    required
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark" 
                    placeholder="Contoh: Senin - Sabtu: 08:00 - 17:00"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">URL Google Maps Embed / Tautan Peta</label>
                  <textarea 
                    required
                    value={formData.mapsUrl}
                    onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                    rows={2}
                    className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark resize-none leading-relaxed" 
                    placeholder="URL iframe embed atau link pencarian lokasi Google Maps"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 border-t border-batik-brown/5 pt-8">
              <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Alamat Fisik</label>
              <textarea 
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark resize-none leading-relaxed" 
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4 pt-4">
              <button 
                type="submit"
                disabled={saving || uploadingField !== null}
                className="bg-batik-dark text-batik-cream px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-batik-brown transition-all shadow-xl flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" /> Simpan Pengaturan
                  </>
                )}
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

export default SiteSettings;
