import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import DotGridBackground from "@/components/DotGridBackground";
import CursorDotTrail from "@/components/CursorDotTrail";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <DotGridBackground />
      </div>
      <CursorDotTrail />

      <div className="relative z-10 min-h-screen justify-between flex flex-col gap-8 max-w-xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
