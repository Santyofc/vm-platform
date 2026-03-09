import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getEmailClient(): Resend {
  if (resendClient) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[EMAIL] FATAL: RESEND_API_KEY is not set in production.");
    } else {
      console.warn("[EMAIL] RESEND_API_KEY is missing. Emails will be logged to console instead of sent.");
    }
    // Return a mock client that just logs if no key is provided
    resendClient = {
      emails: {
        send: async (payload: any) => {
          console.log("[EMAIL_MOCK_SEND]", JSON.stringify(payload, null, 2));
          return { data: { id: "mock_id" }, error: null };
        },
      },
    } as any;
    return resendClient!;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

export function getDefaultFrom(): string {
  return process.env.EMAIL_FROM || "notifications@zonasur.tech";
}
