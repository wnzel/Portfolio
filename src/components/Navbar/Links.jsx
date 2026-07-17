import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

function Links({ navItems }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const linkClassName = (active) =>
    `border-b text-sm font-light transition-colors ${
      active
        ? "border-base-content/60 text-base-content"
        : "border-transparent text-base-content/60 hover:border-base-content/30 hover:text-base-content"
    }`;

  const closeMobileMenu = (event) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <>
      <nav aria-label="Mobile navigation" className="flex items-center gap-1 sm:hidden">
        <Link
          to="/"
          aria-current={isActive("/") ? "page" : undefined}
          className={linkClassName(isActive("/"))}
        >
          Home
        </Link>

        <details className="group dropdown dropdown-end">
          <summary
            className="flex min-h-8 min-w-8 cursor-pointer list-none items-center justify-center rounded-full text-base-content/60 transition-colors hover:bg-base-content/5 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content [&::-webkit-details-marker]:hidden"
            aria-label="Open navigation menu"
          >
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform group-open:rotate-180"
            />
          </summary>
          <ul className="menu dropdown-content z-20 mt-2 w-36 rounded-box border border-base-content/10 bg-base-100 p-2 shadow-lg">
            {navItems.slice(1).map((item) => {
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className={
                      active ? "font-medium text-base-content" : "text-base-content/70"
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </nav>

      <nav aria-label="Primary navigation" className="hidden sm:block">
        <ul className="flex items-center gap-5">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={linkClassName(active)}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

Links.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Links;
