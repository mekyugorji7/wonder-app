export interface Business {
  id: string;
  businessName: string;
  productDescription: string;
  platformUse: string;
  linksAndMaterials: string;
  updates: string[];
  createdAt: string;
}

/** @deprecated Use Business — kept for generation helpers */
export type BusinessContext = Business;

export interface BusinessWorkspace {
  businesses: Business[];
  activeBusinessId: string | null;
}

export const STORAGE_KEY = "wonder-businesses";
const LEGACY_STORAGE_KEY = "wonder-business-context";

export const EF_FELLOWSHIP_URL =
  "https://www.joinef.com/the-fellowship-residency/";

export const ROSEWOOD_DEFAULT: Omit<Business, "id" | "createdAt"> = {
  businessName: "Rosewood Bakery",
  productDescription:
    "Artisan neighborhood bakery — fresh bread, pastries, and custom cakes baked daily with locally sourced ingredients.",
  platformUse: "LinkedIn posts to share updates and grow our local brand.",
  linksAndMaterials: EF_FELLOWSHIP_URL,
  updates: [],
};

interface LegacyBusiness {
  businessName: string;
  productDescription: string;
  platformUse: string;
  updates: string[];
  onboardedAt: string;
  linksAndMaterials?: string;
}

function createBusiness(data: Omit<Business, "id" | "createdAt">): Business {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
}

function normalizeBusiness(business: Business): Business {
  return {
    ...business,
    linksAndMaterials: business.linksAndMaterials ?? "",
  };
}

function migrateLegacy(raw: LegacyBusiness): BusinessWorkspace {
  const business = createBusiness({
    businessName: raw.businessName,
    productDescription: raw.productDescription,
    platformUse: raw.platformUse,
    linksAndMaterials: raw.linksAndMaterials ?? "",
    updates: raw.updates ?? [],
  });
  return { businesses: [business], activeBusinessId: business.id };
}

export function loadBusinessWorkspace(): BusinessWorkspace {
  if (typeof window === "undefined") {
    return { businesses: [], activeBusinessId: null };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BusinessWorkspace;
      if (Array.isArray(parsed.businesses)) {
        return {
          ...parsed,
          businesses: parsed.businesses.map(normalizeBusiness),
        };
      }
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as LegacyBusiness;
      if (parsed.businessName) {
        const workspace = migrateLegacy(parsed);
        saveBusinessWorkspace(workspace);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return workspace;
      }
    }
  } catch {
    // fall through
  }

  return { businesses: [], activeBusinessId: null };
}

export function saveBusinessWorkspace(workspace: BusinessWorkspace): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
}

export function getActiveBusiness(
  workspace: BusinessWorkspace
): Business | null {
  if (!workspace.activeBusinessId) return null;
  return (
    workspace.businesses.find((b) => b.id === workspace.activeBusinessId) ?? null
  );
}

export function createRosewoodBusiness(): Business {
  return createBusiness(ROSEWOOD_DEFAULT);
}

export function getBusinessInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
