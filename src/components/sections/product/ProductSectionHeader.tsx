import { FadeInView } from "@/components/motion/FadeInView";

interface ProductSectionHeaderProps {
  className?: string;
}

export function ProductSectionHeader({ className }: ProductSectionHeaderProps) {
  return (
    <FadeInView className={className}>
      <p className="text-xs font-medium uppercase tracking-widest text-muted">Product</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-title md:text-3xl">
        One tool, three outputs
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-sub md:text-base">
        Build your website, share on social, and print materials — all from one place.
      </p>
    </FadeInView>
  );
}
