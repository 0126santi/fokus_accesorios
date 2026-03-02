"use client";
import { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection';
import { categories } from '../data/categories';
import { Product } from '../data/products';
import { fetchProducts } from '../lib/productsApi';

export default function Home() {
  const [productsByCategory, setProductsByCategory] = useState<{ key: string; name: string; products: Product[] }[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await fetchProducts();
      const grouped = categories.map((cat) => ({
        ...cat,
        products: allProducts.filter((product) => product.category === cat.key),
      }));
      setProductsByCategory(grouped);
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
