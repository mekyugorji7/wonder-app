import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useEffect, useState, type ReactNode, type RefObject } from "react";

const STEP_COUNT = 3;
const TRANSITION_RATIO = 0.14;

interface StepRange {
  input: number[];
  opacity: number[];
  y: number[];
  x: number[];
  scale: number[];
  blur: number[];
}

function getStepRange(stepIndex: number, count: number): StepRange {
  const segment = 1 / count;
  const segStart = stepIndex * segment;
  const segEnd = stepIndex === count - 1 ? 1 : (stepIndex + 1) * segment;
  const t = segment * TRANSITION_RATIO;

  if (stepIndex === 0) {
    return {
      input: [0, segEnd - t, segEnd],
      opacity: [1, 1, 0],
      y: [0, 0, -20],
      x: [0, 0, -32],
      scale: [1, 1, 0.94],
      blur: [0, 0, 4],
    };
  }

  if (stepIndex === count - 1) {
    return {
      input: [segStart, segStart + t, 1],
      opacity: [0, 1, 1],
      y: [20, 0, 0],
      x: [32, 0, 0],
      scale: [0.94, 1, 1],
      blur: [4, 0, 0],
    };
  }

  return {
    input: [segStart, segStart + t, segEnd - t, segEnd],
    opacity: [0, 1, 1, 0],
    y: [20, 0, 0, -20],
    x: [32, 0, 0, -32],
    scale: [0.94, 1, 1, 0.94],
    blur: [4, 0, 0, 4],
  };
}

export function useScrollSteps(containerRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}

export function useActiveStepIndex(
  scrollProgress: MotionValue<number>,
  stepCount: number = STEP_COUNT
) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const segment = 1 / stepCount;
    const index = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor((latest + segment * 0.001) / segment))
    );
    setActiveIndex(index);
  });

  return activeIndex;
}

export function useScrollSegmentProgress(
  scrollProgress: MotionValue<number>,
  stepCount: number = STEP_COUNT
) {
  return useTransform(scrollProgress, (latest) => {
    const segment = 1 / stepCount;
    const index = Math.min(stepCount - 1, Math.floor(latest / segment));
    const local = (latest - index * segment) / segment;
    return { index, local };
  });
}

interface ScrollStepLayerProps {
  stepIndex: number;
  stepCount: number;
  scrollProgress: MotionValue<number>;
  children: ReactNode;
  className?: string;
}

export function ScrollStepLayer({
  stepIndex,
  stepCount,
  scrollProgress,
  children,
  className,
}: ScrollStepLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const range = getStepRange(stepIndex, stepCount);

  const opacity = useTransform(scrollProgress, range.input, range.opacity);
  const y = useTransform(scrollProgress, range.input, range.y);
  const x = useTransform(scrollProgress, range.input, range.x);
  const scale = useTransform(scrollProgress, range.input, range.scale);
  const blur = useTransform(scrollProgress, range.input, range.blur);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const visibility = useTransform(opacity, (v) => (v > 0.02 ? "visible" : "hidden"));

  if (shouldReduceMotion) {
    return stepIndex === 0 ? <div className={className}>{children}</div> : null;
  }

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        y,
        x,
        scale,
        filter,
        visibility,
        zIndex: stepIndex,
        position: "absolute",
        inset: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStepTextProps {
  stepIndex: number;
  stepCount: number;
  scrollProgress: MotionValue<number>;
  children: ReactNode;
  className?: string;
}

export function ScrollStepText({
  stepIndex,
  stepCount,
  scrollProgress,
  children,
  className,
}: ScrollStepTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const range = getStepRange(stepIndex, stepCount);

  const opacity = useTransform(scrollProgress, range.input, range.opacity);
  const y = useTransform(scrollProgress, range.input, range.y);
  const x = useTransform(scrollProgress, range.input, range.x);
  const visibility = useTransform(opacity, (v) => (v > 0.02 ? "visible" : "hidden"));

  if (shouldReduceMotion) {
    return stepIndex === 0 ? <div className={className}>{children}</div> : null;
  }

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        y,
        x,
        visibility,
        zIndex: stepIndex,
        position: "absolute",
        inset: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollProgressBarProps {
  scrollProgress: MotionValue<number>;
  className?: string;
}

export function ScrollProgressBar({ scrollProgress, className }: ScrollProgressBarProps) {
  const width = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={className}>
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-border/60">
        <motion.div className="h-full rounded-full bg-title" style={{ width }} />
      </div>
    </div>
  );
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);
    setMatches(media.matches);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
