import { PageHeader, EmptyState } from "@/components/dashboard/ui-primitives";
import { CreditCard, Zap, ShieldCheck } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader 
        title="Facturación y Plan" 
        description="Gestiona tu suscripción, métodos de pago e historial."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-8 rounded-3xl bg-zs-bg-secondary/20 backdrop-blur-3xl border border-zs-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
             <Zap className="w-12 h-12 text-zs-blue/20 group-hover:text-zs-blue/40 transition-colors" />
          </div>
          <h2 className="text-[10px] font-black text-zs-blue uppercase tracking-[0.2em] mb-2">Plan Actual</h2>
          <h3 className="text-3xl font-black text-white italic uppercase mb-1">PRO BUNDLE</h3>
          <p className="text-xs text-zs-text-secondary mb-8">Activado el 1 de Marzo, 2024</p>
          
          <ul className="space-y-3 mb-8">
            {["Usuarios ilimitados", "Proyectos Canvas 4K", "Soporte Prioritario", "API Access"].map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/80">
                <ShieldCheck className="w-4 h-4 text-zs-emerald" />
                {f}
              </li>
            ))}
          </ul>

          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
            Gestionar Suscripción (Stripe)
          </button>
        </section>

        <section className="space-y-6">
          <div className="p-8 rounded-3xl bg-zs-bg-secondary/40 border border-zs-border">
            <h2 className="text-sm font-black text-zs-text-muted uppercase tracking-widest mb-6">Método de Pago</h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-zs-border/50">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-7 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white">VISA</div>
                 <div>
                   <p className="text-sm font-bold text-white">•••• 4242</p>
                   <p className="text-[10px] text-zs-text-muted">Expira 12/26</p>
                 </div>
               </div>
               <button className="text-xs font-bold text-zs-blue uppercase">Editar</button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zs-bg-surface/50 border border-zs-border flex items-center gap-4">
            <div className="p-3 rounded-xl bg-zs-blue/10 text-zs-blue">
               <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Historial de Pagos</p>
              <p className="text-xs text-zs-text-secondary">Descarga tus facturas y recibos.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
