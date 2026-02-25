"use client";
import Link from 'next/link';
import { categories } from '../data/categories';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center py-2 px-4 sm:px-8 border-b w-full bg-white">
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="py-2 px-3 rounded-md hover:bg-gray-100">
          TODO
        </Link>
        {categories.map(category => (
          <Link key={category.key} href={`/categoria/${category.key}`} className="py-2 px-3 rounded-md hover:bg-gray-100">
            {category.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
