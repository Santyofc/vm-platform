import React from "react";
import { 
  Terminal, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Zap,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar
} from "lucide-react";
import { requireSuperAdmin } from "@repo/auth";
import { createClient } from "@supabase/supabase-js";
import { AdminSearch } from "../components/AdminSearch";

// Internal admin client
function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("[FATAL] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

interface PageProps {
  searchParams: { q?: string };
}

export default async function AdminActivityPage({ searchParams }: PageProps) {
  // 1. Authorization Gate
  await requireSuperAdmin();

  const query = searchParams.q || "";

  // 2. Data Fetching (Global Activity Logs)
  const supabase = createAdminClient();
  
  let dbQuery = supabase
    .from("org_activity_logs")
    .select(`
      id,
      event_type,
      metadata,
      created_at,
      user_id,
      organization_id,
      organizations (name)
    `);

  if (query) {
    // Attempt to filter by event type or organization name
    dbQuery = dbQuery.or(`event_type.ilike.%${query}%, metadata->>name.ilike.%${query}%`);
  }

  const { data: logs, error } = await dbQuery
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] zs-card border-zs-red/20 bg-zs-red/5">
            <Terminal className="w-12 h-12 text-zs-red mb-4" />
            <h2 className="text-xl font-black text-white uppercase italic">Telemetry Buffer Overflow</h2>
            <p className="text-zs-text-secondary mt-2 font-mono text-sm">Error: {error.message}</p>
        </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
            Global <span className="text-zs-violet">Activity</span>
          </h1>
          <p className="text-zs-text-secondary text-base font-medium max-w-xl">
            Audit trail centralizado. Monitorea cada mutación, acceso y evento crítico 
            dentro del Kernel de Zona Sur Tech.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="zs-btn-brand px-6 py-3 rounded-xl flex items-center gap-2 text-xs uppercase tracking-widest font-black">
                Dump Payload
                <Download className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Live Feed Control */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-zs-bg-secondary/30 p-4 rounded-2xl border border-zs-border/50 backdrop-blur-3xl">
          <AdminSearch placeholder="grep --filter logs..." />
          <div className="flex items-center gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zs-border bg-zs-bg-primary/50 text-zs-text-secondary hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                <Calendar className="w-4 h-4" />
                Date Range
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zs-border bg-zs-bg-primary/50 text-zs-text-secondary hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                <AlertCircle className="w-4 h-4" />
                Critical Only
              </button>
          </div>
      </div>

      {/* Logs Interface */}
      <div className="zs-card overflow-hidden border-zs-border/50">
        <div className="p-6 border-b border-zs-border bg-zs-bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-zs-violet animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Real-time Stream</span>
                </div>
                <span className="text-zs-border">|</span>
                <span className="text-[10px] font-black text-zs-text-muted uppercase tracking-widest">Buffer Size: 50 Events</span>
            </div>
            <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-zs-cyan" />
                <span className="text-[10px] font-black text-zs-cyan uppercase tracking-widest">Kernel v4.2.0 Connected</span>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zs-border bg-zs-bg-secondary/20">
                <th className="px-6 py-4 text-[10px] font-black text-zs-text-secondary uppercase tracking-[0.2em] w-48">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-zs-text-secondary uppercase tracking-[0.2em] w-64">Event Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-zs-text-secondary uppercase tracking-[0.2em]">Context (Org/User)</th>
                <th className="px-6 py-4 text-[10px] font-black text-zs-text-secondary uppercase tracking-[0.2em]">Payload Snippet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zs-border/50 font-mono">
              {logs.map((log: any) => (
                <tr key={log.id} className="group hover:bg-zs-violet/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] text-zs-text-muted">
                        <Clock className="w-3 h-3" />
                        {new Date(log.created_at).toLocaleTimeString()}
                        <span className="opacity-50">/ {new Date(log.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        {getEventIcon(log.event_type)}
                        <span className={`text-[11px] font-black uppercase tracking-widest ${getEventColor(log.event_type)}`}>
                            {log.event_type.replace(/_/g, ' ')}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-white font-bold">
                            <Building2 className="w-3 h-3 text-zs-text-muted" />
                            {log.organizations?.name || "Global / System"}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zs-text-muted">
                            <Users className="w-3 h-3" />
                            {log.user_id.substring(0, 8)}...
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-zs-text-secondary truncate max-w-[400px] bg-zs-bg-secondary/50 px-2 py-1 rounded border border-zs-border group-hover:border-zs-violet/30 transition-colors">
                        {JSON.stringify(log.metadata)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-zs-border bg-zs-bg-secondary/30 flex items-center justify-between">
            <button className="text-[10px] font-black uppercase text-zs-text-muted hover:text-white transition-colors flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous Sequence
            </button>
            <div className="flex items-center gap-4">
                 <span className="text-[10px] font-mono text-zs-violet">PAGE_STATUS_OK</span>
                 <div className="w-24 h-1 bg-zs-bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-zs-violet w-1/3" />
                 </div>
            </div>
            <button className="text-[10px] font-black uppercase text-zs-text-muted hover:text-white transition-colors flex items-center gap-2">
                Next Sequence
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
}

function getEventIcon(type: string) {
    if (type.includes('create')) return <CheckCircle2 className="w-3.5 h-3.5 text-zs-emerald" />;
    if (type.includes('delete') || type.includes('remove')) return <AlertCircle className="w-3.5 h-3.5 text-zs-red" />;
    if (type.includes('update')) return <Zap className="w-3.5 h-3.5 text-zs-cyan" />;
    return <Info className="w-3.5 h-3.5 text-zs-blue" />;
}

function getEventColor(type: string) {
    if (type.includes('create')) return "text-zs-emerald";
    if (type.includes('delete') || type.includes('remove')) return "text-zs-red";
    if (type.includes('update')) return "text-zs-cyan";
    return "text-zs-blue";
}
