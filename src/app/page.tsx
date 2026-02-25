"use client";
import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/productsApi';
import CategorySection from '../components/CategorySection';
import { categories } from '../data/categories';
import { Product } from '../data/products';

export default function Home() {
  const [productsByCategory, setProductsByCategory] = useState<{ key: string; name: string; products: Product[] }[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const all = await Promise.all(
        categories.map(async cat => ({
          ...cat,
          products: await fetchProducts(cat.key)
        }))
      );
      setProductsByCategory(all);
    }
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full px-0 py-6">
        {productsByCategory.map(cat => (
          <CategorySection
            key={cat.key}
            name={cat.name}
            products={cat.products}
          />
        ))}
      </div>
    </main>
  );
}
