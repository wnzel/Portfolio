import Projects from "@/pages/Projects";
import { projectFilters } from "@/lib/projects";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

const filterIds = projectFilters.map((filter) => filter.id);

export const Route = createFileRoute("/projects/")({
  validateSearch: (search) => ({
    filter: filterIds.includes(search.filter) ? search.filter : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { filter } = Route.useSearch();
  const navigate = useNavigate();

  const setFilter = (nextFilter) =>
    navigate({
      to: "/projects",
      search: { filter: nextFilter },
      replace: true,
      resetScroll: false,
    });

  return <Projects filter={filter} onFilterChange={setFilter} />;
}
