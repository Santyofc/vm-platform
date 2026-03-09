import React from "react";
import { Shield, Lock, Eye, Server } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protocolo de Privacidad | Zona Sur Tech",
  description: "Tratamiento de datos y soberanía de identidad en la infraestructura de Zona Sur Tech.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-8 bg-zs-bg-primary min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zs-blue/10 border border-zs-blue/20 text-zs-blue mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Protocolo de Seguridad</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
            Política de <span className="text-zs-blue">Privacidad</span>
          </h1>
          <p className="text-zs-text-secondary text-lg leading-relaxed">
            En Zona Sur Tech, la soberanía de los datos no es una opción, es un requerimiento arquitectónico. 
            Este documento detalla cómo ciframos, procesamos y protegemos la información dentro de nuestra malla global.
          </p>
        </div>

        <div className="grid gap-12 text-zs-text-secondary leading-relaxed">
          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-blue/10 flex items-center justify-center text-zs-blue">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">1. Recolección de Telemetría</h2>
            </div>
            <p className="mb-4">
              Recopilamos únicamente los datos necesarios para garantizar la estabilidad del Kernel y la seguridad de las sesiones. 
              Esto incluye identificadores de nodo, logs de acceso cifrados y métricas de rendimiento del sistema.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-cyan/10 flex items-center justify-center text-zs-cyan">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">2. Procesamiento Atómico</h2>
            </div>
            <p className="mb-4">
              Sus datos son procesados en entornos aislados. No vendemos, intercambiamos ni distribuimos su información a terceros. 
              La infraestructura de Zona Sur Tech está diseñada para que el acceso sea exclusivamente del operador autorizado.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zs-violet/10 flex items-center justify-center text-zs-violet">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">3. Derechos del Operador</h2>
            </div>
            <p className="mb-4">
              Usted mantiene el control total sobre su identidad digital. En cualquier momento puede solicitar la purga completa de sus nodos 
              y la revocación de todas las claves de acceso de nuestra base de datos activa.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-zs-border text-center">
          <p className="text-sm text-zs-text-muted italic">
            Última actualización del Protocolo: Marzo 2026. Zona Sur Tech Infrastructure.
          </p>
        </div>
      </div>
    </main>
  );
}
