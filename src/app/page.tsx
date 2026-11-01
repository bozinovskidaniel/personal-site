import Image from "next/image";

import { Links } from "@/components/links";
import { education, projects, work } from "@/data/profile";

export default function Page() {
  return (
    <main className="portfolio">
      <header className="introduction">
        <Image
          className="personal-mark"
          src="/mountain-mark.svg"
          alt=""
          width={36}
          height={36}
          priority
          unoptimized
        />
        <h1>
          <strong>Daniel Bozinovski</strong> · software engineer based in sydney
        </h1>
        <div className="biography">
          <p>
            currently working in the identity and authentication space at{" "}
            <a
              href="https://www.nib.com.au/"
              target="_blank"
              rel="noopener noreferrer"
            >
              nib
            </a>
            .
          </p>
          <p>
            Previously, I worked at{" "}
            <a
              href="https://www.workflow86.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Workflow86
            </a>{" "}
            building AI-powered workflow tools, integrations, and backend
            services.
          </p>
          <p>
            Before that, I built terrorism risk assessment software at{" "}
            <a
              href="https://assessthreat.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Assess Threat
            </a>{" "}
            and self-service lesson booking software at{" "}
            <a
              href="https://successtutoring.com.au/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Success Tutoring
            </a>
            .
          </p>
          <p>
            i’m focused on solving complex customer and business problems
            through ai and automation.
          </p>
        </div>
        <Links />
      </header>

      <section className="profile-section" aria-labelledby="work-heading">
        <h2 id="work-heading">Work</h2>
        <ul className="entry-list">
          {work.map((entry) => (
            <li key={entry.name}>
              <a
                className="profile-entry"
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className={`entry-image company-image ${entry.imageClassName ?? ""}`}
                >
                  <Image
                    src={entry.image}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                  />
                </span>
                <span className="entry-content">
                  <span className="entry-name">{entry.name}</span>
                  <span className="entry-details">
                    <span>{entry.role}</span>
                    <span className="entry-period">{entry.period}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="profile-section" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul className="entry-list">
          {projects.map((entry) => (
            <li key={entry.name}>
              <a
                className="profile-entry"
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="entry-image company-image" aria-hidden="true">
                  <Image
                    src={entry.image}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                  />
                </span>
                <span className="entry-content">
                  <span className="entry-name">{entry.name}</span>
                  <span className="entry-details">
                    <span>{entry.description}</span>
                    <span className="entry-tag">{entry.category}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="profile-section" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <ul className="entry-list">
          {education.map((entry) => (
            <li key={entry.name}>
              <a
                className="profile-entry"
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className={`entry-image company-image ${entry.imageClassName ?? ""}`}
                >
                  <Image
                    src={entry.image}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                  />
                </span>
                <span className="entry-content">
                  <span className="entry-name">{entry.name}</span>
                  <span className="education-qualifications">
                    {entry.qualifications.map((qualification) => (
                      <span className="entry-details" key={qualification.name}>
                        <span>{qualification.name}</span>
                        {qualification.period && (
                          <span className="entry-period">
                            {qualification.period}
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="site-footer">
        © {new Date().getFullYear()} Daniel Bozinovski.
      </footer>
    </main>
  );
}
