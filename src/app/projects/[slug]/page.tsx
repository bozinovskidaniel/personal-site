import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProjectHeader } from "@/components/project-header";
import { SectionNav } from "@/components/section-nav";
import { TransitionLink } from "@/components/view-transitions";
import { writeups } from "@/data/profile";
import { getHeadings } from "@/lib/headings";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return writeups.map(({ slug }) => ({ slug }));
}

function findProject(slug: string) {
  return writeups.find((project) => project.slug === slug);
}

export function generateMetadata({ params }: Params): Metadata {
  const project = findProject(params.slug);
  if (!project) return {};

  const title = `${project.name} · Daniel Bozinovski`;
  // Social sites don't render SVG previews, so only raster heroes are shared.
  const shareImage =
    project.hero && !project.hero.src.endsWith(".svg")
      ? [project.hero.src]
      : undefined;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: shareImage,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = findProject(params.slug);
  if (!project) notFound();

  const { default: Article } = await import(
    `@/content/projects/${project.slug}.mdx`
  );

  return (
    <main className="portfolio project-page">
      <aside className="project-sidebar">
        <TransitionLink className="back-link" href="/" back>
          ← back
        </TransitionLink>
        <ProjectHeader project={project} />
        <SectionNav headings={getHeadings(project.slug)} />
      </aside>

      <div className="project-body">
        {project.hero && (
          <Image
            className="project-hero"
            src={project.hero.src}
            alt={project.hero.alt}
            width={1200}
            height={600}
            priority
            unoptimized
          />
        )}

        <article className="article">
          <Article />
        </article>
      </div>

      <footer className="site-footer">
        © {new Date().getFullYear()} Daniel Bozinovski.
      </footer>
    </main>
  );
}
