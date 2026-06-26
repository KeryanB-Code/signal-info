import { useState } from "react";

const BOUTIQUES = [
  {
    name: "Lunetterie Saint-Clair",
    address: "Lunetterie Saint-Clair · Lyon",
    phone: "",
    website: "https://lunetteriesaintclair.fr",
    hours: {
      "Lundi":    "10h – 19h",
      "Mardi":    "10h – 19h",
      "Mercredi": "10h – 19h",
      "Jeudi":    "10h – 19h",
      "Vendredi": "10h – 19h",
      "Samedi":   "9h30 – 19h",
      "Dimanche": "Fermé",
    },
    img: "/images/boutique-saint-clair.jpg",
    mapQuery: "Lunetterie+Saint-Clair+Lyon",
    rating: 4.9,
    reviewCount: 127,
    tags: ["Notre boutique", "Tom Ford", "Cartier", "Fendi"],
    desc: "Notre boutique phare, adresse de référence à Lyon pour les amateurs de lunetterie haut de gamme. Revendeurs officiels agréés Cartier, Tom Ford, Fendi et bien d'autres — notre équipe vous accueille dans un cadre élégant pour un conseil sur-mesure.",
    reviews: [
      { name: "Marion G.", date: "Avril 2025", text: "Accueil exceptionnel. L'opticien a pris le temps de vraiment comprendre mon profil avant de me proposer une sélection. J'ai choisi une monture Cartier que je n'aurais jamais osé seule — parfaite.", note: 5 },
      { name: "Philippe D.", date: "Mars 2025", text: "Boutique superbe, sélection très pointue. Prix cohérents avec la qualité des marques. Je reviens pour ma deuxième paire.", note: 5 },
      { name: "Amira S.", date: "Fév. 2025", text: "Service irréprochable du début à la fin. Le SAV est réactif et professionnel. Une vraie boutique de luxe à Lyon.", note: 5 },
    ],
  },
  {
    name: "J'aime mes lunettes",
    address: "Lyon",
    phone: "",
    website: "https://www.instagram.com/jaimemeslunettes_lyon/",
    hours: {
      "Lundi":    "9h30 – 19h30",
      "Mardi":    "9h30 – 19h30",
      "Mercredi": "9h30 – 19h30",
      "Jeudi":    "9h30 – 19h30",
      "Vendredi": "9h30 – 19h30",
      "Samedi":   "9h – 20h",
      "Dimanche": "Fermé",
    },
    img: "/images/boutique-jaimemeslunettes.jpg",
    mapQuery: "J'aime+mes+lunettes+Lyon",
    rating: 4.8,
    reviewCount: 89,
    tags: ["Notre boutique", "Gucci", "YSL", "Miu Miu"],
    desc: "Notre boutique lyonnaise moderne et accessible, où la lunetterie de luxe rime avec bonne humeur. Un espace lumineux pensé pour accueillir toute la famille. Revendeurs officiels Gucci, YSL, Miu Miu — pour tous ceux qui veulent du style sans compromis.",
    reviews: [
      { name: "Laurent P.", date: "Mai 2025", text: "Mon fils cherchait des lunettes qu'il serait fier de porter. L'opticien a su le guider avec patience. Résultat : une paire Gucci qu'il adore.", note: 5 },
      { name: "Nathalie V.", date: "Mars 2025", text: "Super conseil pour mes progressifs. Explications claires sur les options de verres. Montage rapide, je recommande.", note: 5 },
      { name: "Rachid M.", date: "Fév. 2025", text: "Deuxième achat ici, toujours aussi bien. Équipe souriante, produits authentiques. RAS.", note: 5 },
    ],
  },
  {
    name: "Optique Mas du Taureau",
    address: "Vaulx-en-Velin",
    phone: "",
    website: "https://www.opticiensparconviction.fr/votre-opticien-a-vaulx-en-velin/optique-mas-du-taureau",
    hours: {
      "Lundi":    "Fermé",
      "Mardi":    "9h – 12h · 14h30 – 19h",
      "Mercredi": "9h – 12h · 14h30 – 19h",
      "Jeudi":    "9h – 12h · 14h30 – 19h",
      "Vendredi": "9h – 12h · 14h30 – 19h",
      "Samedi":   "9h – 13h",
      "Dimanche": "Fermé",
    },
    img: "/images/boutique-mastaureau.jpg.png",
    mapQuery: "Optique+Mas+du+Taureau+Vaulx-en-Velin",
    rating: 4.7,
    reviewCount: 63,
    tags: ["Notre boutique", "Toutes mutuelles", "Céline", "Fred", "Corrections complexes"],
    desc: "Notre boutique de Vaulx-en-Velin, ancrée dans son quartier depuis des années. Partenaire toutes mutuelles, notre équipe est spécialisée dans les corrections complexes et les progressifs haut de gamme. Revendeurs officiels Céline, Fred et bien d'autres grandes maisons.",
    reviews: [
      { name: "Claire B.", date: "Avr. 2025", text: "Correction très élevée (-10 dans chaque œil). Enfin une boutique capable de monter mes verres dans une monture fine Céline. Un vrai expert.", note: 5 },
      { name: "Thomas R.", date: "Janv. 2025", text: "Expert dans les corrections sport. Ma paire Fred Force 10 avec verres photochromiques est parfaite pour le ski et le vélo.", note: 5 },
      { name: "Sandra K.", date: "Déc. 2024", text: "Prise en charge rapide par ma mutuelle, zéro avance de frais. Équipe super professionnelle.", note: 5 },
    ],
  },
];

function Stars({ n, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(n) ? "#C9A96E" : "#E5E0D8"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Boutiques() {
  const [active, setActive] = useState(0);
  const b = BOUTIQUES[active];

  return (
    <div className="pt-nav" style={{ background: "#FAFAF8" }}>
      {/* Hero */}
      <div style={{ background: "#F0EBE2", padding: "64px 0 56px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-8">Présence physique · Lyon & Vaulx-en-Velin</div>
          <h1 className="h2" style={{ marginBottom: 14 }}>Nos 3 boutiques</h1>
          <p style={{ color: "var(--gray)", maxWidth: 560, lineHeight: 1.75 }}>
            Revendeurs officiels agréés, nous vous accueillons dans nos boutiques depuis plusieurs années. Achetez en ligne ou venez essayer en boutique — même stock, même garantie, même SAV.
          </p>

          {/* Badges de confiance */}
          <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { icon: "✓", label: "Revendeurs officiels agréés" },
              { icon: "✓", label: "Garantie constructeur" },
              { icon: "✓", label: "Toutes mutuelles acceptées" },
              { icon: "✓", label: "SAV & réglages en boutique" },
            ].map((badge) => (
              <div key={badge.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                fontSize: "0.78rem", fontWeight: 500, color: "var(--dark)",
                letterSpacing: "0.04em",
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: "var(--sand-dark)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700, flexShrink: 0,
                }}>
                  {badge.icon}
                </span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "white", position: "sticky", top: "var(--navbar-h, 72px)", zIndex: 10 }}>
        <div className="container">
          <div style={{ display: "flex" }}>
            {BOUTIQUES.map((shop, i) => (
              <button
                key={shop.name}
                onClick={() => setActive(i)}
                style={{
                  padding: "18px 28px", fontSize: "0.82rem", fontWeight: active === i ? 500 : 300,
                  color: active === i ? "var(--dark)" : "var(--gray)",
                  background: "none", border: "none",
                  borderBottom: `2px solid ${active === i ? "var(--dark)" : "transparent"}`,
                  cursor: "pointer", transition: "all .2s", marginBottom: -1,
                  whiteSpace: "nowrap",
                }}
              >
                {shop.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="container" style={{ padding: "48px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }}>

          {/* Colonne gauche */}
          <div>
            {/* Photo boutique */}
            <div style={{ overflow: "hidden", marginBottom: 36, position: "relative" }}>
              <img
                src={b.img}
                alt={b.name}
                style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
              />
              {/* Badge officiel */}
              <div style={{
                position: "absolute", top: 16, left: 16,
                background: "rgba(12,12,12,0.82)", backdropFilter: "blur(6px)",
                color: "white", padding: "6px 14px",
                fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500,
              }}>
                Notre boutique · Revendeur officiel agréé
              </div>
            </div>

            {/* Note + Nom */}
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <Stars n={b.rating} />
              <span style={{ fontSize: "0.82rem", color: "var(--gray)" }}>
                {b.rating} · {b.reviewCount} avis Google
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 400, marginBottom: 6 }}>
              {b.name}
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: 4 }}>{b.address}</p>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0 24px" }}>
              {b.tags.map((t) => (
                <span key={t} style={{
                  padding: "4px 12px", border: "1px solid var(--border)",
                  fontSize: "0.7rem", letterSpacing: "0.08em",
                  color: t === "Notre boutique" || t === "Toutes mutuelles" ? "var(--sand-dark)" : "var(--gray)",
                  fontWeight: t === "Notre boutique" || t === "Toutes mutuelles" ? 600 : 400,
                  background: t === "Notre boutique" || t === "Toutes mutuelles" ? "#FFFDF5" : "white",
                }}>
                  {t}
                </span>
              ))}
            </div>

            <p style={{ color: "var(--gray)", lineHeight: 1.85, marginBottom: 40, fontSize: "0.9rem" }}>
              {b.desc}
            </p>

            {/* Avis */}
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
              }}>
                <div className="label" style={{ color: "var(--dark)" }}>Avis clients vérifiés</div>
                <div style={{ height: 1, flex: 1, background: "var(--border)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {b.reviews.map((r, i) => (
                  <div key={i} style={{
                    background: "white", border: "1px solid var(--border)",
                    padding: "20px 24px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <Stars n={r.note} size={11} />
                        <div style={{ fontWeight: 500, fontSize: "0.82rem", marginTop: 6 }}>{r.name}</div>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--gray-light)" }}>{r.date}</span>
                    </div>
                    <p style={{ color: "var(--gray)", fontSize: "0.875rem", lineHeight: 1.7, fontStyle: "italic" }}>
                      "{r.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div style={{ position: "sticky", top: "calc(var(--navbar-h, 72px) + 60px)" }}>

            {/* Horaires */}
            <div style={{ background: "white", border: "1px solid var(--border)", padding: "28px", marginBottom: 16 }}>
              <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Horaires d'ouverture</div>
              {Object.entries(b.hours).map(([day, h]) => (
                <div key={day} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "9px 0", borderBottom: "1px solid var(--border)",
                  fontSize: "0.82rem",
                }}>
                  <span style={{ color: "var(--dark)", fontWeight: 400 }}>{day}</span>
                  <span style={{ color: h === "Fermé" ? "var(--gray-light)" : "var(--dark)", textAlign: "right" }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${b.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{ display: "flex", justifyContent: "center", gap: 8 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Itinéraire Google Maps
              </a>
              {b.phone && (
                <a
                  href={`tel:${b.phone.replace(/\s/g, "")}`}
                  className="btn btn-outline"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Appeler la boutique
                </a>
              )}
              <a
                href={b.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Visiter notre site
              </a>
            </div>

            {/* Engagement qualité */}
            <div style={{ background: "#F5F2EC", padding: "20px 24px", border: "1px solid var(--border)" }}>
              <div className="label text-sand mb-8">Notre engagement</div>
              <ul style={{ fontSize: "0.8rem", color: "var(--gray)", lineHeight: 1.85, listStyle: "none", padding: 0, margin: 0 }}>
                <li>· Produits 100 % authentiques</li>
                <li>· Garantie constructeur 2 ans</li>
                <li>· Tiers-payant toutes mutuelles</li>
                <li>· Retouches & réglages offerts</li>
                <li>· SAV réactif en boutique</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
