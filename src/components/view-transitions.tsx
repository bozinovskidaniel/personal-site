"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentProps, type MouseEvent, useEffect, useRef } from "react";

// TypeScript 5.4's DOM lib doesn't include the View Transitions API yet.
type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => unknown;
};

/**
 * Class on <html> once the visitor navigates within the site. The page entrance
 * animation only plays on the first load; without this, every client-side
 * navigation (including the browser's back/forward) replays it like a reload.
 */
const NAVIGATED_CLASS = "has-navigated";
/** Give up waiting for the new route after this long so the page never freezes. */
const ROUTE_TIMEOUT_MS = 3000;

let finishPendingNavigation: (() => void) | null = null;
/** The route before the current one in this tab, for history-aware back links. */
let previousPathname: string | null = null;

/**
 * Mount once in the root layout. Resolves the pending transition after the
 * new route has rendered, so the browser snapshots the finished page.
 */
export function ViewTransitionListener() {
  const pathname = usePathname();
  const currentPathname = useRef(pathname);

  useEffect(() => {
    // Capture phase runs before Next's own popstate listener re-renders the page.
    const onPopState = () =>
      document.documentElement.classList.add(NAVIGATED_CLASS);
    window.addEventListener("popstate", onPopState, { capture: true });
    return () =>
      window.removeEventListener("popstate", onPopState, { capture: true });
  }, []);

  useEffect(() => {
    if (currentPathname.current !== pathname) {
      previousPathname = currentPathname.current;
      currentPathname.current = pathname;
    }
    finishPendingNavigation?.();
    finishPendingNavigation = null;
  }, [pathname]);

  return null;
}

function shouldUseDefaultNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  );
}

type TransitionLinkProps = ComponentProps<typeof Link> & {
  href: string;
  /**
   * When the visitor just came from `href`, go back in history instead of
   * pushing a new entry, so their scroll position on that page comes back.
   */
  back?: boolean;
};

/** A Next <Link> that animates the route change with a view transition where supported. */
export function TransitionLink({
  href,
  back = false,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const navigate = () => {
    if (back && previousPathname === href) {
      router.back();
    } else {
      router.push(href);
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (shouldUseDefaultNavigation(event)) return;
    document.documentElement.classList.add(NAVIGATED_CLASS);

    if (back && previousPathname === href) {
      // Next's <Link> would push a new entry; handle the click ourselves.
      event.preventDefault();
    }

    const doc = document as TransitionDocument;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!doc.startViewTransition || reducedMotion) {
      if (event.defaultPrevented) navigate();
      return;
    }

    event.preventDefault();
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          const timeout = window.setTimeout(resolve, ROUTE_TIMEOUT_MS);
          finishPendingNavigation = () => {
            window.clearTimeout(timeout);
            resolve();
          };
          navigate();
        }),
    );
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
