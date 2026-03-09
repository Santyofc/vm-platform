import React from "react";
import { FileText, Zap, ShieldAlert, Scale } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | Zona Sur Tech",
  description: "Acuerdo de nivel de servicio y términos de uso de la infraestructura Zona Sur Tech.",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-8 bg-zs-bg-primary min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zs-violet/10 border border-zs-violet/20 text-zs-violet mb-6">
            <Scale className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Acuerdo Legal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
            Términos de <span className="text-zs-violet">Uso</span>
          </h1>
          <p className="text-zs-text-secondary text-lg leading-relaxed">
            El acceso a la infraestructura de Zona Sur Tech implica la aceptación total de estos protocolos de operación. 
            Operamos bajo un modelo de responsabilidad compartida para garantizar la integridad de la red.
          </p>
        </div>

        <div className="grid gap-12 text-zs-text-secondary leading-relaxed">
          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-blue/10 flex items-center justify-center text-zs-blue">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">1. Licencia de Infraestructura</h2>
            </div>
            <p className="mb-4">
              Zona Sur Tech concede una licencia limitada, no exclusiva y revocable para utilizar nuestras herramientas de automatización 
              y servicios SaaS siempre que se respeten los límites operativos establecidos en el tier contratado.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-cyan/10 flex items-center justify-center text-zs-cyan">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">2. Uso Aceptable</h2>
            </div>
            <p className="mb-4">
              Queda estrictamente prohibido el uso de la infraestructura para actividades que comprometan la seguridad de otros nodos, 
              ataques de fuerza bruta, o cualquier proceso que viole las leyes internacionales de ciberseguridad.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-red/10 flex items-center justify-center text-zs-red">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">3. Limitación de Responsabilidad</h2>
            </div>
            <p className="mb-4">
              Zona Sur Tech provee la plataforma "tal cual" (as-is). Aunque garantizamos un uptime del 99.9% en nuestros tiers premium, 
              no nos hacemos responsables por pérdidas derivadas de errores de configuración del usuario final.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-zs-border text-center">
          <p className="text-sm text-zs-text-muted italic">
            Última revisión del Acuerdo: Marzo 2026. Zona Sur Tech Systems.
          </p>
        </div>
      </div>
    </main>
  );
}
