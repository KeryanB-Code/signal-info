import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, BRANDS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const CATEGORIES = ["Tous", "Optique", "Soleil"];
const STYLES = ["Tous les styles", "Minimaliste", "Classique", "Statement", "Sport-chic"];
const SORT_OPTIONS = [
  { value: "featured", label: "Sélection" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "new", label: "Nouveautés" },
];

export default function Boutique({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [style, setStyle] = useState("Tous les styles");
  const [priceMax, setPriceMax] = useState(1200);
  const [correctionOnly, setCorrectionOnly] = useState(false);

  const activeBrand = searchParams.get("brand") || "Toutes";
  const activeCat = searchParams.get("cat") || "Tous";

  const setBrand = (b) => {
    const p = new URLSearchParams(searchParams);
    if (b === "Toutes") p.delete("brand"); else p.set("brand", b);
    setSearchParams(p);
  };
  const setCat = (c) => {
    const p = new URLSearchParams(searchParams);
    if (c === "Tous") p.delete("cat"); else p.set("cat", c.toLowerCase());
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeBrand !== "Toutes") list = list.filter((p) => p.brand === activeBrand);
    if (activeCat !== "Tous") list = list.filter((p) => p.category === activeCat.toLowerCase());
    if (style !== "Tous les styles") list = list.filter((p) => p.style === style.toLowerCase().replace("-", "-"));
    if (correctionOnly) list = list.filter((p) => p.correction);
    list = list.filter((p) => p.price <= priceMax);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "new") list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    return list;
  }, [activeBrand, activeCat, style, sort, priceMax, correctionOnly]);

  return (
    <div className="pt-nav">
      {/* Hero de page */}
      <div style={{ background: "#F0EBE2", padding: "64px 0 48px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-8">Maison Regard</div>
          <h1 className="h2" style={{ marginBottom: 12 }}>La Boutique</h1>
          <p style={{ color: "var(--gray)", fontSize: "0.9rem" }}>
            {PRODUCTS.length} montures sélectionnées · 7 maisons · Opticien diplômé
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 48 }}>
          {/* ─── SIDEBAR FILTRES ─── */}
          <aside>
            <div style={{ position: "sticky", top: 100 }}>
              {/* Marques */}
              <div style={{ marginBottom: 32 }}>
                <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Maisons</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {["Toutes", ...BRANDS].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      style={{
                        padding: "8px 0", textAlign: "left", fontSize: "0.875rem",
                        color: activeBrand === b ? "var(--dark)" : "var(--gray)",
                        fontWeight: activeBrand === b ? 500 : 300,
                        borderBottom: activeBrand === b ? "1px solid var(--dark)" : "1px solid transparent",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                      }}
                    >
                      {b}
                      <span style={{ fontSize: "0.7rem", color: "var(--gray-light)" }}>
                        {PRODUCTS.filter((p) => b === "Toutes" || p.brand === b).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Catégorie */}
              <div style={{ marginBottom: 32 }}>
                <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Catégorie</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      className={`filter-btn ${activeCat === (c === "Tous" ? "Tous" : c.toLowerCase()) ? "active" : ""}`}
                      style={{ padding: "6px 14px", fontSize: "0.72rem" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div style={{ marginBottom: 32 }}>
                <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Style</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {STYLES.map((s) => (
                    <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.875rem", color: style === s ? "var(--dark)" : "var(--gray)" }}>
                      <input
                        type="radio" name="style" value={s} checked={style === s}
                        onChange={() => setStyle(s)}
                        style={{ accentColor: "var(--sand-dark)" }}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div style={{ marginBottom: 32 }}>
                <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>
                  Prix max : {priceMax.toLocaleString("fr-FR")} €
                </div>
                <input
                  type="range" min={200} max={1200} step={50} value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--sand-dark)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--gray-light)", marginTop: 4 }}>
                  <span>200 €</span>
                  <span>1 200 €</span>
                </div>
              </div>

              {/* Correction */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: "0.875rem", fontWeight: correctionOnly ? 500 : 300 }}>
                  <input
                    type="checkbox" checked={correctionOnly}
                    onChange={(e) => setCorrectionOnly(e.target.checked)}
                    style={{ accentColor: "var(--sand-dark)", width: 16, height: 16 }}
                  />
                  Correction disponible
                </label>
              </div>
            </div>
          </aside>

          {/* ─── GRILLE PRODUITS ─── */}
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: "0.82rem", color: "var(--gray)" }}>
                <strong style={{ color: "var(--dark)" }}>{filtered.length}</strong> résultats
                {activeBrand !== "Toutes" && <> — <strong>{activeBrand}</strong></>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: "0.72rem", color: "var(--gray)", letterSpacing: ".08em", textTransform: "uppercase" }}>Trier par :</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    padding: "8px 12px", border: "1px solid var(--border)", background: "white",
                    fontSize: "0.82rem", color: "var(--dark)", cursor: "pointer",
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>🔍</div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 8 }}>Aucune monture ne correspond</p>
                <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: 24 }}>Essayez d'élargir vos critères de recherche.</p>
                <button className="btn btn-outline" onClick={() => { setBrand("Toutes"); setCat("Tous"); setStyle("Tous les styles"); setPriceMax(1200); setCorrectionOnly(false); }}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
