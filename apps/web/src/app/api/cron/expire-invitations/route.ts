import { NextResponse } from "next/server";
import { runExpireInvitationsJob } from "@repo/platform";

export async function GET(request: Request) {
  // Enforce CRON_SECRET for security, as Vercel Cron will send this header.
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.CRON_SECRET;

  if (expectedToken) {
    if (authHeader !== `Bearer ${expectedToken}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } else {
    // If no secret configured, disallow external trigger in prod.
    // Allow in dev for local testing.
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Forbidden - No CRON_SECRET set", { status: 403 });
    }
  }

  const result = await runExpireInvitationsJob();

  if (!result.success) {
    return NextResponse.json(
      { error: "Failed to expire invitations.", details: result },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Expired invitations successfully.",
    processed: result.processed,
  });
}
