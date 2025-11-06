import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="px-4 py-8">
      <div className="w-full h-px bg-base-content/10 mb-6"></div>

      <div className="flex flex-row gap-6 items-center justify-center sm:justify-start">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/wenzelescudero/"
          className="text-base-content hover:text-base-content/60 transition-colors flex flex-row gap-2 items-center group"
        >
          <FontAwesomeIcon className="w-4 h-4" icon={faLinkedin} />{" "}
          <span className="text-sm font-light border-b border-base-content/20 group-hover:border-base-content/60 transition-colors">
            LinkedIn
          </span>
        </a>
        <a
          href="mailto:wenzelescudero@gmail.com"
          className="text-base-content hover:text-base-content/60 transition-colors flex flex-row gap-2 items-center group"
        >
          <FontAwesomeIcon className="w-4 h-4" icon={faEnvelope} />
          <span className="text-sm font-light border-b border-base-content/20 group-hover:border-base-content/60 transition-colors">
            Contact
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
