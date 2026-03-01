"use client";
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/productsApi';
import { Product } from '@/data/products';

export default function CategoriaPage() {
  const params = useParams<{ cat: string }>();
  const cat = params?.cat ?? '';
  const categoria = useMemo(() => categories.find((c: { key: string }) => c.key === cat), [cat]);
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoria) {
      setProductos([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    fetchProducts(cat)
      .then((items) => {
        if (!cancelled) setProductos(items);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cat, categoria]);

  if (!categoria) {
    return <p className="text-neutral-700 text-center">Categoría no encontrada.</p>;
  }

  return (
    <section>
      <h2 className="text-2xl font-extrabold uppercase tracking-wide text-black mb-8 text-center" style={{ letterSpacing: '1px' }}>{categoria.name}</h2>
      {loading ? (
        <p className="text-neutral-700 text-center">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-neutral-700 text-center">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 px-2 w-full sm:max-w-6xl mx-auto sm:gap-4 sm:px-0 sm:grid-cols-3 lg:grid-cols-4">
          {productos.map((prod) => (
            <div key={prod.id} className="w-full max-w-[190px] mx-auto sm:max-w-none">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
