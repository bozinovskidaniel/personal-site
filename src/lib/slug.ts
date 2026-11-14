import { isValidElement, type ReactNode } from "react";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Flattens rendered heading children (strings, <code>, links) to plain text. */
export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

/** Shared element names so a project's logo and title morph between the homepage row and its write-up. */
export function projectTransitionNames(slug: string) {
  return {
    logo: { viewTransitionName: `project-logo-${slug}` },
    title: { viewTransitionName: `project-title-${slug}` },
  };
}
