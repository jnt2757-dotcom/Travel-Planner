import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Tracks which day block is currently in view so the day rail can highlight it.
 * Registers a ref callback per day number; the observer watches a horizontal
 * band near the top of the viewport and picks the day crossing it.
 */
export function useActiveDay(dayNumbers: number[]) {
  const [activeDay, setActiveDay] = useState<number | null>(dayNumbers[0] ?? null);
  const nodesRef = useRef(new Map<number, HTMLElement>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ratios = new Map<number, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const day = Number((entry.target as HTMLElement).dataset.dayNumber);
          ratios.set(day, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: number | null = null;
        let bestRatio = 0;
        for (const [day, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = day;
          }
        }
        if (best !== null) setActiveDay(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -55% 0px" },
    );

    for (const node of nodesRef.current.values()) {
      observerRef.current.observe(node);
    }

    return () => observerRef.current?.disconnect();
  }, [dayNumbers.length]);

  const registerDay = useCallback((day: number) => (node: HTMLElement | null) => {
    const existing = nodesRef.current.get(day);
    if (existing && observerRef.current) observerRef.current.unobserve(existing);

    if (node) {
      nodesRef.current.set(day, node);
      observerRef.current?.observe(node);
    } else {
      nodesRef.current.delete(day);
    }
  }, []);

  const scrollToDay = useCallback((day: number) => {
    const node = nodesRef.current.get(day);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveDay(day);
    }
  }, []);

  return { activeDay, registerDay, scrollToDay };
}
