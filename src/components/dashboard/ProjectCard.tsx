import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  contentFormatLabels,
  projectTypeLabels,
  type Project,
} from "@/components/dashboard/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/app/project/${project.id}`} className="block">
      <Card className="craft-card cursor-pointer transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className={`rounded-t-2xl p-4 ${project.accent}`}>
            <div className="mb-2 h-2 w-16 rounded bg-black/10" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-black/10" />
              <div className="h-1.5 w-4/5 rounded bg-black/10" />
            </div>
          </div>
          <div className="space-y-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-title">{project.title}</h3>
              <Badge variant="default" className="shrink-0">
                {project.type === "content" && project.contentFormat
                  ? contentFormatLabels[project.contentFormat]
                  : projectTypeLabels[project.type]}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span
                className={
                  project.status === "Generating" || project.isReplying
                    ? "font-medium text-sub"
                    : undefined
                }
              >
                {project.isReplying ? "Generating" : project.status}
              </span>
              <span>{project.updatedAt}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
