import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * ScrollProgress — barre de progression fine en haut de page.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = el.scrollHeight - el.clientHeight;
      setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 200,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, var(--sand-dark), var(--sand))",
          transformOrigin: "left",
          scaleX: progress,
        }}
      />
    </div>
  );
}

/**
 * CustomCursor — curseur personnalisé qui suit la souris avec un lag élégant.
 * Active uniquement sur desktop.
 */
export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 80 });
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 80 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkPointer = (e) => {
      const el = e.target;
      const isInteractive =
        el.tagName === "A" || el.tagName === "BUTTON" || el.closest("a") || el.closest("button") || el.closest("[data-cursor='pointer']");
      setIsPointer(!!isInteractive);
    };

    const handleLeave = () => setIsHidden(true);
    const handleEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", checkPointer);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", checkPointer);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          border: `1.5px solid ${isPointer ? "var(--sand)" : "var(--dark)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: isHidden ? 0 : 0.6,
          mixBlendMode: "difference",
          transition: "width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s",
        }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          background: isPointer ? "var(--sand)" : "var(--dark)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
          transition: "background 0.3s, opacity 0.3s",
        }}
      />
    </>
  );
}
