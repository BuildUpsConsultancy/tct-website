import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element enters the viewport.
 * Returns { ref, inView } — attach ref to the element you want to watch.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once only
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
