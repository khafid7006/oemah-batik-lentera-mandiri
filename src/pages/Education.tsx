import React from 'react';
import { motion } from 'motion/react';
import ArticleCard from '../components/ArticleCard';
import { CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const ImageWithFade: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <img 
      src={src} 
      alt={alt} 
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      referrerPolicy="no-referrer"
    />
  );
};

const Education: React.FC = () => {
  const { articles, siteInfo } = useData();
  const steps = [
    { title: 'Nyungging', desc: 'Membuat pola di atas kertas.' },
    { title: 'Njaplak', desc: 'Memindahkan pola dari kertas ke kain.' },
    { title: 'Nglowong', desc: 'Melekatkan malam dengan canting sesuai pola.' },
    { title: 'Ngiseni', desc: 'Memberi isian pada motif yang sudah dibuat.' },
    { title: 'Nyolet', desc: 'Mewarnai bagian tertentu dengan kuas.' },
    { title: 'Mopok', desc: 'Menutup bagian yang sudah diwarnai dengan malam.' },
    { title: 'Ngobat', desc: 'Mewarnai kain dengan cara dicelup.' },
    { title: 'Nglorot', desc: 'Meluruhkan malam dengan air mendidih.' }
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 bg-batik-brown text-batik-cream relative overflow-hidden">
        <div className="batik-pattern absolute inset-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            Pusat Pengetahuan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl font-bold mb-6"
          >
            Edukasi Batik
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-1 bg-batik-gold mx-auto"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-batik-brown mb-6">Proses Pembuatan Batik</h2>
            <p className="text-batik-dark/60 italic">"Sabar dan teliti adalah kunci keindahan sehelai kain batik."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-batik-cream p-6 rounded-2xl border border-batik-brown/5 flex items-start space-x-4"
              >
                <div className="text-batik-gold mt-1">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-batik-brown mb-1">{step.title}</h4>
                  <p className="text-xs text-batik-dark/60 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 bg-batik-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-bold text-batik-brown">Artikel Edukasi</h2>
            <div className="hidden md:block h-px bg-batik-brown/10 flex-grow mx-12" />
          </div>

          <div className="space-y-12">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 bg-batik-cream/50 rounded-[3rem] overflow-hidden shadow-2xl aspect-square">
              {siteInfo.ctaImageUrl && (
                <ImageWithFade 
                  src={siteInfo.ctaImageUrl} 
                  alt="Jenis Batik" 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-batik-brown">Jenis-Jenis Batik</h2>
              <div className="space-y-6">
                <div className="border-b border-batik-brown/10 pb-6">
                  <h4 className="text-xl font-bold text-batik-gold mb-2">Batik Tulis</h4>
                  <p className="text-batik-dark/70 leading-relaxed">Dibuat secara manual menggunakan canting dan malam. Setiap helainya unik dan memiliki nilai seni yang sangat tinggi.</p>
                </div>
                <div className="border-b border-batik-brown/10 pb-6">
                  <h4 className="text-xl font-bold text-batik-gold mb-2">Batik Cap</h4>
                  <p className="text-batik-dark/70 leading-relaxed">Menggunakan stempel tembaga (cap) untuk menerapkan motif. Prosesnya lebih cepat namun tetap mempertahankan keaslian teknik batik.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-batik-gold mb-2">Batik Kombinasi</h4>
                  <p className="text-batik-dark/70 leading-relaxed">Perpaduan antara teknik cap untuk motif utama dan teknik tulis untuk detail atau isian, menciptakan harmoni yang indah.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
