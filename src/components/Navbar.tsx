"use client";
import Link from 'next/link';
import { categories } from '../data/categories';

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white overflow-x-auto">
      <div className="mx-auto flex min-w-max items-center gap-2 px-2 py-2 sm:gap-6 sm:px-8 text-xs sm:text-sm font-medium whitespace-nowrap">
        <Link href="/" className="py-2 px-2 sm:px-3 rounded-md hover:bg-gray-100">
          TODO
        </Link>
        {categories.map(category => (
          <Link key={category.key} href={`/categoria/${category.key}`} className="py-2 px-2 sm:px-3 rounded-md hover:bg-gray-100">
            {category.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
