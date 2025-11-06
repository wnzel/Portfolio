import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import StarField from "@/components/Starfield";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    <NotFound />;
  },
});

function RootComponent() {
  return (
    <>
      <div className="hidden sm:block fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <StarField />
      </div>

      <div className="relative min-h-screen justify-between flex flex-col gap-8 max-w-xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
