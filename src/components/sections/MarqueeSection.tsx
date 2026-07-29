import {
  Calendar,
  DesignNib,
  Globe,
  MediaImage,
  Page,
  Printer,
  StatsUpSquare,
} from "iconoir-react";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

const things = [
  {
    icon: Globe,
    label: "Website",
    description: "Homepage for your local shop, ready to publish",
    iconClassName: "bg-[#0081A7]/15 text-[#0081A7]",
  },
  {
    icon: Page,
    label: "Menu PDF",
    description: "Print-ready lunch and dinner menus",
    iconClassName: "bg-[#FED9B7] text-[#c47a2a]",
  },
  {
    icon: MediaImage,
    label: "Instagram Post",
    description: "Weekly specials and seasonal promotions",
    iconClassName: "bg-[#F07167]/15 text-[#F07167]",
  },
  {
    icon: DesignNib,
    label: "Flyer",
    description: "Grand opening and event announcements",
    iconClassName: "bg-[#00AFB9]/15 text-[#00AFB9]",
  },
  {
    icon: StatsUpSquare,
    label: "Social Story",
    description: "Behind-the-scenes reels and quick updates",
    iconClassName: "bg-[#F07167]/15 text-[#d85a50]",
  },
  {
    icon: Calendar,
    label: "Google Post",
    description: "Holiday hours and local business updates",
    iconClassName: "bg-[#0081A7]/15 text-[#006d8f]",
  },
  {
    icon: Page,
    label: "Price List",
    description: "Salon, barber, and service menus",
    iconClassName: "bg-[#FED9B7] text-[#b86820]",
  },
  {
    icon: Printer,
    label: "Signage",
    description: "Window displays and in-store print materials",
    iconClassName: "bg-[#00AFB9]/15 text-[#008a92]",
  },
];

function ThingCard({ icon: Icon, label, description, iconClassName }: (typeof things)[0]) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-semibold text-title">{label}</p>
        </div>
      </div>
      <p className="mt-3 text-left text-sm leading-relaxed text-sub">{description}</p>
    </>
  );
}

export function MarqueeSection() {
  const rowOne = things.slice(0, 4);
  const rowTwo = things.slice(4);

  return (
    <PaperTexture id="community" className="scroll-mt-20 py-16 md:py-24">
      <FadeInView className="mx-auto mb-12 max-w-3xl px-5 text-center md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
          Websites, menus, posts, and more
        </h2>
      </FadeInView>

      <div className="marquee-animate space-y-4">
        <Marquee>
          {rowOne.map((thing) => (
            <MarqueeItem key={thing.label}>
              <ThingCard {...thing} />
            </MarqueeItem>
          ))}
        </Marquee>
        <Marquee reverse>
          {rowTwo.map((thing) => (
            <MarqueeItem key={thing.label}>
              <ThingCard {...thing} />
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      <div className="marquee-static flex-wrap justify-center gap-4 px-5">
        {things.map((thing) => (
          <MarqueeItem key={thing.label}>
            <ThingCard {...thing} />
          </MarqueeItem>
        ))}
      </div>
    </PaperTexture>
  );
}
