import { useEffect, useRef } from "react";

/**
 * MagneticButton — le bouton attire légèrement le curseur sur hover.
 * Usage: <MagneticButton className="btn btn-dark">Texte</MagneticButton>
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  style = {},
  onClick,
  as: Tag = "button",
  href,
  target,
  rel,
}) {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf.current);
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      setTimeout(() => { el.style.transition = ""; }, 500);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  const props = {
    ref,
    className,
    onClick,
    style: { display: "inline-flex", alignItems: "center", justifyContent: "center", ...style },
    ...(href ? { href, target, rel } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
