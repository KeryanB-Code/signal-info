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
          <div className="expert-card" style={{ gridTemplateColumns: "260px 1fr" }}>
            <div className="expert-photo">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=85"
                alt="Opticien Maison Regard"
              />
            </div>
            <div>
              <div className="label text-sand mb-12">Votre opticien</div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, marginBottom: 4 }}>
                Opticien diplômé, 12 ans d'expérience
              </h2>
              <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: 24 }}>
                BTS Opticien-Lunetier · Certifié Kering Eyewear · Partenaire Richemont
              </p>
              <p style={{ color: "var(--dark)", lineHeight: 1.8, marginBottom: 16 }}>
                Je suis opticien depuis 2012. J'ai ouvert ma première boutique à Lyon en 2015, et Maison Regard en ligne en 2022. Ma conviction : le conseil optique de qualité ne devrait pas être réservé aux clients qui habitent à côté d'une bonne boutique.
              </p>
              <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 24 }}>
                Chaque monture dans notre catalogue a été portée, testée, et validée. Je refuse de vendre quelque chose que je ne mettrais pas moi-même — ou que je ne recommanderais pas à ma famille.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                {[
                  { n: "12", t: "Ans d'expérience" },
                  { n: "3", t: "Boutiques à Lyon" },
                  { n: "200+", t: "Montures sélectionnées" },
                ].map((s) => (
                  <div key={s.t} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--sand-dark)" }}>{s.n}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--gray)", letterSpacing: ".05em" }}>{s.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RDV VISIO ─── */}
      <section className="section" style={{ background: "var(--dark)" }} id="rdv">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
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
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: 20 }}>
                  Calendrier de réservation — intégration Calendly en production
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 20 }}>
                  {["Lun 9h", "Lun 11h", "Mar 14h", "Mer 10h", "Jeu 16h", "Ven 9h"].map((slot) => (
                    <button
                      key={slot}
                      style={{
                        padding: "10px 6px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                        color: "white", fontSize: "0.75rem", cursor: "pointer", transition: "all .2s",
                        borderRadius: 2,
                      }}
                      onMouseEnter={(e) => e.target.style.background = "var(--sand)"}
                      onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                      onClick={() => alert("Réservation : " + slot + " — Calendly s'ouvre en production")}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-sand"
                  style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "0.78rem" }}
                  onClick={() => window.open("https://calendly.com", "_blank")}
                >
                  Voir tous les créneaux →
                </button>
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
