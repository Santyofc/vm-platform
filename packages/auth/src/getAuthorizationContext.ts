/**
 * getAuthorizationContext — Loads and returns a full authorization context.
 *
 * This module provides a legacy wrapper around the unified getMembershipContext.
 * It is maintained for backward compatibility.
 */

import { getMembershipContext } from "./getMembershipContext";
import { hasPermission, type Permission } from "./permissions";
import { type Role } from "./roles";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MembershipRecord {
  id: string;
  userId: string;
  organizationId: string;
  role: Role;
  joinedAt: string;
}

export interface AuthorizationContext {
  /** The raw membership record. */
  membership: MembershipRecord;
  /** All permissions held by this membership's role. */
  permissions: readonly Permission[];
  /**
   * Ergonomic helper: returns true if the current role has the given permission.
   */
  has(permission: Permission): boolean;
}

// ---------------------------------------------------------------------------
// getAuthorizationContext
// ---------------------------------------------------------------------------

/**
 * Loads and returns the authorization context for a (userId, organizationId) pair.
 * Legacy wrapper around getMembershipContext.
 *
 * @param userId         - The authenticated user's UUID (from auth.users).
 * @param organizationId - The organization's UUID.
 */
export async function getAuthorizationContext(
  userId: string,
  organizationId: string
): Promise<AuthorizationContext> {
  const ctx = await getMembershipContext(userId, organizationId);
  return {
    membership: {
      id: ctx.membershipId,
      userId: ctx.userId,
      organizationId: ctx.organizationId,
      role: ctx.role,
      joinedAt: ctx.joinedAt,
    },
    permissions: ctx.permissions,
    has(permission: Permission): boolean {
      return hasPermission(ctx.role, permission);
    },
  };
}
