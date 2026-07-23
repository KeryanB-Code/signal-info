import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { fetchEvents } from "../../data/eventsApi.js";
import { fetchBugReports } from "../../data/bugReportsApi.js";
import { fetchAllProfiles } from "../../data/profilesApi.js";
import { PILOTAGE_ROLES } from "../../data/roles.js";
import { IconBox, IconPlus, IconBug, IconKey } from "../../components/admin/AdminIcons.jsx";

function StatCard({ label, value }) {
  return (
    <div className="admin-stat">
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{label}</div>
    </div>
  );
}

function CategoryTile({ to, icon, label, count, sub }) {
  return (
    <Link to={to} className="admin-cat-tile">
      <div className="admin-cat-icon">{icon}</div>
      <div style={{ flex: 1 }}>
        <div className="admin-cat-label">{label}</div>
        {sub && <div className="admin-cat-sub">{sub}</div>}
      </div>
      <div className="admin-cat-count">{count}</div>
    </Link>
  );
}

// Accueil = le vrai condensé (7 derniers jours, pas de sélecteur de période,
// pas de graphique) — le détail avec courbes et classements vit sur Pilotage.
export default function AdminHome() {
  const { products } = useProducts();
  const { role } = useAuth();
  const canSeeStats = PILOTAGE_ROLES.includes(role);

  const [stats, setStats] = useState(null);
  const [bugCount, setBugCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    if (!canSeeStats) return;
    fetchEvents(7)
      .then((events) => {
        const sessions = new Set();
        let pageviews = 0, addToCart = 0, checkoutClicks = 0;
        for (const e of events) {
          sessions.add(e.session_id);
          if (e.type === "pageview") pageviews++;
          else if (e.type === "add_to_cart") addToCart++;
          else if (e.type === "checkout_click") checkoutClicks++;
        }
        setStats({ pageviews, sessions: sessions.size, addToCart, checkoutClicks });
      })
      .catch(() => setStats({ pageviews: 0, sessions: 0, addToCart: 0, checkoutClicks: 0 }));
    fetchAllProfiles().then((r) => setUserCount(r.length)).catch(() => {});
  }, [canSeeStats]);

  useEffect(() => {
    fetchBugReports().then((r) => setBugCount(r.filter((b) => b.status !== "resolu").length)).catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: 4 }}>Accueil</h2>
      <p style={{ color: "var(--gray)", fontSize: "0.85rem", marginBottom: 28 }}>Aperçu des 7 derniers jours.</p>

      {canSeeStats && (
        <div className="grid-4" style={{ gap: 16, marginBottom: 40 }}>
          <StatCard label="Visites" value={stats ? stats.pageviews : "…"} />
          <StatCard label="Sessions uniques" value={stats ? stats.sessions : "…"} />
          <StatCard label="Ajouts au panier" value={stats ? stats.addToCart : "…"} />
          <StatCard label="Clics paiement" value={stats ? stats.checkoutClicks : "…"} />
        </div>
      )}

      <h3 style={{ fontSize: "1.05rem", marginBottom: 16 }}>Catégories</h3>
      <div className="admin-cat-grid">
        <CategoryTile to="/admin/products" icon={<IconBox />} label="Produits en ligne" sub="Catalogue" count={products.length} />
        <CategoryTile to="/admin/products/new" icon={<IconPlus />} label="Nouveau produit" sub="Ajouter" count="+" />
        <CategoryTile to="/admin/bugs" icon={<IconBug />} label="Bugs" sub="Signalements ouverts" count={bugCount ?? "…"} />
        {canSeeStats && (
          <CategoryTile to="/admin/access" icon={<IconKey />} label="Utilisateurs" sub="Comptes admin" count={userCount ?? "…"} />
        )}
      </div>
    </div>
  );
}
