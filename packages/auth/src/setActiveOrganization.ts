/**
 * setActiveOrganization — Sets the active_organization_id cookie.
 *
 * This is the ONLY place in the codebase that should write this cookie.
 * It always verifies active membership BEFORE setting the cookie, so
 * there is no way to privilege-escalate by crafting the cookie value.
 *
 * Use cases:
 * - After accepting an invitation (auto-switches to the new org)
 * - Explicit org switch by the user via POST /api/organizations/switch
 *
 * Security:
 * - Membership is verified against the DB every time.
 * - The cookie value cannot bypass membership verification at read time
 *   (getActiveOrganization always re-checks on every request).
 * - Cookie is httpOnly, sameSite=lax, secure in production.
 */

import { cookies } from "next/headers";
import { getMembershipContext, ACTIVE_ORG_COOKIE } from "./getMembershipContext";
import { ForbiddenError } from "./errors";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SetActiveOrganizationResult {
  organizationId: string;
  organizationName: string;
}

// ---------------------------------------------------------------------------
// setActiveOrganization
// ---------------------------------------------------------------------------

/**
 * Verifies that the user is an active member of `organizationId` and then
 * sets the `active_organization_id` cookie.
 *
 * @param userId         - The authenticated user's UUID (from auth.users).
 * @param organizationId - The organization to switch to.
 *
 * @throws {ForbiddenError} If the user is not an active member of the org.
 *
 * @returns The organization's id and name for response confirmation.
 */
export async function setActiveOrganization(
  userId: string,
  organizationId: string
): Promise<SetActiveOrganizationResult> {
  // Verify active membership — getMembershipContext handles validation and throws if invalid/inactive.
  const ctx = await getMembershipContext(userId, organizationId);

  // Set the cookie — httpOnly, not accessible from JavaScript.
  const cookieStore = cookies();
  cookieStore.set(ACTIVE_ORG_COOKIE, organizationId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // 30 days — the user's org preference persists across sessions.
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    organizationId: ctx.organizationId,
    organizationName: ctx.organizationName,
  };
}
