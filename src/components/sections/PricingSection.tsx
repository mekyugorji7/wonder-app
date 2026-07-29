import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { FadeInView } from "@/components/motion/FadeInView";

const plans = [
  {
    name: "Free",
    tagline: "Full access, great if you use it occasionally each week.",
    price: "$0",
    period: "/month",
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Plus",
    tagline: "Designed to effortlessly fit into your everyday flow.",
    price: "$5",
    period: "/month",
    originalPrice: "$8.0",
    cta: "Upgrade to Plus",
    featured: true,
  },
];

export function PricingSection() {
  return (
    <PaperTexture id="pricing" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <FadeInView className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
            Your pace, your plan
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sub">
            Use it now and then, or integrate it into your daily flow.
          </p>
        </FadeInView>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <FadeInView key={plan.name} delay={i * 0.1}>
              <div className="pricing-card flex h-full flex-col p-8 md:p-10">
                <h3 className="font-display text-2xl font-bold text-title">{plan.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sub">{plan.tagline}</p>
                <div className="mt-8 flex items-baseline gap-1">
                  {"originalPrice" in plan && plan.originalPrice && (
                    <span className="mr-2 text-lg text-muted line-through">{plan.originalPrice}</span>
                  )}
                  <span className="font-display text-4xl font-bold text-title">{plan.price}</span>
                  <span className="text-sub">{plan.period}</span>
                </div>
                <Button
                  className="mt-8 w-full"
                  variant={plan.featured ? "default" : "outline"}
                  asChild
                >
                  <Link to="/app">{plan.cta}</Link>
                </Button>
              </div>
            </FadeInView>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Learn more about{" "}
          <a href="#faq" className="text-title underline-offset-4 hover:underline">
            group discounts
          </a>
        </p>
      </div>
    </PaperTexture>
  );
}
