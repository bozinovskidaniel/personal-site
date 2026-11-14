import { readFileSync } from "node:fs";
import path from "node:path";

import { slugify } from "@/lib/slug";

export type Heading = { id: string; text: string };

/** Reads the `##` headings from a write-up's MDX source, for the section list. */
export function getHeadings(slug: string): Heading[] {
  const source = readFileSync(
    path.join(process.cwd(), "src/content/projects", `${slug}.mdx`),
    "utf8",
  );

  return Array.from(source.matchAll(/^##\s+(.+)$/gm), ([, raw]) => {
    const text = raw
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim();
    return { id: slugify(text), text };
  });
}
