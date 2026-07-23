import { useState, useRef } from "react";

/**
 * TiltCard — applique un tilt 3D perspectif au survol de la souris.
 * Usage: <TiltCard>contenu</TiltCard>
 */
export default function TiltCard({
  children,
  maxTilt = 10,
  scale = 1.02,
  speed = 400,
  glare = true,
  className = "",
  style = {},
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [glareOpacity, setGlareOpacity] = useState(0);
  const animFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;
      setTransform(
        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`
      );
      if (glare) {
        setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
        setGlareOpacity(0.18);
      }
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(animFrameRef.current);
    setTransform(`perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`);
    setGlareOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transform,
        transition: `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`,
        willChange: "transform",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
            transition: "opacity 0.3s",
          }}
        />
      )}
    </div>
  );
}
