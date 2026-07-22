import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "../context/ProductsContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { getLifestylePhoto } from "../utils/lifestylePhotos.js";
import { IconShield, IconStar, IconWarranty, IconDelivery, IconGlasses } from "../components/TrustIcons.jsx";

const PAYMENT_PLANS = [
  { times: 1, x: "1x", label: "Comptant" },
  { times: 2, x: "2x", label: "2 fois" },
  { times: 3, x: "3x", label: "3 fois" },
  { times: 4, x: "4x", label: "4 fois" },
];

// Les coloris sont saisis en toutes lettres ("Corne brune / Or", "Noir mat"),
// jamais en hexadécimal : on reconstitue une pastille à partir des mots reconnus,
// pour remplacer les pastilles-texte par de vraies pastilles de couleur.
const SWATCH_WORDS = [
  ["ruthenium", "#4A4E52"], ["palladium", "#C6C8CA"], ["titane", "#A8ADB2"],
  ["gunmetal", "#4A4E52"], ["platine", "#D6D8D9"], ["fume", "#6E6A66"],
  ["bordeaux", "#5C1A24"], ["chocolat", "#4B2E1E"], ["ecaille", "#6B4226"],
  ["havane", "#8C5B2F"], ["cristal", "#E4E2DD"], ["crystal", "#E4E2DD"],
  ["ink", "#1B2A3A"], ["transparent", "#E4E2DD"],
  ["ivoire", "#EFE7D8"], ["nacre", "#EDE6DA"], ["taupe", "#8A7A6A"],
  ["ambre", "#B26A21"], ["sable", "#C4A882"], ["beige", "#D9C7AE"],
  ["nude", "#D9C7AE"], ["corne", "#7A5C3E"], ["marron", "#5B3A22"],
  ["brun", "#5B3A22"], ["kaki", "#4A4A32"], ["argent", "#C9CBCC"],
  ["acier", "#9AA0A6"], ["dore", "#C9A227"], ["or", "#C9A227"],
  ["noir", "#12100E"], ["blanc", "#F2EFE9"], ["gris", "#8A8A8A"],
  ["bleu", "#1F3A5F"], ["vert", "#2F4A34"], ["rouge", "#7A1F26"],
  ["rose", "#D8A0A6"], ["violet", "#4A3A5C"], ["jaune", "#D4B44A"],
];

const deburr = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function toneOf(part) {
  const t = deburr(part);
  // Les entrées longues d'abord (cf. ordre de SWATCH_WORDS) : "ecaille" doit
  // gagner sur "aille", "dore" sur "or".
  const hit = SWATCH_WORDS.find(([word]) => t.includes(word));
  return hit ? hit[1] : "#B8B2A7";
}

// "Corne brune / Or" → dégradé deux tons, coupé net à 50% comme une monture bicolore.
function swatchBackground(color) {
  const tones = String(color).split("/").map(toneOf);
  if (tones.length < 2) return tones[0];
  return `linear-gradient(135deg, ${tones[0]} 0 50%, ${tones[1]} 50% 100%)`;
}

// Fenêtre de livraison indicative, calculée à l'affichage : une date figée dans
// le code vieillirait mal en démo.
function deliveryWindow(from = new Date()) {
  const day = (n) => new Date(from.getTime() + n * 86400000);
  const fmt = (d, withMonth) =>
    withMonth
      ? d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
      : d.toLocaleDateString("fr-FR", { day: "numeric" });
  const start = day(3);
  const end = day(6);
  const sameMonth = start.getMonth() === end.getMonth();
  return `${fmt(start, !sameMonth)} – ${fmt(end, true)}`;
}

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
  const { products, loading, error } = useProducts();
  const product = products.find((p) => p.id === id);

  const [imgIdx, setImgIdx] = useState(1); /* start on clean product shot (index 1 after lifestyle prepend) */
  const [selectedAlma, setSelectedAlma] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [selectedLensType, setSelectedLensType] = useState(null);
  const [prescriptionFormOpen, setPrescriptionFormOpen] = useState(false);
  const [prescription, setPrescription] = useState({ sphOD: "", cylOD: "", axeOD: "", sphOG: "", cylOG: "", axeOG: "" });
  const [prescriptionSaved, setPrescriptionSaved] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const [allColorsOpen, setAllColorsOpen] = useState(false);

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
        <p style={{ color: "var(--gray)" }}>Impossible de charger cette fiche produit. Réessaie dans quelques instants.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 16 }}>Monture introuvable</p>
        <Link to="/boutique" className="btn btn-outline">Retour à la boutique</Link>
      </div>
    );
  }

  const lifestyleImg = getLifestylePhoto(product);
  const galleryImages = [lifestyleImg, ...product.images];
  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 3);

  const almaMonthly = (times) => Math.ceil(product.price / times).toLocaleString("fr-FR");

  // Au-delà de 4 coloris on replie, comme sur les fiches des grandes enseignes :
  // la rangée de pastilles ne doit jamais passer à la ligne.
  const visibleColors = allColorsOpen ? product.colors : product.colors.slice(0, 4);

  const handleAddToCart = () => {
    const item = selectedLensType
      ? { ...product, lensType: selectedLensType, prescription: prescriptionSaved ? prescription : null }
      : product;
    if (onAddToCart) onAddToCart(item);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/panier");
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    setPrescriptionSaved(true);
    setPrescriptionFormOpen(false);
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
        <div className="product-detail-layout">

          {/* ─── GALERIE ─── */}
          <motion.div
            className="product-gallery"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="product-thumbs">
              {galleryImages.map((src, i) => (
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
            {/* Crossfade gallery — all images stacked, active shown via CSS class */}
            <div className="product-main-img">
              {galleryImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.brand} ${product.name}`}
                  className={imgIdx === i ? "active" : ""}
                />
              ))}
            </div>
          </motion.div>

          {/* ─── INFOS PRODUIT ─── */}
          <motion.div
            style={{ position: "sticky", top: 100 }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
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
            <div className="pdp-price">
              <div className="pdp-price-amount">{product.price.toLocaleString("fr-FR")} €</div>
              <div className="pdp-price-note">Prix TTC · verres correcteurs sur devis</div>
            </div>

            {/* Coloris */}
            {product.colors.length > 1 && (
              <div className="pdp-colors">
                <div className="pdp-colors-head">
                  <span>
                    Couleur <span className="pdp-colors-current">{product.colors[selectedColor]}</span>
                  </span>
                  {product.colors.length > 4 && (
                    <button className="pdp-colors-toggle" onClick={() => setAllColorsOpen(!allColorsOpen)}>
                      {allColorsOpen ? "Réduire" : `Voir les ${product.colors.length} couleurs`}
                    </button>
                  )}
                </div>
                <div className="pdp-swatches">
                  {visibleColors.map((c, i) => (
                    <button
                      key={c}
                      className={`pdp-swatch ${selectedColor === i ? "selected" : ""}`}
                      onClick={() => setSelectedColor(i)}
                      title={c}
                      aria-label={c}
                      aria-pressed={selectedColor === i}
                    >
                      <span className="pdp-swatch-tone" style={{ background: swatchBackground(c) }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="pdp-microline">
              Livraison offerte en France métropolitaine · 30 jours pour changer d'avis
            </p>

            {/* Modalités de paiement */}
            <div className="alma-widget">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: "0.65rem", letter: ".1em", textTransform: "uppercase", fontWeight: 600, color: "var(--sand-dark)" }}>
                  ALMA
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--gray)" }}>— Comptant ou en plusieurs fois sans frais</span>
              </div>
              <div className="alma-options">
                {PAYMENT_PLANS.map((plan, i) => (
                  <div
                    key={i}
                    className={`alma-option ${selectedAlma === i ? "selected" : ""}`}
                    onClick={() => setSelectedAlma(i)}
                  >
                    <div className="installments">{plan.x}</div>
                    <div className="amount">
                      {plan.times === 1 ? `${almaMonthly(1)} €` : `${almaMonthly(plan.times)} €/mois`}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.68rem", color: "var(--gray)", marginTop: 8 }}>
                Paiement sécurisé · 0% de frais · Visa, Mastercard
              </p>
            </div>

            {/* CTA */}
            <div className="pdp-cta">
              <button
                className={`btn ${addedToCart ? "btn-sand" : "btn-dark"} pdp-cta-main`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock ? "Me notifier du réassort" : addedToCart ? "Ajouté ✓" : "Ajouter au panier"}
              </button>
              {product.inStock && (
                <button className="btn btn-outline pdp-cta-main" onClick={handleBuyNow}>
                  Acheter maintenant
                </button>
              )}
            </div>

            <div className="pdp-secondary">
              <button onClick={() => setTryOnOpen(true)}>Essayer en 3D</button>
              <span aria-hidden="true">·</span>
              <button onClick={() => navigate("/conseil")}>Demander l'avis de l'opticien</button>
            </div>

            <div className="pdp-or"><span>ou</span></div>

            {/* Personnaliser les verres */}
            {product.correction && (
              <div className={`pdp-custom ${correctionOpen ? "open" : ""}`}>
                <button className="pdp-custom-head" onClick={() => setCorrectionOpen(!correctionOpen)}>
                  <span>
                    <span className="pdp-custom-title">Personnaliser les verres</span>
                    <span className="pdp-custom-sub">Correction optique · teinte · dégradé</span>
                  </span>
                  <IconGlasses className="pdp-custom-icon" />
                </button>
                {correctionOpen && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--gray)", marginBottom: 16 }}>
                      Choisissez votre type de verre, puis renseignez votre ordonnance. L'opticien la vérifie avant montage.
                    </p>
                    <div className="correction-grid">
                      {["Verres simples", "Progressifs", "Anti-lumière bleue", "Photochromiques"].map((v) => (
                        <div
                          key={v}
                          className="correction-card"
                          onClick={() => setSelectedLensType(v)}
                          style={{
                            cursor: "pointer",
                            borderColor: selectedLensType === v ? "var(--sand-dark)" : undefined,
                            background: selectedLensType === v ? "var(--sand-light)" : undefined,
                          }}
                        >
                          <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{v}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginTop: 4 }}>Sur devis</div>
                        </div>
                      ))}
                    </div>

                    {prescriptionSaved ? (
                      <div style={{ marginTop: 16, padding: 12, background: "var(--sand-light)", fontSize: "0.78rem" }}>
                        ✓ Ordonnance enregistrée — elle sera jointe à la commande.
                        <button
                          onClick={() => setPrescriptionFormOpen(true)}
                          style={{ marginLeft: 8, textDecoration: "underline", color: "var(--sand-dark)" }}
                        >
                          Modifier
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline"
                        style={{ marginTop: 16, width: "100%", display: "flex", justifyContent: "center", fontSize: "0.75rem" }}
                        onClick={() => setPrescriptionFormOpen(true)}
                        disabled={!selectedLensType}
                      >
                        {selectedLensType ? "Renseigner mon ordonnance" : "Choisissez d'abord un type de verre"}
                      </button>
                    )}

                    {prescriptionFormOpen && (
                      <form onSubmit={handleSavePrescription} style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                          <div style={{ fontSize: "0.68rem", color: "var(--gray)", gridColumn: "1 / -1" }}>Œil droit (OD)</div>
                          {["sphOD", "cylOD", "axeOD"].map((k) => (
                            <input
                              key={k}
                              type="text"
                              placeholder={k.startsWith("sph") ? "SPH" : k.startsWith("cyl") ? "CYL" : "AXE"}
                              value={prescription[k]}
                              onChange={(e) => setPrescription({ ...prescription, [k]: e.target.value })}
                              style={{ padding: "8px 10px", border: "1px solid var(--border)", fontSize: "0.78rem" }}
                            />
                          ))}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                          <div style={{ fontSize: "0.68rem", color: "var(--gray)", gridColumn: "1 / -1" }}>Œil gauche (OG)</div>
                          {["sphOG", "cylOG", "axeOG"].map((k) => (
                            <input
                              key={k}
                              type="text"
                              placeholder={k.startsWith("sph") ? "SPH" : k.startsWith("cyl") ? "CYL" : "AXE"}
                              value={prescription[k]}
                              onChange={(e) => setPrescription({ ...prescription, [k]: e.target.value })}
                              style={{ padding: "8px 10px", border: "1px solid var(--border)", fontSize: "0.78rem" }}
                            />
                          ))}
                        </div>
                        <button type="submit" className="btn btn-dark" style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "0.75rem" }}>
                          Enregistrer l'ordonnance
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Même bloc pour les montures sans correction possible : la teinte et le
                dégradé restent personnalisables, mais le devis passe par le SAV. */}
            {!product.correction && (
              <Link to="/sav" className="pdp-custom pdp-custom-link">
                <span className="pdp-custom-head">
                  <span>
                    <span className="pdp-custom-title">Personnaliser les verres</span>
                    <span className="pdp-custom-sub">Teinte · dégradé · verres solaires à votre vue</span>
                  </span>
                  <IconGlasses className="pdp-custom-icon" />
                </span>
              </Link>
            )}

            {/* Disponibilité */}
            <div className="pdp-stock">
              <span className={`pdp-stock-pill ${product.inStock ? "in" : "out"}`}>
                {product.inStock ? "En stock" : "Sur commande"}
              </span>
              <span className="pdp-stock-eta">
                {product.inStock ? `Chez vous le ${deliveryWindow()}` : "Réapprovisionnement sous 3 à 4 semaines"}
              </span>
            </div>

            {/* Réassurance */}
            <ul className="pdp-trust">
              {[
                { Icon: IconShield, title: "Revendeur officiel", text: "Montures authentiques, garanties par la maison" },
                { Icon: IconStar, title: "Opticiens diplômés", text: "Trois boutiques en France, une expertise au service de votre vue" },
                { Icon: IconWarranty, title: "Garantie 2 ans", text: "Prise en charge intégrale sur la monture" },
                { Icon: IconDelivery, title: "Livraison offerte", text: "France métropolitaine et Union européenne" },
                { Icon: IconGlasses, title: "Besoin d'un conseil ?", text: "Échangez avec un opticien, par téléphone ou en visio", to: "/conseil" },
              ].map(({ Icon, title, text, to }) => {
                const body = (
                  <>
                    <Icon className="pdp-trust-icon" />
                    <span>
                      <span className="pdp-trust-title">{title}</span>
                      <span className="pdp-trust-text">{text}</span>
                    </span>
                  </>
                );
                return (
                  <li key={title}>
                    {to ? <Link to={to} className="pdp-trust-row">{body}</Link> : <div className="pdp-trust-row">{body}</div>}
                  </li>
                );
              })}
            </ul>
          </motion.div>
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
