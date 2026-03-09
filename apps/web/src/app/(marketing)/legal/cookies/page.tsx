import React from "react";
import { Cookie, Info, Settings, MousePointer2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Zona Sur Tech",
  description: "Uso de cookies técnicas y persistencia de sesión en Zona Sur Tech.",
};

export default function CookiesPage() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-8 bg-zs-bg-primary min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zs-cyan/10 border border-zs-cyan/20 text-zs-cyan mb-6">
            <Cookie className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Preferencia de Persistencia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
            Uso de <span className="text-zs-cyan">Cookies</span>
          </h1>
          <p className="text-zs-text-secondary text-lg leading-relaxed">
            Utilizamos tecnologías de almacenamiento local para que tu experiencia en el dashboard sea fluida y segura. 
            Sin estas "cookies" técnicas, el acceso al Kernel sería imposible de mantener.
          </p>
        </div>

        <div className="grid gap-12 text-zs-text-secondary leading-relaxed">
          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-blue/10 flex items-center justify-center text-zs-blue">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">1. Cookies Esenciales</h2>
            </div>
            <p className="mb-4">
              Estas cookies son críticas para la seguridad. Gestionan tu sesión de autenticación y previenen ataques de 
              falsificación de solicitudes (CSRF). No pueden desactivarse si deseas utilizar la plataforma.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-cyan/10 flex items-center justify-center text-zs-cyan">
                <MousePointer2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">2. Experiencia de Usuario</h2>
            </div>
            <p className="mb-4">
              Almacenamos temporalmente tus preferencias de interfaz, como el modo oscuro/claro y la configuración 
              de los widgets del dashboard, para que no tengas que reconfigurarlos en cada sesión.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-violet/10 flex items-center justify-center text-zs-violet">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">3. Telemetría de Rendimiento</h2>
            </div>
            <p className="mb-4">
              Utilizamos cookies anónimas para entender cómo interactúas con nuestra infraestructura. Esto nos ayuda a 
              optimizar las rutas de red y reducir los tiempos de respuesta del sistema a nivel global.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-zs-border text-center">
          <p className="text-sm text-zs-text-muted italic">
            Configuración de Cookies. Zona Sur Tech Protocol.
          </p>
        </div>
      </div>
    </main>
  );
}
