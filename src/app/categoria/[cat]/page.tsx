"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/productsApi';
import { Product } from '@/data/products';

export default function CategoriaPage() {
  const params = useParams<{ cat: string }>();
  const searchParams = useSearchParams();
  const cat = params?.cat ?? '';
  const rawSubcategory = searchParams.get('sub') ?? '';
  const categoria = useMemo(() => categories.find((c) => c.key === cat), [cat]);
  const subcategories = categoria?.subcategories ?? [];
  const selectedSubcategory = useMemo(() => {
    if (!rawSubcategory || subcategories.length === 0) return '';
    return subcategories.some((sub) => sub.key === rawSubcategory) ? rawSubcategory : '';
  }, [rawSubcategory, subcategories]);
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
    fetchProducts(cat, selectedSubcategory || undefined)
      .then((items) => {
        if (!cancelled) setProductos(items);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cat, categoria, selectedSubcategory]);

  if (!categoria) {
    return <p className="text-neutral-700 text-center">Categoría no encontrada.</p>;
  }

  return (
    <section>
      <h2 className="text-2xl font-extrabold uppercase tracking-wide text-black mb-8 text-center" style={{ letterSpacing: '1px' }}>{categoria.name}</h2>
      {subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6 px-2">
          <Link
            href={`/categoria/${cat}`}
            className={`px-3 py-2 text-sm rounded border ${selectedSubcategory === '' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
          >
            Todos
          </Link>
          {subcategories.map((sub) => (
            <Link
              key={sub.key}
              href={`/categoria/${cat}?sub=${sub.key}`}
              className={`px-3 py-2 text-sm rounded border ${selectedSubcategory === sub.key ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
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
