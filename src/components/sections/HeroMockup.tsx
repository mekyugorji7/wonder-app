function MockCard({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <div className={`rounded-xl p-3 ${className}`}>
      <div className="mb-2 h-2 w-16 rounded bg-black/10" />
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded bg-black/10" />
        <div className="h-1.5 w-4/5 rounded bg-black/10" />
      </div>
      <p className="mt-3 text-[10px] font-medium text-title/70">{title}</p>
    </div>
  );
}

export function HeroMockup() {
  return (
    <div className="craft-card mx-auto w-full max-w-3xl overflow-hidden shadow-[0_24px_80px_rgba(26,26,26,0.18)]">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-muted">Wonder — Rosewood Bakery</span>
      </div>

      <div className="flex min-h-[280px] bg-surface md:min-h-[320px]">
        <aside className="hidden w-44 shrink-0 border-r border-border bg-page/50 p-4 sm:block">
          <div className="mb-4 h-2 w-20 rounded bg-title/10" />
          <div className="space-y-2">
            {["Website", "Social", "Print", "Brand"].map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-2 py-1.5 text-xs ${i === 0 ? "bg-accent-soft font-medium text-title" : "text-muted"}`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="grid flex-1 grid-cols-2 gap-3 p-4 md:grid-cols-3 md:gap-4 md:p-5">
          <MockCard title="Website draft" className="bg-sky-100/80" />
          <MockCard title="Instagram post" className="bg-rose-100/80" />
          <MockCard title="Menu PDF" className="bg-amber-100/80" />
          <MockCard title="Flyer" className="bg-emerald-100/80 md:col-span-1" />
          <MockCard title="Story template" className="bg-violet-100/80 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}
