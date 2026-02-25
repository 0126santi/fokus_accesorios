"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import { Search, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll down
      setVisible(false);
    } else {
      // Scroll up
      setVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current) return;
      if (searchRef.current.contains(event.target as Node)) return;
      setSearchOpen(false);
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-2 border-b border-white/10 w-full bg-black transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white" style={{ fontFamily: 'monospace' }}>
            <Image src="/logo.jpg" alt="Logo Fokus Accesorios" width={48} height={48} className="rounded-sm object-cover" priority />
            FOKUS ACCESORIOS
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={searchRef}>
            <button
              className="p-2 rounded-md text-white hover:bg-white/10"
              aria-label="Buscar"
              aria-expanded={searchOpen}
              aria-controls="header-search"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Search size={24} />
            </button>
            <div
              id="header-search"
              className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 z-50 transition-all duration-200 origin-right ${searchOpen ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' : 'opacity-0 scale-95 translate-x-2 pointer-events-none'}`}
            >
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSelect={() => setSearchOpen(false)}
                autoFocus={searchOpen}
              />
            </div>
          </div>
          <Link href="/carrito" className="p-2 rounded-md text-white hover:bg-white/10" aria-label="Carrito">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </header>
      <div className="pt-16"></div> {/* Add padding to the top of the content to avoid being overlapped by the fixed header */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
