import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../data/batikData';
import BatikCard from '../components/BatikCard';
import ImageModal from '../components/ImageModal';
import { Search, Filter, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { gallery, siteInfo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Tulis', 'Cap', 'Kombinasi'];

  const normalizeCategory = (value: string | undefined | null): string =>
    value ? value.toLowerCase().trim() : 'lainnya';

  const filteredItems = gallery.filter(item => {
    const normItemCat = normalizeCategory(item.category);
    const normSelCat = normalizeCategory(selectedCategory);
    const matchesCategory = selectedCategory === 'Semua' || normItemCat.includes(normSelCat);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-batik-cream">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-batik-brown/5">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-serif font-bold text-batik-brown mb-6"
        >
          Galeri Batik
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-batik-dark/70 text-lg max-w-3xl mx-auto"
        >
          Karya eksklusif dari Oemah Batik Lentera Mandiri. Setiap helai kain mewakili 
          dedikasi pengrajin lokal dalam melestarikan motif Banyumasan.
        </motion.p>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-white border-b border-batik-brown/5 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${
                    selectedCategory === cat
                      ? 'bg-batik-gold text-batik-dark shadow-md'
                      : 'bg-batik-cream text-batik-brown/60 hover:bg-batik-brown/10'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-batik-brown/40" size={20} />
              <input
                type="text"
                placeholder="Cari motif atau jenis batik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-batik-cream rounded-full border-none focus:ring-2 focus:ring-batik-gold text-batik-dark placeholder:text-batik-brown/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-batik-brown/5"
                  >
                    <div 
                      className="aspect-[3/4] overflow-hidden relative cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-batik-gold text-batik-dark text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <h3 
                        className="text-xl font-serif font-bold text-batik-brown cursor-pointer hover:text-batik-gold transition-colors"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-batik-dark/60 text-sm line-clamp-2">{item.description}</p>
                      {item.philosophy && (
                        <div className="pt-4 border-t border-batik-brown/5 italic text-batik-brown/70 text-xs">
                          "{item.philosophy}"
                        </div>
                      )}
                      <button 
                        onClick={() => {
                          const msg = encodeURIComponent(`Halo, saya tertarik dengan produk Batik: ${item.title}`);
                          window.open(`https://wa.me/${siteInfo.whatsapp}?text=${msg}`, '_blank');
                        }}
                        className="w-full mt-4 bg-batik-dark text-batik-cream py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-batik-gold hover:text-batik-dark transition-all flex items-center justify-center group"
                      >
                        <MessageCircle size={16} className="mr-2 group-hover:scale-110" /> Order via WhatsApp
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-40">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-batik-brown/20">
                <Filter size={40} />
              </div>
              <h3 className="text-2xl font-bold text-batik-brown mb-2">Karya Tidak Ditemukan</h3>
              <p className="text-batik-dark/40">Coba gunakan kata kunci atau kategori lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default Gallery;
