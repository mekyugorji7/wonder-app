import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { ProductAppMockStatic } from "@/components/sections/product/ProductMocks";
import { ProductSectionHeader } from "@/components/sections/product/ProductSectionHeader";
import { ProductStepCopy } from "@/components/sections/product/ProductStepCopy";
import { productSteps, type ProductStepKey } from "@/components/sections/product/productSteps";

const stepIndexMap: Record<ProductStepKey, number> = {
  build: 0,
  share: 1,
  print: 2,
};

export function ProductSectionTabs() {
  const [activeTab, setActiveTab] = useState<ProductStepKey>("build");
  const activeIndex = stepIndexMap[activeTab];

  return (
    <PaperTexture id="product" className="scroll-mt-28 pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <ProductSectionHeader className="mb-5 text-center md:mb-6" />

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ProductStepKey)}
        >
          <div className="flex justify-center">
            <TabsList>
              {productSteps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  className="data-[state=active]:bg-accent-soft data-[state=active]:text-sky-800 data-[state=active]:shadow-none"
                >
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="product-panel mt-3 overflow-hidden p-5 md:p-7"
                aria-live="polite"
              >
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                  <ProductStepCopy step={productSteps[activeIndex]} />
                  <ProductAppMockStatic activeIndex={activeIndex} />
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </PaperTexture>
  );
}
