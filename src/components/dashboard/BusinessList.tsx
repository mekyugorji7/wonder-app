import { Link } from "react-router-dom";
import { Plus, Shop } from "iconoir-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBusinessInitials } from "@/components/dashboard/businessContext";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";

export function BusinessList() {
  const { businesses, activeBusinessId, switchBusiness } = useBusinessContext();

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-title">
            Your businesses
          </h2>
          <p className="mt-1 text-sm text-sub">
            Switch between businesses or add another to manage.
          </p>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link to="/app/onboarding/add">
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add business
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {businesses.map((business) => {
          const isActive = business.id === activeBusinessId;
          const initials = getBusinessInitials(business.businessName);

          return (
            <button
              key={business.id}
              type="button"
              onClick={() => switchBusiness(business.id)}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                isActive
                  ? "border-sky-200 bg-sky-50/80"
                  : "border-border bg-surface hover:border-sky-100 hover:bg-page"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                  isActive
                    ? "bg-sky-500 text-white"
                    : "bg-accent-soft text-title"
                )}
              >
                {initials || <Shop className="h-4 w-4" strokeWidth={1.5} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-title">
                  {business.businessName}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {business.productDescription}
                </span>
                {isActive && (
                  <span className="mt-2 inline-block text-xs font-medium text-sky-600">
                    Active
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
