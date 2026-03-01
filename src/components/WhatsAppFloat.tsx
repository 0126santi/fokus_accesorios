import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/lib/contact';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="fixed bottom-4 right-4 z-50 group inline-flex items-center justify-center bg-transparent p-0 leading-none"
    >
      <span className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        consultar
      </span>
      <span className="block bg-transparent">
      <Image
        src="/ws2.png"
        alt="WhatsApp"
        width={56}
        height={56}
        className="h-14 w-14 object-contain bg-transparent"
        unoptimized
        priority
      />
      </span>
    </a>
  );
}
