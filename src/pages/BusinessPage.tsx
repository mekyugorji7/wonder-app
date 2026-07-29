import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BusinessContextPanel } from "@/components/dashboard/BusinessContextPanel";
import { BusinessList } from "@/components/dashboard/BusinessList";

export function BusinessPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-10">
        <div>
          <h1 className="font-display text-2xl font-semibold text-title md:text-3xl">
            Business
          </h1>
          <p className="mt-2 text-sm text-sub md:text-base">
            Manage your businesses, context, and founder updates.
          </p>
        </div>
        <BusinessList />
        <BusinessContextPanel />
      </div>
    </DashboardLayout>
  );
}
