"use client";

import React, { useEffect, useState } from "react";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Info,
  Building2,
  Users
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Log {
  id: string;
  action: string;
  metadata: any;
  created_at: string;
  actor_id: string;
  organization_id: string;
  organizations?: { name: string };
}

export function RealTimeLogs({ initialLogs }: { initialLogs: Log[] }) {
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-logs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "org_activity_logs",
        },
        async (payload) => {
          const newLog = payload.new as Log;
          
          // Fetch organization name for the new log
          if (newLog.organization_id) {
              const { data: orgData } = await supabase
                .from("organizations")
                .select("name")
                .eq("id", newLog.organization_id)
                .single();
              
              if (orgData) {
                  newLog.organizations = { name: orgData.name };
              }
          }

          setLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (logs.length === 0) {
      return (
          <div className="py-20 text-center text-zs-text-muted font-mono text-xs uppercase tracking-[0.3em]">
              Waiting for data stream...
          </div>
      )
  }

  return (
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
          {logs.map((log) => (
            <tr key={log.id} className="group hover:bg-zs-violet/5 transition-colors animate-in fade-in slide-in-from-top-2 duration-500">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-[10px] text-zs-text-muted">
                    <Clock className="w-3 h-3" />
                    {new Date(log.created_at).toLocaleTimeString()}
                    <span className="opacity-50">/ {new Date(log.created_at).toLocaleDateString()}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    {getEventIcon(log.action)}
                    <span className={`text-[11px] font-black uppercase tracking-widest ${getEventColor(log.action)}`}>
                        {(log.action || 'unknown').replace(/_/g, ' ')}
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
                        {(log.actor_id || 'unknown').substring(0, 8)}...
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
  );
}

function getEventIcon(type: string) {
    if (!type) return <Info className="w-3.5 h-3.5 text-zs-blue" />;
    if (type.includes('create')) return <CheckCircle2 className="w-3.5 h-3.5 text-zs-emerald" />;
    if (type.includes('delete') || type.includes('remove')) return <AlertCircle className="w-3.5 h-3.5 text-zs-red" />;
    if (type.includes('update')) return <Zap className="w-3.5 h-3.5 text-zs-cyan" />;
    return <Info className="w-3.5 h-3.5 text-zs-blue" />;
}

function getEventColor(type: string) {
    if (!type) return "text-zs-blue";
    if (type.includes('create')) return "text-zs-emerald";
    if (type.includes('delete') || type.includes('remove')) return "text-zs-red";
    if (type.includes('update')) return "text-zs-cyan";
    return "text-zs-blue";
}
