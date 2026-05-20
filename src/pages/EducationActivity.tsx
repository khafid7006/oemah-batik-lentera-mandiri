import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import ActivityCard from '../components/ActivityCard';
import { Sparkles, Camera, MapPin } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButtons';

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

const EducationActivity: React.FC = () => {
  const { activities, siteInfo } = useData();

  return (
    <div className="pt-24 min-h-screen bg-batik-cream">
      {/* Hero Section */}
      <section className="py-24 bg-batik-brown text-batik-cream relative overflow-hidden">
        <div className="batik-pattern absolute inset-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-batik-gold font-bold text-xs uppercase tracking-[0.4em] mb-6 block"
          >
            Pengalaman Langsung
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl font-bold mb-8 leading-tight"
          >
            Belajar Membatik <br />
            <span className="text-batik-gold italic">Dari Pengrajin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-batik-cream/70 text-lg sm:text-xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Rasakan keajaiban mencanting dan mewarnai di lingkungan desa wisata yang asri. Program edukasi kami dirancang untuk semua kalangan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-1 bg-batik-gold mx-auto"
          />
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ActivityCard activity={activity} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-batik-brown leading-tight">
                Mengapa Memilih <br /> Workshop Kami?
              </h2>
              <div className="space-y-8">
                {[
                  { icon: <Sparkles />, title: 'Instruktur Ahli', desc: 'Dibimbing langsung oleh para pengrajin batik senior dari Desa Petahunan.' },
                  { icon: <Camera />, title: 'Spot Instagrammable', desc: 'Abadikan momen belajar di tengah suasana tradisional yang estetik.' },
                  { icon: <MapPin />, title: 'Tur Desa Wisata', desc: 'Bonus tur keliling desa melihat potensi wisata alam di sekitar workshop.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className="bg-batik-cream p-4 rounded-2xl text-batik-gold group-hover:bg-batik-gold group-hover:text-batik-dark transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-batik-brown mb-2">{item.title}</h4>
                      <p className="text-batik-dark/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-batik-cream/50">
                {siteInfo.aboutImageUrl && (
                  <ImageWithFade 
                    src={siteInfo.aboutImageUrl} 
                    className="w-full h-full object-cover" 
                    alt="Workshop" 
                  />
                )}
              </div>
              <div className="absolute -bottom-10 -right-10 bg-batik-gold p-12 rounded-[3rem] shadow-2xl hidden sm:block">
                <p className="text-batik-dark font-serif text-3xl font-bold italic leading-tight">"Belajar <br /> Dengan Hati"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-batik-brown relative overflow-hidden">
        <div className="batik-pattern absolute inset-0 opacity-5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-batik-cream mb-8">Siap Memulai Petualangan Budaya?</h2>
          <p className="text-batik-cream/70 text-lg mb-12 leading-relaxed">
            Pesan tempat sekarang untuk rombongan sekolah, instansi, atau kunjungan pribadi. Kami menyediakan paket edukasi yang fleksibel.
          </p>
          <WhatsAppButton 
            className="w-full sm:w-auto"
            label="Daftar Workshop Sekarang" 
            message="Halo, saya ingin menanyakan jadwal dan paket workshop membatik di Oemah Batik Lentera Mandiri."
          />
        </div>
      </section>
    </div>
  );
};

export default EducationActivity;
