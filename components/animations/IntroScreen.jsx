import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["MAISON", "REGARD"];

export default function IntroScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem("mr_intro_done"));

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("mr_intro_done", "1");
      setVisible(false);
    }, 2800);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#0C0C0C",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            pointerEvents: "all",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {WORDS.map((word, wi) => (
            <div key={wi} style={{ overflow: "hidden", lineHeight: 1.15 }}>
              <motion.div
                style={{ display: "flex" }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.055,
                      delayChildren: wi === 0 ? 0.15 : 0.52,
                    },
                  },
                }}
              >
                {word.split("").map((l, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "105%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(2.4rem, 6vw, 4rem)",
                      fontWeight: 300,
                      color: "white",
                      letterSpacing: ".22em",
                      display: "inline-block",
                    }}
                  >
                    {l}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              height: 1,
              width: 52,
              background: "#C4A882",
              marginTop: 20,
              transformOrigin: "center",
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.58rem",
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.5)",
              marginTop: 16,
            }}
          >
            Lunettes de Luxe
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
