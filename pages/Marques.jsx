import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MOSAIC = [
  { brand: "Cartier",            video: "/videos/cartier-femme.mp4",  tall: true  },
  { brand: "Céline",             video: "/videos/celine.mp4",          tall: true  },
  { brand: "John Dalia",         video: "/videos/john-dalia.mp4",      tall: true  },
  { brand: "Miu Miu",           video: "/videos/miumiu.mp4",          tall: false },
  { brand: "Chopard",            img: "/images/brand-chopard-2.png",   tall: false },
  { brand: "Fred",               img: "/images/brand-fred-2.png",      tall: false },
  { brand: "Dita",               img: "/images/hero-dita.png",         tall: false },
  { brand: "Gucci",              img: "/images/brand-gucci.png",       tall: false },
  { brand: "Mont Blanc",         img: "/images/brand-montblanc.png",   tall: false },
  { brand: "Dior",               img: null,                            tall: true  },
  { brand: "Prada",              img: null,                            tall: false },
  { brand: "Tom Ford",           img: null,                            tall: false },
  { brand: "Fendi",              img: null,                            tall: false },
  { brand: "Givenchy",           img: null,                            tall: false },
  { brand: "Versace",            img: null,                            tall: false },
  { brand: "Balenciaga",         img: null,                            tall: false },
  { brand: "Bottega Veneta",     img: null,                            tall: false },
  { brand: "Valentino",          img: null,                            tall: false },
  { brand: "Yves Saint Laurent", img: null,                            tall: false },
  { brand: "Burberry",           img: null,                            tall: false },
  { brand: "Balmain",            img: null,                            tall: false },
  { brand: "T Henri",            img: null,                            tall: false },
  { brand: "Palm Angels",        img: null,                            tall: false },
  { brand: "Ophy",               img: null,                            tall: false },
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Marques() {
  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh", paddingTop: "108px" }}>
      <div className="brands-showcase">
        {MOSAIC.map((item, i) => (
          <motion.div
            key={item.brand}
            className={`brand-showcase-tile${item.tall ? " tall" : ""}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.04, ease }}
          >
            <Link
              to={`/boutique?brand=${encodeURIComponent(item.brand)}`}
              className="brand-showcase-link"
            >
              {item.video ? (
                <video autoPlay muted loop playsInline>
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : item.img ? (
                <img src={item.img} alt={item.brand} />
              ) : (
                <div className="brand-showcase-black" />
              )}
              <div className="brand-showcase-overlay">
                <span className="brand-showcase-name">{item.brand}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
