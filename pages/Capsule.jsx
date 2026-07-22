import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import DataState from "../components/DataState.jsx";

export default function Capsule({ onAddToCart }) {
  const { products, loading, error } = useProducts();
  const [countdown] = useState({ days: 12, hours: 7, min: 34 });

  // useMemo (pas recalculé à chaque rendu) : sinon le stock "aléatoire"
  // changerait sous les yeux du visiteur à chaque interaction de la page.
  const CAPSULE_PRODUCTS = useMemo(
    () =>
      products.slice(0, 8).map((p, i) => ({
        ...p,
        capsuleName: [
          "La Lumière Rasante",
          "L'Ombre Portée",
          "Le Reflet Brisé",
          "La Trace Bleue",
          "Le Crépuscule",
          "L'Empreinte Dorée",
          "Le Seuil",
          "Le Contre-Jour",
        ][i],
        stock: Math.floor(Math.random() * 8) + 3,
      })),
    [products]
  );

  return (
    <DataState loading={loading} error={error}>
    <div className="pt-nav">
      {/* ─── HERO CAPSULE ─── */}
      <div className="capsule-hero" style={{ height: "80vh" }}>
        <img
          src="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1600&q=85"
          alt="Capsule Ombre Portée"
          className="capsule-hero-img"
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 80px",
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "var(--dark)", padding: "8px 20px", marginBottom: 24, fontSize: "0.7rem", letterSpacing: ".12em", textTransform: "uppercase" }}>
              <span className="capsule-dot" />
              Stock limité · {CAPSULE_PRODUCTS.reduce((s, p) => s + p.stock, 0)} pièces restantes
            </div>
            <div style={{ fontSize: "0.75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
              Capsule Collection · Été 2025
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: 16 }}>
              "Ombre Portée"
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
              Une sélection de 8 montures réunies autour d'un thème visuel : les jeux de lumière et de contraste. Co-éditée avec un photographe de mode lyonnais.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#collection" className="btn" style={{ background: "white", color: "var(--dark)" }}>
                Découvrir la collection
              </a>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}>
                Disponible encore {countdown.days}j {countdown.hours}h {countdown.min}min
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MANIFESTE ─── */}
      <section style={{ background: "var(--dark)", color: "white", padding: "80px 0" }}>
        <div className="container-sm text-center">
          <div className="label" style={{ color: "var(--sand)", marginBottom: 20 }}>Le manifeste</div>
          <blockquote style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}>
            "On cherche un thème qui dit quelque chose sur la façon dont on regarde le monde — pas sur les lunettes elles-mêmes. L'ombre portée, c'est ce qu'on laisse après être passé."
          </blockquote>
          <div style={{ marginTop: 24, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>
            — Co-signé par l'opticien & Luc D., photographe
          </div>
        </div>
      </section>

      {/* ─── INTERVIEW ─── */}
      <section className="section" style={{ background: "#F0EBE2" }}>
        <div className="container-sm">
          <div className="label text-sand mb-16 text-center">Conversation</div>
          <h2 className="h2 text-center" style={{ marginBottom: 48 }}>5 questions · 2 regards</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              {
                q: "D'où vient ce titre, 'Ombre Portée' ?",
                a1: { author: "L'opticien", text: "J'ai pensé à toutes ces montures qui changent la façon dont la lumière touche le visage. Une monture fine laisse une ombre légère. Une monture épaisse redessine le regard." },
                a2: { author: "Luc, photographe", text: "Pour moi c'est une métaphore. On choisit une monture comme on choisit comment on veut être vu. L'ombre portée, c'est l'empreinte qu'on laisse." },
              },
              {
                q: "Quelle a été la contrainte la plus difficile ?",
                a1: { author: "L'opticien", text: "Limiter à 8 pièces. Il y en avait 12 au départ. Réduire sans trahir le thème — c'est ça la vraie curation." },
                a2: { author: "Luc, photographe", text: "Trouver des visages réels. Des gens qui portent vraiment ces montures, pas des modèles qui font semblant. Ça a pris du temps mais le résultat est sans filtre." },
              },
            ].map((qa, i) => (
              <div key={i} style={{ padding: "32px", background: "white", border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontStyle: "italic", marginBottom: 24, color: "var(--sand-dark)" }}>
                  "{qa.q}"
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 24 }}>
                  {[qa.a1, qa.a2].map((a) => (
                    <div key={a.author}>
                      <div className="label" style={{ marginBottom: 8, color: "var(--dark)" }}>{a.author}</div>
                      <p style={{ fontSize: "0.875rem", color: "var(--gray)", lineHeight: 1.7 }}>"{a.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTION ─── */}
      <section className="section" id="collection">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="label text-sand mb-8">8 pièces · Stock limité</div>
              <h2 className="h2">La Collection</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginBottom: 4 }}>Expire dans</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", color: "var(--sand-dark)" }}>
                {countdown.days}j {countdown.hours}h {countdown.min}min
              </div>
            </div>
          </div>

          <div className="grid-4">
            {CAPSULE_PRODUCTS.map((p) => (
              <div key={p.id}>
                <div style={{ position: "relative" }}>
                  <ProductCard product={p} onAddToCart={onAddToCart} />
                  <div style={{ marginTop: 8, padding: "10px 0", borderTop: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sand-dark)", marginBottom: 4 }}>
                      Pièce de la capsule
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic" }}>"{p.capsuleName}"</div>
                    <div style={{ fontSize: "0.72rem", color: p.stock <= 5 ? "#C0392B" : "var(--gray)", marginTop: 4 }}>
                      {p.stock} {p.stock === 1 ? "exemplaire" : "exemplaires"} restants
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARCHIVE CTA ─── */}
      <section style={{ background: "var(--dark)", color: "white", padding: "64px 0", textAlign: "center" }}>
        <div className="container">
          <div className="label" style={{ color: "var(--sand)", marginBottom: 12 }}>Capsule Hiver 2024</div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, marginBottom: 12 }}>
            "Longitude" — Archive
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Stock épuisé · La capsule reste visible comme partie de l'histoire de la Maison.</p>
          <button className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
            Voir l'archive →
          </button>
        </div>
      </section>
    </div>
    </DataState>
  );
}
