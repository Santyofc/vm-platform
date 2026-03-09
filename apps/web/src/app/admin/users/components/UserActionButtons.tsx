"use client";

import React, { useState } from "react";
import { Lock, Unlock, UserX, MoreHorizontal, Loader2 } from "lucide-react";
import { toggleUserAccess, deleteUserIdentity } from "../../actions";
import { useRouter } from "next/navigation";

interface UserActionButtonsProps {
  userId: string;
  isLocked: boolean;
  userEmail: string;
}

export function UserActionButtons({ userId, isLocked, userEmail }: UserActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleAccess = async () => {
    if (!confirm(`¿Estás seguro de que deseas ${isLocked ? 'desbloquear' : 'bloquear'} el acceso para ${userEmail}?`)) return;
    
    setIsLoading(true);
    try {
      await toggleUserAccess(userId, isLocked);
      router.refresh();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`⚠️ ACCIÓN CRÍTICA: ¿Estás seguro de que deseas ELIMINAR permanentemente la identidad de ${userEmail}? Esta acción no se puede deshacer.`)) return;
    
    // Segunda validación para acciones destructivas
    const confirmText = prompt(`Por favor, escribe "${userEmail}" para confirmar la eliminación definitiva:`);
    if (confirmText !== userEmail) {
      alert("La confirmación no coincide. Operación cancelada.");
      return;
    }

    setIsLoading(true);
    try {
      await deleteUserIdentity(userId);
      router.refresh();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleToggleAccess}
        disabled={isLoading}
        className={`p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border transition-all ${isLocked ? 'text-zs-emerald hover:border-zs-emerald/50' : 'text-zs-text-muted hover:text-zs-blue hover:border-zs-blue/50'}`}
        title={isLocked ? "Desbloquear Acceso" : "Bloquear Acceso"}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>
      
      <button 
        onClick={handleDelete}
        disabled={isLoading}
        className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-zs-red hover:border-zs-red/50 transition-all"
        title="Eliminar Identidad"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserX className="w-4 h-4" />}
      </button>
      
      <button className="p-2 rounded-lg bg-zs-bg-secondary/50 border border-zs-border text-zs-text-muted hover:text-white transition-all">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
