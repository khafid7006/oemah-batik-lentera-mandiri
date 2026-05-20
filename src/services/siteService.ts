import { supabase } from '../lib/supabase';

export interface SiteConfig {
  id?: string | number;
  site_name: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  contact_info: {
    phone: string;
    email: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    motto: string;
    description: string;
    maps_url?: string;
    opening_hours?: string;
  };
  address: string;
  footer_logo_url?: string;
  hero_image_url?: string;
  about_image_url?: string;
  about_image_2_url?: string;
  about_image_3_url?: string;
  about_image_4_url?: string;
  destination_image_url?: string;
  cta_image_url?: string;
  updated_at?: string;
}

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle();
    
  if (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
  return data as SiteConfig;
};

export const uploadSiteImage = async (file: File, folder: string): Promise<string | null> => {
  // 1. Check if user is authenticated before uploading
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('Admin session missing. Please login again.');
  }

  // 2. Format unique file path: folder/${Date.now()}-${file.name}
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${Date.now()}-${cleanFileName}`;
  
  // 3. Upload to site-assets bucket
  const { error } = await supabase.storage
    .from('site-assets')
    .upload(filePath, file, { cacheControl: '3600', upsert: true });
    
  if (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Failed to upload the image to storage: ${error.message} (${(error as any).error || (error as any).status || 'unknown code'})`);
  }
  
  // 4. Generate public URL only after successful upload
  const { data: publicUrlData } = supabase.storage
    .from('site-assets')
    .getPublicUrl(filePath);
    
  return publicUrlData.publicUrl;
};

export const uploadLogo = async (file: File): Promise<string | null> => {
  return uploadSiteImage(file, 'logos');
};

export const updateSiteConfig = async (config: SiteConfig): Promise<boolean> => {
  // 1. Fetch the first existing row to get its ID (which is a UUID in the live database)
  const { data: existing, error: fetchError } = await supabase
    .from('site_config')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching existing site config during update:', fetchError);
  }

  // 2. Safely stringify contact_info to be compatible with both TEXT and JSON columns
  const contactInfoDbValue = typeof config.contact_info === 'object' 
    ? JSON.stringify(config.contact_info) 
    : config.contact_info;

  const payload: any = {
    site_name: config.site_name,
    logo_url: config.logo_url,
    hero_title: config.hero_title,
    hero_subtitle: config.hero_subtitle,
    contact_info: contactInfoDbValue,
    address: config.address,
    footer_logo_url: config.footer_logo_url || null,
    hero_image_url: config.hero_image_url || null,
    about_image_url: config.about_image_url || null,
    about_image_2_url: config.about_image_2_url || null,
    about_image_3_url: config.about_image_3_url || null,
    about_image_4_url: config.about_image_4_url || null,
    destination_image_url: config.destination_image_url || null,
    cta_image_url: config.cta_image_url || null,
    updated_at: new Date().toISOString()
  };

  // If there is an existing row, specify the ID to perform an update. Otherwise, omit it to let the database generate one.
  if (existing?.id) {
    payload.id = existing.id;
  }

  const { error } = await supabase
    .from('site_config')
    .upsert(payload);
    
  if (error) {
    console.error('Error updating site config:', error);
    return false;
  }
  return true;
};
