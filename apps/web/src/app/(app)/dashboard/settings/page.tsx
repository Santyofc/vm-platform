import { PageHeader, EmptyState } from "@/components/dashboard/ui-primitives";
import { Settings, Shield, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader 
        title="Configuración" 
        description="Gestiona tus preferencias personales y de seguridad."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="p-8 rounded-3xl bg-zs-bg-secondary/20 backdrop-blur-3xl border border-zs-border">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-zs-blue" />
              Seguridad de la Cuenta
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Autenticación de Dos Factores</p>
                  <p className="text-xs text-zs-text-secondary">Añade una capa extra de seguridad a tu cuenta.</p>
                </div>
                <button className="px-3 py-1.5 bg-zs-bg-surface border border-zs-border rounded-lg text-xs font-bold text-white uppercase tracking-widest opacity-50 cursor-not-allowed">
                  Desactivado
                </button>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Cambiar Contraseña</p>
                  <p className="text-xs text-zs-text-secondary">Actualiza tu clave de acceso periódicamente.</p>
                </div>
                <button className="px-3 py-1.5 bg-zs-blue/10 border border-zs-blue/20 rounded-lg text-xs font-bold text-zs-blue uppercase tracking-widest hover:bg-zs-blue/20 transition-all">
                  Actualizar
                </button>
              </div>
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-zs-bg-secondary/20 backdrop-blur-3xl border border-zs-border">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-zs-violet" />
              Notificaciones
            </h2>
            <EmptyState 
              icon={<Lock className="w-6 h-6" />}
              title="Módulo en Desarrollo"
              description="Las preferencias de notificación estarán disponibles en la próxima actualización."
            />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zs-blue/10 to-zs-violet/10 border border-zs-blue/20">
            <h3 className="text-sm font-bold text-white mb-2 italic uppercase">Protocolo ZST</h3>
            <p className="text-xs text-zs-text-secondary leading-relaxed">
              Toda la gestión de seguridad se procesa a través de túneles cifrados SSL/TLS directamente con la nube de Supabase.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
