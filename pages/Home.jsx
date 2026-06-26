import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCTS, BRANDS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { FadeUpWhenVisible } from "../components/animations/TextReveal.jsx";
import AnimatedCounter from "../components/animations/AnimatedCounter.jsx";
import EnhancedMarquee from "../components/animations/EnhancedMarquee.jsx";
import MagneticButton from "../components/animations/MagneticButton.jsx";

const FEATURED = PRODUCTS.filter((p) => p.inStock).slice(0, 8);
const NEW_ARRIVALS = PRODUCTS.filter((p) => p.new && p.inStock).slice(0, 4);
const DISPLAY_PRODUCTS = NEW_ARRIVALS.length >= 4 ? NEW_ARRIVALS : FEATURED;

const TESTIMONIALS = [
  {
    text: "Je cherchais une paire de Cartier depuis deux ans. Le diagnostic en ligne m'a orienté directement vers la Santos-Dumont. Elle est parfaite.",
    name: "Claire M.",
    location: "Lyon",
    initials: "CM",
  },
  {
    text: "La consultation visio m'a évité une erreur de taille. Il a vu que la forme ovale de mon visage demandait quelque chose de plus structuré. Résultat : des YSL parfaites.",
    name: "Thomas R.",
    location: "Paris",
    initials: "TR",
  },
  {
    text: "Le paiement en 4 fois a été décisif. J'avais hésité des mois sur les Miu Miu. Je ne regrette pas une seconde. SAV impeccable.",
    name: "Sophia L.",
    location: "Bordeaux",
    initials: "SL",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Home({ onAddToCart }) {
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

  return (
    <div className="pt-nav">

      {/* ── EDITORIAL HERO ── */}
      <section className="editorial-hero" ref={heroRef}>
        <motion.div className="editorial-hero-bg" style={{ y: heroBgY }}>
          <img src="/images/hero-editorial.svg" alt="Maison Regard — Collection Cartier" />
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
          { to: "/boutique?gender=femme", img: "/images/cat-femme.svg", alt: "Solaires Femme", label: "Solaires Femme" },
          { to: "/boutique?gender=homme", img: "/images/cat-homme.svg", alt: "Solaires Homme", label: "Solaires Homme" },
          { to: "/boutique", img: "/images/cat-nouveautes.svg", alt: "Nouvelles Collections", label: "Nouvelles Collections", cta: "Voir tout →" },
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
                <h2 className="h2">Notre curation</h2>
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

      {/* ── BRAND TILES ── */}
      <section style={{ padding: "56px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
        <div className="container">
          <FadeUpWhenVisible>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div className="label" style={{ color: "var(--gray-light)", marginBottom: 6 }}>Revendeur officiel agréé</div>
              <h2 className="h2" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>Nos maisons partenaires</h2>
            </div>
          </FadeUpWhenVisible>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {BRANDS.slice(0, 8).map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/boutique?brand=${encodeURIComponent(brand)}`}
                  style={{
                    textAlign: "center",
                    fontFamily: "var(--serif)",
                    fontSize: "1rem",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--dark-2)",
                    opacity: 0.55,
                    padding: "20px 12px",
                    border: "1px solid var(--border)",
                    margin: "-1px 0 0 -1px",
                    transition: "all 0.3s",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.background = "#FAFAFA";
                    e.currentTarget.style.color = "var(--dark)";
                    e.currentTarget.style.letterSpacing = ".22em";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.55";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--dark-2)";
                    e.currentTarget.style.letterSpacing = ".18em";
                  }}
                >
                  {brand}
                </Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to="/boutique" style={{ fontSize: "0.65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gray)", textDecoration: "none" }}>
              Voir toutes les marques ({BRANDS.length}) →
            </Link>
          </div>
        </div>
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

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeUpWhenVisible>
            <div className="text-center mb-48">
              <div className="label" style={{ color: "var(--gray-light)", marginBottom: 8 }}>Avis clients vérifiés</div>
              <h2 className="h2">Ce que disent nos clients</h2>
            </div>
          </FadeUpWhenVisible>
          <div className="testimonials">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill="var(--sand)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "var(--sand)", fontFamily: "var(--serif)", fontSize: "0.85rem", fontWeight: 500 }}>{t.initials}</span>
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-location">{t.location}</div>
                  </div>
                </div>
              </motion.div>
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
