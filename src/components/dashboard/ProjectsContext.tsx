import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  simulateLinkedInReply,
  type GeneratedReply,
} from "@/lib/demoGeneration";
import {
  WONDER_MATERIALS_QUESTION,
  WONDER_PROMPT_QUESTION,
  WONDER_TOPIC_QUESTION,
} from "@/lib/chatSetup";
import type { BusinessContext } from "@/components/dashboard/businessContext";
import {
  contentFormatAccents,
  type ChatMessage,
  type Project,
} from "@/components/dashboard/projects";

interface ProjectsContextValue {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  startNewProject: () => string;
  sendMessage: (projectId: string, content: string, business: BusinessContext) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function createUserMessage(content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "user",
    content,
    createdAt: new Date().toISOString(),
  };
}

function createAssistantMessage(content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    createdAt: new Date().toISOString(),
  };
}

function createAssistantReply(reply: GeneratedReply): ChatMessage {
  if (reply.type === "linkedin-post") {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply.plainText,
      linkedInPost: reply.post,
      createdAt: new Date().toISOString(),
    };
  }
  return createAssistantMessage(reply.content);
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const replyInFlight = useRef<Set<string>>(new Set());
  const replyCleanup = useRef<Map<string, () => void>>(new Map());

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  const startNewProject = useCallback(() => {
    const id = crypto.randomUUID();

    setProjects((prev) => [
      {
        id,
        title: "New post",
        description: "",
        type: "content",
        contentFormat: "linkedin",
        status: "Draft",
        generationStatus: "generating",
        chatPhase: "topic",
        messages: [createAssistantMessage(WONDER_TOPIC_QUESTION)],
        isReplying: false,
        accent: contentFormatAccents.linkedin,
        updatedAt: "Just now",
      },
      ...prev,
    ]);

    return id;
  }, []);

  const runReply = useCallback((projectId: string, business: BusinessContext) => {
    if (replyInFlight.current.has(projectId)) return;
    replyInFlight.current.add(projectId);

    setProjects((prev) => {
      const project = prev.find((p) => p.id === projectId);
      if (!project || !project.isReplying) {
        replyInFlight.current.delete(projectId);
        return prev;
      }

      const cleanup = simulateLinkedInReply(
        business,
        project.messages,
        project.materials,
        (reply) => {
          replyInFlight.current.delete(projectId);
          replyCleanup.current.delete(projectId);

          setProjects((current) =>
            current.map((p) => {
              if (p.id !== projectId || !p.isReplying) return p;
              const assistantMessage = createAssistantReply(reply);
              return {
                ...p,
                isReplying: false,
                generationStatus: "complete",
                status: "Draft",
                messages: [...p.messages, assistantMessage],
                generatedContent: assistantMessage.content,
                updatedAt: "Just now",
              };
            })
          );
        }
      );

      replyCleanup.current.set(projectId, cleanup);
      return prev;
    });
  }, []);

  const sendMessage = useCallback(
    (projectId: string, content: string, business: BusinessContext) => {
      if (replyInFlight.current.has(projectId)) return;

      setProjects((prev) => {
        const project = prev.find((p) => p.id === projectId);
        if (!project || project.isReplying) return prev;

        const trimmed = content.trim();
        const isOptionalMaterials =
          project.chatPhase === "materials" &&
          (!trimmed || trimmed.toLowerCase() === "skip");

        if (!trimmed && !isOptionalMaterials) return prev;

        const userMsg = createUserMessage(
          isOptionalMaterials ? "Skip" : trimmed
        );

        if (project.chatPhase === "topic") {
          return prev.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  title: trimmed,
                  messages: [
                    ...p.messages,
                    userMsg,
                    createAssistantMessage(WONDER_PROMPT_QUESTION),
                  ],
                  chatPhase: "prompt",
                  updatedAt: "Just now",
                }
              : p
          );
        }

        if (project.chatPhase === "prompt") {
          return prev.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  description: trimmed,
                  messages: [
                    ...p.messages,
                    userMsg,
                    createAssistantMessage(WONDER_MATERIALS_QUESTION),
                  ],
                  chatPhase: "materials",
                  updatedAt: "Just now",
                }
              : p
          );
        }

        if (project.chatPhase === "materials") {
          const materials = isOptionalMaterials ? "" : trimmed;
          const updated = prev.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  materials,
                  messages: [...p.messages, userMsg],
                  chatPhase: "chat" as const,
                  isReplying: true,
                  status: "Generating" as const,
                  updatedAt: "Just now",
                }
              : p
          );

          setTimeout(() => runReply(projectId, business), 0);
          return updated;
        }

        const updated = prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                messages: [...p.messages, userMsg],
                isReplying: true,
                updatedAt: "Just now",
              }
            : p
        );

        setTimeout(() => runReply(projectId, business), 0);
        return updated;
      });
    },
    [runReply]
  );

  const value = useMemo(
    () => ({
      projects,
      getProject,
      startNewProject,
      sendMessage,
    }),
    [projects, getProject, startNewProject, sendMessage]
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
