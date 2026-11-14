# Project write-up pages

## Goal

Some projects (starting with the pneumonia image classifier, then an upcoming embedded project) get their own write-up page on the site. Each page has a header with the project's logo, title and GitHub link, an optional hero image, and a long-form engineering article. Projects that are products with their own site (Arc, nudge) keep linking out.

## Design

### Route

- One static page per write-up at `/projects/<slug>`, e.g. `/projects/pneumonia-classifier`.
- Built with `generateStaticParams` so it works with the existing `output: "export"` config.
- An unknown slug calls `notFound()` (only possible from a typed URL, since all slugs are generated at build time).

### Content

- Each article is an MDX file in `src/content/projects/<slug>.mdx`.
- MDX support comes from `@next/mdx` (plus `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`), with `pageExtensions` updated in `next.config.js`. No remote MDX, no CMS.
- Project metadata stays in `src/data/profile.ts`. A project with a write-up gets a `slug` field. Optional new fields: `github` (repo URL), `hero` (image path, stored under `public/images/projects/`), `heroAlt` (required when `hero` is set), `meta` (short line such as `2021 · PyTorch, ResNet`).
- A project has either a `slug` (internal write-up) or only an `href` (external link). The pneumonia project moves its GitHub URL from `href` to `github` and gains `slug: "pneumonia-classifier"`.

### Homepage rows

- The rows look exactly as before. No arrows or other visual changes.
- Rows with a `slug` render a Next `<Link>` to `/projects/<slug>` (same tab). Rows without one keep their external link (new tab).

### Write-up page layout

From 768px up, the page is two columns, up to 880px wide. On the left is a 220px sticky sidebar with the back link, the project header, and an "on this page" list of the article's `##` sections. The current section is highlighted as you scroll. On the right are the hero and the article. Below 768px it falls back to one column and the section list is hidden. The pieces, in source order, using the existing colour tokens and light/dark switch:

1. `← back` link to `/` (muted, 14px, lowercase).
2. Header row: the project's round logo (same 36px `entry-image` styling and per-project class), the title (600 weight, like the homepage name), and a GitHub icon button on the right (same style as `.social-links`, `aria-label="View on GitHub"`). The icon only shows if `github` is set.
3. Meta line under the title: category tag + `meta` text, muted 14px.
4. Optional hero: full column width, 12px radius, `--rule` border, via `next/image` with `unoptimized` (required for static export).
5. Article (`.article` class): 16px / 25px line height like the bio. Body text uses `--muted`, headings use `--text`. `h2` is 16px/600, `h3` is 14px/600. Links are underlined like `.biography a`. Inline code and code blocks are monospace on `--surface` with 8px radius and horizontal scroll for wide blocks. Images inside the article are full width with 12px radius. No syntax highlighting for now.
6. Footer: same as the homepage.

The page reuses the existing `portfolio-enter` entrance animation, so going from the homepage feels like going deeper into the same page.

### Metadata

`generateMetadata` sets `title: "<Project name> · Daniel Bozinovski"`, the project's description, a canonical `/projects/<slug>` URL, and the hero as the Open Graph image when set.

### Components

- `src/app/projects/[slug]/page.tsx`: looks up the project by slug, imports its MDX, and renders the header, hero and article.
- `src/components/project-header.tsx`: logo, title, GitHub button and meta line.
- `src/mdx-components.tsx`: required by `@next/mdx`. Maps `img` to a full-width image and leaves other elements to the `.article` CSS.
- `src/app/page.tsx`: the project row picks `<Link>` or `<a>` based on `slug`.

### Starter content

The pneumonia article is drafted from the GitHub repo's README and code (problem, dataset, model, training, results, what I'd do differently). Daniel edits it before publishing. The embedded project is added later by creating an MDX file and a `profile.ts` entry, with no code changes.

## Verification

- `pnpm build` passes and outputs `out/projects/pneumonia-classifier.html`.
- `pnpm lint` passes.
- In the browser: the homepage row opens the write-up in the same tab, back returns home, the GitHub icon opens the repo in a new tab, Arc and nudge still open externally, and the layout works in light and dark mode and at 375px width.

## Out of scope

Syntax highlighting, a table of contents, reading time, tags or filtering, an index page at `/projects`, and RSS.
