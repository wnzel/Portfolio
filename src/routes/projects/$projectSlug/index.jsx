import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import ProjectDetails from "@/pages/ProjectDetails";

export const Route = createFileRoute("/projects/$projectSlug/")({
  component: ProjectDetail,
});

function ProjectDetail() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const { projectSlug } = Route.useParams();
  return <ProjectDetails projectSlug={projectSlug} />;
}
