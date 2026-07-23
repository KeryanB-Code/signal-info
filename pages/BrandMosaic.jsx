import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BRAND_MEDIA = {
  "Cartier": [
    { type: "video", src: "/videos/cartier-femme.mp4" },
    { type: "img",   src: "/images/hero-cartier.png" },
    { type: "video", src: "/videos/cartier-homme.mp4" },
  ],
  "Chopard": [
    { type: "img", src: "/images/brand-chopard-2.png" },
    { type: "img", src: "/images/brand-chopard-homme.png" },
    { type: "img", src: "/images/brand-chopard.png" },
  ],
  "Fred": [
    { type: "img", src: "/images/brand-fred.png" },
    { type: "img", src: "/images/brand-fred-2.png" },
  ],
  "Dita": [
    { type: "img", src: "/images/hero-dita.png" },
  ],
  "John Dalia": [
    { type: "video", src: "/videos/john-dalia.mp4" },
  ],
  "Céline": [
    { type: "video", src: "/videos/celine.mp4" },
  ],
  "Miu Miu": [
    { type: "video", src: "/videos/miumiu.mp4" },
  ],
  "Gucci": [
    { type: "img", src: "/images/brand-gucci.png" },
  ],
  "Mont Blanc": [
    { type: "img", src: "/images/brand-montblanc.png" },
  ],
};

export default function BrandMosaic() {
  const { brand } = useParams();
  const decoded = decodeURIComponent(brand);
  const media = BRAND_MEDIA[decoded] ?? [];

  const cols = media.length >= 3 ? 3 : media.length >= 2 ? 2 : 1;

  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh", paddingTop: "108px" }}>
      {media.length === 0 ? (
        /* No media — black page, nothing shown */
        <div style={{ minHeight: "70vh" }} />
      ) : (
        <div
          className="brand-mosaic-grid"
          style={{ columns: cols }}
        >
          {media.map((m, i) => (
            <motion.div
              key={i}
              className="brand-mosaic-item"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {m.type === "video" ? (
                <video autoPlay muted loop playsInline>
                  <source src={m.src} type="video/mp4" />
                </video>
              ) : (
                <img src={m.src} alt={decoded} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
