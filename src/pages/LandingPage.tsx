import { ProductSection } from "@/components/sections/ProductSection";
import { StickyNav } from "@/components/layout/StickyNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ThingsSection } from "@/components/sections/ThingsSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export function LandingPage() {
  return (
    <>
      <StickyNav />
      <main className="bg-white">
        <HeroSection />
        <ThingsSection />
        <MarqueeSection />
        <ProductSection />
        <PricingSection />
        <WaitlistSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
