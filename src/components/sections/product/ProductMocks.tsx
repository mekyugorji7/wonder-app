import { AnimatePresence, motion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { ScrollStepLayer, useActiveStepIndex } from "@/components/motion/ScrollStepPanel";
import { cn } from "@/lib/utils";

const navItems = ["Website", "Social", "Print", "Brand"] as const;
const contentNavItems = ["Website", "Social", "Print"] as const;

function PlaceholderBlock({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-accent-soft", className)} />;
}

function WebsiteContent() {
  return (
    <div className="w-full space-y-2">
      <PlaceholderBlock className="h-4 w-2/3" />
      <PlaceholderBlock className="h-2.5 w-full opacity-80" />
      <PlaceholderBlock className="h-2.5 w-4/5 opacity-60" />
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <PlaceholderBlock key={i} className="aspect-square" />
        ))}
      </div>
    </div>
  );
}

function SocialContent() {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {["Post", "Story", "Reel cover", "Promo"].map((label) => (
        <div key={label} className="rounded-lg border border-border bg-white p-2">
          <PlaceholderBlock className="aspect-square" />
          <p className="mt-1.5 text-[10px] font-medium text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}

function PrintContent() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-white p-3">
        <PlaceholderBlock className="h-2.5 w-1/2" />
        <div className="mt-2 space-y-1.5">
          <PlaceholderBlock className="h-2 w-full opacity-80" />
          <PlaceholderBlock className="h-2 w-5/6 opacity-60" />
          <PlaceholderBlock className="h-2 w-4/6 opacity-40" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <PlaceholderBlock className="h-12" />
          <PlaceholderBlock className="h-12 opacity-80" />
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] font-medium text-muted">Menu · Print ready</p>
    </div>
  );
}

const contentPanels = [WebsiteContent, SocialContent, PrintContent];

function AppShell({
  activeNavIndex,
  children,
}: {
  activeNavIndex: number;
  children: ReactNode;
}) {
  return (
    <div className="craft-card overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2 border-b border-border bg-white px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 text-[10px] text-muted">Wonder — Rosewood Bakery</span>
      </div>

      <div className="flex min-h-[180px] bg-white md:min-h-[200px]">
        <aside className="hidden w-28 shrink-0 border-r border-border bg-white p-2.5 sm:block">
          <div className="mb-2 h-1.5 w-12 rounded bg-title/10" />
          <div className="relative space-y-1">
            {navItems.map((item, index) => {
              const isContentNav = index < 3;
              const isActive = isContentNav && index === activeNavIndex;
              return (
                <div key={item} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="app-sidebar-active"
                      className="absolute inset-0 rounded-md bg-accent-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative block rounded-md px-2 py-1 text-[10px] transition-colors duration-200",
                      isActive ? "font-medium text-sky-700" : "text-muted"
                    )}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="relative flex flex-1 items-center overflow-hidden p-3 md:p-3.5">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ProductAppMockScrollProps {
  scrollProgress: MotionValue<number>;
  stepCount: number;
}

export function ProductAppMockScroll({ scrollProgress, stepCount }: ProductAppMockScrollProps) {
  const activeIndex = useActiveStepIndex(scrollProgress, stepCount);

  return (
    <div className="mx-auto w-full max-w-xs md:max-w-sm">
      <AppShell activeNavIndex={activeIndex}>
        {contentPanels.map((Panel, index) => (
          <ScrollStepLayer
            key={contentNavItems[index]}
            stepIndex={index}
            stepCount={stepCount}
            scrollProgress={scrollProgress}
            className="flex items-center px-3 md:px-3.5"
          >
            <Panel />
          </ScrollStepLayer>
        ))}
      </AppShell>
    </div>
  );
}

interface ProductAppMockStaticProps {
  activeIndex: number;
}

export function ProductAppMockStatic({ activeIndex }: ProductAppMockStaticProps) {
  const Panel = contentPanels[activeIndex];

  return (
    <div className="mx-auto w-full max-w-xs md:max-w-sm">
      <AppShell activeNavIndex={activeIndex}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-full"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </AppShell>
    </div>
  );
}

export const productMocks = [WebsiteContent, SocialContent, PrintContent] as const;
