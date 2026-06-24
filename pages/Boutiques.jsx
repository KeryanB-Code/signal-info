import { useState } from "react";

const BOUTIQUES = [
  {
    name: "Saint Clair",
    address: "12 rue Saint-Clair, Lyon 4e · 69004 Lyon",
    phone: "04 72 XX XX XX",
    email: "saintclair@maisonregard.fr",
    hours: {
      "Lundi": "10h – 19h",
      "Mardi": "10h – 19h",
      "Mercredi": "10h – 19h",
      "Jeudi": "10h – 20h",
      "Vendredi": "10h – 20h",
      "Samedi": "9h30 – 19h30",
      "Dimanche": "Fermé",
    },
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85",
    mapLink: "https://maps.google.com",
    rating: 4.9,
    reviewCount: 127,
    desc: "Notre boutique phare, nichée dans le quartier de la Croix-Rousse. Un espace intimiste de 80m² entièrement dédié aux grandes maisons de lunetterie. Rendez-vous recommandé le week-end.",
    reviews: [
      { name: "Marion G.", date: "Avril 2025", text: "Accueil exceptionnel. L'opticien a pris 45 minutes pour bien comprendre mon besoin avant de me proposer 3 montures. J'ai choisi une Cartier Santos que je n'aurais jamais sélectionnée seule. Parfaite.", note: 5 },
      { name: "Philippe D.", date: "Mars 2025", text: "Boutique superbe, sélection pointue. Prix cohérents avec la qualité. Je reviens pour ma deuxième paire.", note: 5 },
      { name: "Amira S.", date: "Fév. 2025", text: "L'essayage virtuel en boutique m'a permis de voir l'effet de 6 paires en 10 minutes. Gain de temps énorme. SAV irréprochable.", note: 5 },
    ],
    specialties: ["Cartier", "Fred", "John Dalia", "Correction haute"],
  },
  {
    name: "J'aime mes lunettes",
    address: "Centre Commercial La Duchère · Lyon 9e · 69009 Lyon",
    phone: "04 37 XX XX XX",
    email: "duchere@maisonregard.fr",
    hours: {
      "Lundi": "9h30 – 19h30",
      "Mardi": "9h30 – 19h30",
      "Mercredi": "9h30 – 19h30",
      "Jeudi": "9h30 – 19h30",
      "Vendredi": "9h30 – 19h30",
      "Samedi": "9h – 20h",
      "Dimanche": "Fermé",
    },
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=85",
    mapLink: "https://maps.google.com",
    rating: 4.8,
    reviewCount: 89,
    desc: "La boutique de la Duchère — plus grande, plus accessible. Parking gratuit, large choix de montures entrée de gamme luxe et progressifs. Idéale pour les familles.",
    reviews: [
      { name: "Laurent P.", date: "Mai 2025", text: "Mon fils de 14 ans cherchait des lunettes de vue qu'il ne serait pas gêné de porter. L'opticien a vraiment pris le temps. Résultat : une paire Gucci qu'il adore.", note: 5 },
      { name: "Nathalie V.", date: "Mars 2025", text: "Très bien pour les progressifs. Explication claire des différentes options. Montage rapide.", note: 4 },
      { name: "Rachid M.", date: "Fév. 2025", text: "Deuxième paire commandée en ligne, retrait en boutique le lendemain. Pratique et efficace.", note: 5 },
    ],
    specialties: ["Gucci", "YSL", "Miu Miu", "Progressifs", "Famille"],
  },
  {
    name: "Optique Mas du Torro",
    address: "Zone Commerciale Mas du Torro · Lyon Est",
    phone: "04 72 XX XX XX",
    email: "mastorro@maisonregard.fr",
    hours: {
      "Lundi": "Fermé",
      "Mardi": "10h – 18h30",
      "Mercredi": "10h – 18h30",
      "Jeudi": "10h – 18h30",
      "Vendredi": "10h – 19h",
      "Samedi": "10h – 19h",
      "Dimanche": "Fermé",
    },
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=85",
    mapLink: "https://maps.google.com",
    rating: 4.7,
    reviewCount: 63,
    desc: "Boutique spécialisée dans les corrections complexes et la lunetterie sport-chic. Équipement de mesure de dernière génération. Idéale pour les prescriptions élevées.",
    reviews: [
      { name: "Claire B.", date: "Avr. 2025", text: "Correction très élevée (-10 dans chaque œil). Enfin une boutique capable de monter mes verres dans une monture Céline fine. Bravo.", note: 5 },
      { name: "Thomas R.", date: "Janv. 2025", text: "Expert dans les corrections sport. Ma paire Fred Force 10 avec verres photochromiques est parfaite pour le ski et le vélo.", note: 5 },
    ],
    specialties: ["Céline", "Fred", "Sport", "Corrections complexes", "Photochromiques"],
  },
];

export default function Boutiques() {
  const [active, setActive] = useState(0);
  const boutique = BOUTIQUES[active];

  return (
    <div className="pt-nav">
      {/* Hero */}
      <div style={{ background: "#F0EBE2", padding: "64px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-8">Présence physique</div>
          <h1 className="h2" style={{ marginBottom: 12 }}>Nos 3 boutiques à Lyon</h1>
          <p style={{ color: "var(--gray)", maxWidth: 560 }}>
            Commandez en ligne, retirez en boutique — ou venez directement essayer votre future monture avec l'opticien.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "white" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 0 }}>
            {BOUTIQUES.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setActive(i)}
                style={{
                  padding: "20px 32px", fontSize: "0.82rem", fontWeight: active === i ? 500 : 300,
                  color: active === i ? "var(--dark)" : "var(--gray)",
                  background: "none", border: "none", borderBottom: `2px solid ${active === i ? "var(--dark)" : "transparent"}`,
                  cursor: "pointer", transition: "all .2s", marginBottom: -1,
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutique detail */}
      <div className="container" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>
          {/* Left */}
          <div>
            <div className="boutique-img" style={{ marginBottom: 32 }}>
              <img src={boutique.img} alt={boutique.name} style={{ width: "100%", height: 380, objectFit: "cover" }} />
            </div>

            {/* Info */}
            <div style={{ marginBottom: 32 }}>
              <div className="boutique-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(boutique.rating) ? "var(--sand)" : "var(--border)"} stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span style={{ fontSize: "0.82rem", color: "var(--gray)", marginLeft: 6 }}>
                  {boutique.rating} · {boutique.reviewCount} avis Google
                </span>
              </div>

              <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 400, margin: "8px 0 8px" }}>{boutique.name}</h2>
              <p style={{ color: "var(--gray)", marginBottom: 4, fontSize: "0.875rem" }}>{boutique.address}</p>
              <p style={{ color: "var(--sand-dark)", fontSize: "0.875rem" }}>{boutique.phone}</p>
            </div>

            <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 24 }}>{boutique.desc}</p>

            {/* Spécialités */}
            <div style={{ marginBottom: 32 }}>
              <div className="label" style={{ marginBottom: 10, color: "var(--dark)" }}>Spécialités</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {boutique.specialties.map((s) => (
                  <span key={s} className="badge badge-sand">{s}</span>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div>
              <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Avis récents</div>
              <div className="boutique-reviews">
                {boutique.reviews.map((r, i) => (
                  <div key={i} className="boutique-review">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill={j < r.note ? "var(--sand)" : "var(--border)"} stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--gray-light)" }}>{r.date}</span>
                    </div>
                    <p className="boutique-review-text">"{r.text}"</p>
                    <div className="boutique-review-author">— {r.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: horaires + actions */}
          <div>
            <div style={{ background: "white", border: "1px solid var(--border)", padding: "28px", marginBottom: 20 }}>
              <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Horaires d'ouverture</div>
              {Object.entries(boutique.hours).map(([day, hours]) => (
                <div
                  key={day}
                  style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "8px 0", borderBottom: "1px solid var(--border)",
                    fontSize: "0.82rem",
                    color: day === new Date().toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() + new Date().toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)
                      ? "var(--dark)" : "var(--gray)",
                  }}
                >
                  <span style={{ fontWeight: 400 }}>{day}</span>
                  <span style={{ color: hours === "Fermé" ? "var(--gray-light)" : "var(--dark)" }}>{hours}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={boutique.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Voir sur Google Maps
              </a>
              <a
                href={`tel:${boutique.phone.replace(/\s/g, "")}`}
                className="btn btn-outline"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Appeler la boutique
              </a>
              <a
                href={`mailto:${boutique.email}`}
                className="btn btn-ghost"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Envoyer un email
              </a>
            </div>

            {/* Click & Collect */}
            <div style={{ marginTop: 24, background: "#F0EBE2", padding: "20px 24px", border: "1px solid var(--border)" }}>
              <div className="label text-sand mb-8">Click & Collect</div>
              <p style={{ fontSize: "0.82rem", color: "var(--gray)", lineHeight: 1.6 }}>
                Commandez en ligne et retirez votre monture dans cette boutique sous 24h. L'opticien effectue les derniers réglages lors du retrait.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
