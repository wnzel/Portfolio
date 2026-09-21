import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
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
      <CursorDotTrail />

      <div className="relative z-10 min-h-screen justify-between flex flex-col gap-8 max-w-3xl mx-auto">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
