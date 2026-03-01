Fokus accesorios (Next.js + Supabase)

Resumen
- Catálogo de productos por categorías, carrito y finalización vía WhatsApp.
- Panel admin con CRUD, carga/corte de imágenes, registro de ventas y reordenamiento por drag-and-drop (persistido con `position`).
- UI con Tailwind; toast promocional persistente; arreglos para iOS/Safari (modal via portal + bloqueo de scroll).

Características
- Navegación por categorías: `src/data/categories.ts` y rutas dinámicas.
- Carrito y envío a WhatsApp: `src/app/carrito/page.tsx`.
- Admin: gestionar productos y ventas, reordenamiento drag-and-drop y búsqueda: `src/app/gestion/page.tsx`.
- API cliente: Supabase (`src/lib/supabaseClient.ts`), productos (`src/lib/productsApi.ts`).
- Estilos: Tailwind CSS (v4), PostCSS plugin oficial.

Tecnologías
- Next.js 15, React 19, TypeScript 5
- Supabase JS v2 (@supabase/supabase-js)
- Tailwind CSS v4 + @tailwindcss/postcss

Requisitos previos
- Node.js 18+ (recomendado 20+)
- Cuenta y proyecto en Supabase

Configuración (local)
1) Instala dependencias:
```pwsh
npm install
```
2) Variables de entorno:
	 - Copia `.env.local.example` a `.env.local` y completa:
		 - `NEXT_PUBLIC_SUPABASE_URL`
		 - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3) Ejecuta en desarrollo:
```pwsh
npm run dev
```
4) Compila para producción (opcional):
```pwsh
npm run build
npm start
```

Scripts
- `npm run dev`: Next dev (Turbopack)
- `npm run build`: Compilación de producción
- `npm start`: Servir build
- `npm run lint`: Linter ESLint

Variables de entorno
- Cliente (expuestas): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Servidor (opcional, no exponer): `SUPABASE_SERVICE_ROLE_KEY`

Notas de datos y orden manual
- La tabla `products` necesita la columna `position integer` para persistir el orden.
- Para subcategorías (ej. lentes), la tabla `products` necesita la columna opcional `subcategory text`.
- Si no existe, créala con SQL:
```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS subcategory text;
```
- Inicializa posiciones con SQL (ejemplo por `id` desc):
```sql
WITH numbered AS (
	SELECT id, ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
	FROM products
)
UPDATE products p
SET position = n.rn
FROM numbered n
WHERE p.id = n.id;
```


