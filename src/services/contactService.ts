import { supabase } from '../lib/supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read';
  created_at?: string;
}

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
  
  return (data || []).map(item => ({
    id: String(item.id),
    name: item.name,
    email: item.email,
    phone: item.phone,
    message: item.message,
    status: item.status as any || 'unread',
    created_at: item.created_at
  }));
};

export const addContactMessage = async (message: Omit<ContactMessage, 'id' | 'status'>): Promise<ContactMessage | null> => {
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      name: message.name,
      email: message.email,
      phone: message.phone,
      message: message.message,
      status: 'unread'
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding contact message:', error);
    return null;
  }
  
  return {
    id: String(data.id),
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    status: data.status as any || 'unread',
    created_at: data.created_at
  };
};

export const markMessageAsRead = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('contacts')
    .update({ status: 'read' })
    .eq('id', id);
    
  if (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
  return true;
};

export const deleteContactMessage = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting contact message:', error);
    return false;
  }
  return true;
};
