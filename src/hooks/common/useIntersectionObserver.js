import { useEffect } from "react";

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => (
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
        {
          root: root && root.current,
          rootMargin,
          threshold,
        }
      )
    );

    const currentTarget = target && target.current;

    if (!currentTarget) return;
    observer.observe(currentTarget);

    return () => observer.unobserve(currentTarget);
  }, [target, onIntersect, root, rootMargin, threshold, enabled]);
};

export default useIntersectionObserver;
