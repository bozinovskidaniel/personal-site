import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { slugify, textOf } from "@/lib/slug";

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children?: ReactNode;
};

/**
 * An image with an optional caption, for use in write-ups:
 * <Figure src="..." alt="..." width={588} height={300}>Caption</Figure>
 *
 * `width` and `height` are the display size in CSS pixels. Export the file at
 * twice that size (or larger) so it stays sharp on retina screens.
 * Clicking the image opens it full size.
 */
function Figure({ src, alt, width, height, children }: FigureProps) {
  return (
    <figure className="article-figure">
      <a href={src} target="_blank" rel="noopener noreferrer">
        {/* Plain <img>: the site is a static export, so next/image can't optimise anyway. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </a>
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}

/**
 * A left-to-right flow of steps, drawn in HTML so it stays sharp and themed:
 * <Pipeline steps={["Load", "Clean", "Train"]} label="Training pipeline" />
 */
function Pipeline({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol className="pipeline" aria-label={label}>
      {steps.map((step) => (
        <li key={step}>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Wraps a table so wide tables scroll sideways on small screens instead of overflowing. */
function Table({ children }: { children: ReactNode }) {
  return (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 id={slugify(textOf(children))} {...props}>
        {children}
      </h2>
    ),
    img: ({ alt = "", ...props }) => (
      // MDX images are plain <img> tags; next/image needs known dimensions.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} loading="lazy" {...props} />
    ),
    a: ({ href = "", ...props }) =>
      href.startsWith("http") ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      ) : (
        <a href={href} {...props} />
      ),
    Figure,
    Pipeline,
    Table,
    ...components,
  };
}
