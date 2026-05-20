import { supabase } from '../lib/supabase';

export interface Destination {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  activity: string;
  location?: string;
  maps_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const getDestinations = async (): Promise<Destination[]> => {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
  
  return (data || []).map(item => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    imageUrl: item.image_url,
    activity: item.activity || item.location || 'Wisata Budaya',
    location: item.location,
    maps_url: item.maps_url,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
};

export const uploadDestinationImage = async (file: File): Promise<string | null> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('Admin session missing. Please login again.');
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `destinations/${Date.now()}-${cleanFileName}`;
  
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

export const deleteDestinationImage = async (url: string): Promise<boolean> => {
  if (!url) return false;
  const parts = url.split('/site-assets/');
  if (parts.length <= 1) return false;
  const filePath = parts[parts.length - 1];
  
  const { error } = await supabase.storage
    .from('site-assets')
    .remove([filePath]);
    
  if (error) {
    console.error('Error deleting destination image from storage:', error);
    return false;
  }
  return true;
};

export const addDestination = async (destination: Omit<Destination, 'id'>): Promise<Destination | null> => {
  // Try inserting all columns including activity
  const { data, error } = await supabase
    .from('destinations')
    .insert({
      title: destination.title,
      description: destination.description,
      image_url: destination.imageUrl,
      activity: destination.activity,
      location: destination.location || destination.activity,
      maps_url: destination.maps_url || ''
    })
    .select()
    .single();
    
  if (error) {
    // Fallback if activity column doesn't exist
    if (error.message.includes('column') || error.code === '42703') {
      console.warn('DB does not have activity column in destinations. Retrying insert with standard columns.');
      const { data: retryData, error: retryError } = await supabase
        .from('destinations')
        .insert({
          title: destination.title,
          description: destination.description,
          image_url: destination.imageUrl,
          location: destination.location || destination.activity,
          maps_url: destination.maps_url || ''
        })
        .select()
        .single();
        
      if (retryError) {
        console.error('Error adding destination on retry:', retryError);
        return null;
      }
      return {
        id: String(retryData.id),
        title: retryData.title,
        description: retryData.description,
        imageUrl: retryData.image_url,
        activity: retryData.location || 'Wisata Budaya',
        location: retryData.location,
        maps_url: retryData.maps_url,
        created_at: retryData.created_at,
        updated_at: retryData.updated_at
      };
    }
    console.error('Error adding destination:', error);
    return null;
  }
  
  return {
    id: String(data.id),
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
    activity: data.activity || 'Wisata Budaya',
    location: data.location,
    maps_url: data.maps_url,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

export const updateDestination = async (id: string, destination: Partial<Destination>): Promise<boolean> => {
  const updatePayload: any = {};
  if (destination.title !== undefined) updatePayload.title = destination.title;
  if (destination.description !== undefined) updatePayload.description = destination.description;
  if (destination.imageUrl !== undefined) updatePayload.image_url = destination.imageUrl;
  if (destination.activity !== undefined) {
    updatePayload.activity = destination.activity;
    updatePayload.location = destination.activity;
  }
  if (destination.location !== undefined) updatePayload.location = destination.location;
  if (destination.maps_url !== undefined) updatePayload.maps_url = destination.maps_url;
  updatePayload.updated_at = new Date().toISOString();
  
  const { error } = await supabase
    .from('destinations')
    .update(updatePayload)
    .eq('id', id);
    
  if (error) {
    if (error.message.includes('column') || error.code === '42703') {
      console.warn('DB does not have activity column. Retrying update with standard columns.');
      const retryPayload: any = {};
      if (destination.title !== undefined) retryPayload.title = destination.title;
      if (destination.description !== undefined) retryPayload.description = destination.description;
      if (destination.imageUrl !== undefined) retryPayload.image_url = destination.imageUrl;
      if (destination.location !== undefined) retryPayload.location = destination.location;
      if (destination.maps_url !== undefined) retryPayload.maps_url = destination.maps_url;
      
      const { error: retryError } = await supabase
        .from('destinations')
        .update(retryPayload)
        .eq('id', id);
        
      if (retryError) {
        console.error('Error updating destination on retry:', retryError);
        return false;
      }
      return true;
    }
    console.error('Error updating destination:', error);
    return false;
  }
  return true;
};

export const deleteDestination = async (id: string, imageUrl?: string): Promise<boolean> => {
  if (imageUrl) {
    await deleteDestinationImage(imageUrl);
  }
  
  const { error } = await supabase
    .from('destinations')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting destination:', error);
    return false;
  }
  return true;
};
