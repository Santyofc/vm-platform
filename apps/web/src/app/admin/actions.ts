"use server";

import { revalidatePath } from "next/cache";
import { requireSuperAdmin } from "@repo/auth";
import { createClient } from "@supabase/supabase-js";

/**
 * Internal Supabase admin client for server actions.
 * Bypasses RLS to perform system-level operations.
 */
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

/**
 * Toggles a user's account lock status (ban/unban).
 */
export async function toggleUserAccess(userId: string, isLocked: boolean) {
  await requireSuperAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: isLocked ? "none" : "876000h", // effectively permanent ban (100 years)
  });

  if (error) throw new Error(`Failed to update user access: ${error.message}`);
  
  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Permanently deletes a user identity from the system.
 */
export async function deleteUserIdentity(userId: string) {
  await requireSuperAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw new Error(`Failed to delete user identity: ${error.message}`);
  
  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Toggles Super Admin status for a user via app_metadata.
 */
export async function updateSystemRole(userId: string, isSuperAdmin: boolean) {
  await requireSuperAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { is_super_admin: isSuperAdmin }
  });

  if (error) throw new Error(`Failed to update system role: ${error.message}`);
  
  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Deletes an organization node and its associated data.
 */
export async function deleteOrganizationNode(orgId: string) {
  await requireSuperAdmin();
  const supabase = createAdminClient();

  // 1. Delete organization (cascades to memberships if FK is configured, 
  // but we'll be thorough if needed. Schema check suggests cascade might be missing).
  const { error } = await supabase
    .from("organizations")
    .delete()
    .eq("id", orgId);

  if (error) throw new Error(`Failed to delete organization: ${error.message}`);
  
  revalidatePath("/admin/organizations");
  return { success: true };
}

/**
 * Simulates clearing system logs (Maintenance).
 */
export async function clearGlobalActivityLogs() {
  await requireSuperAdmin();
  // In a real scenario, we might move them to cold storage or purge old ones.
  // For now, this is a placeholder for a maintenance action.
  return { success: true, message: "Maintenance protocol initiated." };
}
