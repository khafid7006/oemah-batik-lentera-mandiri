import { supabase } from '../lib/supabase';

export interface EducationArticle {
  id: string;
  title: string;
  excerpt: string; // Maps to description column in database
  content: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}

export const getEducationArticles = async (): Promise<EducationArticle[]> => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching education articles:', error);
    return [];
  }
  
  return (data || []).map(item => ({
    id: String(item.id),
    title: item.title,
    excerpt: item.description || '',
    content: item.content || '',
    imageUrl: item.image_url || '',
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
};

export const uploadEducationImage = async (file: File): Promise<string | null> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('Admin session missing. Please login again.');
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `education/${Date.now()}-${cleanFileName}`;
  
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

export const deleteEducationImage = async (url: string): Promise<boolean> => {
  if (!url) return false;
  const parts = url.split('/site-assets/');
  if (parts.length <= 1) return false;
  const filePath = parts[parts.length - 1];
  
  const { error } = await supabase.storage
    .from('site-assets')
    .remove([filePath]);
    
  if (error) {
    console.error('Error deleting education image from storage:', error);
    return false;
  }
  return true;
};

export const addEducationArticle = async (article: Omit<EducationArticle, 'id'>): Promise<EducationArticle | null> => {
  const { data, error } = await supabase
    .from('education')
    .insert({
      title: article.title,
      description: article.excerpt, // Map excerpt to description column
      content: article.content,
      image_url: article.imageUrl
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding education article:', error);
    return null;
  }
  
  return {
    id: String(data.id),
    title: data.title,
    excerpt: data.description || '',
    content: data.content || '',
    imageUrl: data.image_url || '',
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

export const updateEducationArticle = async (id: string, article: Partial<EducationArticle>): Promise<boolean> => {
  const updatePayload: any = {};
  if (article.title !== undefined) updatePayload.title = article.title;
  if (article.excerpt !== undefined) updatePayload.description = article.excerpt; // Map excerpt to description column
  if (article.content !== undefined) updatePayload.content = article.content;
  if (article.imageUrl !== undefined) updatePayload.image_url = article.imageUrl;
  updatePayload.updated_at = new Date().toISOString();
  
  const { error } = await supabase
    .from('education')
    .update(updatePayload)
    .eq('id', id);
    
  if (error) {
    console.error('Error updating education article:', error);
    return false;
  }
  return true;
};

export const deleteEducationArticle = async (id: string, imageUrl?: string): Promise<boolean> => {
  if (imageUrl) {
    await deleteEducationImage(imageUrl);
  }
  
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting education article:', error);
    return false;
  }
  return true;
};
