import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import type { writeups } from "@/data/profile";
import { projectTransitionNames } from "@/lib/slug";

type Props = { project: (typeof writeups)[number] };

export function ProjectHeader({ project }: Props) {
  const names = projectTransitionNames(project.slug);

  return (
    <header className="project-header">
      <div className="project-mark-row">
        <span
          className={`entry-image company-image ${project.imageClassName ?? ""}`}
          aria-hidden="true"
          style={names.logo}
        >
          <Image
            src={project.image}
            alt=""
            width={36}
            height={36}
            unoptimized
          />
        </span>
        {project.github && (
          <a
            className="icon-button"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            title="View on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
          </a>
        )}
      </div>
      <h1>
        <span className="transition-title" style={names.title}>
          {project.name}
        </span>
      </h1>
      <p className="project-description">{project.description}</p>
      <p className="project-meta">
        <span className="entry-tag">{project.category}</span>
        {project.meta && <span>{project.meta}</span>}
      </p>
    </header>
  );
}
