import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView } from "@/components/motion/FadeInView";

const faqs = [
  {
    question: "How long does it take to get my website?",
    answer:
      "Most businesses receive a complete draft within 10 minutes of describing their shop. Review and publish when you're ready — no waiting weeks for an agency.",
  },
  {
    question: "Do I own the content Wonder creates?",
    answer:
      "Yes. Everything Wonder generates — copy, designs, and assets — belongs to you. Use them however you like, with no licensing fees.",
  },
  {
    question: "What does Wonder cost?",
    answer:
      "Wonder is free during early access. When we launch, we'll offer simple monthly plans designed for small business budgets — no surprise invoices.",
  },
  {
    question: "What types of businesses does Wonder support?",
    answer:
      "Wonder works for any local business — bakeries, salons, gyms, florists, auto shops, restaurants, and more. If you serve your community, Wonder is built for you.",
  },
  {
    question: "Can Wonder match my existing brand?",
    answer:
      "Absolutely. Upload your logo, share your colors, and Wonder adapts every output to feel like an extension of your existing brand.",
  },
  {
    question: "Do I need design or tech skills?",
    answer:
      "Not at all. Just describe your business in plain language. Wonder handles design, copy, formatting, and publishing — you approve the results.",
  },
];

export function WaitlistSection() {
  return (
    <section id="faq" className="scroll-mt-28 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <FadeInView className="mb-10 text-center md:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Learn</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-title md:text-3xl">
            Q&amp;A
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-sub md:text-base">
            Common questions about Wonder, answered.
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInView>
      </div>
    </section>
  );
}
