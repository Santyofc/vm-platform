"use client";

import React from "react";
import { LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function TerminateSessionButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleTerminate = async () => {
    if (!confirm("🚨 ¿Estás seguro de que deseas terminar la sesión maestra? Se cerrará tu acceso al Kernel.")) return;
    
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/signin");
      router.refresh();
    } catch (error: any) {
      alert(`Error termination session: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleTerminate}
      disabled={isLoading}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-zs-red/5 border border-zs-red/20 text-zs-red hover:bg-zs-red/10 transition-all group"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <LogOut className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
      )}
      <div className="flex flex-col items-start min-w-0">
        <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Terminate</span>
        <span className="text-[8px] font-mono opacity-60 uppercase tracking-tighter truncate">Master Session</span>
      </div>
    </button>
  );
}
