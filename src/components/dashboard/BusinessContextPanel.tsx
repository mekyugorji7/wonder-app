import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";

export function BusinessContextPanel() {
  const { context, activeBusinessId, updateContext, addUpdate } =
    useBusinessContext();
  const [draft, setDraft] = useState({
    businessName: context?.businessName ?? "",
    productDescription: context?.productDescription ?? "",
    platformUse: context?.platformUse ?? "",
    linksAndMaterials: context?.linksAndMaterials ?? "",
  });
  const [newUpdate, setNewUpdate] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!context) return;
    setDraft({
      businessName: context.businessName,
      productDescription: context.productDescription,
      platformUse: context.platformUse,
      linksAndMaterials: context.linksAndMaterials ?? "",
    });
    setNewUpdate("");
  }, [activeBusinessId, context]);

  if (!context) return null;

  const handleSave = () => {
    updateContext(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return;
    addUpdate(newUpdate);
    setNewUpdate("");
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-title">
            {context.businessName} — profile
          </h2>
          <p className="mt-1 text-sm text-sub">
            Wonder uses this context when drafting LinkedIn posts for this business.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
          <div className="space-y-2">
            <label htmlFor="biz-name" className="text-sm font-medium text-title">
              Business name
            </label>
            <input
              id="biz-name"
              value={draft.businessName}
              onChange={(e) =>
                setDraft((d) => ({ ...d, businessName: e.target.value }))
              }
              className="flex h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="biz-desc" className="text-sm font-medium text-title">
              What you're building
            </label>
            <textarea
              id="biz-desc"
              value={draft.productDescription}
              onChange={(e) =>
                setDraft((d) => ({ ...d, productDescription: e.target.value }))
              }
              rows={3}
              className="flex w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="biz-use" className="text-sm font-medium text-title">
              Platform use
            </label>
            <textarea
              id="biz-use"
              value={draft.platformUse}
              onChange={(e) =>
                setDraft((d) => ({ ...d, platformUse: e.target.value }))
              }
              rows={2}
              className="flex w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="biz-links" className="text-sm font-medium text-title">
              Links & materials
            </label>
            <textarea
              id="biz-links"
              value={draft.linksAndMaterials}
              onChange={(e) =>
                setDraft((d) => ({ ...d, linksAndMaterials: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Landing pages, press kits, or reference URLs"
              className="flex w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-title placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" size="sm" onClick={handleSave}>
              Save changes
            </Button>
            {saved && <span className="text-sm text-sub">Saved</span>}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-title">
            Founder updates
          </h2>
          <p className="mt-1 text-sm text-sub">
            Add news and milestones — Wonder weaves these into your posts.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <textarea
            placeholder="e.g. We hired a head baker, launching summer menu next week"
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            rows={2}
            className="mb-3 flex w-full resize-none rounded-2xl border border-border bg-page px-4 py-3 text-sm text-title placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          />
          <Button type="button" size="sm" variant="outline" onClick={handleAddUpdate}>
            Add update
          </Button>

          {context.updates.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {context.updates.map((update, i) => (
                <li
                  key={`${update}-${i}`}
                  className={cn(
                    "rounded-xl border border-border bg-page/60 px-4 py-3 text-sm text-title"
                  )}
                >
                  {update}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">No updates yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
