/**
 * POST /api/invitations/[id]/resend
 *
 * Resends a pending invitation by generating a new token and extending expiry.
 *
 * Permission required: members:invite
 *
 * Only pending invitations can be resent. Other statuses return 409.
 *
 * This endpoint does NOT send email. It returns the new inviteUrl which
 * the caller must pass to an email provider.
 *
 * INTEGRATION_POINT: Wire an email service here or in the frontend
 * by consuming the returned `inviteUrl`.
 *
 * Body: (none — invitation identified by [id] route param + active org cookie)
 */

import { NextResponse } from "next/server";
import {
  requirePermission,
  resendInvitation,
  handleAuthError,
} from "@repo/auth";
import { rateLimit, logger } from "@repo/platform";
import { createAdminClient } from "@repo/auth/src/supabaseAdmin";

interface RouteParams {
  params: { id: string };
}

export async function POST(_request: Request, { params }: RouteParams) {
  try {
    const ctx = await requirePermission("members:invite");

    // Rate Limit by User ID (20 resends per hour)
    const rateLimitResult = await rateLimit(`invite:resend:${ctx.userId}`, {
      maxRequests: 20,
      windowMs: 60 * 60 * 1000,
    });
    if (!rateLimitResult.success) {
      logger.warn(`[RATE_LIMIT] User ${ctx.userId} exceeded invitation resend limit.`);
      return NextResponse.json(
        { error: "Too many invitations resent. Please try again later.", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    const invitationId = params.id;
    if (!invitationId) {
      return NextResponse.json(
        { error: "Invitation ID is required.", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const result = await resendInvitation(
      invitationId,
      ctx.organizationId,
      ctx.userId
    );

    logger.info(
      `[INVITE] ${ctx.userId} resent invitation ${invitationId} in org ${ctx.organizationId}`
    );

    const supabaseAdmin = createAdminClient();
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(result.invitation.email, {
      data: {
        organization_id: ctx.organizationId,
        role: result.invitation.role
      },
      redirectTo: result.inviteUrl,
    });

    if (authError) {
      logger.error(`[EMAIL] Failed to resend Supabase invitation email to ${result.invitation.email}`, authError);
    } else {
      logger.info(`[EMAIL] Resent Supabase invitation email to ${result.invitation.email}`);
    }

    return NextResponse.json({
      message: "Invitation resent and email task submitted.",
      invitation: result.invitation,
      inviteUrl: result.inviteUrl,
    });
  } catch (err) {
    const { body, status } = handleAuthError(err);
    return NextResponse.json(body, { status });
  }
}
