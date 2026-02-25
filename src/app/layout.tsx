import type { Metadata } from 'next';
import { Inter, Instrument_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Fokus Accesorios',
  description: 'Fokus Accesorios: Relojes, Collares, Lentes, Billeteras, Pulseras, Anillos, Aretes y Sombreros.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${instrumentSans.variable} font-sans bg-white text-gray-900 min-h-screen`}>
        <Header />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
