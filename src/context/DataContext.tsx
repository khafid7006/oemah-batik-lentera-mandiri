import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GalleryItem, 
  EducationArticle, 
  Activity, 
  Destination, 
  galleryItems as initialGalleryItems, 
  educationArticles as initialEducationArticles, 
  activities as initialActivities, 
  destinations as initialDestinations 
} from '../data/batikData';
import { 
  getSiteConfig, 
  updateSiteConfig as updateSiteConfigService, 
  SiteConfig 
} from '../services/siteService';
import { 
  getGalleryItems, 
  addGalleryItem as addGalleryItemService, 
  updateGalleryItem as updateGalleryItemService, 
  deleteGalleryItem as deleteGalleryItemService 
} from '../services/galleryService';
import { getActivities } from '../services/activitiesService';
import { getDestinations } from '../services/destinationsService';

import { 
  getEducationArticles,
  addEducationArticle as addEducationArticleService,
  updateEducationArticle as updateEducationArticleService,
  deleteEducationArticle as deleteEducationArticleService
} from '../services/educationService';
import { 
  addActivity as addActivityService, 
  updateActivity as updateActivityService, 
  deleteActivity as deleteActivityService 
} from '../services/activitiesService';
import { 
  addDestination as addDestinationService, 
  updateDestination as updateDestinationService, 
  deleteDestination as deleteDestinationService 
} from '../services/destinationsService';

export interface SiteInfo {
  motto: string;
  philosophy: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  logoUrl: string;
  siteName: string;
  footerLogoUrl: string;
  heroImageUrl: string;
  aboutImageUrl: string;
  aboutImage2Url: string;
  aboutImage3Url: string;
  aboutImage4Url: string;
  destinationImageUrl: string;
  ctaImageUrl: string;
  mapsUrl: string;
  openingHours: string;
}

interface DataContextType {
  gallery: GalleryItem[];
  articles: EducationArticle[];
  activities: Activity[];
  destinations: Destination[];
  siteInfo: SiteInfo;
  loading: boolean;
  
  // Gallery actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<boolean>;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  
  // Info actions
  updateSiteInfo: (info: Partial<SiteInfo>) => Promise<boolean>;
  
  // Education articles actions
  addArticle: (article: Omit<EducationArticle, 'id'>) => Promise<boolean>;
  updateArticle: (id: string, article: Partial<EducationArticle>) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
  
  // Activities actions
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<boolean>;
  updateActivity: (id: string, activity: Partial<Activity>) => Promise<boolean>;
  deleteActivity: (id: string) => Promise<boolean>;
  
  // Destinations actions
  addDestination: (destination: Omit<Destination, 'id'>) => Promise<boolean>;
  updateDestination: (id: string, destination: Partial<Destination>) => Promise<boolean>;
  deleteDestination: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_SITE_INFO: SiteInfo = {
  motto: "Melestarikan Batik Banyumasan melalui Edukasi dan Aktivitas Budaya",
  philosophy: "UMKM batik yang berkembang sebagai ruang belajar, pelestari tradisi, dan bagian dari potensi wisata Desa Petahunan.",
  description: "Oemah Batik Lentera Mandiri hadir bukan sekadar sebagai tempat produksi, melainkan sebagai pusat edukasi and pemberdayaan masyarakat melalui pelestarian seni batik secara mandiri.",
  address: "RT.03/RW.02, Petahunan, Pekuncen, Banyumas Regency, Central Java 53164",
  phone: "081390244921",
  email: "oemahbatik.pt@gmail.com",
  instagram: "@oemahbatik_lm",
  facebook: "oemah batik lentera mandiri",
  whatsapp: "6281390244921",
  logoUrl: "/src/assets/logo-oemah-batik.png",
  siteName: "Oemah Batik Lentera Mandiri",
  footerLogoUrl: "/src/assets/logo-oemah-batik.png",
  heroImageUrl: "",
  aboutImageUrl: "",
  aboutImage2Url: "",
  aboutImage3Url: "",
  aboutImage4Url: "",
  destinationImageUrl: "",
  ctaImageUrl: "",
  mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.427670693574!2d109.0733877!3d-7.4646706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656046e7f8303f%3A0x64e4024f2ca3beee!2sPetahunan%2C%20Pekuncen%2C%20Banyumas%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1714107572000!5m2!1sen!2sid",
  openingHours: "Senin - Sabtu: 08:00 - 17:00 (Minggu Libur)"
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [articles, setArticles] = useState<EducationArticle[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(INITIAL_SITE_INFO);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch site config
      const config = await getSiteConfig();
      if (config) {
        let contactInfo = config.contact_info;
        if (typeof contactInfo === 'string') {
          try {
            contactInfo = JSON.parse(contactInfo);
          } catch (e) {
            console.error('Error parsing contact_info JSON string:', e);
            contactInfo = {} as any;
          }
        }
        const ci = (contactInfo || {}) as any;

        setSiteInfo({
          motto: ci.motto || INITIAL_SITE_INFO.motto,
          philosophy: config.hero_subtitle || INITIAL_SITE_INFO.philosophy,
          description: ci.description || INITIAL_SITE_INFO.description,
          address: config.address || INITIAL_SITE_INFO.address,
          phone: ci.phone || INITIAL_SITE_INFO.phone,
          email: ci.email || INITIAL_SITE_INFO.email,
          instagram: ci.instagram || INITIAL_SITE_INFO.instagram,
          facebook: ci.facebook || INITIAL_SITE_INFO.facebook,
          whatsapp: ci.whatsapp || INITIAL_SITE_INFO.whatsapp,
          logoUrl: config.logo_url || INITIAL_SITE_INFO.logoUrl,
          siteName: config.site_name || INITIAL_SITE_INFO.siteName,
          footerLogoUrl: config.footer_logo_url || INITIAL_SITE_INFO.footerLogoUrl,
          heroImageUrl: config.hero_image_url || INITIAL_SITE_INFO.heroImageUrl,
          aboutImageUrl: config.about_image_url || INITIAL_SITE_INFO.aboutImageUrl,
          aboutImage2Url: config.about_image_2_url || INITIAL_SITE_INFO.aboutImage2Url,
          aboutImage3Url: config.about_image_3_url || INITIAL_SITE_INFO.aboutImage3Url,
          aboutImage4Url: config.about_image_4_url || INITIAL_SITE_INFO.aboutImage4Url,
          destinationImageUrl: config.destination_image_url || INITIAL_SITE_INFO.destinationImageUrl,
          ctaImageUrl: config.cta_image_url || INITIAL_SITE_INFO.ctaImageUrl,
          mapsUrl: ci.maps_url || INITIAL_SITE_INFO.mapsUrl,
          openingHours: ci.opening_hours || INITIAL_SITE_INFO.openingHours
        });
      }

      // 2. Fetch gallery
      const galleryData = await getGalleryItems();
      if (galleryData && galleryData.length > 0) {
        setGallery(galleryData);
      } else {
        setGallery(initialGalleryItems);
      }

      // 3. Fetch activities
      const activitiesData = await getActivities();
      if (activitiesData && activitiesData.length > 0) {
        setActivities(activitiesData);
      } else {
        setActivities(initialActivities);
      }

      // 4. Fetch destinations
      const destinationsData = await getDestinations();
      if (destinationsData && destinationsData.length > 0) {
        setDestinations(destinationsData);
      } else {
        setDestinations(initialDestinations);
      }

      // 5. Fetch education articles
      const educationData = await getEducationArticles();
      if (educationData && educationData.length > 0) {
        setArticles(educationData);
      } else {
        setArticles(initialEducationArticles);
      }
    } catch (err) {
      console.error('Error fetching Supabase data in context:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Gallery actions
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>): Promise<boolean> => {
    try {
      const newItem = await addGalleryItemService(item);
      if (newItem) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch (e: any) {
      console.error("DataContext addGalleryItem error:", e);
      throw e;
    }
  };

  const updateGalleryItem = async (id: string, updated: Partial<GalleryItem>): Promise<boolean> => {
    try {
      const success = await updateGalleryItemService(id, updated);
      if (success) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch (e: any) {
      console.error("DataContext updateGalleryItem error:", e);
      throw e;
    }
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    try {
      const target = gallery.find(item => item.id === id);
      const success = await deleteGalleryItemService(id, target?.imageUrl);
      if (success) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch (e: any) {
      console.error("DataContext deleteGalleryItem error:", e);
      throw e;
    }
  };

  // Site Info actions
  const updateSiteInfo = async (info: Partial<SiteInfo>): Promise<boolean> => {
    const merged = { ...siteInfo, ...info };
    const success = await updateSiteConfigService({
      site_name: merged.siteName,
      logo_url: merged.logoUrl,
      hero_title: merged.motto,
      hero_subtitle: merged.philosophy,
      address: merged.address,
      footer_logo_url: merged.footerLogoUrl,
      hero_image_url: merged.heroImageUrl,
      about_image_url: merged.aboutImageUrl,
      about_image_2_url: merged.aboutImage2Url,
      about_image_3_url: merged.aboutImage3Url,
      about_image_4_url: merged.aboutImage4Url,
      destination_image_url: merged.destinationImageUrl,
      cta_image_url: merged.ctaImageUrl,
      contact_info: {
        phone: merged.phone,
        email: merged.email,
        whatsapp: merged.whatsapp,
        instagram: merged.instagram,
        facebook: merged.facebook,
        motto: merged.motto,
        description: merged.description,
        maps_url: merged.mapsUrl,
        opening_hours: merged.openingHours
      }
    });

    if (success) {
      setSiteInfo(merged);
      return true;
    }
    return false;
  };

  // Education actions
  const addArticle = async (article: Omit<EducationArticle, 'id'>): Promise<boolean> => {
    const newItem = await addEducationArticleService(article);
    if (newItem) {
      setArticles(prev => [newItem, ...prev]);
      return true;
    }
    return false;
  };

  const updateArticle = async (id: string, updated: Partial<EducationArticle>): Promise<boolean> => {
    const success = await updateEducationArticleService(id, updated);
    if (success) {
      setArticles(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
      return true;
    }
    return false;
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    const target = articles.find(item => item.id === id);
    const success = await deleteEducationArticleService(id, target?.imageUrl);
    if (success) {
      setArticles(prev => prev.filter(item => item.id !== id));
      return true;
    }
    return false;
  };

  // Activities actions
  const addActivity = async (activity: Omit<Activity, 'id'>): Promise<boolean> => {
    const newItem = await addActivityService(activity);
    if (newItem) {
      setActivities(prev => [newItem, ...prev]);
      return true;
    }
    return false;
  };

  const updateActivity = async (id: string, updated: Partial<Activity>): Promise<boolean> => {
    const success = await updateActivityService(id, updated);
    if (success) {
      setActivities(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
      return true;
    }
    return false;
  };

  const deleteActivity = async (id: string): Promise<boolean> => {
    const target = activities.find(item => item.id === id);
    const success = await deleteActivityService(id, target?.imageUrl);
    if (success) {
      setActivities(prev => prev.filter(item => item.id !== id));
      return true;
    }
    return false;
  };

  // Destinations actions
  const addDestination = async (destination: Omit<Destination, 'id'>): Promise<boolean> => {
    const newItem = await addDestinationService(destination);
    if (newItem) {
      setDestinations(prev => [newItem, ...prev]);
      return true;
    }
    return false;
  };

  const updateDestination = async (id: string, updated: Partial<Destination>): Promise<boolean> => {
    const success = await updateDestinationService(id, updated);
    if (success) {
      setDestinations(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
      return true;
    }
    return false;
  };

  const deleteDestination = async (id: string): Promise<boolean> => {
    const target = destinations.find(item => item.id === id);
    const success = await deleteDestinationService(id, target?.imageUrl);
    if (success) {
      setDestinations(prev => prev.filter(item => item.id !== id));
      return true;
    }
    return false;
  };

  return (
    <DataContext.Provider value={{ 
      gallery, articles, activities, destinations, siteInfo, loading,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      addArticle, updateArticle, deleteArticle,
      addActivity, updateActivity, deleteActivity,
      addDestination, updateDestination, deleteDestination,
      updateSiteInfo
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
