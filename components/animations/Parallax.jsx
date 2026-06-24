import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/**
 * ParallaxHero — image du hero se déplace plus lentement que le contenu au scroll.
 * Usage: <ParallaxHero src="..." speed={0.4}><contenu /></ParallaxHero>
 */
export function ParallaxHero({ src, children, speed = 0.35, height = "100vh" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} style={{ position: "relative", height, overflow: "hidden" }}>
      <motion.div
        style={{
          y,
          position: "absolute",
          inset: "-20%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      {children}
    </div>
  );
}

/**
 * ImageReveal — révèle l'image via clip-path quand elle entre dans le viewport.
 * Usage: <ImageReveal src="..." alt="..." />
 */
export function ImageReveal({ src, alt = "", className = "", style = {}, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }} className={className}>
      <motion.img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
        animate={
          isInView
            ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
            : {}
        }
        transition={{
          clipPath: { duration: 1, delay, ease: [0.76, 0, 0.24, 1] },
          scale:    { duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      />
    </div>
  );
}

/**
 * ParallaxSection — élément quelconque qui se déplace au scroll (effet de profondeur).
 */
export function ParallaxSection({ children, speed = 0.15, style = {}, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
