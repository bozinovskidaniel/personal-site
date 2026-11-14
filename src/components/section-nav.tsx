"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/headings";

/** Distance from the top of the viewport at which a heading counts as "current". */
const ACTIVE_OFFSET = 160;

export function SectionNav({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | undefined>(headings[0]?.id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = headings[0]?.id;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = id;
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(atBottom ? headings.at(-1)?.id : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="section-nav" aria-label="On this page">
      <p className="section-nav-label">On this page</p>
      <ul>
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
