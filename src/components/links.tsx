import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
  {
    label: "GitHub",
    icon: faGithub,
    href: "https://github.com/BozinovskiDaniel",
  },
  {
    label: "LinkedIn",
    icon: faLinkedinIn,
    href: "https://www.linkedin.com/in/BozinovskiDaniel",
  },
];

export function Links() {
  return (
    <nav className="social-links" aria-label="Connect with Daniel">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
        >
          <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
