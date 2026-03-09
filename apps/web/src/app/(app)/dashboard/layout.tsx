import { DashboardSidebar } from "@/components/dashboard/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zs-bg-primary">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto no-scrollbar p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
