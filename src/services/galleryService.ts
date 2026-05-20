import { supabase } from '../lib/supabase';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Tulis' | 'Cap' | 'Kombinasi';
  description: string;
  imageUrl: string;
  philosophy?: string;
  created_at?: string;
}

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
    
  console.log("Fetched gallery data:", data);
  if (error) {
    console.error("Gallery fetch error:", error);
    return [];
  }
  
  return (data || []).map(item => ({
    id: String(item.id),
    title: item.title,
    category: item.category as any,
    description: item.description,
    imageUrl: item.image_url,
    philosophy: item.philosophy,
    created_at: item.created_at
  }));
};

export const uploadGalleryImage = async (file: File): Promise<string | null> => {
  // 1. Check if user is authenticated before uploading
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('Admin session missing. Please login again.');
  }

  // 2. Format unique file path: gallery/${Date.now()}-${file.name}
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `gallery/${Date.now()}-${cleanFileName}`;
  
  // 3. Upload to site-assets bucket
  const { error } = await supabase.storage
    .from('site-assets')
    .upload(filePath, file, { cacheControl: '3600', upsert: true });
    
  if (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Failed to upload the image to storage: ${error.message}`);
  }
  
  // 4. Generate public URL only after successful upload
  const { data: publicUrlData } = supabase.storage
    .from('site-assets')
    .getPublicUrl(filePath);
    
  return publicUrlData.publicUrl;
};

export const deleteGalleryImage = async (url: string): Promise<boolean> => {
  if (!url) return false;
  // Extract path from Supabase storage URL: e.g. ".../site-assets/gallery/filename.ext"
  const parts = url.split('/site-assets/');
  if (parts.length <= 1) return false;
  const filePath = parts[parts.length - 1];
  
  const { error } = await supabase.storage
    .from('site-assets')
    .remove([filePath]);
    
  if (error) {
    console.error('Error deleting gallery image from storage:', error);
    return false;
  }
  return true;
};

export const addGalleryItem = async (item: Omit<GalleryItem, 'id'>): Promise<GalleryItem | null> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error("Admin session expired. Please login again.");
  }

  // First try: insert all fields including category and philosophy
  const { data, error } = await supabase
    .from('gallery')
    .insert({
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      category: item.category,
      philosophy: item.philosophy
    })
    .select()
    .single();
    
  if (error) {
    // If column doesn't exist, retry with standard columns only
    if (error.message.includes('column') || error.code === '42703') {
      console.warn('DB does not have category/philosophy columns. Retrying insert with standard columns.');
      const { data: retryData, error: retryError } = await supabase
        .from('gallery')
        .insert({
          title: item.title,
          description: item.description,
          image_url: item.imageUrl
        })
        .select()
        .single();
        
      if (retryError) {
        console.error('Error adding gallery item on retry:', retryError);
        throw new Error(`Add failed: ${retryError.message} (${retryError.code})`);
      }
      return {
        id: String(retryData.id),
        title: retryData.title,
        category: 'Tulis',
        description: retryData.description,
        imageUrl: retryData.image_url,
        philosophy: '',
        created_at: retryData.created_at
      };
    }
    console.error('Error adding gallery item:', error);
    throw new Error(`Add failed: ${error.message} (${error.code})`);
  }
  
  return {
    id: String(data.id),
    title: data.title,
    category: (data.category as any) || 'Tulis',
    description: data.description,
    imageUrl: data.image_url,
    philosophy: data.philosophy || '',
    created_at: data.created_at
  };
};

export const updateGalleryItem = async (id: string, item: Partial<GalleryItem>): Promise<boolean> => {
  // 1. Check Auth Session
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("CURRENT SESSION (UPDATE):", sessionData?.session);
  if (!sessionData?.session) {
    throw new Error("Admin session expired. Please login again.");
  }

  // 2. Logging
  console.log("UPDATE PAYLOAD:", { id, updates: item });

  // 3. Mapping columns: Map frontend imageUrl to database image_url
  const dbPayload = {
    title: item.title,
    description: item.description,
    category: item.category,
    philosophy: item.philosophy,
    image_url: item.imageUrl
  };

  // 4. Exact Query (Using UUID string directly)
  const { data, error } = await supabase
    .from("gallery")
    .update(dbPayload)
    .eq("id", id)
    .select()
    .single();

  // 5. Results Logging
  console.log("UPDATE RESULT:", data);
  if (error) {
    console.error("UPDATE ERROR:", error);
    throw new Error(`Update failed: ${error.message} (${error.code})`);
  }

  return true;
};

export const deleteGalleryItem = async (id: string, imageUrl?: string): Promise<boolean> => {
  // 1. Check Auth Session
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("CURRENT SESSION (DELETE):", sessionData?.session);
  if (!sessionData?.session) {
    throw new Error("Admin session expired. Please login again.");
  }

  // 2. Logging
  console.log("DELETE ID:", id, typeof id);

  // 3. Exact Query (Delete DB row first, using UUID string directly)
  const { data, error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id)
    .select();

  // 4. Results Logging
  console.log("DELETE RESULT:", data);
  if (error) {
    console.error("DELETE ERROR:", error);
    throw new Error(`Delete failed: ${error.message} (${error.code})`);
  }

  // 5. Attempt storage delete safely (Should not block DB delete)
  if (imageUrl) {
    try {
      await deleteGalleryImage(imageUrl);
    } catch (e) {
      console.warn("Storage image delete error but proceeding with database delete:", e);
    }
  }

  return true;
};
