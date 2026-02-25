import React from 'react';
import { Product } from '../data/products';

import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/productsApi';
import { useRouter } from 'next/navigation';

export default function SearchBar({ value, onChange, onSelect, autoFocus }: { value: string; onChange: (v: string) => void; onSelect?: (p: Product) => void; autoFocus?: boolean }) {
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cargar todos los productos al montar el componente
    fetchProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    if (value.length > 1) {
      setResults(
        allProducts.filter(p =>
          p.name.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [value, allProducts]);

  const handleSelect = (product: Product) => {
    setShowResults(false);
    onChange('');
    if (onSelect) {
      onSelect(product);
    }
    // Redirige a la categoría y desplaza al producto
    router.push(`/categoria/${product.category}#product-${product.id}`);
  };

  return (
    <div className="relative w-[min(18rem,calc(100vw-4rem))] sm:w-72">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring focus:border-black"
        autoComplete="off"
        autoFocus={autoFocus}
      />
      {showResults && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-10 bg-white border border-gray-200 rounded shadow mt-1 max-h-60 overflow-y-auto dark:text-black">
          {results.map(prod => (
            <li
              key={prod.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700"
              onClick={() => handleSelect(prod)}
            >
              {prod.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
