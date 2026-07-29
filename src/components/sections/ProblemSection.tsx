import { FadeInView } from "@/components/motion/FadeInView";

export function ProblemSection() {
  return (
    <section id="why" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <FadeInView>
          <h2 className="font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
            Because great local businesses get overlooked online
          </h2>
        </FadeInView>
        <FadeInView delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-sub">
            Most owners don&apos;t have time for design, copy, or keeping every channel updated — so we built a simpler way.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
