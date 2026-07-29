import { Dashboard, Linkedin, Shop } from "iconoir-react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useProjects } from "@/components/dashboard/ProjectsContext";
import { useNewPost } from "@/hooks/useNewPost";
import {
  sectionMeta,
  type DashboardSection,
  type ProjectType,
} from "@/components/dashboard/projects";

const sectionIcons: Record<DashboardSection, typeof Dashboard> = {
  overview: Dashboard,
  linkedin: Linkedin,
  business: Shop,
  website: Dashboard,
  social: Dashboard,
  content: Dashboard,
  print: Dashboard,
};

interface SectionViewProps {
  section: DashboardSection;
}

function filterProjects(
  projects: ReturnType<typeof useProjects>["projects"],
  section: DashboardSection
) {
  if (section === "overview" || section === "linkedin") {
    return projects.filter((p) => p.contentFormat === "linkedin");
  }
  return projects.filter((p) => p.type === section);
}

export function SectionView({ section }: SectionViewProps) {
  const { projects } = useProjects();
  const startNewPost = useNewPost();
  const filtered = filterProjects(projects, section);

  const title =
    section === "overview"
      ? "Overview"
      : section === "linkedin"
        ? sectionMeta.linkedin.title
        : sectionMeta[section as ProjectType]?.title ?? section;

  const description =
    section === "overview"
      ? "All your LinkedIn posts in one place."
      : section === "linkedin"
        ? sectionMeta.linkedin.description
        : sectionMeta[section as ProjectType]?.description ?? "";

  const emptyDescription =
    section === "overview" || section === "linkedin"
      ? "No LinkedIn posts yet. Create your first post grounded in your business context."
      : sectionMeta[section as ProjectType]?.description ?? "";

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-title md:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-sub md:text-base">{description}</p>
        </div>
        {(section === "overview" || section === "linkedin") &&
          filtered.length > 0 && (
            <button
              type="button"
              onClick={startNewPost}
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-title transition-colors hover:bg-page"
            >
              New post
            </button>
          )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={sectionIcons[section]}
          description={emptyDescription}
          onCreate={startNewPost}
        />
      )}
    </div>
  );
}
