import type { ProductStep } from "@/components/sections/product/productSteps";

interface ProductStepCopyProps {
  step: ProductStep;
  className?: string;
}

export function ProductStepCopy({ step, className }: ProductStepCopyProps) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-500">{step.label}</p>
      <h2 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-title md:text-[1.75rem] md:leading-[1.15]">
        {step.title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-sub md:text-base">
        {step.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-white px-3 py-1 text-xs text-title"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
