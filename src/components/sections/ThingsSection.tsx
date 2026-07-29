import { Globe, Instagram, Megaphone, Menu, Printer } from "iconoir-react";
import type { ComponentType } from "react";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { FadeInView } from "@/components/motion/FadeInView";

const categories: {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { label: "Websites", icon: Globe },
  { label: "Social Media", icon: Instagram },
  { label: "Print Materials", icon: Printer },
  { label: "Menus", icon: Menu },
  { label: "Flyers", icon: Megaphone },
];

export function ThingsSection() {
  return (
    <PaperTexture className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <FadeInView>
          <h2 className="font-display text-2xl font-semibold leading-snug text-title md:text-3xl">
            Wonder is for everything you need.
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:flex-nowrap md:gap-2.5">
            {categories.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-white px-3.5 text-sm leading-none text-title shadow-sm md:px-4"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <Icon className="h-4 w-4 text-sky-500" strokeWidth={1.5} />
                </span>
                {label}
              </span>
            ))}
          </div>
        </FadeInView>
      </div>
    </PaperTexture>
  );
}
