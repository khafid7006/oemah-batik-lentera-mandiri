import { supabase } from '../lib/supabase';

export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Produksi' | 'Edukasi' | 'Kunjungan';
  date?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export const getActivities = async (): Promise<Activity[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  return (data || []).map(item => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    imageUrl: item.image_url,
    category: (item.category as any) || (item.location as any) || 'Edukasi',
    date: item.date,
    location: item.location,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
};

export const uploadActivityImage = async (file: File): Promise<string | null> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('Admin session missing. Please login again.');
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `activities/${Date.now()}-${cleanFileName}`;
  
  const { error } = await supabase.storage
    .from('site-assets')
    .upload(filePath, file, { cacheControl: '3600', upsert: true });
    
  if (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Failed to upload the image to storage: ${error.message}`);
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('site-assets')
    .getPublicUrl(filePath);
    
  return publicUrlData.publicUrl;
};

export const deleteActivityImage = async (url: string): Promise<boolean> => {
  if (!url) return false;
  const parts = url.split('/site-assets/');
  if (parts.length <= 1) return false;
  const filePath = parts[parts.length - 1];
  
  const { error } = await supabase.storage
    .from('site-assets')
    .remove([filePath]);
    
  if (error) {
    console.error('Error deleting activity image from storage:', error);
    return false;
  }
  return true;
};

export const addActivity = async (activity: Omit<Activity, 'id'>): Promise<Activity | null> => {
  // Try inserting all columns including category
  const { data, error } = await supabase
    .from('activities')
    .insert({
      title: activity.title,
      description: activity.description,
      image_url: activity.imageUrl,
      category: activity.category,
      date: activity.date || new Date().toLocaleDateString(),
      location: activity.location || activity.category
    })
    .select()
    .single();
    
  if (error) {
    // Fallback if category column doesn't exist
    if (error.message.includes('column') || error.code === '42703') {
      console.warn('DB does not have category column in activities. Retrying insert with standard columns.');
      const { data: retryData, error: retryError } = await supabase
        .from('activities')
        .insert({
          title: activity.title,
          description: activity.description,
          image_url: activity.imageUrl,
          date: activity.date || new Date().toLocaleDateString(),
          location: activity.location || activity.category
        })
        .select()
        .single();
        
      if (retryError) {
        console.error('Error adding activity on retry:', retryError);
        return null;
      }
      return {
        id: String(retryData.id),
        title: retryData.title,
        description: retryData.description,
        imageUrl: retryData.image_url,
        category: (retryData.location as any) || 'Edukasi',
        date: retryData.date,
        location: retryData.location,
        created_at: retryData.created_at,
        updated_at: retryData.updated_at
      };
    }
    console.error('Error adding activity:', error);
    return null;
  }
  
  return {
    id: String(data.id),
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
    category: (data.category as any) || 'Edukasi',
    date: data.date,
    location: data.location,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

export const updateActivity = async (id: string, activity: Partial<Activity>): Promise<boolean> => {
  const updatePayload: any = {};
  if (activity.title !== undefined) updatePayload.title = activity.title;
  if (activity.description !== undefined) updatePayload.description = activity.description;
  if (activity.imageUrl !== undefined) updatePayload.image_url = activity.imageUrl;
  if (activity.category !== undefined) {
    updatePayload.category = activity.category;
    updatePayload.location = activity.category;
  }
  if (activity.date !== undefined) updatePayload.date = activity.date;
  if (activity.location !== undefined) updatePayload.location = activity.location;
  updatePayload.updated_at = new Date().toISOString();
  
  const { error } = await supabase
    .from('activities')
    .update(updatePayload)
    .eq('id', id);
    
  if (error) {
    if (error.message.includes('column') || error.code === '42703') {
      console.warn('DB does not have category column. Retrying update with standard columns.');
      const retryPayload: any = {};
      if (activity.title !== undefined) retryPayload.title = activity.title;
      if (activity.description !== undefined) retryPayload.description = activity.description;
      if (activity.imageUrl !== undefined) retryPayload.image_url = activity.imageUrl;
      if (activity.date !== undefined) retryPayload.date = activity.date;
      if (activity.location !== undefined) retryPayload.location = activity.location;
      
      const { error: retryError } = await supabase
        .from('activities')
        .update(retryPayload)
        .eq('id', id);
        
      if (retryError) {
        console.error('Error updating activity on retry:', retryError);
        return false;
      }
      return true;
    }
    console.error('Error updating activity:', error);
    return false;
  }
  return true;
};

export const deleteActivity = async (id: string, imageUrl?: string): Promise<boolean> => {
  if (imageUrl) {
    await deleteActivityImage(imageUrl);
  }
  
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting activity:', error);
    return false;
  }
  return true;
};
