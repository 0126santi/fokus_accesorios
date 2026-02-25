import { categories } from '../data/categories';
import React from 'react';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-lg font-extrabold uppercase tracking-wide text-black" style={{ letterSpacing: '1px' }}>Categorías</span>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">×</button>
      </div>
      <ul className="p-6 flex flex-col gap-0">
        {categories.map((cat, idx) => (
          <React.Fragment key={cat.key}>
            <li>
              <a href={`/categoria/${cat.key}`} className="text-gray-700 hover:text-black font-medium block py-3">
                {cat.name}
              </a>
            </li>
            {idx < categories.length - 1 && <hr className="border-t border-gray-200 my-0" />}
          </React.Fragment>
        ))}

        <hr className="border-t border-gray-200 my-2" />
        <li className="pt-2 pb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">Redes sociales</li>
        <li>
          <a
            href="https://www.instagram.com/fokus_accesorios?igsh=MWRwNHZha2YweHlveA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black font-medium block py-2"
          >
            Instagram
          </a>
        </li>
      </ul>
    </aside>
  );
}
