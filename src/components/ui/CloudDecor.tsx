import { cn } from "@/lib/utils";

interface CloudDecorProps {
  className?: string;
}

export function CloudDecor({ className }: CloudDecorProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute text-white/70", className)}
      viewBox="0 0 200 120"
      fill="currentColor"
      aria-hidden
    >
      <ellipse cx="60" cy="70" rx="55" ry="35" />
      <ellipse cx="110" cy="65" rx="45" ry="30" />
      <ellipse cx="150" cy="75" rx="40" ry="28" />
      <ellipse cx="85" cy="45" rx="35" ry="25" />
    </svg>
  );
}
