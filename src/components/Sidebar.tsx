import { categories } from '../data/categories';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib/contact';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const socialItems = [
    { key: 'facebook', label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FaFacebookF },
    { key: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: FaInstagram },
    { key: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: FaTiktok },
    { key: 'whatsapp', label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp, Icon: FaWhatsapp },
  ] as const;

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
        <li className="py-2">
          <div className="flex items-center gap-6 text-black">
            {socialItems.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${label}`}
                className="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70"
              >
                <Icon size={30} />
              </a>
            ))}
          </div>
        </li>
      </ul>
    </aside>
  );
}
