export const WONDER_TOPIC_QUESTION =
  "Let's create a LinkedIn post together. What's the topic?\n\ne.g. Product launch, Company update, Team news";

export const WONDER_PROMPT_QUESTION =
  "Great. What should this post be about?\n\ne.g. What you're working on, why it matters, and who it's for";

export const WONDER_MATERIALS_QUESTION =
  "Any links or materials I should reference?\n\ne.g. A link, document, or notes — paste anything helpful. Leave blank or type \"skip\" if none.";

export const GENERATION_STEPS = [
  "Getting business context",
  "Aligning voice",
  "Writing your post",
] as const;

export const GENERATION_STEP_MS = 1000;
export const GENERATION_TOTAL_MS =
  GENERATION_STEPS.length * GENERATION_STEP_MS + 400;
