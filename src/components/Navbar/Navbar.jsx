import { Link } from "@tanstack/react-router";
import Links from "./Links";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <div className="w-full md:w-[736px] md:self-center">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <Link
          to="/"
          className="text-xl font-medium tracking-tight text-base-content hover:text-base-content/60 transition-colors"
        >
          Wenzel Escudero
        </Link>
        <Links navItems={navItems} />
      </div>
      {/* Border line with padding */}
      <div className="px-4">
        <div className="w-full h-px bg-base-content/10" />
      </div>
    </div>
  );
};

export default Navbar;
