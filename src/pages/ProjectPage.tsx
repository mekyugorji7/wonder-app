import { Navigate, useParams } from "react-router-dom";
import { ChatHeader } from "@/components/dashboard/ChatHeader";
import { ChatLayout } from "@/components/dashboard/ChatLayout";
import { ChatMessages } from "@/components/dashboard/ChatMessages";
import { ChatPrompt } from "@/components/dashboard/ChatPrompt";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";
import { useProjects } from "@/components/dashboard/ProjectsContext";
export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { context } = useBusinessContext();
  const { getProject, sendMessage } = useProjects();
  const project = projectId ? getProject(projectId) : undefined;

  if (!projectId || !project || !context) {
    return <Navigate to="/app" replace />;
  }

  const handleSend = (content: string) => {
    sendMessage(projectId, content, context);
  };

  return (
    <ChatLayout
      header={
        <ChatHeader
          title={project.title}
          backTo="/app/linkedin"
          isLoading={project.isReplying}
        />
      }
      prompt={
        <ChatPrompt
          onSend={handleSend}
          disabled={project.isReplying}
          allowEmpty={project.chatPhase === "materials"}
        />
      }
    >
      <ChatMessages
        messages={project.messages}
        authorName={context.businessName}
        isReplying={project.isReplying}
      />
    </ChatLayout>
  );
}
