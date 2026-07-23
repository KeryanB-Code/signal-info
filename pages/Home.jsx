import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProducts } from "../context/ProductsContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { FadeUpWhenVisible } from "../components/animations/TextReveal.jsx";
import AnimatedCounter from "../components/animations/AnimatedCounter.jsx";
import EnhancedMarquee from "../components/animations/EnhancedMarquee.jsx";
import MagneticButton from "../components/animations/MagneticButton.jsx";
import ExpandCards from "../components/ExpandCards.jsx";

// Notes Google réelles des trois boutiques physiques (fiches publiques, juillet
// 2026). Maison Regard en ligne étant récent, aucun avis client fictif n'est
// affiché : la preuve sociale repose sur les vraies boutiques.
const SHOP_RATINGS = [
  { name: "Lunetterie Saint-Clair", city: "Caluire-et-Cuire", rating: 4.7, reviews: 134, mapQuery: "Lunetterie+Saint-Clair+Caluire-et-Cuire" },
  { name: "Optique Mas du Taureau", city: "Vaulx-en-Velin", rating: 4.6, reviews: 47, mapQuery: "Optique+Mas+du+Taureau+4+place+Guy+Moquet+Vaulx-en-Velin" },
  { name: "J'aime mes lunettes", city: "Lyon 9e", rating: 4.5, reviews: 11, mapQuery: "J'aime+mes+lunettes+46+boulevard+Balmont+Lyon" },
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Home({ onAddToCart }) {
  const { products, loading, error, BRANDS } = useProducts();
  const FEATURED = products.filter((p) => p.inStock).slice(0, 8);
  const NEW_ARRIVALS = products.filter((p) => p.new && p.inStock).slice(0, 4);
  const DISPLAY_PRODUCTS = NEW_ARRIVALS.length >= 4 ? NEW_ARRIVALS : FEATURED;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: bg moves up slower than page scroll */
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);
  /* Hero text fades + lifts as user scrolls */
  const heroTextOpacity = useTransform(heroScroll, [0, 0.45], [1, 0]);
  const heroTextY = useTransform(heroScroll, [0, 0.45], [0, -32]);

  if (loading) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center", color: "var(--gray)" }}>
        Chargement…
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 12 }}>Un problème est survenu</p>
        <p style={{ color: "var(--gray)" }}>Impossible de charger le site. Réessaie dans quelques instants.</p>
      </div>
    );
  }

  return (
    <div className="pt-nav">

      {/* ── EDITORIAL HERO ── */}
      <section className="editorial-hero" ref={heroRef}>
        <motion.div className="editorial-hero-bg" style={{ y: heroBgY }}>
          <video autoPlay muted loop playsInline>
            <source src="/videos/cartier-femme.mp4" type="video/mp4" />
            <img src="/images/hero.png" alt="Maison Regard — Collection" />
          </video>
        </motion.div>

        {/* Brand name + CTA overlay */}
        <motion.div
          className="editorial-hero-caption"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <motion.p
            className="editorial-hero-eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            Revendeur officiel agréé
          </motion.p>
          <motion.h2
            className="editorial-hero-brand"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            Cartier
          </motion.h2>
          <motion.div
            className="editorial-hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
          >
            <span className="editorial-hero-line" />
            <Link to="/boutique?brand=Cartier" className="editorial-hero-cta-text">
              DÉCOUVRIR
            </Link>
          </motion.div>
        </motion.div>

        {/* Boutique CTA button */}
        <motion.div
          style={{ position: "absolute", bottom: 52, right: 48, zIndex: 3 }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          <Link to="/boutique" className="editorial-hero-nav-btn">
            Explorer la boutique
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="editorial-hero-scroll">
          <span className="editorial-scroll-label">Défiler</span>
          <motion.div
            className="editorial-scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <span>Paiement sécurisé 4× sans frais</span>
        <span className="trust-sep">·</span>
        <span>Livraison offerte dès 250€</span>
        <span className="trust-sep">·</span>
        <span>Retours 30 jours</span>
        <span className="trust-sep">·</span>
        <span>Opticien diplômé d'état</span>
      </div>

      {/* ── CATEGORY TILES ── */}
      <section className="cat-tiles-section">
        {[
          { to: "/boutique?gender=femme", img: "/images/cat-femme.png", alt: "Solaires Femme", label: "Solaires Femme" },
          { to: "/boutique?gender=homme", img: "/images/cat-homme.png", alt: "Solaires Homme", label: "Solaires Homme" },
          { to: "/boutique", img: "/images/cat-unisexe.png", alt: "Unisexe", label: "Unisexe" },
        ].map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: i * 0.1, ease }}
          >
            <Link to={tile.to} className="cat-tile">
              <img src={tile.img} alt={tile.alt} />
              <div className="cat-tile-overlay">
                <span className="cat-tile-name">{tile.label}</span>
                <span className="cat-tile-link">{tile.cta || "Découvrir →"}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── BRAND MARQUEE ── */}
      <div style={{ padding: "24px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <EnhancedMarquee items={BRANDS} speed={22} gap={64} renderItem={(brand, i) => (
          <Link key={i} to={`/boutique?brand=${encodeURIComponent(brand)}`} className="brand-name">
            {brand}
          </Link>
        )} />
      </div>

      {/* ── PRODUCT SELECTION ── */}
      <section className="section">
        <div className="container">
          <FadeUpWhenVisible>
            <div className="products-section-hdr">
              <div className="products-section-hdr-left">
                <div className="label">Sélection</div>
                <h2 className="h2">Notre Sélection</h2>
              </div>
              <Link to="/boutique" className="btn btn-ghost">Voir tout →</Link>
            </div>
          </FadeUpWhenVisible>
          <div className="grid-4">
            {DISPLAY_PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAISONS & CAMPAGNES — expand cards ── */}
      <section style={{ background: "var(--dark)", paddingTop: 72, paddingBottom: 0 }}>
        <div className="container">
          <FadeUpWhenVisible>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
              <div>
                <h2 className="h2" style={{ color: "white" }}>Maisons</h2>
              </div>
              <Link to="/boutique" style={{ fontSize: "0.68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>
                Voir tout →
              </Link>
            </div>
          </FadeUpWhenVisible>
        </div>
        <ExpandCards
          height={620}
          cards={[
            { video: "/videos/cartier-femme.mp4", brand: "Cartier", sub: "Collection Femme", to: "/boutique?brand=Cartier" },
            { img: "/images/brand-chopard-2.png", brand: "Chopard", sub: "Joaillerie & Optique", to: "/boutique?brand=Chopard" },
            { video: "/videos/celine.mp4", brand: "Céline", sub: "Eyewear", to: "/boutique?brand=C%C3%A9line" },
            { video: "/videos/miumiu.mp4", brand: "Miu Miu", sub: "Collection", to: "/boutique?brand=Miu+Miu" },
            { img: "/images/brand-gucci.png", brand: "Gucci", sub: "Eyewear", to: "/boutique?brand=Gucci" },
            { video: "/videos/dg-1.mp4", brand: "Dolce & Gabbana", sub: "Campagne", to: "/boutique?brand=Dolce+%26+Gabbana" },
            { video: "/videos/cartier-homme.mp4", brand: "Cartier", sub: "Collection Homme", to: "/boutique?brand=Cartier" },
            { img: "/images/hero-dita.png", brand: "Dita", sub: "Artisanat", to: "/boutique?brand=Dita" },
            { video: "/videos/john-dalia.mp4", brand: "John Dalia", sub: "Artisan", to: "/boutique?brand=John+Dalia" },
          ]}
        />
      </section>

      {/* ── STATS ── */}
      <FadeUpWhenVisible>
        <section style={{ padding: "56px 0", background: "var(--dark)" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
              {[
                { to: 12, suffix: " ans", label: "d'expérience" },
                { to: 200, suffix: "+", label: "montures sélectionnées" },
                { to: 19, suffix: "", label: "maisons de luxe" },
                { to: 98, suffix: "%", label: "clients satisfaits" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center", padding: "40px 24px",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--sand)", lineHeight: 1 }}>
                    <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div style={{ fontSize: "0.68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: 8 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUpWhenVisible>

      {/* ── DIAGNOSTIC CTA ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <FadeUpWhenVisible>
              <div>
                <div className="label" style={{ color: "var(--gray-light)", marginBottom: 12 }}>2 minutes · 5 questions</div>
                <h2 className="h2" style={{ marginBottom: 16 }}>Le Diagnostic<br /><em style={{ fontStyle: "italic" }}>Identité Visuelle</em></h2>
                <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32, maxWidth: 420, fontSize: "0.95rem" }}>
                  Forme du visage, style, usage, budget. En 5 étapes, recevez une sélection de 3 à 5 montures avec une explication personnalisée d'un opticien diplômé.
                </p>
                <MagneticButton as={Link} to="/diagnostic" className="btn btn-dark">
                  Commencer le diagnostic
                </MagneticButton>
              </div>
            </FadeUpWhenVisible>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { n: "01", t: "Forme du visage", d: "Ovale, rond, carré, en cœur, rectangulaire" },
                { n: "02", t: "Usage principal", d: "Vue, soleil, mixte, sport" },
                { n: "03", t: "Votre style", d: "Minimaliste, Statement, Classique, Sport-chic" },
                { n: "04", t: "Budget & matières" },
                { n: "05", t: "Email → Votre sélection personnalisée" },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "14px 18px", background: "var(--white)", border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--sand)", flexShrink: 0 }}>
                    {step.n}
                  </span>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, marginBottom: 2, color: "var(--dark)" }}>{step.t}</div>
                    {step.d && <div style={{ fontSize: "0.72rem", color: "var(--gray)" }}>{step.d}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPSULE ── */}
      <section style={{ background: "#0C0C0C", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 560 }}>

          {/* Visuel */}
          <motion.div
            style={{ position: "relative", overflow: "hidden" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <img
              src="/images/lifestyle-femme-3.png"
              alt="Capsule Maison Regard"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "brightness(0.82)" }}
            />
            {/* Badge numéro de série */}
            <div style={{
              position: "absolute", bottom: 28, left: 28,
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "8px 16px", backdropFilter: "blur(8px)",
              background: "rgba(0,0,0,0.45)",
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Édition limitée</div>
              <div style={{ fontFamily: "var(--serif)", color: "white", fontSize: "1rem", fontWeight: 300 }}>12 pièces · Numérotées</div>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 64px" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            {/* Saison */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
              <div style={{ height: 1, width: 32, background: "var(--sand)" }} />
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sand)" }}>
                Capsule · Été 2026
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--serif)", color: "white", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: 24 }}>
              L'œuvre de<br /><em style={{ fontStyle: "italic", color: "var(--sand)" }}>deux maîtres.</em>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.85, fontSize: "0.9rem", marginBottom: 16, maxWidth: 400 }}>
              Chaque saison, Maison Regard s'associe à un créateur indépendant pour co-signer une monture en édition très limitée.
            </p>
            <p style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.85, fontSize: "0.9rem", marginBottom: 40, maxWidth: 400 }}>
              Nous apportons notre expertise du domaine — sélection des matières, ergonomie, correction — le créateur y insuffle son univers. Le résultat : un objet unique, entre artisanat et art contemporain.
            </p>

            {/* Créateur saison */}
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: 20, marginBottom: 44 }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>
                Créateur de la saison
              </div>
              <div style={{ fontFamily: "var(--serif)", color: "white", fontSize: "1.15rem", fontWeight: 300 }}>
                Studio Lune Noire
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", marginTop: 3 }}>
                Bijoutier & sculpteur · Paris
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link
                to="/capsule"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "var(--sand)", color: "var(--dark)",
                  padding: "13px 28px", fontSize: "0.72rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  fontWeight: 500, textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                Découvrir la capsule
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                · Disponible en pré-commande
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeUpWhenVisible>
            <div className="text-center mb-48">
              <div className="label" style={{ color: "var(--gray-light)", marginBottom: 8 }}>Nos boutiques sur Google</div>
              <h2 className="h2">Une maison née en boutique</h2>
              <p style={{ color: "var(--gray)", marginTop: 16, maxWidth: 560, margin: "16px auto 0" }}>
                Maison Regard prolonge en ligne trois boutiques d'opticiens de la région lyonnaise. Voici
                leurs notes sur Google — publiées et modérées par Google, pas par nous.
              </p>
            </div>
          </FadeUpWhenVisible>
          <div className="testimonials">
            {SHOP_RATINGS.map((s, i) => (
              <motion.a
                key={i}
                href={`https://www.google.com/maps/search/?api=1&query=${s.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="testimonial home-rating-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <div className="home-rating-score">{s.rating.toLocaleString("fr-FR")}</div>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={j < Math.round(s.rating) ? "var(--sand)" : "var(--border)"} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="testimonial-name">{s.name}</div>
                <div className="testimonial-location">{s.city} · {s.reviews} avis Google →</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAV STRIP ── */}
      <section style={{ padding: "44px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { icon: "↗", title: "Livraison offerte", desc: "Dès 250€ · 24-48h" },
              { icon: "↩", title: "Retours 30 jours", desc: "Sans friction, remboursement garanti" },
              { icon: "◎", title: "SAV Expert", desc: "Opticien disponible 7j/7" },
              { icon: "◻", title: "RDV Visio", desc: "Consultation personnalisée gratuite" },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <span style={{ fontSize: "1.1rem", color: "var(--sand)", flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.85rem", marginBottom: 2, color: "var(--dark)" }}>{s.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gray)" }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
