/**
 * getMembershipContext — Consolidates organization and membership resolution.
 *
 * This is the core logic for determining the "current" organization and the
 * user's role/status within it. It performs a single, optimized database
 * query (via admin client) to fetch all necessary context.
 *
 * Priority order for organization resolution:
 *   1. Explicit `organizationId` parameter.
 *   2. Cookie: `active_organization_id`.
 *   3. Fallback: User's first-joined membership.
 *
 * This utility replaces redundant logic in `getActiveOrganization` and
 * `getAuthorizationContext`, ensuring we only hit the DB once per request
 * for context resolution.
 */

import { cookies } from "next/headers";
import { ForbiddenError, NotFoundError } from "./errors";
import { createAdminClient } from "./supabaseAdmin";
import { ROLES, type Role } from "./roles";
import { getPermissions, hasPermission, type Permission } from "./permissions";

// ---------------------------------------------------------------------------
// Constants & Types
// ---------------------------------------------------------------------------

export const ACTIVE_ORG_COOKIE = "active_organization_id";

export interface MembershipContext {
  userId: string;
  organizationId: string;
  organizationName: string;
  membershipId: string;
  role: Role;
  status: string;
  joinedAt: string;
  /** Full list of permissions for checking on the frontend or logic. */
  permissions: readonly Permission[];
  /** Helper to check permission. */
  hasPermission: (permission: Permission) => boolean;
}

// ---------------------------------------------------------------------------
// getMembershipContext
// ---------------------------------------------------------------------------

/**
 * Resolves the full membership and organization context for a user.
 *
 * @param userId - The user's UUID (from requireAuth).
 * @param organizationId - Optional explicit ID to override resolution.
 *
 * @throws {NotFoundError}  If the user has no memberships at all.
 * @throws {ForbiddenError} If the user lacks access to the requested org or membership is inactive.
 */
export async function getMembershipContext(
  userId: string,
  organizationId?: string | null
): Promise<MembershipContext> {
  const supabase = createAdminClient();
  const cookieStore = cookies();

  // 1. Determine the target organization ID based on priority.
  const targetId = organizationId ?? cookieStore.get(ACTIVE_ORG_COOKIE)?.value;

  // 2. Query for the membership context.
  let query = supabase
    .from("memberships")
    .select("id, user_id, organization_id, role, status, joined_at, organizations(id, name)")
    .eq("user_id", userId);

  if (targetId) {
    query = query.eq("organization_id", targetId);
  } else {
    query = query.order("joined_at", { ascending: true }).limit(1);
  }

  const { data: rawData, error } = await query.single();

  if (error || !rawData) {
    // If we were looking for a specific ID and failed, it's a Forbidden error.
    if (targetId) {
      // If it was a cookie-based target, it might be stale. Fallback to first membership.
      if (!organizationId) {
        return getMembershipContext(userId, null); // Recursion without target
      }
      throw new ForbiddenError("You are not a member of the requested organization.");
    }
    // If we were looking for ANY membership and failed, user needs onboarding.
    throw new NotFoundError("No organization memberships found. Complete onboarding first.");
  }

  const m = rawData as any;
  const org = m.organizations;

  if (!org) {
    throw new ForbiddenError("Organization data could not be resolved.");
  }

  // 3. Status verification.
  if (m.status !== "active") {
    throw new ForbiddenError(`Your membership status is "${m.status}". Access denied.`);
  }

  const role = m.role as Role;
  const permissions = getPermissions(role);

  return {
    userId,
    organizationId: org.id,
    organizationName: org.name,
    membershipId: m.id,
    role,
    status: m.status,
    joinedAt: m.joined_at,
    permissions,
    hasPermission: (p: Permission) => hasPermission(role, p),
  };
}
