import React from 'react';
import { motion } from 'motion/react';
import { History, Target, Heart, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { siteInfo } = useData();
  const values = [
    {
      icon: <History size={32} />,
      title: 'Sejarah UMKM',
      description: 'Berawal dari kecintaan terhadap seni tradisional, kami tumbuh menjadi pusat pelestarian batik di Desa Wisata Petahunan.'
    },
    {
      icon: <Target size={32} />,
      title: 'Transformasi',
      description: 'Kami bertransformasi dari sekadar rumah produksi menjadi ruang belajar dan bagian dari potensi desa wisata.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Visi Kami',
      description: 'Menjadi pusat edukasi batik terkemuka yang memberdayakan masyarakat dan melestarikan warisan budaya.'
    },
    {
      icon: <Award size={32} />,
      title: 'Motto',
      description: `"${siteInfo.motto}" — Menjadi penerang bagi pelestarian budaya Banyumasan secara mandiri.`
    }
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
            Mengenal Lebih Dekat
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl font-bold mb-6"
          >
            Tentang Kami
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-1 bg-batik-gold mx-auto"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-batik-brown leading-tight">
                Dedikasi untuk <br /> <span className="text-batik-gold italic">Seni & Budaya</span>
              </h2>
              <div className="space-y-6 text-batik-dark/70 text-lg leading-relaxed">
                <p>
                  {siteInfo.description}
                </p>
                <p>
                  Berlokasi di Desa Petahunan yang dijuluki desa wisata, Oemah Batik Lentera Mandiri terintegrasi dengan potensi alam yang luar biasa. Mulai dari Curug Nangga hingga area Paralayang yang menawan.
                </p>
                <p>
                  Melalui "Lentera", kami ingin menjadi penerang bagi masyarakat sekitar untuk melihat potensi ekonomi dalam budaya. Dan melalui "Mandiri", kami mendorong setiap individu untuk berdaya melalui kreativitas tangan mereka sendiri.
                </p>
              </div>
              <div className="bg-batik-cream p-8 rounded-3xl border-l-4 border-batik-gold italic text-batik-brown font-serif text-xl">
                "Batik adalah bahasa jiwa yang dituangkan dalam kain. Setiap motifnya adalah cerita tentang alam, manusia, dan Tuhan."
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img src={siteInfo.aboutImage2Url || "https://picsum.photos/seed/about1/400/600"} alt="Batik 1" className="rounded-3xl w-full aspect-[2/3] object-cover shadow-lg" referrerPolicy="no-referrer" />
                <img src={siteInfo.aboutImage3Url || "https://picsum.photos/seed/about2/400/400"} alt="Batik 2" className="rounded-3xl w-full aspect-square object-cover shadow-lg" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-12">
                <img src={siteInfo.aboutImage4Url || "https://picsum.photos/seed/about3/400/400"} alt="Batik 3" className="rounded-3xl w-full aspect-square object-cover shadow-lg" referrerPolicy="no-referrer" />
                <img src={siteInfo.ctaImageUrl || "https://picsum.photos/seed/about4/400/600"} alt="Batik 4" className="rounded-3xl w-full aspect-[2/3] object-cover shadow-lg" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-batik-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-batik-brown mb-6">Nilai-Nilai Kami</h2>
            <p className="text-batik-dark/60">Prinsip yang mendasari setiap langkah kami dalam melestarikan warisan budaya nusantara.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-batik-brown/5 hover:shadow-md transition-all group"
              >
                <div className="text-batik-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-batik-brown mb-4">{value.title}</h3>
                <p className="text-sm text-batik-dark/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
