import { useParams, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SectionView } from "@/components/dashboard/SectionView";
import type { DashboardSection } from "@/components/dashboard/projects";

const validSections: DashboardSection[] = [
  "overview",
  "linkedin",
  "website",
  "social",
  "content",
  "print",
];

export function DashboardPage() {
  const { section } = useParams<{ section?: string }>();

  if (section && !validSections.includes(section as DashboardSection)) {
    return <Navigate to="/app" replace />;
  }

  const activeSection: DashboardSection = section
    ? (section as DashboardSection)
    : "overview";

  return (
    <DashboardLayout>
      <SectionView section={activeSection} />
    </DashboardLayout>
  );
}
