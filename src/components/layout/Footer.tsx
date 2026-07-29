export function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Product Releases", "Build", "Share", "Print", "Pricing"],
    },
    {
      title: "Community",
      links: ["Slack", "Reddit", "Template Gallery", "Getting Started"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Support"],
    },
    {
      title: "Company",
      links: ["About us", "Blog", "Careers", "Legal"],
    },
  ];

  return (
    <footer className="border-t border-border bg-white py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#waitlist" className="text-sm text-sub hover:text-title">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-lg font-bold text-title">wonder</p>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Wonder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
