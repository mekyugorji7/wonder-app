import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  Globe,
  Instagram,
  Linkedin,
  NavArrowLeft,
  NavArrowRight,
  Printer,
  Shop,
} from "iconoir-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBusinessInitials } from "@/components/dashboard/businessContext";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";
import type { DashboardSection } from "@/components/dashboard/projects";

const navItems: {
  section: DashboardSection;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { section: "overview", label: "Overview", href: "/app", icon: Dashboard },
  { section: "linkedin", label: "LinkedIn Posts", href: "/app/linkedin", icon: Linkedin },
  { section: "business", label: "Business", href: "/app/business", icon: Shop },
];

const comingSoonItems: {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { label: "Website", icon: Globe },
  { label: "Social", icon: Instagram },
  { label: "Print", icon: Printer },
];

function isActive(pathname: string, href: string) {
  if (href === "/app") return pathname === "/app";
  return pathname.startsWith(href);
}

interface DashboardSidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

export function DashboardSidebar({
  className,
  collapsed = false,
  onToggleCollapse,
  onNavigate,
}: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const { context, businesses } = useBusinessContext();
  const businessName = context?.businessName ?? "Workspace";
  const initials = getBusinessInitials(businessName);
  const businessCount = businesses.length;

  return (
    <aside
      className={cn(
        "flex flex-col transition-[width] duration-200 ease-out",
        collapsed ? "w-16" : "w-52",
        className
      )}
    >
      <div className={cn("py-5", collapsed ? "px-2 text-center" : "px-4")}>
        {collapsed ? (
          <p
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-display text-xs font-semibold text-title"
            title={businessName}
          >
            {initials || "?"}
          </p>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Workspace
            </p>
            <p className="mt-1 font-display text-sm font-semibold text-title">
              {businessName}
            </p>
            {businessCount > 1 && (
              <p className="mt-0.5 text-xs text-muted">
                {businessCount} businesses
              </p>
            )}
          </>
        )}
      </div>

      <Separator />

      <nav className={cn("flex-1 space-y-1 p-3", collapsed && "px-2")}>
        {navItems.map(({ section, label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={section}
              to={href}
              title={collapsed ? label : undefined}
              onClick={onNavigate}
              className={cn(
                "flex items-center rounded-lg py-2 text-sm transition-colors",
                collapsed ? "justify-center px-2" : "gap-2.5 px-3",
                active
                  ? "bg-accent-soft font-medium text-title"
                  : "text-sub hover:bg-page hover:text-title"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {!collapsed && label}
            </Link>
          );
        })}

        {!collapsed && (
          <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-widest text-muted">
            More
          </p>
        )}

        {comingSoonItems.map(({ label, icon: Icon }) => (
          <div
            key={label}
            title={collapsed ? `${label} — coming soon` : undefined}
            className={cn(
              "flex cursor-not-allowed items-center rounded-lg py-2 text-sm text-muted/60",
              collapsed ? "justify-center px-2" : "gap-2.5 px-3"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {!collapsed && (
              <>
                <span className="flex-1">{label}</span>
                <Badge
                  variant="default"
                  className="shrink-0 border-sky-100 bg-sky-50 px-2 py-0.5 text-[10px] text-sky-600"
                >
                  Coming soon
                </Badge>
              </>
            )}
          </div>
        ))}
      </nav>

      {onToggleCollapse && (
        <div className={cn("border-t border-border p-2", !collapsed && "px-3")}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              "h-9 w-full text-sub hover:text-title",
              collapsed ? "px-0" : "justify-start px-3"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <NavArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            ) : (
              <>
                <NavArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                Collapse
              </>
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}

export function DashboardMobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-3 py-2 lg:hidden">
      {navItems.map(({ section, label, href, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={section}
            to={href}
            onClick={onNavigate}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-accent-soft text-title"
                : "text-sub hover:bg-page hover:text-title"
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            {label}
          </Link>
        );
      })}
      {comingSoonItems.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted/60"
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          {label}
        </span>
      ))}
    </nav>
  );
}
