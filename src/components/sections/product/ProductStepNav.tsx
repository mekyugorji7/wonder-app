import { motion } from "motion/react";
import { productSteps } from "@/components/sections/product/productSteps";
import { cn } from "@/lib/utils";

interface ProductStepNavProps {
  activeIndex: number;
  className?: string;
}

export function ProductStepNav({ activeIndex, className }: ProductStepNavProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white p-1 shadow-sm",
        className
      )}
      role="tablist"
      aria-label="Product features"
    >
      {productSteps.map((step, index) => (
        <span
          key={step.id}
          role="tab"
          aria-selected={activeIndex === index}
          className={cn(
            "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 md:px-5",
            activeIndex === index ? "text-sky-800" : "text-muted"
          )}
        >
          {activeIndex === index && (
            <motion.span
              layoutId="product-step-pill"
              className="absolute inset-0 rounded-full bg-accent-soft"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{step.label}</span>
        </span>
      ))}
    </div>
  );
}
