import { Link } from "react-router-dom";
import { Plus } from "iconoir-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getBusinessInitials } from "@/components/dashboard/businessContext";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";
import { useNewPost } from "@/hooks/useNewPost";

export function DashboardTopbar() {
  const startNewPost = useNewPost();
  const { context } = useBusinessContext();
  const businessName = context?.businessName ?? "Workspace";
  const initials = getBusinessInitials(businessName);

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-surface px-4 md:px-6">
      <Link
        to="/"
        className="font-display text-base font-bold tracking-tight text-title md:text-lg"
      >
        wonder
      </Link>

      <Separator orientation="vertical" className="hidden h-5 sm:block" />

      <p className="hidden text-sm text-sub sm:block">{businessName}</p>

      <div className="ml-auto flex items-center gap-3">
        <Button size="sm" onClick={startNewPost}>
          <Plus className="h-4 w-4" strokeWidth={2} />
          New
        </Button>
        <Avatar fallback={initials || "?"} />
      </div>
    </header>
  );
}
