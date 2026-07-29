import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { FadeInView } from "@/components/motion/FadeInView";

const previews = [
  {
    label: "Website",
    gradient: "from-blue-100 to-blue-50",
    speed: 0.4,
  },
  {
    label: "Social Post",
    gradient: "from-pink-100 to-rose-50",
    speed: 0.7,
  },
  {
    label: "Menu PDF",
    gradient: "from-amber-100 to-orange-50",
    speed: 1,
  },
  {
    label: "Flyer",
    gradient: "from-emerald-100 to-green-50",
    speed: 0.6,
  },
];

export function ShowcaseSection() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <FadeInView className="mx-auto mb-12 max-w-4xl px-4 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
          Real outputs. Real businesses.
        </h2>
        <p className="mt-4 text-lg text-sub">
          From bakery websites to salon Instagram posts — Wonder builds what your customers actually see.
        </p>
      </FadeInView>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 md:flex-nowrap">
        {previews.map((preview) => (
          <ParallaxLayer
            key={preview.label}
            speed={preview.speed}
            className="w-full md:w-1/4"
          >
            <div
              className={`rounded-2xl border border-border bg-gradient-to-br ${preview.gradient} p-6 shadow-sm`}
            >
              <div className="aspect-[4/5] rounded-xl bg-surface/60 p-4">
                <div className="h-3 w-2/3 rounded bg-title/10" />
                <div className="mt-3 h-2 w-full rounded bg-sub/10" />
                <div className="mt-2 h-2 w-4/5 rounded bg-sub/10" />
                <div className="mt-6 aspect-square rounded-lg bg-white/80" />
              </div>
              <p className="mt-4 text-center text-sm font-heading font-medium text-title">
                {preview.label}
              </p>
            </div>
          </ParallaxLayer>
        ))}
      </div>
    </section>
  );
}
