import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TextReveal — chaque mot surgit par le bas avec stagger.
 * Usage: <TextReveal as="h1" className="h1">Mon texte ici</TextReveal>
 */
export function TextReveal({ children, as: Tag = "span", className = "", delay = 0, stagger = 0.06 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = String(children).split(" ");

  return (
    <Tag ref={ref} className={className} style={{ overflow: "hidden" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * TextScramble — texte qui se scramble avant de se résoudre.
 * Usage: <TextScramble text="Maison Regard" trigger={isInView} />
 */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&";

export function TextScramble({ text, trigger = true, speed = 30, delay = 0, className = "" }) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = text.length * 3;

    const timeout = setTimeout(() => {
      const tick = () => {
        setOutput(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < frame / 3) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame++;
        if (frame <= total) frameRef.current = setTimeout(tick, speed);
      };
      tick();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [trigger, text, speed, delay]);

  return <span className={className}>{output}</span>;
}

/**
 * FadeUpWhenVisible — fade + slide-up au scroll, stagger si plusieurs enfants.
 */
export function FadeUpWhenVisible({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
