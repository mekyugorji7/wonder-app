import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "iconoir-react";
import { GENERATION_STEP_MS, GENERATION_STEPS } from "@/lib/chatSetup";
import { cn } from "@/lib/utils";

interface GenerationStepsProps {
  active: boolean;
}

export function GenerationSteps({ active }: GenerationStepsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!active) {
      setActiveStep(0);
      return;
    }

    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((prev) =>
        prev < GENERATION_STEPS.length - 1 ? prev + 1 : prev
      );
    }, GENERATION_STEP_MS);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  if (shouldReduceMotion) {
    return (
      <p className="text-sm text-muted">
        {GENERATION_STEPS[activeStep]}…
      </p>
    );
  }

  return (
    <div className="space-y-2.5" aria-live="polite" aria-label="Generating post">
      {GENERATION_STEPS.map((step, i) => {
        const isDone = i < activeStep;
        const isCurrent = i === activeStep;
        const isPending = i > activeStep;

        return (
          <motion.div
            key={step}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isPending ? 0.35 : 1,
              x: 0,
            }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors",
                isDone && "bg-sky-500 text-white",
                isCurrent && "bg-sky-100",
                isPending && "bg-sky-50"
              )}
            >
              {isDone ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </motion.span>
              ) : isCurrent ? (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-sky-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
              )}
            </span>

            <motion.span
              className={cn(
                "text-sm",
                isCurrent ? "font-medium text-title" : "text-muted"
              )}
              animate={isCurrent ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
              transition={
                isCurrent
                  ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              {step}
              {isCurrent && "…"}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
