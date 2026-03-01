"use client";
import { Product } from '../data/products';
import { addToCart } from '../lib/cart';
import { formatCurrency } from '../lib/currency';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Portal from './Portal';

export default function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);
  const router = useRouter();

  const handleAdd = () => {
    addToCart(product);
    router.push('/carrito');
  };

  const handleModalAdd = () => {
    addToCart(product, modalQty);
    setShowModal(false);
    setModalQty(1);
    router.push('/carrito');
  };

  useEffect(() => {
    if (showModal) {
      try { document.body.style.overflow = 'hidden'; } catch {}
    } else {
      try { document.body.style.overflow = ''; } catch {}
    }
    return () => { try { document.body.style.overflow = ''; } catch {} };
  }, [showModal]);

  return (
    <>
      <div
        id={`product-${product.id}`}
        className="group relative flex flex-col w-full bg-white overflow-hidden m-2 font-instrument"
      >
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="relative w-full aspect-square bg-neutral-50 cursor-pointer"
          aria-label={`Ver detalle de ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="p-2"
          />
        </button>
        <div className="p-4 transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-sm font-normal leading-snug">{product.name}</h3>
          <p className="text-sm font-bold text-gray-700">{formatCurrency(product.price)}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="bg-white text-black py-3 w-full border border-black cursor-pointer"
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      {showModal && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-100 bg-opacity-90" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl" onClick={() => setShowModal(false)}>&times;</button>
              <Image src={product.image} alt={product.name} width={400} height={300} className="rounded object-cover w-full h-64 mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">{product.name}</h2>
              <p className="text-neutral-700 mb-2" style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-xl text-neutral-900">{formatCurrency(product.price)}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setModalQty(q => Math.max(1, q - 1))} className="px-2 py-1 rounded bg-neutral-200 text-lg dark:text-black">-</button>
                  <span className="px-3 py-1 text-base font-medium text-neutral-900 border rounded" style={{ borderColor: '#294A2D' }}>{modalQty}</span>
                  <button onClick={() => setModalQty(q => q + 1)} className="px-2 py-1 rounded bg-neutral-200 text-lg dark:text-black">+</button>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); handleModalAdd(); }}
                className="w-full py-3 rounded font-medium transition"
                style={{ background: '#000000', color: '#ffffff' }}
              >Agregar al carrito</button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
