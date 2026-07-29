import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
  onCreate: () => void;
}

export function EmptyState({ icon: Icon, description, onCreate }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
        <Icon className="h-5 w-5 text-sky-500" strokeWidth={1.5} />
      </div>
      <p className="mt-4 max-w-sm text-sm text-sub">{description}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-6 border-dashed"
        onClick={onCreate}
      >
        Create new
      </Button>
    </div>
  );
}
