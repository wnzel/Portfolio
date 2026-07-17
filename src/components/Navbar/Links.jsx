import { Link, useLocation } from "@tanstack/react-router";
import PropTypes from "prop-types";

function Links({ navItems }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-3 sm:gap-5">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`border-b text-sm font-light transition-colors ${
                  active
                    ? "border-base-content/60 text-base-content"
                    : "border-transparent text-base-content/60 hover:border-base-content/30 hover:text-base-content"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
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
