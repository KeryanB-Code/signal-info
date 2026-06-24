import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ARTICLES = [
  {
    id: "cartier-santos-sous-estimee",
    category: "Expertise",
    title: "Pourquoi la Cartier Santos-Dumont est la monture la plus sous-estimée de 2025",
    excerpt: "Dans un catalogue où chaque pièce affiche sa maison, la Santos-Dumont choisit la discrétion. C'est précisément ce qui la rend indispensable.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "12 juin 2025",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "visage-ovale-5-erreurs",
    category: "Visagisme",
    title: "Visage ovale : les 5 erreurs à éviter absolument",
    excerpt: "Le visage ovale est réputé polyvalent. Mais cette liberté a un revers : sans repères, on peut se tromper.",
    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "5 juin 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: "lire-ordonnance",
    category: "Guide",
    title: "Comment lire une ordonnance optique en 2 minutes",
    excerpt: "SPH, CYL, AXE, ADD — ces chiffres vous semblent abstraits ? Voici la traduction complète, sans jargon.",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "28 mai 2025",
    readTime: "3 min",
    featured: false,
  },
  {
    id: "fred-univers-nautique",
    category: "Maisons",
    title: "Fred : l'héritage nautique qui a tout changé à la lunetterie de luxe",
    excerpt: "Comment une maison de joaillerie fondée par Fred Samuel a-t-elle révolutionné la monture technique ? L'histoire complète.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "20 mai 2025",
    readTime: "7 min",
    featured: false,
  },
  {
    id: "verres-progressifs-guide",
    category: "Guide",
    title: "Progressifs : tout ce que personne ne vous dit avant d'acheter",
    excerpt: "Adaptation, corridor, marques — le guide honnête que votre opticien aurait dû vous donner dès le départ.",
    img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "14 mai 2025",
    readTime: "8 min",
    featured: false,
  },
  {
    id: "miumiu-generation-z",
    category: "Tendances",
    title: "Miu Miu et la génération Z : comment une maison de luxe a recodé ses codes",
    excerpt: "La maison sœur de Prada est devenue en 3 saisons la référence absolute de la lunetterie statement. Décryptage.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    author: "Opticien Maison Regard",
    date: "7 mai 2025",
    readTime: "5 min",
    featured: false,
  },
];

const CATEGORIES = ["Tous", "Expertise", "Visagisme", "Guide", "Maisons", "Tendances"];

function ArticleCard({ article, featured = false }) {
  const navigate = useNavigate();

  if (featured) {
    return (
      <div
        style={{ cursor: "pointer", gridColumn: "1 / -1" }}
        onClick={() => navigate(`/magazine/${article.id}`)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--border)", background: "white" }}>
          <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
            <img
              src={article.img}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
          </div>
          <div style={{ padding: "48px" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--sand-dark)", marginBottom: 16 }}>
              {article.category} — Article vedette
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.25, marginBottom: 20, fontWeight: 400 }}>
              {article.title}
            </h2>
            <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 32 }}>{article.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--gray-light)" }}>
                {article.date} · {article.readTime} de lecture
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--sand-dark)" }}>Lire →</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/magazine/${article.id}`)}
    >
      <div className="article-img">
        <img src={article.img} alt={article.title} />
      </div>
      <div className="article-info">
        <div className="article-category">{article.category}</div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-meta">{article.date} · {article.readTime}</div>
      </div>
    </div>
  );
}

export default function Magazine() {
  const [activeCat, setActiveCat] = useState("Tous");

  const filtered = activeCat === "Tous"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCat);

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured || activeCat !== "Tous");

  return (
    <div className="pt-nav">
      {/* Hero */}
      <div style={{ background: "var(--dark)", color: "white", padding: "80px 0 64px" }}>
        <div className="container">
          <div className="label" style={{ color: "var(--sand)", marginBottom: 12 }}>Maison Regard · Editorial</div>
          <h1 className="h2 text-white" style={{ marginBottom: 16 }}>Le Magazine</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480 }}>
            Pas du contenu produit — du contenu expert. Visagisme, maisons, guides techniques, tendances : la voix de l'opticien.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 24px" }}>
        {/* Categories */}
        <div className="filters" style={{ marginBottom: 40 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${activeCat === c ? "active" : ""}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured && activeCat === "Tous" && (
          <div style={{ marginBottom: 48 }}>
            <ArticleCard article={featured} featured />
          </div>
        )}

        {/* Grid */}
        <div className="grid-3">
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--gray)" }}>
              Aucun article dans cette catégorie pour l'instant.
            </p>
          </div>
        )}

        {/* CTA inscription */}
        <div style={{
          marginTop: 80, padding: "48px", background: "#F0EBE2", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap",
        }}>
          <div>
            <div className="label text-sand mb-8">Newsletter éditoriale</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 8 }}>
              3 à 4 articles par mois, directement dans votre boîte
            </h3>
            <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Aucun spam · Désabonnement en un clic</p>
          </div>
          <form style={{ display: "flex", gap: 0 }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.com"
              style={{
                padding: "14px 20px", border: "1px solid var(--border)", borderRight: "none",
                fontSize: "0.875rem", minWidth: 260, background: "white",
              }}
            />
            <button type="submit" className="btn btn-dark" style={{ borderRadius: 0 }}>
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
