# NODO: Your Automation Hub

Construye la base completa de la plataforma web SaaS NODO según esta especificación. Activa Lovable Cloud/Supabase primero para auth, base de datos, storage y RLS. No construyas aún el wizard de solicitudes, marketplace, academia funcional, pagos ni panel admin: deja sus rutas preparadas.

Stack requerido: React + TypeScript + Vite, Tailwind CSS + shadcn/ui, Supabase Auth/DB/storage/RLS, react-i18next, lucide-react exclusivamente para iconos, react-router-dom.

Diseño premium minimalista/editorial. Sin gradientes chillones, glassmorphism ni imágenes stock. Mucho blanco, bordes finos y tipografía protagonista. Define TODOS los colores como tokens semánticos HSL en index.css y mapéalos en tailwind.config.ts; jamás hex directo en componentes.
Tokens light: bg #FAFAF8, surface #FFFFFF, surface-muted #F4F3EF, border #E6E4DE, ink #0F1115, ink-muted #5C5F66, primary #2E2A72, primary-foreground #FFFFFF, accent #C9A227, success #2F7D62, warning #B87514, danger #B3261E. Dark: bg #0E0F12, surface #16181D, surface-muted #1D2027, border #2A2D35, ink #F2F2F0, ink-muted #9BA0A8, primary #8B85FF, accent #E0BC5B; define también foregrounds/variantes necesarios para accesibilidad.
Google Fonts: Instrument Serif para h1/h2 grandes de páginas públicas exclusivamente; Inter cuerpo/UI; JetBrains Mono para datos/precios/IDs/timers con tabular figures. Escala 12/14/16/18/20/24/32/48/64, cuerpo min 16px, párrafos 1.6, max 70ch. Espaciado múltiplos 4 y ritmo 24/48/96; radios 8 inputs,12 cards,16 modal,999 pills. max-w-6xl. Animaciones 150-300ms transform/opacity, reduced motion. Estados completos y focus ring visible; contraste 4.5:1.

I18n: configura src/locales/es.json y src/locales/en.json; español por defecto; absolutamente todos los textos visibles deben venir de traducciones, sin strings UI hardcodeadas. Toggle ES/EN en header y footer; persistencia localStorage.

Auth / DB: email+password. Crea enum app_role ('client','expert','admin'); profiles con id uuid PK/FK auth.users, full_name, avatar_url, company_name, phone, country, preferred_language, created_at; user_roles con id, user_id FK, role app_role, created_at; plans con datos de seed. Implementa función has_role(_user_id uuid, _role app_role) SECURITY DEFINER para RLS. Rol jamás en profiles ni confiado desde token cliente. RLS todas las tablas: usuarios solo leen/escriben sus filas; admin lee todo. Al registro elegir cliente o experto y guardar rol, experto pendiente solo en comportamiento visual/guardado, sin flujo de aprobación. Diseña triggers/funciones de alta de forma segura. No permitir escalación de privilegios. Si la autogeneración de perfil/rol precisa edge function o RPC seguro, hazlo. Seeds planes: Starter 349000 COP/mes, 1 activa,1 solicitud/mes, email, academia básica. Growth 990000, 3 activas,3 solicitudes, prioritario, academia completa,10% expertos. Enterprise precio a convenir, ilimitadas, experto asignado,SLA, capacitación, integraciones medida.

Rutas: / landing, /precios extendida comparativa, /como-funciona larga con diagrama de estados, /login, /registro, /app dashboard protegido. Preparar rutas placeholder para automatización, expertos, academia, precios. /app/* requiere sesión -> /login; sesión visitando /login o /registro -> /app.

Landing: header sticky translúcido logo tipográfico "Nodo", nav Automatización/Expertos/Academia/Precios, idioma, tema, iniciar sesión, CTA. Hero exacto ES: “Automatiza lo que hoy te consume el día”, EN “Automate the work that eats your day”; texto plataforma analiza proceso con IA y entrega automatización funcionando; CTA y enlace Ver cómo funciona; composición tipográfica y SVG minimalista de nodos conectados. Cómo funciona 4 pasos: Cuéntanos tu proceso, Recibes una cotización automática, Construimos la automatización, La recibes funcionando y documentada. Bento asimétrico 3 módulos: Automatización a la medida, Contrata expertos, Academia de IA aplicada. Casos por industria: ventas y CRM, atención cliente, facturación, marketing y contenido, operaciones e inventario, reportes de datos. Precios 3 planes con mensual/anual y descuento anual 20%; COP separador miles y toggle USD tasa fija claramente simulada. FAQ accordion 6. CTA final y footer enlaces/idioma/redes.

Login/registro: limpios, validación on blur, error bajo campo, mostrar contraseña, selector tipo cuenta. App: sidebar layout, en móvil navegación inferior, header avatar/menú, estado vacío “Aún no tienes automatizaciones” con CTA. Skeletons >300ms y empty states útiles.

Estructura src/components/ui, layout, marketing, pages, hooks, services, lib, locales. Comenta en español solo decisiones no obvias. Mobile-first 375/768/1024/1440, no horizontal overflow, touch targets >=44. Haz una experiencia cohesionada y revisa que compile.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nodo-automations-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f102268d-5e0e-4ee1-a3d6-26c739b81044).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
