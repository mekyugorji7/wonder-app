import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface ChatLayoutProps {
  header: ReactNode;
  children: ReactNode;
  prompt: ReactNode;
}

export function ChatLayout({ header, children, prompt }: ChatLayoutProps) {
  return (
    <DashboardLayout variant="chat">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-sky-50/80 shadow-[0_8px_40px_rgba(59,130,246,0.08)]">
        {header}
        {children}
        {prompt}
      </div>
    </DashboardLayout>
  );
}
