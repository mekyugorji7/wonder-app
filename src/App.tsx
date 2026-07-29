import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { AppWorkspace } from "@/pages/AppWorkspace";
import { OnboardingGuard } from "@/components/dashboard/OnboardingGuard";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { BusinessPage } from "@/pages/BusinessPage";
import { ProjectPage } from "@/pages/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppWorkspace />}>
        <Route element={<OnboardingGuard />}>
          <Route path="onboarding" element={<OnboardingPage mode="initial" />} />
          <Route path="onboarding/add" element={<OnboardingPage mode="add" />} />
          <Route path="project/:projectId" element={<ProjectPage />} />
          <Route path="business" element={<BusinessPage />} />
          <Route index element={<DashboardPage />} />
          <Route path=":section" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
