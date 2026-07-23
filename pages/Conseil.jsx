import { useState } from "react";
import { Link } from "react-router-dom";

const FACE_SHAPES = [
  {
    shape: "Ovale",
    icon: "🥚",
    desc: "La forme la plus polyvalente. Presque toutes les montures lui conviennent — l'embarras du choix est réel.",
    best: ["Carré", "Rectangulaire", "Aviateur", "Cat-eye"],
    avoid: ["Aucune restriction particulière"],
  },
  {
    shape: "Rond",
    icon: "⭕",
    desc: "Les formes anguleuses allongent et structurent. À éviter : les formes rondes qui accentuent les rondeurs.",
    best: ["Rectangulaire", "Carré", "Géométrique", "Semi-cerclé"],
    avoid: ["Rond", "Ovale très large"],
  },
  {
    shape: "Carré",
    icon: "⬜",
    desc: "Les formes arrondies adoucissent l'angularité naturelle du visage. Privilégier les montures plus larges que hautes.",
    best: ["Ovale", "Rond", "Papillon", "Cat-eye doux"],
    avoid: ["Carré strict", "Rectangulaire très anguleux"],
  },
  {
    shape: "En cœur",
    icon: "♥",
    desc: "Le front large demande des montures légèrement plus larges en bas. Les aviateurs avec double pont sont parfaits.",
    best: ["Aviateur", "Papillon", "Sans cerclage", "Très fin"],
    avoid: ["Épais en haut", "Cat-eye extrême"],
  },
  {
    shape: "Rectangulaire",
    icon: "▬",
    desc: "Les formes rondes et larges raccourcissent visuellement et ajoutent de la chaleur à un visage long.",
    best: ["Rond large", "Carré avec angles doux", "Papillon"],
    avoid: ["Très petites montures", "Rectangulaire fin"],
  },
  {
    shape: "Triangulaire",
    icon: "△",
    desc: "Menton large, front étroit. Les montures légères en haut, plus présentes sur les côtés, rééquilibrent.",
    best: ["Semi-cerclé", "Montures larges", "Cat-eye discret"],
    avoid: ["Surcharge en bas", "Cerclage épais bas"],
  },
];

const FAQ = [
  {
    q: "Comment lire une ordonnance optique ?",
    a: "Votre ordonnance indique : la sphère (correction myopie/hypermétropie), le cylindre et l'axe (correction astigmatie), et l'addition pour les progressifs. Une valeur négative en sphère = myopie. Positive = hypermétropie. Je peux la lire avec vous en visio en 5 minutes.",
  },
  {
    q: "Comment choisir la bonne taille de monture ?",
    a: "Trois dimensions comptent : la largeur du verre (en mm), la largeur de pont (entre les verres), et la longueur des branches. Si vous avez une ancienne paire, ces mesures sont gravées à l'intérieur. Sinon, une règle simple : la monture ne doit pas dépasser la largeur de vos tempes.",
  },
  {
    q: "Verres progressifs ou simples : comment choisir ?",
    a: "Si vous avez une addition (valeur Add sur votre ordonnance), vous avez besoin de progressifs ou de lunettes de lecture. Les progressifs unifient distance, intermédiaire et lecture en un seul verre. Ils demandent 2 à 3 semaines d'adaptation. Les verres simples sont plus économiques et ne nécessitent aucune adaptation.",
  },
  {
    q: "Quel est le délai pour recevoir une paire avec correction ?",
    a: "En règle générale : 7 à 12 jours ouvrés pour des verres correcteurs. Les verres progressifs premium ou avec des corrections élevées peuvent prendre 14 jours. L'urgence est possible dans certains cas — contactez-nous directement.",
  },
  {
    q: "Peut-on commander avec une ordonnance de plus de 3 ans ?",
    a: "Légalement, une ordonnance est valable 3 ans pour les adultes (1 an pour les enfants). Je vous recommande fortement un examen de vue récent avant toute commande — surtout si vous avez constaté une évolution. Je peux vous orienter vers un ophtalmo proche de chez vous.",
  },
  {
    q: "Comment fonctionne l'essayage virtuel 3D ?",
    a: "Notre outil utilise la détection de points de repère faciaux (via votre caméra) pour superposer la monture sur votre visage en temps réel. Tout le rendu est local — aucune image n'est envoyée sur nos serveurs. Compatible Chrome, Firefox, Safari. Disponible sur toutes les fiches produit.",
  },
];

export default function Conseil() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openShape, setOpenShape] = useState(null);

  return (
    <div className="pt-nav">
      {/* ─── HERO ─── */}
      <div style={{ background: "#F0EBE2", padding: "80px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <div className="label text-sand mb-16">Espace Conseil</div>
            <h1 className="h2" style={{ marginBottom: 20 }}>
              L'expertise d'un opticien diplômé, à portée d'écran.
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--gray)", lineHeight: 1.8, marginBottom: 32 }}>
              12 ans d'expérience. 3 boutiques à Lyon. Diplômé BTS Opticien-Lunetier. Disponible en visio, par email ou directement en boutique pour répondre à toutes vos questions — ordonnance, visagisme, matières, taille.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#rdv" className="btn btn-dark">Prendre RDV visio</a>
              <Link to="/diagnostic" className="btn btn-outline">Faire mon diagnostic</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── EXPERT CARD ─── */}
      <section className="section">
        <div className="container">
          <div className="expert-card">
            <div className="expert-intro">
              <div className="label text-sand mb-12">Votre équipe</div>
              <h2 className="expert-title">
                Des opticiens diplômés d'État,<br />pas des conseillers de vente
              </h2>
              <p className="expert-credentials">
                BTS Opticien-Lunetier · Certifiés Kering Eyewear · Partenaires Richemont
              </p>

              <div className="expert-stats">
                {[
                  { n: "12", t: "Ans d'expérience" },
                  { n: "3", t: "Boutiques en région lyonnaise" },
                  { n: "200+", t: "Montures sélectionnées" },
                ].map((s) => (
                  <div key={s.t}>
                    <div className="expert-stat-n">{s.n}</div>
                    <div className="expert-stat-t">{s.t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="expert-body">
              <p className="expert-lead">
                Derrière chaque réponse, il y a un opticien diplômé. Pas un service client, pas un script :
                les mêmes professionnels qui vous recevraient dans l'une de nos trois boutiques de la région
                lyonnaise, avec la même exigence et le même temps passé sur votre dossier.
              </p>
              <p>
                Douze ans d'exercice en boutique nous ont appris une chose : un conseil optique de qualité ne
                devrait pas dépendre de l'adresse où l'on habite. C'est exactement ce que cet espace existe
                pour corriger.
              </p>
              <p>
                Chaque monture de notre catalogue a été portée, testée et validée par l'équipe avant d'y
                figurer. Nous ne proposons rien que nous ne porterions pas nous-mêmes, ni que nous ne
                recommanderions pas à nos proches.
              </p>

              <ul className="expert-quals">
                <li>
                  <span className="expert-qual-title">Diplôme d'État</span>
                  <span className="expert-qual-text">
                    Chaque membre de l'équipe est titulaire du BTS Opticien-Lunetier, seul diplôme habilitant
                    à l'exercice en France.
                  </span>
                </li>
                <li>
                  <span className="expert-qual-title">Formation continue</span>
                  <span className="expert-qual-text">
                    Sessions techniques suivies directement auprès des maisons, de la sélection des matières
                    au montage des verres.
                  </span>
                </li>
                <li>
                  <span className="expert-qual-title">Suivi en boutique</span>
                  <span className="expert-qual-text">
                    Réglages, ajustements et service après-vente assurés dans nos boutiques, que l'achat ait
                    été fait en ligne ou sur place.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RDV VISIO ─── */}
      <section className="section" style={{ background: "var(--dark)" }} id="rdv">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div className="label" style={{ color: "var(--sand)", marginBottom: 16 }}>Consultation personnalisée</div>
              <h2 className="h2 text-white" style={{ marginBottom: 20 }}>
                RDV Visio<br />
                <em style={{ fontStyle: "italic", color: "var(--sand-light)" }}>sur rendez-vous</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24 }}>
                30 minutes en face à face vidéo. Ordonnance, morphologie, budget, style — on fait le point ensemble avant que vous ne commandiez. Gratuit et sans engagement.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  "Analyse de votre ordonnance actuelle",
                  "Recommandations personnalisées basées sur votre visage",
                  "Questions techniques sur les matières et dimensions",
                  "Pré-sélection de 3 à 5 montures selon votre profil",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--sand)", marginTop: 2 }}>✓</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rdv-card">
              <div style={{ fontSize: "0.7rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--sand)", marginBottom: 8 }}>
                Gratuit · 30 minutes · Visio
              </div>
              <h3>Réserver une consultation</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", margin: "12px 0 24px" }}>
                Créneaux disponibles du lundi au samedi, 9h – 19h.
              </p>
              <div className="calendly-embed">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 24 }}>
                  Écrivez-nous le créneau qui vous arrange : un opticien vous confirme le rendez-vous visio
                  et vous envoie le lien de connexion, généralement sous 24 h ouvrées.
                </p>
                <a
                  href="mailto:contact@maisonregard.fr?subject=Demande%20de%20consultation%20visio&body=Bonjour%2C%0A%0AJe%20souhaite%20r%C3%A9server%20une%20consultation%20visio.%0A%0AMes%20disponibilit%C3%A9s%20%3A%20%0AMon%20besoin%20%28type%20de%20monture%2C%20correction%2C%20budget%29%20%3A%20%0A%0AMerci"
                  className="btn btn-sand"
                  style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "0.78rem" }}
                >
                  Demander un rendez-vous
                </a>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textAlign: "center", marginTop: 14 }}>
                  ou directement à contact@maisonregard.fr
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GUIDE VISAGISME ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="label text-sand mb-8">Guide expert</div>
            <h2 className="h2">Le Visagisme en pratique</h2>
            <p style={{ color: "var(--gray)", marginTop: 16, maxWidth: 540, margin: "16px auto 0" }}>
              La forme du visage est le point de départ — pas la règle absolue. C'est un outil, pas un carcan.
            </p>
          </div>

          <div className="face-shapes">
            {FACE_SHAPES.map((fs) => (
              <div
                key={fs.shape}
                className="face-shape-card"
                style={{ cursor: "pointer" }}
                onClick={() => setOpenShape(openShape === fs.shape ? null : fs.shape)}
              >
                <div className="face-shape-icon">{fs.icon}</div>
                <div className="face-shape-name">{fs.shape}</div>
                <div className="face-shape-text" style={{ marginBottom: openShape === fs.shape ? 16 : 0 }}>
                  {fs.desc}
                </div>
                {openShape === fs.shape && (
                  <div style={{ marginTop: 16, textAlign: "left" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--dark)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      Formes recommandées
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                      {fs.best.map((b) => (
                        <span key={b} className="badge badge-sand">{b}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      À éviter
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {fs.avoid.map((a) => (
                        <span key={a} className="badge badge-outline">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 12, fontSize: "0.7rem", color: "var(--sand-dark)" }}>
                  {openShape === fs.shape ? "▲ Masquer" : "▼ Voir les recommandations"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: "#F5F0E8" }}>
        <div className="container-sm">
          <div className="text-center mb-48">
            <div className="label text-sand mb-8">Questions fréquentes</div>
            <h2 className="h2">FAQ Opticien</h2>
          </div>

          <div>
            {FAQ.map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span style={{ color: "var(--sand-dark)", transform: openFaq === i ? "rotate(45deg)" : "none", transition: ".2s", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ color: "var(--gray)", marginBottom: 16 }}>Vous n'avez pas trouvé votre réponse ?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href="mailto:contact@maisonregard.fr" className="btn btn-outline">
                Écrire à l'opticien
              </a>
              <a href="#rdv" className="btn btn-dark">
                Réserver un appel visio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
