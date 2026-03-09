import { requireOrganization, handleAuthError } from '@repo/auth';
import { DashboardContent } from '@/components/dashboard/dashboard/DashboardContent';

export default async function DashboardPage() {
  try {
    // Consolidated resolution of identity + organization + role + permissions
    const ctx = await requireOrganization();

    const session = {
      userId: ctx.userId,
      organizationId: ctx.organizationId,
      organizationName: ctx.organizationName,
      role: ctx.role,
      user: {
        id: ctx.userId,
        email: ctx.email,
        name: ctx.authUser.user_metadata?.display_name || ctx.email.split('@')[0],
      }
    };

    return (
      <div className="p-8">
        <DashboardContent session={session as any} />
      </div>
    );
  } catch (error) {
    // If it's a known auth/org error, we can handle it or let handleAuthError decide.
    // However, for the UI, we might want a specific feedback view.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zs-bg-primary text-zs-text-primary">
        <h1 className="text-2xl font-bold mb-4">No active organization found</h1>
        <p className="text-zs-text-secondary">Please complete onboarding or join an organization.</p>
      </div>
    );
  }
}
