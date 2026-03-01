// Estructura de categorías para navegación principal
export type Subcategory = {
  key: string;
  name: string;
};

export type Category = {
  key: string;
  name: string;
  subcategories?: Subcategory[];
};

export const lentesSubcategories: Subcategory[] = [
  { key: 'anti-luz-azul', name: 'Lentes con protección anti luz azul' },
  { key: 'fotocromaticos', name: 'Lentes fotocromáticos' },
  { key: 'sol', name: 'Lentes de sol' },
  { key: 'motorizados', name: 'Lentes para motorizados' },
];

export const categories: Category[] = [
  { key: 'relojes', name: 'Relojes' },
  { key: 'collares', name: 'Collares' },
  { key: 'lentes', name: 'Lentes', subcategories: lentesSubcategories },
  { key: 'billeteras', name: 'Billeteras' },
  { key: 'pulseras', name: 'Pulseras' },
  { key: 'anillos', name: 'Anillos' },
  { key: 'aretes', name: 'Aretes' },
  { key: 'sombreros', name: 'Sombreros' },
];
