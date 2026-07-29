import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";

export function OnboardingGuard() {
  const { isOnboarded } = useBusinessContext();
  const { pathname } = useLocation();

  const isInitialOnboarding = pathname === "/app/onboarding";

  if (!isOnboarded && !isInitialOnboarding && pathname !== "/app/onboarding/add") {
    return <Navigate to="/app/onboarding" replace />;
  }

  if (isOnboarded && isInitialOnboarding) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
