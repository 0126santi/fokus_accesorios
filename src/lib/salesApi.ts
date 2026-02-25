import { supabase } from './supabaseClient';

export type SaleItem = {
  id: string;
  name: string;
  price: number;
  costo?: number | null;
  quantity: number;
};

export type Sale = {
  id: string;
  items: SaleItem[];
  subtotal: number;
  total: number;
  buyer_phone?: string | null;
  buyer_user_id?: string | null;
  status: 'pending' | 'accepted' | 'canceled';
  created_at: string;
  accepted_at?: string | null;
  accepted_by?: string | null;
};

export async function createSale(payload: {
  items: SaleItem[];
  subtotal: number;
  total: number;
  buyer_phone?: string | null;
  buyer_user_id?: string | null;
}) {
  const { data, error } = await supabase.from('sales').insert([payload]).select().single();
  if (error) throw error;
  return data as Sale;
}

export async function fetchSales(): Promise<Sale[]> {
  const { data, error } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Sale[];
}

export async function acceptSale(id: string) {
  // Set accepted_by to the authenticated user's uid and update status
  const userRes = await supabase.auth.getUser();
  const uid = userRes.data.user?.id ?? null;
  const { data, error } = await supabase
    .from('sales')
    .update({ status: 'accepted', accepted_at: new Date().toISOString(), accepted_by: uid })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Sale;
}

export async function cancelSale(id: string) {
  // Cancel by deleting the sale record (as requested)
  const { error } = await supabase.from('sales').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteSale(id: string) {
  const { error } = await supabase.from('sales').delete().eq('id', id);
  if (error) throw error;
}
