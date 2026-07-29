export type ProjectType = "website" | "social" | "content" | "print";
export type ContentFormat = "copy" | "linkedin" | "ads";
export type ProjectStatus = "Generating" | "Draft" | "Scheduled" | "Ready" | "Published";
export type GenerationStatus = "generating" | "complete";
export type ChatPhase = "topic" | "prompt" | "materials" | "chat";

export interface LinkedInPostData {
  body: string;
  hashtags: string[];
  imageSrc: string;
  link: {
    url: string;
    title: string;
    domain: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  linkedInPost?: LinkedInPostData;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  contentFormat?: ContentFormat;
  status: ProjectStatus;
  generationStatus: GenerationStatus;
  generatedContent?: string;
  messages: ChatMessage[];
  materials?: string;
  chatPhase: ChatPhase;
  isReplying?: boolean;
  accent: string;
  updatedAt: string;
}

export type DashboardSection = "overview" | "linkedin" | "business" | ProjectType;

export const typeAccents: Record<ProjectType, string> = {
  website: "bg-sky-100/80",
  social: "bg-rose-100/80",
  content: "bg-stone-100/80",
  print: "bg-amber-100/80",
};

export const sectionMeta: Record<
  Exclude<DashboardSection, "overview">,
  { title: string; description: string }
> = {
  linkedin: {
    title: "LinkedIn Posts",
    description: "Create posts grounded in your business context.",
  },
  business: {
    title: "Business",
    description: "Your business profile and founder updates.",
  },
  website: {
    title: "Website",
    description: "Pages, templates, and your live site — all in one place.",
  },
  social: {
    title: "Social",
    description: "Posts, stories, and campaigns tailored to your brand voice.",
  },
  content: {
    title: "Content",
    description: "Copy, descriptions, and written assets for every channel.",
  },
  print: {
    title: "Print",
    description: "Menus, flyers, and signage ready for your local print shop.",
  },
};

export const projectTypeLabels: Record<ProjectType, string> = {
  website: "Website",
  social: "Social",
  content: "Content",
  print: "Print",
};

export const contentFormatLabels: Record<ContentFormat, string> = {
  copy: "Copy & pages",
  linkedin: "LinkedIn post",
  ads: "Ads post",
};

export const contentFormatAccents: Record<ContentFormat, string> = {
  copy: "bg-stone-100/80",
  linkedin: "bg-blue-100/80",
  ads: "bg-orange-100/80",
};

export const contentFormatPlaceholders: Record<ContentFormat, string> = {
  copy: "e.g. About page, Product description",
  linkedin: "e.g. Hiring announcement, Company update",
  ads: "e.g. Summer sale campaign, Local promo",
};
