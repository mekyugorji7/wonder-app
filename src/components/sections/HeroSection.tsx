import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HeroMockup } from "@/components/sections/HeroMockup";
import { HeroSquiggles } from "@/components/ui/HeroSquiggles";

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-12 md:pb-16">
      <HeroSquiggles />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center px-5 pb-8 pt-28 text-center md:px-8 md:pt-32">
          <motion.h1
            className="max-w-4xl font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            the creative agent for your business.
          </motion.h1>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/app/onboarding/add"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-slate-900/30 px-8 text-sm font-medium text-white shadow-[0_8px_32px_rgba(15,23,42,0.2)] backdrop-blur-xl backdrop-saturate-150 transition-all hover:border-white/35 hover:bg-slate-900/45"
            >
              Try Wonder Free
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative w-full max-w-4xl px-4 md:px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  );
}
