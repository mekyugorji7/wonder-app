import { useEffect, useState, type ReactNode } from "react";
import { DashboardSidebar, DashboardMobileNav } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_KEY = "dashboard-sidebar-collapsed";

interface DashboardLayoutProps {
  children: ReactNode;
  variant?: "default" | "chat";
}

export function DashboardLayout({ children, variant = "default" }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div
      className={cn(
        "flex flex-col bg-page",
        variant === "chat" ? "h-dvh overflow-hidden" : "min-h-screen"
      )}
    >
      <DashboardTopbar />
      <DashboardMobileNav />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          className="hidden shrink-0 border-r border-border bg-surface lg:flex"
        />
        <main
          className={cn(
            "min-h-0 flex-1",
            variant === "chat"
              ? "flex flex-col overflow-hidden bg-gradient-to-b from-sky-100/70 to-white p-3 md:p-4"
              : "overflow-y-auto bg-neutral-100 p-5 md:p-8"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
