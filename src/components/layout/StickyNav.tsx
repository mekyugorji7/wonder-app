import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
  { label: "Learn", href: "#faq" },
];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      e.preventDefault();
      const id = target.getAttribute("href")?.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-3 left-0 right-0 z-50 px-4 transition-all duration-300 md:top-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto grid h-12 max-w-5xl grid-cols-[1fr_auto_1fr] items-center rounded-full border px-4 md:h-14 md:px-6",
          "border-sky-100/50 bg-sky-50/20 shadow-[0_8px_32px_rgba(59,130,246,0.05)] backdrop-blur-xl backdrop-saturate-150",
          scrolled && "border-sky-100/45 bg-sky-50/30 shadow-sm"
        )}
      >
        <a
          href="#"
          className="justify-self-start font-display text-base font-bold tracking-tight text-title md:text-lg"
        >
          wonder
        </a>

        <div className="hidden items-center gap-5 justify-self-center lg:flex lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-sub transition-colors hover:text-title"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <a href="#waitlist">Log in</a>
          </Button>
          <Button size="sm" asChild>
            <Link to="/app/onboarding/add">Try Wonder Free</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
