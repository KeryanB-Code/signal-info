import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const ALMA_PLANS = [
  { x: "2x", label: "2 fois", monthly: null },
  { x: "3x", label: "3 fois", monthly: null },
  { x: "4x", label: "4 fois", monthly: null },
];

function TryOnModal({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ overflow: "hidden" }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div style={{ padding: "32px 32px 0" }}>
          <div className="label text-sand mb-8">Essayage Virtuel 3D</div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 4 }}>
            {product.brand} — {product.name}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--gray)", marginBottom: 20 }}>
            Autorisation de caméra requise · Rendu 100% local · Vos données ne quittent pas votre appareil
          </p>
        </div>
        <div className="tryon-cam">
          <div className="tryon-placeholder">
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>👁</div>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", marginBottom: 8 }}>
              Essayage 3D
            </p>
            <p style={{ fontSize: "0.82rem", opacity: 0.6, marginBottom: 24 }}>
              Dans la version live, votre caméra s'active ici et superpose la monture sur votre visage en temps réel grâce à la détection de points de repère faciaux.
            </p>
            <button
              className="btn btn-sand"
              style={{ fontSize: "0.8rem" }}
              onClick={() => alert("Activation de la caméra… (intégration Snapchat Lens / Visage Tech en production)")}
            >
              Activer la caméra
            </button>
          </div>
        </div>
        <div style={{ padding: "24px 32px 32px" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--gray)" }}>
            Technologie basée sur la détection de points de repère faciaux. Fonctionne avec Chrome, Firefox, Safari. Données non transmises.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Product({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  const [imgIdx, setImgIdx] = useState(0);
  const [selectedAlma, setSelectedAlma] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  if (!product) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 16 }}>Monture introuvable</p>
        <Link to="/boutique" className="btn btn-outline">Retour à la boutique</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 3);

  const almaMonthly = (times) => Math.ceil(product.price / times).toLocaleString("fr-FR");

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pt-nav">
      {tryOnOpen && <TryOnModal product={product} onClose={() => setTryOnOpen(false)} />}

      {/* Breadcrumb */}
      <div style={{ padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.75rem", color: "var(--gray)" }}>
          <Link to="/" style={{ color: "var(--gray)" }}>Accueil</Link>
          <span>/</span>
          <Link to="/boutique" style={{ color: "var(--gray)" }}>Boutique</Link>
          <span>/</span>
          <Link to={`/boutique?brand=${product.brand}`} style={{ color: "var(--gray)" }}>{product.brand}</Link>
          <span>/</span>
          <span style={{ color: "var(--dark)" }}>{product.name}</span>
        </div>
      </div>

      {/* Main product layout */}
      <div className="container" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 64, alignItems: "start" }}>

          {/* ─── GALERIE ─── */}
          <div className="product-gallery">
            <div className="product-thumbs">
              {product.images.map((src, i) => (
                <div
                  key={i}
                  className={`product-thumb ${imgIdx === i ? "active" : ""}`}
                  onClick={() => setImgIdx(i)}
                >
                  <img src={src} alt={`${product.name} vue ${i + 1}`} />
                </div>
              ))}
              <button
                onClick={() => setTryOnOpen(true)}
                style={{
                  border: "1px dashed var(--sand)", padding: "8px 4px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  cursor: "pointer", background: "none", fontSize: "1.2rem",
                }}
                title="Essai 3D"
              >
                <span>👁</span>
                <span style={{ fontSize: "0.55rem", color: "var(--sand-dark)", letterSpacing: ".05em" }}>3D</span>
              </button>
            </div>
            <div className="product-main-img">
              <img src={product.images[imgIdx]} alt={`${product.brand} ${product.name}`} />
            </div>
          </div>

          {/* ─── INFOS PRODUIT ─── */}
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ marginBottom: 6 }}>
              <Link to={`/boutique?brand=${product.brand}`} className="label text-sand">{product.brand}</Link>
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 400, marginBottom: 4, lineHeight: 1.2 }}>
              {product.name}
            </h1>
            <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: 20 }}>{product.subtitle}</p>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? "var(--sand)" : "var(--border)"} stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--gray)" }}>
                {product.rating} · {product.reviewCount} avis
              </span>
            </div>

            {/* Prix */}
            <div style={{ fontSize: "1.8rem", fontFamily: "var(--serif)", fontWeight: 400, marginBottom: 24 }}>
              {product.price.toLocaleString("fr-FR")} €
            </div>

            {/* Couleurs */}
            {product.colors.length > 1 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 500, marginBottom: 10 }}>
                  Coloris : <span style={{ fontWeight: 300, color: "var(--gray)" }}>{product.colors[selectedColor]}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      style={{
                        padding: "6px 16px", border: `1px solid ${selectedColor === i ? "var(--dark)" : "var(--border)"}`,
                        fontSize: "0.75rem", background: selectedColor === i ? "var(--dark)" : "white",
                        color: selectedColor === i ? "white" : "var(--gray)", cursor: "pointer", transition: "all .2s",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Alma Widget */}
            <div className="alma-widget">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: "0.65rem", letter: ".1em", textTransform: "uppercase", fontWeight: 600, color: "var(--sand-dark)" }}>
                  ALMA
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--gray)" }}>— Paiement en plusieurs fois sans frais</span>
              </div>
              <div className="alma-options">
                {ALMA_PLANS.map((plan, i) => (
                  <div
                    key={i}
                    className={`alma-option ${selectedAlma === i ? "selected" : ""}`}
                    onClick={() => setSelectedAlma(i)}
                  >
                    <div className="installments">{plan.x}</div>
                    <div className="amount">{almaMonthly(i + 2)} €/mois</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.68rem", color: "var(--gray)", marginTop: 8 }}>
                Paiement sécurisé · 0% de frais · Visa, Mastercard
              </p>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button
                className={`btn ${addedToCart ? "btn-sand" : "btn-dark"}`}
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock ? "Me notifier du réassort" : addedToCart ? "Ajouté ✓" : "Ajouter au panier"}
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: "14px 16px" }}
                onClick={() => setTryOnOpen(true)}
                title="Essayer en 3D"
              >
                👁 3D
              </button>
            </div>

            <button
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 10, display: "flex", justifyContent: "center" }}
              onClick={() => navigate("/conseil")}
            >
              Demander l'avis de l'opticien →
            </button>

            {/* Correction */}
            {product.correction && (
              <div style={{ marginTop: 20, border: "1px solid var(--border)", padding: 16 }}>
                <button
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setCorrectionOpen(!correctionOpen)}
                >
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1rem" }}>Ajouter une correction</span>
                  <span style={{ transform: correctionOpen ? "rotate(180deg)" : "none", transition: ".2s", color: "var(--gray)" }}>▾</span>
                </button>
                {correctionOpen && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--gray)", marginBottom: 16 }}>
                      Renseignez votre ordonnance (ou envoyez-la par email après commande). L'opticien la vérifie avant montage.
                    </p>
                    <div className="correction-grid">
                      {["Verres simples", "Progressifs", "Anti-lumière bleue", "Photochromiques"].map((v) => (
                        <div key={v} className="correction-card">
                          <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{v}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginTop: 4 }}>Sur devis</div>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-outline" style={{ marginTop: 16, width: "100%", display: "flex", justifyContent: "center", fontSize: "0.75rem" }}>
                      Renseigner mon ordonnance
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Personnalisation */}
            <div style={{ marginTop: 12, border: "1px solid var(--border)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.875rem" }}>Personnalisation & dégradés</span>
              <Link to="/sav" style={{ fontSize: "0.72rem", color: "var(--sand-dark)", textDecoration: "underline" }}>En savoir plus →</Link>
            </div>

            {/* Garanties */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "🚚", text: "Livraison offerte · Expédition sous 24h" },
                { icon: "↩", text: "Retour gratuit sous 30 jours" },
                { icon: "🔧", text: "2 ans de garantie constructeur" },
                { icon: "📅", text: "Consultation visio gratuite incluse" },
              ].map((g) => (
                <div key={g.text} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: "0.8rem", color: "var(--gray)" }}>
                  <span>{g.icon}</span>
                  {g.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── TABS : Description / Matières / Avis ─── */}
        <div style={{ marginTop: 64 }}>
          <div className="option-tabs">
            {[
              { id: "desc", label: "Description" },
              { id: "matieres", label: "Matières & dimensions" },
              { id: "avis", label: `Avis (${product.reviewCount})` },
            ].map((t) => (
              <button
                key={t.id}
                className={`option-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "desc" && (
            <div style={{ maxWidth: 720 }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--gray)" }}>{product.description}</p>
              <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.tags.map((tag) => (
                  <span key={tag} className="badge badge-sand">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "matieres" && (
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                <div style={{ padding: "20px 24px", background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div className="label" style={{ marginBottom: 8, color: "var(--dark)" }}>Matières</div>
                  {product.materials.map((m) => (
                    <div key={m} style={{ fontSize: "0.875rem", color: "var(--gray)", marginBottom: 4 }}>— {m}</div>
                  ))}
                </div>
                <div style={{ padding: "20px 24px", background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div className="label" style={{ marginBottom: 8, color: "var(--dark)" }}>Coloris disponibles</div>
                  {product.colors.map((c) => (
                    <div key={c} style={{ fontSize: "0.875rem", color: "var(--gray)", marginBottom: 4 }}>— {c}</div>
                  ))}
                </div>
                <div style={{ padding: "20px 24px", background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div className="label" style={{ marginBottom: 8, color: "var(--dark)" }}>Correction</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--gray)" }}>
                    {product.correction ? "Disponible — Verres correcteurs adaptables" : "Non disponible sur ce modèle"}
                  </div>
                </div>
                <div style={{ padding: "20px 24px", background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div className="label" style={{ marginBottom: 8, color: "var(--dark)" }}>Étui & livraison</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--gray)" }}>Étui de marque d'origine · Chiffon de nettoyage · Certificat d'authenticité</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "avis" && (
            <div style={{ maxWidth: 720 }}>
              {[
                { note: 5, name: "M. Durand", date: "Mars 2025", text: `Monture reçue en parfait état, exactement comme sur les photos. La consultation visio avant achat m'a rassuré sur la taille. Livraison rapide, emballage premium.` },
                { note: 5, name: "Julie B.", date: "Fév. 2025", text: "J'avais hésité à commander en ligne une monture de cette gamme. Le diagnostic m'a guidée, et l'opticien a pris le temps de répondre à mes questions. Parfait." },
                { note: 4, name: "Alexis T.", date: "Jan. 2025", text: "Belle monture, conforme à l'annonce. Un petit bémol sur le délai de livraison (3 jours au lieu de 24h), mais le SAV a été réactif pour m'informer." },
              ].map((r, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.875rem", marginBottom: 4 }}>{r.name}</div>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill={j < r.note ? "var(--sand)" : "var(--border)"} stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--gray-light)" }}>{r.date}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray)", lineHeight: 1.7 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── PRODUITS SIMILAIRES ─── */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div className="divider-gold" style={{ marginBottom: 48 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <div className="label text-sand mb-8">Du même créateur</div>
                <h3 className="h3">Autres modèles {product.brand}</h3>
              </div>
              <Link to={`/boutique?brand=${product.brand}`} className="btn btn-ghost">Voir tout →</Link>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
