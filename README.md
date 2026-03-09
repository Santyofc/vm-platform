# 🚀 VM Platform (SaaS Engine)

![Next.js](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)

**VM Platform** es una arquitectura SaaS B2B de alto rendimiento, diseñada con una estética **"hacker-tech"** (minimalista, de alto contraste y orientada al desarrollador/power user). El proyecto está construido como un **monorepo** para garantizar la extrema escalabilidad, reutilización de código y separación estricta de responsabilidades.

Desarrollado bajo la identidad de **Zona Sur Tech**, este motor incluye desde autenticación robusta hasta multi-tenancy y flujos de monetización listos para producción.

---

## 🏗️ Arquitectura del Monorepo

El proyecto utiliza **Turborepo** y **pnpm workspaces** para gestionar múltiples paquetes y aplicaciones de forma eficiente.

```text
vm-platform/
├── apps/
│   └── web/           # Aplicación principal Next.js 14 (App Router)
├── packages/
│   ├── auth/          # Lógica de autenticación (Supabase/NextAuth)
│   ├── db/            # Capa de base de datos (PostgreSQL + Drizzle ORM)
│   ├── email/         # Proveedor de correos transaccionales (Resend)
│   ├── monitoring/    # Sistema de observabilidad y logging estructurado
│   ├── platform/      # Core logic, suscripciones y utilidades SaaS
│   ├── ui/            # ZS Design System (TailwindCSS + Framer Motion)
│   └── ui-experiments/# Sandboxes y prototipos visuales
└── supabase/          # Configuración local de Supabase y migraciones
```

## ⚡ Stack Tecnológico (Zero-Leak Policy)

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components by default).
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto, sin `any`).
*   **Base de Datos**: PostgreSQL vía [Supabase](https://supabase.com/).
*   **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (Type-safe SQL).
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Sistema de tokens propio `zs-*`).
*   **Animaciones**: [Framer Motion](https://www.framer.com/motion/) (Optimizadas con Intersection Observer).
*   **Pagos**: [Stripe](https://stripe.com/).
*   **Gestor de Paquetes**: [pnpm](https://pnpm.io/).

---

## 🚀 Características Clave (SaaS Foundations)

- 🏢 **Multi-Tenancy**: Sistema avanzado de Organizaciones y Workspaces.
- 🔐 **Autenticación Segura**: Flujos de registro, login y recuperación vía Supabase Auth.
- 💳 **Monetización Integrada**: Webhooks y flujos de suscripción con Stripe.
- 🎨 **ZS Design System**: Componentes UI altamente iterativos, con soporte nativo para dark mode, glassmorphism (`shadow-zs-glow-blue`) y animaciones fluidas.
- 🛠️ **Hacker Terminal**: Interfaz de línea de comandos simulada e hiper-realista para interacciones avanzadas (AI powered).

---

## 💻 Desarrollo Local

### Prerrequisitos
- Node.js (v20+)
- pnpm (v9+)
- Docker (Obligatorio para Supabase local)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Santyofc/vm-platform.git
    cd vm-platform
    ```

2.  **Instalar dependencias**:
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno**:
    Copia el archivo `.env.example` en la raíz y en `apps/web` a `.env.local` e ingresa tus credenciales.
    ```bash
    cp .env.example .env.local
    ```

4.  **Iniciar Infraestructura (Supabase Local)**:
    Esto levantará una instancia completa de PostgreSQL, Auth y Storage en Docker.
    ```bash
    pnpm supabase:start
    ```

5.  **Correr Migraciones**:
    Aplica el esquema de la base de datos a tu instancia local.
    ```bash
    pnpm --filter db db:push
    ```

6.  **Iniciar Servidor de Desarrollo**:
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

---

## 🛡️ Principios de Código (The Zona Sur Tech Way)

1.  **Server-First**: Todo es un `Server Component` por defecto. `use client` se reserva estricta y únicamente para interactividad en las hojas del árbol.
2.  **Type Safety**: El compilador es la primera línea de defensa.
3.  **Performance Absoluta**: Animaciones y canvas pausados fuera del viewport. Suscripciones a eventos centralizadas (sin memory leaks de `window.addEventListener`).
4.  **Estética Atrevida**: Sin colores hexadecimales quemados. Uso mandatorio del sistema de tokens `zs-*` (ej. `bg-zs-bg-primary`).

---

## 📄 Licencia

Propiedad de **Zona Sur Tech**. Todos los derechos reservados.
