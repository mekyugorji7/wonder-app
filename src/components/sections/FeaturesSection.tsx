import { AppWindow, ChatBubble, Printer } from "iconoir-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeInView } from "@/components/motion/FadeInView";

const features = [
  {
    icon: AppWindow,
    title: "One agent. Every channel.",
    description:
      "No more scattered tools or endless revisions. Your website, social posts, and print materials — all managed in one clean space.",
  },
  {
    icon: ChatBubble,
    title: "Your voice, not generic AI.",
    description:
      "Wonder learns your brand, neighborhood, and tone — so every output sounds like you, not a template.",
  },
  {
    icon: Printer,
    title: "Ready to print and post.",
    description:
      "From Instagram stories to menu PDFs — get assets sized, formatted, and ready to use the moment you approve them.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-28 pb-16 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {features.map((feature, i) => (
          <FadeInView key={feature.title} delay={i * 0.1}>
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader>
                <feature.icon
                  className="mb-2 h-6 w-6 text-accent"
                  strokeWidth={1.5}
                />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
