import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChatBubble,
  Eye,
  Rocket,
  MediaImage,
  Calendar,
  StatsUpSquare,
  Page,
  DesignNib,
  Download,
  Globe,
  EditPencil,
} from "iconoir-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeInView } from "@/components/motion/FadeInView";

const flows = {
  website: {
    label: "Website",
    steps: [
      { icon: ChatBubble, title: "Describe your business", description: "Tell Wonder about your shop, services, and neighborhood vibe." },
      { icon: Globe, title: "Wonder drafts your site", description: "Get a full website with copy, layout, and photos — in minutes." },
      { icon: EditPencil, title: "Review & refine", description: "Tweak headlines, swap images, and approve every page before launch." },
      { icon: Rocket, title: "Publish live", description: "Go live with a custom domain — no developer needed." },
    ],
  },
  media: {
    label: "Media",
    steps: [
      { icon: ChatBubble, title: "Share your brand", description: "Upload your logo, colors, and a few photos of your business." },
      { icon: MediaImage, title: "Wonder creates posts", description: "Instagram, Facebook, and story templates — on-brand and ready." },
      { icon: Calendar, title: "Schedule content", description: "Plan a month of posts in one sitting with smart scheduling." },
      { icon: StatsUpSquare, title: "Track engagement", description: "See what resonates and let Wonder suggest your next post." },
    ],
  },
  materials: {
    label: "Materials",
    steps: [
      { icon: Page, title: "Upload menu or offer", description: "Share your menu, price list, or seasonal promotion details." },
      { icon: DesignNib, title: "Wonder designs print assets", description: "Flyers, menus, signage, and business cards — print-ready." },
      { icon: Eye, title: "Preview proofs", description: "Review every layout before sending to your local print shop." },
      { icon: Download, title: "Download & print", description: "Export high-res PDFs sized for any printer or vendor." },
    ],
  },
} as const;

type FlowKey = keyof typeof flows;

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<FlowKey>("website");

  return (
    <section id="how-it-works" className="scroll-mt-28 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <FadeInView className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
            We&apos;ve done the hard part — now it&apos;s your turn to grow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sub">
            Whether you need a website, social content, or print materials, everything is designed to flow effortlessly.
          </p>
        </FadeInView>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as FlowKey)}
          className="mt-10"
        >
          <div className="flex justify-center">
            <TabsList>
              {(Object.keys(flows) as FlowKey[]).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {flows[key].label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {(Object.keys(flows) as FlowKey[]).map((key) => (
            <TabsContent key={key} value={key}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {flows[key].steps.map((step) => (
                    <Card key={step.title} className="transition-transform hover:scale-[1.01]">
                      <CardHeader>
                        <step.icon className="mb-2 h-6 w-6 text-accent" strokeWidth={1.5} />
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
