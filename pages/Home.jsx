import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS, BRANDS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

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
  const navigate = useNavigate();
  const [diagStep, setDiagStep] = useState(null);

  return (
    <div className="pt-nav">
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-image-overlay" />
        <div className="hero-gradient" />
        <div className="container hero-content">
          <div className="label hero-eyebrow anim-fade-up">Opticien diplômé d'état · Depuis 2018</div>
          <h1 className="h1 hero-title anim-fade-up anim-d1">
            Le regard <em>juste</em>,<br />la monture exacte.
          </h1>
          <p className="hero-subtitle anim-fade-up anim-d2">
            Cartier, Fred, Gucci, Saint Laurent, Miu Miu, Céline, John Dalia. Une sélection de 200+ montures curatée par un opticien diplômé. Essayage 3D, conseil visio, paiement en 4 fois.
          </p>
          <div className="hero-actions anim-fade-up anim-d3">
            <Link to="/diagnostic" className="btn btn-dark">
              Faire mon diagnostic
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/boutique" className="btn btn-outline">
              Voir la boutique
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="label" style={{ fontSize: "0.6rem", color: "var(--gray)" }}>Découvrir</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ─── BRANDS STRIP ─── */}
      <div className="brands-strip">
        <div className="brands-track">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <Link key={i} to={`/boutique?brand=${encodeURIComponent(b)}`} className="brand-name">
              {b}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── EDITORIAL INTRO ─── */}
      <section className="section-lg">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div className="anim-fade-up">
              <div className="label text-sand mb-16">Notre philosophie</div>
              <h2 className="h2" style={{ marginBottom: 24 }}>
                Pas un catalogue.<br />
                <em style={{ fontStyle: "italic", color: "var(--sand-dark)" }}>Une sélection.</em>
              </h2>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 16, fontSize: "0.95rem" }}>
                Chaque monture que vous trouvez ici a été portée, testée et validée par un opticien diplômé. Pas de référencement automatique, pas d'algorithme — une curation humaine, monture par monture.
              </p>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.95rem" }}>
                Notre obsession : que vous receviez une paire qui vous appartient, pas une paire que vous avez commandée.
              </p>
              <Link to="/conseil" className="btn btn-outline">
                Découvrir l'Espace Conseil
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=85"
                  alt="Opticien conseil"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{
                position: "absolute", bottom: -24, left: -24,
                background: "var(--dark)", color: "white", padding: "24px 32px",
                maxWidth: 260,
              }}>
                <div className="label text-sand mb-8">Opticien diplômé</div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", lineHeight: 1.4 }}>
                  12 ans d'expérience, 3 boutiques partenaires à Lyon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIAGNOSTIC CTA ─── */}
      <section style={{ background: "#F0EBE2", padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div className="label text-sand mb-12">2 minutes · 5 questions</div>
              <h2 className="h2" style={{ marginBottom: 16 }}>Le Diagnostic<br />Identité Visuelle</h2>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32 }}>
                Forme du visage, style, usage, budget. En 5 étapes, je vous envoie une sélection de 3 à 5 montures — avec une explication personnalisée pour chacune. Ce n'est pas un algorithme froid. C'est ma voix.
              </p>
              <Link to="/diagnostic" className="btn btn-dark">
                Commencer le diagnostic
              </Link>
            </div>

            {/* Mini-preview des étapes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "01", t: "Forme du visage", d: "Ovale, rond, carré, en cœur, rectangulaire" },
                { n: "02", t: "Usage principal", d: "Vue, soleil, mixte, sport" },
                { n: "03", t: "Votre style", d: "Minimaliste, Statement, Classique, Sport-chic" },
                { n: "04", t: "Budget & préférences matières" },
                { n: "05", t: "Email → Votre sélection personnalisée" },
              ].map((step) => (
                <div key={step.n} style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  padding: "16px 20px", background: "white", border: "1px solid var(--border)",
                }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--sand-dark)", flexShrink: 0 }}>
                    {step.n}
                  </span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: 2 }}>{step.t}</div>
                    {step.d && <div style={{ fontSize: "0.75rem", color: "var(--gray)" }}>{step.d}</div>}
                  </div>
                </div>
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
              <div>
                <div className="label text-sand mb-8">Nouveautés</div>
                <h2 className="h2">Les dernières arrivées</h2>
              </div>
              <Link to="/boutique" className="btn btn-ghost">Voir tout →</Link>
            </div>
            <div className="grid-3">
              {NEW_ARRIVALS.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── EDITORIAL PICKS ─── */}
      <section className="section" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="label text-sand mb-8">Sélection éditoriale</div>
              <h2 className="h2">Les pièces à ne pas manquer</h2>
            </div>
            <Link to="/boutique" className="btn btn-ghost">Voir la boutique →</Link>
          </div>
          <div className="grid-4">
            {EDITORIAL_PICKS.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPSULE TEASER ─── */}
      <section className="capsule-hero">
        <img
          src="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1600&q=80"
          alt="Capsule Collection"
          className="capsule-hero-img"
        />
        <div className="capsule-hero-overlay">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "var(--dark)", padding: "8px 20px", marginBottom: 20, fontSize: "0.7rem", letterSpacing: ".12em", textTransform: "uppercase" }}>
              <span className="capsule-dot" />
              Stock limité · 24 pièces
            </div>
            <h2 className="h2" style={{ color: "white", marginBottom: 20 }}>
              Capsule "Ombre Portée"<br />
              <em style={{ fontStyle: "italic", color: "var(--sand-light)" }}>Été 2025</em>
            </h2>
            <Link to="/capsule" className="btn" style={{ background: "white", color: "var(--dark)" }}>
              Découvrir la capsule
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRY-ON 3D BANNER ─── */}
      <div className="tryon-banner">
        <div>
          <div className="label text-sand mb-8">Technologie exclusive</div>
          <h3>Essayage virtuel en 3D</h3>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: 8, maxWidth: 420 }}>
            Essayez n'importe quelle monture sur votre visage en temps réel. Votre caméra reste privée — le rendu est local.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div className="tryon-icon">👁</div>
          <Link to="/boutique" className="btn" style={{ background: "white", color: "var(--dark)" }}>
            Essayer maintenant
          </Link>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="label text-sand mb-8">Avis clients</div>
            <h2 className="h2">Ce que disent nos clients</h2>
          </div>
          <div className="testimonials">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial anim-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOUTIQUES ─── */}
      <section className="section" style={{ background: "var(--dark)", color: "white" }}>
        <div className="container">
          <div className="text-center mb-48">
            <div className="label" style={{ color: "var(--sand)", marginBottom: 8 }}>Présence physique</div>
            <h2 className="h2 text-white">3 boutiques à Lyon<br />pour vous accueillir</h2>
          </div>
          <div className="grid-3">
            {[
              { name: "Saint Clair", address: "12 rue Saint-Clair, Lyon 4e", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", phone: "04 72 XX XX XX" },
              { name: "J'aime mes lunettes", address: "La Duchère, Lyon 9e", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80", phone: "04 37 XX XX XX" },
              { name: "Optique Mas du Torro", address: "Mas du Torro, Lyon", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", phone: "04 72 XX XX XX" },
            ].map((b) => (
              <div key={b.name} style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img src={b.img} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", marginBottom: 6 }}>{b.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{b.address}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--sand)" }}>{b.phone}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-48">
            <Link to="/boutiques" className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
              Voir les boutiques & horaires
            </Link>
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
            ].map((s) => (
              <div key={s.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.875rem", marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
