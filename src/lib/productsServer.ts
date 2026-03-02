import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { categories } from '@/data/categories';
import { Product } from '@/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY;

function getSupabaseClients() {
  if (!supabaseUrl) return [];
  const clients = [] as ReturnType<typeof createClient>[];
  if (serviceRoleKey) clients.push(createClient(supabaseUrl, serviceRoleKey));
  if (anonKey) clients.push(createClient(supabaseUrl, anonKey));
  return clients;
}

function isMissingColumnError(error: { message?: string } | null | undefined, column: string): boolean {
  const msg = (error?.message || '').toLowerCase();
  return msg.includes(column.toLowerCase()) && (msg.includes('column') || msg.includes('schema cache') || msg.includes('does not exist'));
}

async function queryProducts(category?: string, subcategory?: string): Promise<Product[]> {
  const clients = getSupabaseClients();
  if (clients.length === 0) {
    console.warn('productsServer: missing Supabase URL/keys on server environment.');
    return [];
  }

  try {
    for (const client of clients) {
      let query = client.from('products').select('*').order('position', { ascending: true });
      if (category) query = query.eq('category', category);
      if (subcategory) query = query.eq('subcategory', subcategory);

      const { data, error } = await query;
      if (!error) return (data || []) as Product[];

      const msg = (error.message || '').toLowerCase();

      if (subcategory && isMissingColumnError(error, 'subcategory')) {
        return queryProducts(category);
      }

      if (msg.includes('position') || msg.includes('column') || msg.includes('does not exist')) {
        let q2 = client.from('products').select('*').order('created_at', { ascending: false });
        if (category) q2 = q2.eq('category', category);
        if (subcategory) q2 = q2.eq('subcategory', subcategory);
        const { data: d2, error: e2 } = await q2;
        if (!e2) return (d2 || []) as Product[];

        let q3 = client.from('products').select('*').order('name');
        if (category) q3 = q3.eq('category', category);
        if (subcategory) q3 = q3.eq('subcategory', subcategory);
        const { data: d3, error: e3 } = await q3;
        if (!e3) return (d3 || []) as Product[];
      }

      console.warn('productsServer: query failed with one key, trying fallback key.', error.message || error);
    }

    return [];
  } catch {
    return [];
  }
}

const getProductsCached = unstable_cache(
  async (category?: string, subcategory?: string) => queryProducts(category, subcategory),
  ['products-by-filter'],
  { revalidate: 60, tags: ['products'] }
);

const getAllProductsCached = unstable_cache(async () => queryProducts(), ['products-all'], {
  revalidate: 60,
  tags: ['products'],
});

export async function fetchProductsServer(category?: string, subcategory?: string): Promise<Product[]> {
  return getProductsCached(category, subcategory);
}

export async function fetchProductsByCategoryForHome() {
  const allProducts = await getAllProductsCached();

  return categories.map((cat) => ({
    ...cat,
    products: allProducts.filter((product) => product.category === cat.key),
  }));
}
