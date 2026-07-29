import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createRosewoodBusiness,
  getActiveBusiness,
  loadBusinessWorkspace,
  saveBusinessWorkspace,
  type Business,
  type BusinessWorkspace,
} from "@/components/dashboard/businessContext";

interface BusinessInput {
  businessName: string;
  productDescription: string;
  platformUse: string;
  linksAndMaterials?: string;
}

interface BusinessContextValue {
  context: Business | null;
  businesses: Business[];
  activeBusinessId: string | null;
  isOnboarded: boolean;
  completeOnboarding: (data: BusinessInput) => void;
  skipOnboarding: () => void;
  addBusiness: (data: BusinessInput) => string;
  addRosewoodBusiness: () => string;
  switchBusiness: (id: string) => void;
  updateContext: (partial: Partial<BusinessInput>) => void;
  addUpdate: (text: string) => void;
}

const BusinessContextCtx = createContext<BusinessContextValue | null>(null);

function buildBusiness(data: BusinessInput): Business {
  return {
    id: crypto.randomUUID(),
    businessName: data.businessName.trim(),
    productDescription: data.productDescription.trim(),
    platformUse: data.platformUse.trim(),
    linksAndMaterials: data.linksAndMaterials?.trim() ?? "",
    updates: [],
    createdAt: new Date().toISOString(),
  };
}

export function BusinessContextProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<BusinessWorkspace>(() =>
    loadBusinessWorkspace()
  );

  const persist = useCallback((next: BusinessWorkspace) => {
    setWorkspace(next);
    saveBusinessWorkspace(next);
  }, []);

  const activeBusiness = getActiveBusiness(workspace);

  const addBusinessToWorkspace = useCallback(
    (business: Business, makeActive = true) => {
      setWorkspace((prev) => {
        const next: BusinessWorkspace = {
          businesses: [...prev.businesses, business],
          activeBusinessId: makeActive ? business.id : prev.activeBusinessId,
        };
        saveBusinessWorkspace(next);
        return next;
      });
      return business.id;
    },
    []
  );

  const completeOnboarding = useCallback(
    (data: BusinessInput) => {
      const business = buildBusiness(data);
      persist({ businesses: [business], activeBusinessId: business.id });
    },
    [persist]
  );

  const skipOnboarding = useCallback(() => {
    const business = createRosewoodBusiness();
    persist({ businesses: [business], activeBusinessId: business.id });
  }, [persist]);

  const addBusiness = useCallback(
    (data: BusinessInput) => {
      const business = buildBusiness(data);
      return addBusinessToWorkspace(business, true);
    },
    [addBusinessToWorkspace]
  );

  const addRosewoodBusiness = useCallback(() => {
    const business = createRosewoodBusiness();
    return addBusinessToWorkspace(business, true);
  }, [addBusinessToWorkspace]);

  const switchBusiness = useCallback(
    (id: string) => {
      if (!workspace.businesses.some((b) => b.id === id)) return;
      persist({ ...workspace, activeBusinessId: id });
    },
    [workspace, persist]
  );

  const updateActiveBusiness = useCallback(
    (updater: (business: Business) => Business) => {
      if (!workspace.activeBusinessId) return;
      persist({
        ...workspace,
        businesses: workspace.businesses.map((b) =>
          b.id === workspace.activeBusinessId ? updater(b) : b
        ),
      });
    },
    [workspace, persist]
  );

  const updateContext = useCallback(
    (partial: Partial<BusinessInput>) => {
      updateActiveBusiness((b) => ({
        ...b,
        ...(partial.businessName !== undefined && {
          businessName: partial.businessName.trim(),
        }),
        ...(partial.productDescription !== undefined && {
          productDescription: partial.productDescription.trim(),
        }),
        ...(partial.platformUse !== undefined && {
          platformUse: partial.platformUse.trim(),
        }),
        ...(partial.linksAndMaterials !== undefined && {
          linksAndMaterials: partial.linksAndMaterials.trim(),
        }),
      }));
    },
    [updateActiveBusiness]
  );

  const addUpdate = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      updateActiveBusiness((b) => ({
        ...b,
        updates: [...b.updates, trimmed],
      }));
    },
    [updateActiveBusiness]
  );

  const value = useMemo(
    () => ({
      context: activeBusiness,
      businesses: workspace.businesses,
      activeBusinessId: workspace.activeBusinessId,
      isOnboarded: workspace.businesses.length > 0,
      completeOnboarding,
      skipOnboarding,
      addBusiness,
      addRosewoodBusiness,
      switchBusiness,
      updateContext,
      addUpdate,
    }),
    [
      activeBusiness,
      workspace.businesses,
      workspace.activeBusinessId,
      completeOnboarding,
      skipOnboarding,
      addBusiness,
      addRosewoodBusiness,
      switchBusiness,
      updateContext,
      addUpdate,
    ]
  );

  return (
    <BusinessContextCtx.Provider value={value}>{children}</BusinessContextCtx.Provider>
  );
}

export function useBusinessContext() {
  const ctx = useContext(BusinessContextCtx);
  if (!ctx) {
    throw new Error("useBusinessContext must be used within BusinessContextProvider");
  }
  return ctx;
}
