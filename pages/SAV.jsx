import { useState } from "react";
import { Link } from "react-router-dom";

const BLOCKS = [
  {
    icon: "🚚",
    title: "Livraison",
    text: "Livraison offerte en France métropolitaine dès 150€ d'achat. Expédition sous 24h pour les montures en stock (hors correction). Suivi Colissimo inclus.",
  },
  {
    icon: "↩",
    title: "Retours 30 jours",
    text: "Vous disposez de 30 jours pour nous retourner votre monture si elle ne vous convient pas. Retour gratuit, remboursement sous 5 jours ouvrés. Aucune justification requise.",
  },
  {
    icon: "🔧",
    title: "Garantie 2 ans",
    text: "Toutes les montures Maison Regard bénéficient de la garantie constructeur de 2 ans couvrant les défauts de fabrication. Extension possible via votre mutuelle.",
  },
  {
    icon: "📦",
    title: "Emballage Premium",
    text: "Chaque monture est livrée dans son étui d'origine de la marque, avec chiffon de nettoyage et certificat d'authenticité. Packaging recyclable.",
  },
  {
    icon: "🌀",
    title: "Correction & Montage",
    text: "Envoyez votre ordonnance par email après commande. Notre opticien la vérifie sous 24h et confirme la compatibilité avant montage. Délai : 7 à 14 jours ouvrés.",
  },
  {
    icon: "✨",
    title: "Personnalisation",
    text: "Verres dégradés, photochromiques, anti-reflets, anti-lumière bleue — toutes les options sont disponibles à la commande ou à postériori. Contactez-nous pour un devis.",
  },
];

const CORRECTION_TYPES = [
  { name: "Verres Simples (unifocaux)", price: "À partir de 80€ la paire", desc: "Myopie, hypermétropie, astigmatie. Verres minéraux ou organiques selon le verre." },
  { name: "Progressifs Standard", price: "À partir de 280€ la paire", desc: "Vision de loin, intermédiaire et près. Adaptation 2 à 3 semaines. Remplacements si difficultés." },
  { name: "Progressifs Premium", price: "À partir de 450€ la paire", desc: "Corridor de progression élargi, moins d'aberrations latérales. Recommandés pour première paire de progressifs." },
  { name: "Anti-lumière bleue", price: "+60€", desc: "Filtre intégré dans le verre. Idéal pour exposition écrans prolongée. Disponible sur tous les verres." },
  { name: "Photochromiques", price: "+120€", desc: "Verres qui s'assombrissent automatiquement en extérieur. Transitions ou équivalent selon stock." },
  { name: "Verres dégradés solaires", price: "À partir de 60€", desc: "Pour lunettes de soleil. Dégradé du plus foncé en haut au plus clair en bas." },
];

const DEGRADE_OPTIONS = [
  { name: "Dégradé classique", colors: ["#6B4F35", "#D4A870"] },
  { name: "Dégradé bleu glacier", colors: ["#1A3A5C", "#89B4D4"] },
  { name: "Dégradé rose gold", colors: ["#8B4358", "#D4A0B0"] },
  { name: "Dégradé vert forêt", colors: ["#1A3C2A", "#6B9E7A"] },
  { name: "Dégradé gris ardoise", colors: ["#2A2A3C", "#8A8AB0"] },
  { name: "Dégradé ambre", colors: ["#6B4500", "#D4A040"] },
];

export default function SAV() {
  const [openTab, setOpenTab] = useState("livraison");

  return (
    <div className="pt-nav">
      {/* Hero */}
      <div style={{ background: "#F0EBE2", padding: "64px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-8">Service client</div>
          <h1 className="h2" style={{ marginBottom: 12 }}>SAV & Accompagnement</h1>
          <p style={{ color: "var(--gray)", maxWidth: 560 }}>
            Un opticien disponible 7j/7. Retours sans friction. Livraison offerte. Montage sur mesure.
          </p>
        </div>
      </div>

      {/* ─── 6 BLOCKS ─── */}
      <section className="section">
        <div className="container">
          <div className="sav-grid">
            {BLOCKS.map((b) => (
              <div key={b.title} className="sav-block">
                <div className="sav-icon">{b.icon}</div>
                <div className="sav-title">{b.title}</div>
                <p className="sav-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORRECTION ─── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="text-center mb-48">
            <div className="label text-sand mb-8">Verres correcteurs</div>
            <h2 className="h2">Nos options de correction</h2>
            <p style={{ color: "var(--gray)", marginTop: 12 }}>Toutes les corrections sont montées par notre opticien diplômé</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
            {CORRECTION_TYPES.map((type) => (
              <div key={type.name} style={{ padding: "24px", border: "1px solid var(--border)", background: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 400 }}>{type.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--sand-dark)", fontWeight: 500, whiteSpace: "nowrap", marginLeft: 12 }}>{type.price}</div>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--gray)", lineHeight: 1.6 }}>{type.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: 16 }}>
              Remboursement mutuelle possible · Envoyez votre ordonnance après commande
            </p>
            <a href="mailto:correction@maisonregard.fr" className="btn btn-outline">
              Demander un devis correction
            </a>
          </div>
        </div>
      </section>

      {/* ─── PERSONNALISATION / DÉGRADÉS ─── */}
      <section className="section" style={{ background: "#F0EBE2" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 64, alignItems: "start" }}>
            <div>
              <div className="label text-sand mb-16">Sur mesure</div>
              <h2 className="h2" style={{ marginBottom: 20 }}>
                Personnalisation<br />& Dégradés
              </h2>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 16 }}>
                Nos verres dégradés sont réalisés artisanalement en collaboration avec nos verriers partenaires. Chaque nuance est calculée pour compléter la monture choisie.
              </p>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 24 }}>
                Au-delà des coloris standard, nous pouvons réaliser des dégradés sur mesure — soumis à devis selon la teinte et la complexité.
              </p>
              <a href="mailto:perso@maisonregard.fr" className="btn btn-dark">
                Demander une personnalisation
              </a>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 16, color: "var(--dark)" }}>Coloris disponibles</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 12 }}>
                {DEGRADE_OPTIONS.map((d) => (
                  <div key={d.name} style={{ padding: "16px", border: "1px solid var(--border)", background: "white" }}>
                    <div style={{
                      height: 32, marginBottom: 10, borderRadius: 2,
                      background: `linear-gradient(to bottom, ${d.colors[0]}, ${d.colors[1]})`,
                    }} />
                    <div style={{ fontSize: "0.82rem", fontWeight: 400 }}>{d.name}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--gray)", marginTop: 12 }}>
                + Dégradés sur mesure disponibles sur demande
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT SAV ─── */}
      <section className="section">
        <div className="container-sm text-center">
          <div className="label text-sand mb-8">Besoin d'aide ?</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Nous sommes là</h2>
          <p style={{ color: "var(--gray)", marginBottom: 40 }}>
            Opticien disponible du lundi au samedi, 9h – 19h. Réponse garantie sous 2h en semaine.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 20 }}>
            {[
              { icon: "📧", label: "Email", value: "contact@maisonregard.fr", href: "mailto:contact@maisonregard.fr" },
              { icon: "📱", label: "WhatsApp", value: "Réponse en <30 min", href: "https://wa.me/" },
              { icon: "📅", label: "Visio", value: "Sur rendez-vous", href: "/conseil" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                style={{
                  padding: "28px 20px", border: "1px solid var(--border)", background: "white",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{c.icon}</span>
                <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>{c.label}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{c.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
