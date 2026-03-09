/**
 * getActiveOrganization — Resolves the active organization for a user session.
 *
 * This module provides a legacy wrapper around the unified getMembershipContext.
 * It is maintained for backward compatibility.
 */

import { getMembershipContext } from "./getMembershipContext";
import type { Role } from "./roles";

// Re-export the cookie constant for backward compatibility
export { ACTIVE_ORG_COOKIE } from "./getMembershipContext";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActiveOrganization {
  /** The resolved organization's UUID. */
  organizationId: string;
  /** The organization name. */
  organizationName: string;
  /** The user's role inside this organization. */
  role: Role;
  /** The membership record's UUID. */
  membershipId: string;
}

// ---------------------------------------------------------------------------
// getActiveOrganization
// ---------------------------------------------------------------------------

/**
 * Resolves the active organization for a given user, verifying membership.
 * Legacy wrapper around getMembershipContext.
 *
 * @param userId         - The authenticated user's UUID (from auth.users).
 * @param organizationId - Optional explicit organization ID to resolve.
 */
export async function getActiveOrganization(
  userId: string,
  organizationId?: string | null
): Promise<ActiveOrganization> {
  const ctx = await getMembershipContext(userId, organizationId);
  return {
    organizationId: ctx.organizationId,
    organizationName: ctx.organizationName,
    role: ctx.role,
    membershipId: ctx.membershipId,
  };
}
