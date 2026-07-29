import { Outlet } from "react-router-dom";
import { BusinessContextProvider } from "@/components/dashboard/BusinessContextProvider";
import { ProjectsProvider } from "@/components/dashboard/ProjectsContext";

export function AppWorkspace() {
  return (
    <BusinessContextProvider>
      <ProjectsProvider>
        <Outlet />
      </ProjectsProvider>
    </BusinessContextProvider>
  );
}
