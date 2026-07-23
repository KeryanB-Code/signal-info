import { useRef, useState, useEffect } from "react";

/**
 * AnimatedCounter — compte de 0 à `to` quand visible.
 * Usage: <AnimatedCounter to={12} suffix=" ans" />
 */
export default function AnimatedCounter({ to, from = 0, suffix = "", prefix = "", duration = 1800, className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const range = to - from;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(from + range * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}
