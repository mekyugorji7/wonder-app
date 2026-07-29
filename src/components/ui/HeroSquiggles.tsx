import { cn } from "@/lib/utils";

interface SquiggleProps {
  className?: string;
  path: string;
}

function Squiggle({ className, path }: SquiggleProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute text-white", className)}
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSquiggles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Squiggle
        className="left-[6%] top-[18%] h-16 w-24 rotate-[-12deg] opacity-25 md:left-[10%] md:top-[22%] md:h-20 md:w-28"
        path="M8 42 C28 8, 52 68, 72 28 S108 58, 112 22"
      />
      <Squiggle
        className="right-[8%] top-[14%] h-14 w-20 rotate-[18deg] opacity-20 md:right-[12%] md:top-[18%] md:h-[4.5rem] md:w-24"
        path="M6 48 C22 12, 48 62, 68 34 S98 52, 114 26"
      />
      <Squiggle
        className="bottom-[32%] left-[4%] h-12 w-20 rotate-[8deg] opacity-15 md:bottom-[36%] md:left-[8%] md:h-16 md:w-24"
        path="M10 38 Q34 62, 58 36 T106 44"
      />
      <Squiggle
        className="bottom-[28%] right-[5%] h-16 w-[5.5rem] rotate-[-20deg] opacity-20 md:bottom-[32%] md:right-[9%] md:h-20 md:w-28"
        path="M4 52 C26 18, 44 58, 66 30 S92 48, 116 20"
      />
      <Squiggle
        className="left-[42%] top-[8%] h-10 w-16 rotate-[6deg] opacity-15 max-md:hidden"
        path="M8 44 C30 20, 54 56, 78 32 S104 48, 112 28"
      />
    </div>
  );
}
