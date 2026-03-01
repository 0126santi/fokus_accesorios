"use client";
import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartQuantity, clearCart, CartItem } from '../../lib/cart';
import { formatCurrency } from '../../lib/currency';
import { WHATSAPP_NUMBER } from '../../lib/contact';
import Image from 'next/image';

export default function CarritoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantity = (id: string, qty: number) => {
    updateCartQuantity(id, qty);
    setCart(getCart());
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="w-full max-w-4xl mx-auto px-2 sm:px-0">
  <h2 className="text-2xl font-extrabold uppercase tracking-wide text-black mb-8" style={{ letterSpacing: '1px' }}>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p className="text-neutral-700 text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tabla de productos */}
          <div>
            <div className="sm:hidden">
              <div className="grid grid-cols-3 items-center px-2 mb-3 text-xs font-bold text-neutral-700">
                <span className="text-center">PRECIO</span>
                <span className="text-center">CANTIDAD</span>
                <span className="text-center">SUBTOTAL</span>
              </div>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={`${item.id}-mobile`} className="rounded-lg bg-white border px-2 py-3" style={{ borderColor: '#e5e7eb' }}>
                    <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: '#f0f0f0' }}>
                      <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500 text-lg font-bold">×</button>
                      <Image src={item.image} alt={item.name} width={60} height={60} className="rounded object-cover w-16 h-16" />
                      <span className="font-medium text-neutral-900 text-sm whitespace-pre-line leading-snug">{item.name}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-3 w-full pt-3 px-1">
                      <div className="font-semibold text-neutral-900 text-center whitespace-nowrap">{formatCurrency(item.price)}</div>
                      <div className="flex justify-center">
                        <div className="flex items-center border rounded bg-white min-w-[92px] justify-between" style={{ borderColor: '#294A2D' }}>
                          <button onClick={() => handleQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg font-bold text-gray-700">-</button>
                          <span className="px-2 py-1 text-base font-medium text-neutral-900">{item.quantity}</span>
                          <button onClick={() => handleQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg font-bold text-gray-700">+</button>
                        </div>
                      </div>
                      <div className="font-semibold text-neutral-900 text-center whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <table className="hidden sm:table w-full text-left border-separate border-spacing-y-2 table-fixed">
              <thead>
                <tr className="text-xs font-bold text-neutral-700 border-b">
                  <th className="pb-2 px-2 w-2/5">PRODUCTO</th>
                  <th className="pb-2 px-2 w-1/5 text-center">PRECIO</th>
                  <th className="pb-2 px-2 w-1/5 text-center">CANTIDAD</th>
                  <th className="pb-2 px-2 w-1/5 text-center">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="align-middle">
                    <td className="flex items-center gap-3 py-2 sm:flex-row flex-col sm:items-center items-start">
                      <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500 text-lg font-bold">×</button>
                      <Image src={item.image} alt={item.name} width={60} height={60} className="rounded object-cover w-16 h-16" />
                      <span className="font-medium text-neutral-900 text-sm whitespace-pre-line">{item.name}</span>
                    </td>
                    <td className="font-semibold text-neutral-900 text-center align-middle px-2 py-2 whitespace-nowrap">
                      <div className="mb-0">{formatCurrency(item.price)}</div>
                    </td>
                    <td className="sm:align-middle align-top sm:py-0 py-2 sm:mb-0 mb-3">
                      <div className="block sm:inline mb-2 sm:mb-0">
                        <div className="flex items-center border rounded w-fit mx-auto relative z-10 bg-white sm:mr-0 mr-12 min-w-[84px]" style={{ borderColor: '#294A2D' }}>
                          <button onClick={() => handleQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg font-bold text-gray-700">-</button>
                          <span className="px-3 py-1 text-base font-medium text-neutral-900 dark:text-black">{item.quantity}</span>
                          <button onClick={() => handleQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg font-bold text-gray-700">+</button>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-neutral-900 text-center align-middle px-2 py-2 whitespace-nowrap">
                      <div className="mb-0">{formatCurrency(item.price * item.quantity)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col gap-2 mt-6">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-2 rounded font-medium transition"
                    style={{ background: '#000000', color: '#ffffff' }}
                  >← SEGUIR COMPRANDO</button>
                  <button
                    onClick={() => { clearCart(); setCart([]); }}
                    className="px-6 py-2 rounded font-medium transition"
                    style={{ background: '#000000', color: '#ffffff' }}
                  >Vaciar carrito</button>
            </div>
          </div>
          {/* Totales */}
          <div className="bg-neutral-50 rounded-xl p-6 border flex flex-col gap-4" style={{ borderColor: '#294A2D' }}>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">TOTALES DEL CARRITO</h3>
            <div className="flex justify-between text-neutral-700 text-base">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-neutral-900 text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <button
              className="mt-4 px-6 py-3 rounded font-medium transition bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              onClick={() => {
                if (!cart || cart.length === 0) return;
                const mensaje = encodeURIComponent(
                  "Hola le escribo desde la pagina web, quiero comprar:\n" +
                  cart.map(p => `- ${p.name} (${p.quantity} unidades) - ${formatCurrency(p.price * p.quantity)}`).join('\n') +
                  `\nTotal: ${formatCurrency(subtotal)}`
                );
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
              }}
            >
              <Image src="/ws1.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5 object-contain" />
              <span>FINALIZAR COMPRA POR WHATSAPP</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
