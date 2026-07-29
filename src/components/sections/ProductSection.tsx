import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { PaperTexture } from "@/components/ui/PaperTexture";
import {
  ScrollProgressBar,
  ScrollStepText,
  useActiveStepIndex,
  useMediaQuery,
  useScrollSteps,
} from "@/components/motion/ScrollStepPanel";
import { ProductAppMockScroll } from "@/components/sections/product/ProductMocks";
import { ProductSectionHeader } from "@/components/sections/product/ProductSectionHeader";
import { ProductStepCopy } from "@/components/sections/product/ProductStepCopy";
import { ProductSectionTabs } from "@/components/sections/product/ProductSectionTabs";
import { ProductStepNav } from "@/components/sections/product/ProductStepNav";
import { productSteps } from "@/components/sections/product/productSteps";

const STEP_COUNT = productSteps.length;

function ProductScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useScrollSteps(containerRef);
  const activeIndex = useActiveStepIndex(scrollYProgress, STEP_COUNT);

  const mockScale = useTransform(scrollYProgress, (progress) => {
    const segment = 1 / STEP_COUNT;
    const local = (progress % segment) / segment;
    const breathe = 1 + Math.sin(local * Math.PI) * 0.012;
    return breathe;
  });

  return (
    <PaperTexture id="product" className="scroll-mt-28 py-10 md:py-14">
      <div ref={containerRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="h-20 shrink-0 md:h-24" aria-hidden />

          <div className="flex flex-1 items-center justify-center px-5 md:px-8">
            <div className="mx-auto w-full max-w-5xl">
              <ProductSectionHeader className="mb-4 text-center md:mb-5" />

              <div className="product-panel overflow-hidden p-5 md:p-7">
                <div className="flex justify-center">
                  <ProductStepNav activeIndex={activeIndex} />
                </div>

                <div className="mt-5 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                  <div
                    className="relative min-h-[240px] overflow-hidden md:min-h-[260px]"
                    aria-live="polite"
                  >
                    {productSteps.map((step, index) => (
                      <ScrollStepText
                        key={step.id}
                        stepIndex={index}
                        stepCount={STEP_COUNT}
                        scrollProgress={scrollYProgress}
                      >
                        <ProductStepCopy step={step} />
                      </ScrollStepText>
                    ))}
                  </div>

                  <motion.div
                    className="relative min-h-[200px] md:min-h-[220px]"
                    style={{ scale: mockScale }}
                  >
                    <ProductAppMockScroll
                      scrollProgress={scrollYProgress}
                      stepCount={STEP_COUNT}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-10 shrink-0 md:h-12">
            <ScrollProgressBar
              scrollProgress={scrollYProgress}
              className="absolute bottom-1 left-1/2 w-40 -translate-x-1/2 md:bottom-2 md:w-52"
            />
          </div>
        </div>
      </div>
    </PaperTexture>
  );
}

export function ProductSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (prefersReducedMotion || isMobile) {
    return <ProductSectionTabs />;
  }

  return <ProductScrollSection />;
}
