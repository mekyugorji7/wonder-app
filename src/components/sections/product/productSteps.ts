export interface ProductStep {
  id: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
}

export const productSteps: ProductStep[] = [
  {
    id: "build",
    label: "Build",
    title: "From first idea to live website",
    description:
      "Wonder moves with you — describe your business once, then refine pages, copy, and photos when you're ready. Turn a quick conversation into a site you're proud to share.",
    tags: ["Templates", "Custom domains", "SEO ready", "Publish & share"],
  },
  {
    id: "share",
    label: "Share",
    title: "Social content that sounds like you",
    description:
      "Keep your brand voice consistent across every channel. Wonder creates posts, stories, and campaigns tailored to your neighborhood — not generic AI slop.",
    tags: ["Instagram", "Facebook", "Scheduling", "Brand voice"],
  },
  {
    id: "print",
    label: "Print",
    title: "Materials that don't feel like work",
    description:
      "Menus, flyers, and signage — sized, formatted, and ready for your local print shop. Wonder keeps your thinking connected to what your customers actually see.",
    tags: ["Menus", "Flyers", "Signage", "PDF export"],
  },
];

export type ProductStepKey = (typeof productSteps)[number]["id"];
