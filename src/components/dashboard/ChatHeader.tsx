import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { NavArrowLeft } from "iconoir-react";

interface ChatHeaderProps {
  title: string;
  backTo: string;
  isLoading?: boolean;
}

export function ChatHeader({ title, backTo, isLoading }: ChatHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="flex shrink-0 items-center gap-3 px-5 py-4">
      <Link
        to={backTo}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sub transition-colors hover:bg-white/60 hover:text-title"
        aria-label="Back"
      >
        <NavArrowLeft className="h-4 w-4" strokeWidth={2} />
      </Link>

      <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-title shadow-[0_2px_12px_rgba(15,23,42,0.08)]">
        Wonder
      </span>

      {isLoading && !shouldReduceMotion ? (
        <motion.span
          className="text-sm text-muted"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {title}
        </motion.span>
      ) : (
        <span className="text-sm text-muted">{title}</span>
      )}
    </header>
  );
}
