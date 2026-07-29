import { useNavigate } from "react-router-dom";
import { useProjects } from "@/components/dashboard/ProjectsContext";

export function useNewPost() {
  const navigate = useNavigate();
  const { startNewProject } = useProjects();

  return () => {
    const projectId = startNewProject();
    navigate(`/app/project/${projectId}`);
  };
}
