import Businesses from "@/pages/Businesses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/businesses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Businesses />;
}
