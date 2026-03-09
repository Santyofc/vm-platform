/**
 * requireSuperAdmin — Restricts access to global system administrators.
 *
 * This guard ensures that only users with the `app_metadata.is_super_admin` flag
 * (or the master emergency email) can access the resource.
 *
 * @throws {ForbiddenError} If the user is authenticated but not a Super Admin.
 * @throws {UnauthorizedError} If the user is not authenticated.
 */

import { requireAuth, AuthenticatedUser } from "./requireAuth";
import { ForbiddenError } from "./errors";

// Master email with emergency global access
const MASTER_ADMIN_EMAIL = "admin@santy.tech";

/**
 * Validates that the current user has global Super Admin privileges.
 *
 * @returns The authenticated user object if they are a Super Admin.
 */
export async function requireSuperAdmin(): Promise<AuthenticatedUser> {
  const user = await requireAuth();

  // 1. Check master emergency email
  if (user.email === MASTER_ADMIN_EMAIL) {
    return user;
  }

  // 2. Check Supabase app_metadata flag
  const isSuperAdmin = !!user.authUser.app_metadata?.is_super_admin;
  
  if (!isSuperAdmin) {
    throw new ForbiddenError(
      "Access Denied: You do not have global administrator privileges."
    );
  }

  return user;
}
