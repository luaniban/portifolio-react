"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type StartViewTransition = (update: () => Promise<void> | void) => unknown;

function waitForProfileCard() {
  return new Promise<void>((resolve) => {
    const finish = () => {
      const target = document.querySelector<HTMLElement>("[data-linkedin-profile-target]");
      if (!target) return;

      const destination = target.closest<HTMLElement>(".linkedin-posts-layout") ?? target;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, destination.getBoundingClientRect().top + window.scrollY - 92));
      root.style.scrollBehavior = previousScrollBehavior;

      window.clearTimeout(timeout);
      observer.disconnect();
      resolve();
    };

    const observer = new MutationObserver(() => {
      finish();
    });

    const timeout = window.setTimeout(() => {
      observer.disconnect();
      resolve();
    }, 1200);

    observer.observe(document.body, { childList: true, subtree: true });
    finish();
  });
}

export default function LinkedinPostsLink({ children }: { children: ReactNode }) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const startViewTransition = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!startViewTransition || reduceMotion) return;

    event.preventDefault();

    startViewTransition.call(document, () => {
      const profileCard = waitForProfileCard();
      router.push("/posts");
      return profileCard;
    });
  }

  return (
    <a className="btn btn-primary" href="/posts" onClick={handleClick}>
      {children}
    </a>
  );
}
