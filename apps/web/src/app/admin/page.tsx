import React from "react";
import { 
  Users, 
  Layers, 
  Zap, 
  Activity, 
  TrendingUp, 
  Monitor, 
  Search,
  ArrowUpRight
} from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Welcome Heading */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic italic leading-none mb-3">
            System <span className="text-zs-cyan">Overview</span>
          </h1>
          <p className="text-zs-text-secondary text-base font-medium max-w-xl">
            Bienvenido al Kernel Master. Monitorea la salud global de la red, gestiona nodos 
            y supervisa el crecimiento de la infraestructura Zona Sur Tech.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="zs-input-wrapper min-w-[300px]">
                <Search className="w-4 h-4 text-zs-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                    type="text" 
                    placeholder="Search entities..." 
                    className="zs-input pl-12 h-12"
                />
            </div>
            <button className="zs-btn-brand h-12 px-6 rounded-xl flex items-center gap-2 text-xs uppercase tracking-widest font-black">
                Execute Audit
                <Zap className="w-4 h-4 fill-current" />
            </button>
        </div>
      </div>

      {/* Global Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<Users className="text-zs-blue" />} 
          label="Total Users" 
          value="1,248" 
          trend="+12.5%" 
          color="blue"
        />
        <MetricCard 
          icon={<Layers className="text-zs-cyan" />} 
          label="Organizations" 
          value="84" 
          trend="+5.2%" 
          color="cyan"
        />
        <MetricCard 
          icon={<Zap className="text-zs-emerald" />} 
          label="API Requests" 
          value="24.8M" 
          trend="+18.3%" 
          color="emerald"
        />
        <MetricCard 
          icon={<Activity className="text-zs-violet" />} 
          label="Uptime" 
          value="99.99%" 
          status="online"
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 zs-card p-8 border-zs-border/50 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-zs-blue" />
                    <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Network Traffic</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zs-blue animate-ping" />
                    <span className="text-[10px] font-black text-zs-blue uppercase tracking-widest">Real-time Telemetry</span>
                </div>
            </div>
            
            {/* Visual Placeholder for Chart */}
            <div className="h-[300px] w-full bg-zs-bg-secondary/30 rounded-2xl border border-zs-border/50 flex flex-col items-center justify-center relative group">
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ backgroundImage: 'linear-gradient(var(--color-zs-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-zs-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <TrendingUp className="w-16 h-16 text-zs-blue/20 mb-4 group-hover:scale-110 transition-transform duration-700" />
                <span className="text-xs font-mono text-zs-text-muted uppercase tracking-[0.3em]">Synthesizing Data Streams...</span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zs-border/50 pt-8">
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zs-text-muted uppercase tracking-widest">Peak Load</span>
                    <p className="text-lg font-bold text-white">425 req/s</p>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zs-text-muted uppercase tracking-widest">Latency</span>
                    <p className="text-lg font-bold text-zs-blue">24ms</p>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-zs-text-muted uppercase tracking-widest">Errors</span>
                    <p className="text-lg font-bold text-zs-red">0.02%</p>
                </div>
            </div>
        </div>

        {/* Status Feed */}
        <div className="zs-card p-8 border-zs-border/50 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <Activity className="w-5 h-5 text-zs-violet" />
                <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Recent Events</h2>
            </div>
            
            <div className="flex-1 space-y-6">
                <EventItem 
                    title="User Registered" 
                    desc="New node: alex@dev.null" 
                    time="2m ago" 
                    type="success"
                />
                <EventItem 
                    title="API Limit Exceeded" 
                    desc="Organization: Cyberdyne Systems" 
                    time="15m ago" 
                    type="warning"
                />
                <EventItem 
                    title="Org Created" 
                    desc="Identity: Zero Day Labs" 
                    time="45m ago" 
                    type="success"
                />
                <EventItem 
                    title="Kernel Update" 
                    desc="Patch v4.2.0 deployed" 
                    time="2h ago" 
                    type="info"
                />
            </div>

            <button className="mt-8 w-full py-4 border border-zs-border rounded-xl text-[10px] font-black uppercase text-zs-text-muted hover:border-zs-blue hover:text-white transition-all tracking-[0.3em]">
                View System Logs
            </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, status, color }: any) {
  const colorMap: any = {
    blue: "from-zs-blue/20 to-transparent border-zs-blue/20",
    cyan: "from-zs-cyan/20 to-transparent border-zs-cyan/20",
    emerald: "from-zs-emerald/20 to-transparent border-zs-emerald/20",
    violet: "from-zs-violet/20 to-transparent border-zs-violet/20",
  };

  return (
    <div className={`zs-card p-6 border bg-gradient-to-br ${colorMap[color]} group hover:scale-[1.02] transition-transform duration-500`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-zs-bg-secondary border border-zs-border group-hover:border-zs-${color} transition-colors`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-black text-zs-emerald bg-zs-emerald/10 px-2 py-1 rounded-full border border-zs-emerald/20">
            <TrendingUp size={10} />
            {trend}
          </div>
        )}
        {status === "online" && (
           <div className="flex items-center gap-1.5 text-[10px] font-black text-zs-emerald bg-zs-emerald/10 px-2 py-1 rounded-full border border-zs-emerald/20">
             <div className="w-1.5 h-1.5 rounded-full bg-zs-emerald animate-pulse" />
             LIVE
           </div>
        )}
      </div>
      <div>
        <h3 className="text-[10px] font-black text-zs-text-muted uppercase tracking-[0.2em] mb-1">{label}</h3>
        <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
      </div>
    </div>
  );
}

function EventItem({ title, desc, time, type }: any) {
  const typeColors: any = {
    success: "bg-zs-emerald",
    warning: "bg-zs-amber",
    info: "bg-zs-blue",
    error: "bg-zs-red"
  };

  return (
    <div className="flex gap-4 group cursor-pointer">
        <div className="pt-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${typeColors[type]} shadow-zs-glow-${type}/50 group-hover:scale-150 transition-transform`} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black text-white uppercase tracking-tight truncate">{title}</span>
                <span className="text-[10px] text-zs-text-muted font-bold whitespace-nowrap">{time}</span>
            </div>
            <p className="text-xs text-zs-text-secondary truncate">{desc}</p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-zs-text-muted opacity-0 group-hover:opacity-100 transition-opacity self-center" />
    </div>
  )
}
