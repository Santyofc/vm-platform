import { getEmailClient, getDefaultFrom } from "./client";
import { renderInvitationEmailHtml, renderInvitationEmailText, type InvitationTemplateProps } from "./templates/invitation";

export interface SendInvitationEmailOptions {
  to: string;
  organizationName: string;
  inviterName?: string | null;
  role: string;
  inviteUrl: string;
}

export async function sendInvitationEmail(options: SendInvitationEmailOptions): Promise<{ id?: string; error?: string }> {
  const client = getEmailClient();
  
  const templateProps: InvitationTemplateProps = {
    organizationName: options.organizationName,
    inviterName: options.inviterName,
    role: options.role,
    acceptUrl: options.inviteUrl,
    expiresInDays: 7, // matches INVITATION_EXPIRY_DAYS
  };

  try {
    const from = getDefaultFrom();
    const subject = `You have been invited to join ${options.organizationName}`;

    const { data, error } = await client.emails.send({
      from,
      to: options.to,
      subject,
      html: renderInvitationEmailHtml(templateProps),
      text: renderInvitationEmailText(templateProps),
      tags: [
        { name: "category", value: "invitation" }
      ]
    });

    if (error) {
      console.error("[EMAIL] Failed to send invitation email:", error);
      return { error: error.message };
    }

    return { id: data?.id };
  } catch (err: any) {
    console.error("[EMAIL] Unexpected error sending invitation email:", err);
    return { error: err.message || "Unknown error" };
  }
}
