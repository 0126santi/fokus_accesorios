// Estructura base de producto para el ecommerce
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  // Código interno del producto (ej.)
  codigo?: string;
  // Costo interno (para uso administrativo)
  costo?: number;
  image: string;
  category: string;
  user_id?: string;
  soldOut?: boolean;
};

// Ejemplo de productos iniciales (pueden ser reemplazados por el admin)
export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Mesa Minimalista',
    description: 'Mesa de madera clara, diseño moderno.',
    price: 120,
    image: '/images/mesa1.jpg',
    category: 'mesas',
  },
  {
    id: '2',
    name: 'Silla Ergonómica',
    description: 'Silla cómoda para oficina o comedor.',
    price: 60,
    image: '/images/silla1.jpg',
    category: 'sillas',
  },
  {
    id: '3',
    name: 'Escritorio Compacto',
    description: 'Escritorio pequeño para espacios reducidos.',
    price: 150,
    image: '/images/escritorio1.jpg',
    category: 'escritorios',
  },
  {
    id: '4',
    name: 'Estantería Modular',
    description: 'Estantería adaptable a cualquier ambiente.',
    price: 90,
    image: '/images/estanteria1.jpg',
    category: 'estanterias',
  },
  {
    id: '5',
    name: 'Lámpara LED',
    description: 'Accesorio de iluminación eficiente.',
    price: 35,
    image: '/images/lampara1.jpg',
    category: 'accesorios',
  },
];
