"use client";

import React, { useState } from "react";
import { Settings, ExternalLink, MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import { deleteOrganizationNode } from "../../actions";
import { useRouter } from "next/navigation";

interface OrgActionButtonsProps {
  orgId: string;
  orgName: string;
}

export function OrgActionButtons({ orgId, orgName }: OrgActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`⚠️ ACCIÓN CRÍTICA: ¿Estás seguro de que deseas ELIMINAR permanentemente la organización "${orgName}"? Todos los datos asociados se perderán.`)) return;
    
    const confirmText = prompt(`Por favor, escribe "${orgName}" para confirmar la eliminación:`);
    if (confirmText !== orgName) {
      alert("La confirmación no coincide. Operación cancelada.");
      return;
    }

    setIsLoading(true);
    try {
      await deleteOrganizationNode(orgId);
      router.refresh();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <button className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-zs-cyan hover:border-zs-cyan/50 transition-all">
        <Settings className="w-4 h-4" />
      </button>
      
      <button 
        onClick={handleDelete}
        disabled={isLoading}
        className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-zs-red hover:border-zs-red/50 transition-all"
        title="Eliminar Organización"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>

      <button className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-white transition-all">
        <ExternalLink className="w-4 h-4" />
      </button>
      
      <button className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-white transition-all">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
