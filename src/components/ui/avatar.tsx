import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, fallback, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-xs font-medium text-title",
        className
      )}
      {...props}
    >
      {children ?? fallback}
    </div>
  )
);
Avatar.displayName = "Avatar";

export { Avatar };
