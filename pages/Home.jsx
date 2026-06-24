import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCTS, BRANDS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { TextReveal, FadeUpWhenVisible } from "../components/animations/TextReveal.jsx";
import AnimatedCounter from "../components/animations/AnimatedCounter.jsx";
import { ParallaxHero, ImageReveal, ParallaxSection } from "../components/animations/Parallax.jsx";
import MagneticButton from "../components/animations/MagneticButton.jsx";
import EnhancedMarquee from "../components/animations/EnhancedMarquee.jsx";

const TESTIMONIALS = [
  {
    text: "Je cherchais une paire de Cartier depuis deux ans, sans jamais trouver le bon accompagnement. Le diagnostic en ligne m'a envoyé directement vers la Santos-Dumont. Elle est parfaite.",
    name: "Claire M.",
    location: "Lyon",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    text: "La consultation visio avec l'opticien m'a évité une erreur de taille. Il a vu que la forme ovale de mon visage demandait quelque chose de plus structuré. Résultat : des YSL parfaites.",
    name: "Thomas R.",
    location: "Paris",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    text: "Le paiement en 4 fois sans frais a été décisif. J'avais hésité pendant des mois sur les Miu Miu. Je ne regrette pas une seconde. SAV impeccable au moindre doute.",
    name: "Sophia L.",
    location: "Bordeaux",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
];

const EDITORIAL_PICKS = PRODUCTS.filter((p) => p.tags.length > 0).slice(0, 4);
const NEW_ARRIVALS = PRODUCTS.filter((p) => p.new).slice(0, 3);

export default function Home({ onAddToCart }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="pt-nav">
      {/* ─── HERO avec parallax natif ─── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Image parallax */}
        <motion.div
          style={{
            y: heroY,
            position: "absolute",
            inset: "-20%",
            backgroundImage: "url('/images/hero-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(250,250,248,0.9) 40%, rgba(250,250,248,0.15) 100%)" }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="label hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Opticien diplômé d'état · Depuis 2018
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: 24 }}>
            <motion.h1
              className="h1 hero-title"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              Le regard <em>juste</em>,<br />la monture exacte.
            </motion.h1>
          </div>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Cartier, Fred, Gucci, Saint Laurent, Miu Miu, Céline, John Dalia. Une sélection de 200+ montures curatée par un opticien diplômé. Essayage 3D, conseil visio, paiement en 4 fois.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <MagneticButton as={Link} to="/diagnostic" className="btn btn-dark" strength={0.25}>
              Faire mon diagnostic
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton as={Link} to="/boutique" className="btn btn-outline" strength={0.2}>
              Voir la boutique
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="label" style={{ fontSize: "0.6rem", color: "var(--gray)" }}>Découvrir</span>
          <motion.div
            className="hero-scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>

      {/* ─── BRANDS MARQUEE amélioré ─── */}
      <div style={{ padding: "28px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <EnhancedMarquee items={BRANDS} speed={24} gap={72} renderItem={(brand, i) => (
          <Link key={i} to={`/boutique?brand=${encodeURIComponent(brand)}`} className="brand-name">
            {brand}
          </Link>
        )} />
      </div>

      {/* ─── STATS animées ─── */}
      <FadeUpWhenVisible>
        <section style={{ padding: "56px 0", background: "var(--dark)" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
              {[
                { to: 12, suffix: " ans", label: "d'expérience" },
                { to: 200, suffix: "+", label: "montures sélectionnées" },
                { to: 3, suffix: "", label: "boutiques à Lyon" },
                { to: 98, suffix: "%", label: "clients satisfaits" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center", padding: "40px 24px",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--sand)", lineHeight: 1 }}>
                    <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div style={{ fontSize: "0.72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUpWhenVisible>

      {/* ─── EDITORIAL INTRO ─── */}
      <section className="section-lg">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <FadeUpWhenVisible delay={0}>
                <div className="label text-sand mb-16">Notre philosophie</div>
              </FadeUpWhenVisible>
              <TextReveal as="h2" className="h2" delay={0.1} stagger={0.05}>
                Pas un catalogue. Une sélection.
              </TextReveal>
              <FadeUpWhenVisible delay={0.2}>
                <p style={{ color: "var(--gray)", lineHeight: 1.8, marginTop: 24, marginBottom: 16, fontSize: "0.95rem" }}>
                  Chaque monture que vous trouvez ici a été portée, testée et validée par un opticien diplômé. Pas de référencement automatique, pas d'algorithme — une curation humaine, monture par monture.
                </p>
              </FadeUpWhenVisible>
              <FadeUpWhenVisible delay={0.3}>
                <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.95rem" }}>
                  Notre obsession : que vous receviez une paire qui vous appartient, pas une paire que vous avez commandée.
                </p>
                <MagneticButton as={Link} to="/conseil" className="btn btn-outline">
                  Découvrir l'Espace Conseil
                </MagneticButton>
              </FadeUpWhenVisible>
            </div>

            <div style={{ position: "relative" }}>
              <ImageReveal
                src="/images/editorial-conseil.svg"
                alt="Opticien conseil"
                style={{ aspectRatio: "4/5" }}
              />
              <ParallaxSection speed={0.1} style={{ position: "absolute", bottom: -24, left: -24, zIndex: 2 }}>
                <div style={{ background: "var(--dark)", color: "white", padding: "24px 32px", maxWidth: 260 }}>
                  <div className="label text-sand mb-8">Opticien diplômé</div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", lineHeight: 1.4 }}>
                    12 ans d'expérience, 3 boutiques partenaires à Lyon.
                  </p>
                </div>
              </ParallaxSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIAGNOSTIC CTA ─── */}
      <section style={{ background: "#F0EBE2", padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <FadeUpWhenVisible>
              <div>
                <div className="label text-sand mb-12">2 minutes · 5 questions</div>
                <TextReveal as="h2" className="h2" stagger={0.06}>
                  Le Diagnostic Identité Visuelle
                </TextReveal>
                <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32, marginTop: 16 }}>
                  Forme du visage, style, usage, budget. En 5 étapes, je vous envoie une sélection de 3 à 5 montures avec une explication personnalisée. Ce n'est pas un algorithme froid. C'est ma voix.
                </p>
                <MagneticButton as={Link} to="/diagnostic" className="btn btn-dark">
                  Commencer le diagnostic
                </MagneticButton>
              </div>
            </FadeUpWhenVisible>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { n: "01", t: "Forme du visage", d: "Ovale, rond, carré, en cœur, rectangulaire" },
                { n: "02", t: "Usage principal", d: "Vue, soleil, mixte, sport" },
                { n: "03", t: "Votre style", d: "Minimaliste, Statement, Classique, Sport-chic" },
                { n: "04", t: "Budget & préférences matières" },
                { n: "05", t: "Email → Votre sélection personnalisée" },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "16px 20px", background: "white", border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--sand-dark)", flexShrink: 0 }}>
                    {step.n}
                  </span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: 2 }}>{step.t}</div>
                    {step.d && <div style={{ fontSize: "0.75rem", color: "var(--gray)" }}>{step.d}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      {NEW_ARRIVALS.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
              <FadeUpWhenVisible>
                <div>
                  <div className="label text-sand mb-8">Nouveautés</div>
                  <h2 className="h2">Les dernières arrivées</h2>
                </div>
              </FadeUpWhenVisible>
              <Link to="/boutique" className="btn btn-ghost">Voir tout →</Link>
            </div>
            <div className="grid-3">
              {NEW_ARRIVALS.map((p, i) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── EDITORIAL PICKS ─── */}
      <section className="section" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <FadeUpWhenVisible>
              <div>
                <div className="label text-sand mb-8">Sélection éditoriale</div>
                <h2 className="h2">Les pièces à ne pas manquer</h2>
              </div>
            </FadeUpWhenVisible>
            <Link to="/boutique" className="btn btn-ghost">Voir la boutique →</Link>
          </div>
          <div className="grid-4">
            {EDITORIAL_PICKS.map((p, i) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPSULE TEASER avec parallax ─── */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <ParallaxHero src="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1600&q=80" speed={0.25} height="100%">
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72))",
            display: "flex", alignItems: "flex-end", padding: "64px",
          }}>
            <FadeUpWhenVisible>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "var(--dark)", padding: "8px 20px", marginBottom: 20, fontSize: "0.7rem", letterSpacing: ".12em", textTransform: "uppercase" }}>
                  <span className="capsule-dot" />
                  Stock limité · 24 pièces
                </div>
                <h2 className="h2" style={{ color: "white", marginBottom: 20 }}>
                  Capsule "Ombre Portée"<br />
                  <em style={{ fontStyle: "italic", color: "var(--sand-light)" }}>Été 2025</em>
                </h2>
                <MagneticButton as={Link} to="/capsule" className="btn" style={{ background: "white", color: "var(--dark)" }}>
                  Découvrir la capsule
                </MagneticButton>
              </div>
            </FadeUpWhenVisible>
          </div>
        </ParallaxHero>
      </section>

      {/* ─── TRY-ON 3D BANNER ─── */}
      <motion.div
        className="tryon-banner"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="label text-sand mb-8">Technologie exclusive</div>
          <h3>Essayage virtuel en 3D</h3>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: 8, maxWidth: 420 }}>
            Essayez n'importe quelle monture sur votre visage en temps réel. Votre caméra reste privée — le rendu est local.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <motion.div
            className="tryon-icon"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            👁
          </motion.div>
          <MagneticButton as={Link} to="/boutique" className="btn" style={{ background: "white", color: "var(--dark)" }}>
            Essayer maintenant
          </MagneticButton>
        </div>
      </motion.div>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="container">
          <FadeUpWhenVisible>
            <div className="text-center mb-48">
              <div className="label text-sand mb-8">Avis clients</div>
              <h2 className="h2">Ce que disent nos clients</h2>
            </div>
          </FadeUpWhenVisible>
          <div className="testimonials">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="var(--sand)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={t.avatar} alt={t.name} />
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

      {/* ─── BOUTIQUES ─── */}
      <section className="section" style={{ background: "var(--dark)", color: "white" }}>
        <div className="container">
          <FadeUpWhenVisible>
            <div className="text-center mb-48">
              <div className="label" style={{ color: "var(--sand)", marginBottom: 8 }}>Présence physique</div>
              <h2 className="h2 text-white">3 boutiques à Lyon<br />pour vous accueillir</h2>
            </div>
          </FadeUpWhenVisible>
          <div className="grid-3">
            {[
              { name: "Saint Clair", address: "12 rue Saint-Clair, Lyon 4e", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", phone: "04 72 XX XX XX" },
              { name: "J'aime mes lunettes", address: "La Duchère, Lyon 9e", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80", phone: "04 37 XX XX XX" },
              { name: "Optique Mas du Torro", address: "Mas du Torro, Lyon", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", phone: "04 72 XX XX XX" },
            ].map((b, i) => (
              <motion.div
                key={b.name}
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(196,168,130,0.5)" }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <motion.img
                    src={b.img}
                    alt={b.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                    whileHover={{ scale: 1.06, opacity: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", marginBottom: 6 }}>{b.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{b.address}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--sand)" }}>{b.phone}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-48">
            <MagneticButton as={Link} to="/boutiques" className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
              Voir les boutiques & horaires
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ─── SAV STRIP ─── */}
      <section style={{ padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { icon: "🚚", title: "Livraison offerte", desc: "Dès 150€ d'achat · 24-48h" },
              { icon: "↩", title: "Retour 30 jours", desc: "Sans friction, remboursement garanti" },
              { icon: "🔧", title: "SAV Expert", desc: "Opticien disponible 7j/7" },
              { icon: "📅", title: "RDV Visio", desc: "Consultation personnalisée gratuite" },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.875rem", marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
