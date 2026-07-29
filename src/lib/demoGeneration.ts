import { EF_FELLOWSHIP_URL } from "@/components/dashboard/businessContext";
import { GENERATION_TOTAL_MS } from "@/lib/chatSetup";
import type { BusinessContext } from "@/components/dashboard/businessContext";
import type { ChatMessage, LinkedInPostData } from "@/components/dashboard/projects";

export const EF_FELLOWSHIP_IMAGE = "/ef-fellowship-banner.png";

export type GeneratedReply =
  | { type: "text"; content: string }
  | { type: "linkedin-post"; post: LinkedInPostData; plainText: string };

function isQuestion(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return (
    lower.includes("how should") ||
    lower.includes("how do i") ||
    lower.includes("how can i") ||
    lower.includes("what should") ||
    lower.includes("?") ||
    lower.startsWith("help ")
  );
}

function formatRecentUpdates(updates: string[]): string {
  if (updates.length === 0) return "";
  const recent = updates.slice(-3);
  return `\n\nRecent updates I'm factoring in:\n${recent.map((u) => `• ${u}`).join("\n")}`;
}

function buildCoachingReply(business: BusinessContext): GeneratedReply {
  const updates = formatRecentUpdates(business.updates);
  return {
    type: "text",
    content: `Here's how I'd approach a LinkedIn post about The Fellowship Residency for ${business.businessName}:

**Angle:** Speak to ambitious individuals at the very start of their journey — before they have a cofounder, a deck, or full-time commitment.

**Structure:**
1. Open with the moment of uncertainty every early builder knows
2. Introduce the Fellowship as space to explore, not pressure to commit
3. Highlight 2–3 concrete benefits ($10K grant, SF housing, founder community)
4. End with a direct CTA to apply

**Tone tip:** Personal and encouraging — you're talking to someone deciding whether they're ready to bet on themselves.

**Draft hook to get you started:**
"If you're talented, ambitious, and still figuring out what to build — there's a program designed exactly for that moment."${updates}

Want me to write the full post? Just say "write the full post" or give me more details.`,
  };
}

function buildPostReply(
  business: BusinessContext,
  postMaterials?: string
): GeneratedReply {
  const updates = formatRecentUpdates(business.updates);
  const referenceLinks = [business.linksAndMaterials, postMaterials]
    .filter((value) => value && value.trim().toLowerCase() !== "skip")
    .join("\n");

  const body = `If you're at the start of your founder journey — this might be exactly what you need.

Entrepreneurs First just opened applications for The Fellowship Residency: a $10K equity-free grant, three months of housing in San Francisco, and a curated community of exceptional outliers figuring out what to build — often before they even have a cofounder or a pitch deck.

What stood out to me:
→ $10K equity-free to explore, experiment, and find your path
→ Live alongside founders testing ideas and evaluating potential cofounders
→ Dedicated 1:1 coaching plus access to EF partners, advisors, and mentors
→ A pathway to EF's full $250K investment and Demo Day with tier-1 U.S. investors

You don't need to be full-time committed yet. You need ambition, curiosity, and a willingness to figure out what the world actually needs from you.

Applications are rolling. If you're serious about building something important, it's worth a look.`;

  const hashtags = ["Entrepreneurship", "Startups", "Founders", "EF"];

  const post: LinkedInPostData = {
    body,
    hashtags,
    imageSrc: EF_FELLOWSHIP_IMAGE,
    link: {
      url: EF_FELLOWSHIP_URL,
      title: "The Fellowship Residency | Entrepreneurs First",
      domain: "joinef.com",
    },
  };

  const plainText = `${body}

Apply here: ${EF_FELLOWSHIP_URL}${referenceLinks ? `\n\nReference materials:\n${referenceLinks}` : ""}${updates}

${hashtags.map((tag) => `#${tag}`).join(" ")}`;

  return { type: "linkedin-post", post, plainText };
}

export function generateLinkedInReply(
  business: BusinessContext,
  messages: ChatMessage[],
  postMaterials?: string
): GeneratedReply {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const prompt = lastUser?.content ?? "";

  if (isQuestion(prompt)) {
    return buildCoachingReply(business);
  }
  return buildPostReply(business, postMaterials);
}

export function simulateLinkedInReply(
  business: BusinessContext,
  messages: ChatMessage[],
  postMaterials: string | undefined,
  onComplete: (reply: GeneratedReply) => void
): () => void {
  const reply = generateLinkedInReply(business, messages, postMaterials);
  const timeoutId = setTimeout(() => onComplete(reply), GENERATION_TOTAL_MS);
  return () => clearTimeout(timeoutId);
}
