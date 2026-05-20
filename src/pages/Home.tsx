import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import ActivityPreview from '../components/home/ActivityPreview';
import GalleryPreview from '../components/home/GalleryPreview';
import DestinationPreview from '../components/home/DestinationPreview';
import ContactPreview from '../components/home/ContactPreview';
import ImageModal from '../components/ImageModal';
import { GalleryItem } from '../data/batikData';

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen">
      {/* Narrative Sections */}
      <HeroSection />
      <AboutPreview />
      <ActivityPreview />
      <GalleryPreview />
      <DestinationPreview />
      <ContactPreview />

      {/* Global Modals/Components */}
      {selectedItem && (
        <ImageModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default Home;
