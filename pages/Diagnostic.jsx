import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const STEPS = [
  {
    id: "face",
    question: "Quelle est la forme de votre visage ?",
    subtitle: "En cas de doute, optez pour la forme qui ressemble le plus à la vôtre",
    options: [
      { id: "oval", icon: "🥚", label: "Ovale", desc: "Front légèrement plus large que la mâchoire" },
      { id: "round", icon: "⭕", label: "Rond", desc: "Largeur et longueur similaires, courbes douces" },
      { id: "square", icon: "⬜", label: "Carré", desc: "Mâchoire et front de largeur équivalente" },
      { id: "heart", icon: "♥", label: "En cœur", desc: "Front large, menton pointu" },
    ],
  },
  {
    id: "usage",
    question: "Quel est votre usage principal ?",
    subtitle: "Choisissez votre priorité — vous pouvez combiner correction et protection UV",
    options: [
      { id: "vue", icon: "👁", label: "Vue (optique)", desc: "Correction quotidienne, port toute la journée" },
      { id: "soleil", icon: "☀️", label: "Soleil", desc: "Protection UV, usage extérieur" },
      { id: "mixte", icon: "🌦", label: "Vue + Soleil", desc: "Double paire ou verres photochromiques" },
      { id: "sport", icon: "🎿", label: "Sport / Active", desc: "Résistance, légèreté, maintien" },
    ],
  },
  {
    id: "style",
    question: "Quel style vous correspond ?",
    subtitle: "Il n'y a pas de mauvaise réponse — c'est une question d'identité, pas de mode",
    options: [
      { id: "minimaliste", icon: "◻", label: "Minimaliste", desc: "Discret, épuré, sobre — la monture se fait oublier" },
      { id: "classique", icon: "🎭", label: "Classique", desc: "Intemporel, raffiné — on reconnaît la maison" },
      { id: "statement", icon: "✨", label: "Statement", desc: "Affirmé, visible — la monture est la pièce centrale" },
      { id: "sport-chic", icon: "⚡", label: "Sport-Chic", desc: "Dynamique, moderne — ville et activités" },
    ],
  },
  {
    id: "budget",
    question: "Quel est votre budget ?",
    subtitle: "Paiement en 2, 3 ou 4 fois sans frais disponible sur tous les modèles",
    options: [
      { id: "entry", icon: "💛", label: "300 – 500 €", desc: "Entrée de gamme luxe · Gucci, YSL, Miu Miu" },
      { id: "mid", icon: "🥈", label: "500 – 800 €", desc: "Milieu de gamme premium · Céline, Fred, John Dalia" },
      { id: "premium", icon: "🥇", label: "800 – 1 200 €", desc: "Haute horlogerie optique · Cartier, Fred haute gamme" },
      { id: "any", icon: "♾", label: "Budget libre", desc: "Le meilleur modèle pour votre profil, sans contrainte" },
    ],
  },
  {
    id: "email",
    question: "Où envoyer votre sélection ?",
    subtitle: "Votre profil est conservé. Vous recevrez aussi les futurs arrivages correspondants.",
    isEmail: true,
  },
];

function getRecommendations(answers, products) {
  let list = [...products];

  if (answers.usage === "vue") list = list.filter((p) => p.correction);
  if (answers.usage === "soleil") list = list.filter((p) => p.category === "soleil");
  if (answers.usage === "vue") list = list.filter((p) => p.category === "optique");

  if (answers.style && answers.style !== "any") {
    const withStyle = list.filter((p) => p.style === answers.style);
    if (withStyle.length >= 3) list = withStyle;
  }

  if (answers.budget === "entry") list = list.filter((p) => p.price <= 500);
  else if (answers.budget === "mid") list = list.filter((p) => p.price > 500 && p.price <= 800);
  else if (answers.budget === "premium") list = list.filter((p) => p.price > 800);

  if (list.length < 3) list = [...products].sort((a, b) => b.rating - a.rating);

  return list.slice(0, 5);
}

function getProfileText(answers) {
  const faceMap = { oval: "ovale", round: "rond", square: "carré", heart: "en cœur" };
  const styleMap = { minimaliste: "minimaliste", classique: "classique", statement: "statement", "sport-chic": "sport-chic" };
  const face = faceMap[answers.face] || "votre";
  const style = styleMap[answers.style] || "votre";

  return `Votre visage ${face} et votre sensibilité ${style} orientent ma sélection vers des formes qui valorisent vos traits sans les écraser. Ces 3 à 5 montures sont celles que je vous aurais recommandées en boutique.`;
}

export default function Diagnostic({ onAddToCart }) {
  const { products, loading } = useProducts();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState(null);

  if (loading) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center", color: "var(--gray)" }}>
        Chargement…
      </div>
    );
  }

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const recommendations = done ? getRecommendations(answers, products) : [];

  const handleOption = (optionId) => {
    setSelected(optionId);
    const newAnswers = { ...answers, [step.id]: optionId };
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelected(null);
      if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
    }, 400);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setEmail("");
    setDone(false);
  };

  if (done) {
    return (
      <div className="pt-nav" style={{ minHeight: "100vh", background: "#F0EBE2" }}>
        <div className="container" style={{ padding: "80px 24px" }}>
          <div className="text-center mb-48">
            <div className="label text-sand mb-8">Votre diagnostic est prêt</div>
            <h1 className="h2" style={{ marginBottom: 16 }}>Votre sélection personnalisée</h1>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <div style={{ padding: "24px 32px", background: "var(--dark)", color: "white", fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 1.7, fontStyle: "italic" }}>
                "{getProfileText(answers)}"
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--gray)", marginTop: 8 }}>
                — Opticien diplômé, Maison Regard
              </div>
            </div>
          </div>

          <div className="grid-3" style={{ maxWidth: 960, margin: "0 auto" }}>
            {recommendations.slice(0, 3).map((p, i) => (
              <div key={p.id}>
                <ProductCard product={p} onAddToCart={onAddToCart} />
                <div style={{ padding: "16px 0 0", borderTop: "1px solid var(--border)", marginTop: 8 }}>
                  <div className="label text-sand mb-4">Pourquoi ce modèle ?</div>
                  <p style={{ fontSize: "0.78rem", color: "var(--gray)", lineHeight: 1.6 }}>
                    {i === 0 ? `Le ${p.name} de ${p.brand} correspond à votre profil ${answers.style || "équilibré"} — sa géométrie valorise les visages ${answers.face === "round" ? "ronds" : answers.face === "oval" ? "ovales" : "de votre forme"}.` :
                     i === 1 ? `Alternative premium pour ceux qui veulent affirmer leur présence sans compromis. ${p.brand} maîtrise comme personne l'art de cette silhouette.` :
                     `Le choix de l'opticien : moins connu mais techniquement irréprochable. ${p.name} est la monture que j'aurais portée.`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {recommendations.length > 3 && (
            <div className="text-center mt-48">
              <p style={{ color: "var(--gray)", marginBottom: 16, fontSize: "0.875rem" }}>2 autres montures correspondant à votre profil :</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                {recommendations.slice(3).map((p) => (
                  <Link key={p.id} to={`/produit/${p.id}`} style={{ fontSize: "0.875rem", color: "var(--sand-dark)", textDecoration: "underline" }}>
                    {p.brand} {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 64, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/conseil" className="btn btn-dark">
              Valider avec l'opticien en visio
            </Link>
            <button className="btn btn-outline" onClick={restart}>
              Refaire le diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-nav" style={{ background: "#F0EBE2", minHeight: "100vh" }}>
      <div className="diagnostic-step">
        <div className="diagnostic-card">
          {/* Progress */}
          <div className="diagnostic-progress">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`}
              />
            ))}
          </div>

          {/* Step indicator */}
          <div style={{ marginBottom: 8 }}>
            <span className="label text-sand">Étape {currentStep + 1} / {STEPS.length}</span>
          </div>

          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, marginBottom: 8, lineHeight: 1.3 }}>
            {step.question}
          </h2>
          {step.subtitle && (
            <p style={{ fontSize: "0.85rem", color: "var(--gray)", marginBottom: 32, lineHeight: 1.6 }}>
              {step.subtitle}
            </p>
          )}

          {step.isEmail ? (
            <form onSubmit={handleEmailSubmit} style={{ marginTop: 8 }}>
              <div style={{ marginBottom: 16 }}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "16px 20px", border: "1px solid var(--border)",
                    fontSize: "1rem", background: "white", outline: "none",
                  }}
                />
              </div>
              <button type="submit" className="btn btn-dark" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                Recevoir ma sélection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <p style={{ fontSize: "0.72rem", color: "var(--gray)", textAlign: "center", marginTop: 12 }}>
                Aucun spam. Désabonnement en un clic.
              </p>
            </form>
          ) : (
            <div className="diagnostic-options">
              {step.options.map((option) => (
                <button
                  key={option.id}
                  className={`diagnostic-option ${selected === option.id ? "selected" : ""}`}
                  onClick={() => handleOption(option.id)}
                >
                  <span className="diagnostic-option-icon">{option.icon}</span>
                  <span className="diagnostic-option-label">{option.label}</span>
                  <span className="diagnostic-option-desc">{option.desc}</span>
                </button>
              ))}
            </div>
          )}

          {currentStep > 0 && !step.isEmail && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{ marginTop: 24, fontSize: "0.78rem", color: "var(--gray)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            >
              ← Revenir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
