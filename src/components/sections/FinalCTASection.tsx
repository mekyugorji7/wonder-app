import { Button } from "@/components/ui/button";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { CloudDecor } from "@/components/ui/CloudDecor";
import { FadeInView } from "@/components/motion/FadeInView";
import { WaitlistForm } from "@/components/WaitlistForm";

export function FinalCTASection() {
  return (
    <PaperTexture id="waitlist" className="relative py-24 md:py-32">
      <CloudDecor className="bottom-8 left-8 h-24 w-40 opacity-50" />
      <CloudDecor className="bottom-12 right-12 h-20 w-36 opacity-40" />

      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
        <FadeInView>
          <h2 className="font-display text-3xl font-bold tracking-tight text-title md:text-4xl">
            Let&apos;s get started
          </h2>
          <p className="mt-4 text-lg text-sub">
            Start for free. No credit card required.
          </p>
        </FadeInView>

        <FadeInView delay={0.1} className="mt-10">
          <WaitlistForm />
        </FadeInView>

        <FadeInView delay={0.2} className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <a href="#waitlist">Continue on web</a>
          </Button>
        </FadeInView>
      </div>
    </PaperTexture>
  );
}
