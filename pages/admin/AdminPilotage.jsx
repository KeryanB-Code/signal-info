import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import { fetchEvents } from "../../data/eventsApi.js";
import { fetchBugReports } from "../../data/bugReportsApi.js";
import { fetchAllProfiles } from "../../data/profilesApi.js";
import LineChart from "../../components/admin/charts/LineChart.jsx";
import BarChart from "../../components/admin/charts/BarChart.jsx";
import { IconBox, IconBug, IconKey } from "../../components/admin/AdminIcons.jsx";

const PERIODS = [
  { value: 7, label: "7 derniers jours" },
  { value: 30, label: "30 derniers jours" },
  { value: 0, label: "Tout" },
];

// Palette validée (node scripts/validate_palette.js) sur le blanc du site :
// 3 hues, ordre fixe, jamais permuté — voir data-viz skill.
const SERIES = [
  { key: "pageview", label: "Visites", color: "#B8863E" },
  { key: "add_to_cart", label: "Ajouts panier", color: "#A6323D" },
  { key: "checkout_click", label: "Clics paiement", color: "#1274A0" },
];

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

// Temps moyen sur le site = écart entre le premier et le dernier événement
// de chaque session (donnée réelle dérivée des timestamps déjà collectés,
// pas une estimation) — une session à un seul événement compte 0s, ce qui
// est honnête vu le signal disponible (pas de heartbeat côté client).
function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m} min ${s}s` : `${s}s`;
}

// Construit une série quotidienne (une ligne par jour, un compteur par type
// d'événement) pour le graphique — jours sans données inclus à zéro, sinon
// le tracé sauterait les trous au lieu de creuser.
function buildDailySeries(events, sinceDays) {
  const days = sinceDays > 0 ? sinceDays : 90; // "Tout" : on plafonne l'affichage à 90 jours
  const buckets = {};
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets[key] = { date: key, pageview: 0, add_to_cart: 0, checkout_click: 0 };
  }
  for (const e of events) {
    const key = e.created_at.slice(0, 10);
    if (buckets[key]) buckets[key][e.type] = (buckets[key][e.type] || 0) + 1;
  }
  return Object.values(buckets);
}

export default function AdminPilotage() {
  const { products } = useProducts();
  const [events, setEvents] = useState([]);
  const [bugCount, setBugCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetchEvents(period)
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [period]);

  useEffect(() => {
    fetchBugReports().then((r) => setBugCount(r.filter((b) => b.status !== "resolu").length)).catch(() => {});
    fetchAllProfiles().then((r) => setUserCount(r.length)).catch(() => {});
  }, []);

  const dailySeries = useMemo(() => buildDailySeries(events, period), [events, period]);

  const stats = useMemo(() => {
    const sessions = new Set();
    const pathCounts = {};
    // borne min/max par session pour le temps passé — calculé sur les
    // timestamps réels des événements, pas une estimation.
    const sessionBounds = {};
    let totalPageviews = 0;
    let addToCartCount = 0;
    let checkoutClicksCount = 0;

    for (const e of events) {
      sessions.add(e.session_id);
      const t = new Date(e.created_at).getTime();
      const b = sessionBounds[e.session_id];
      if (!b) sessionBounds[e.session_id] = { min: t, max: t };
      else { if (t < b.min) b.min = t; if (t > b.max) b.max = t; }

      if (e.type === "pageview") {
        totalPageviews++;
        pathCounts[e.path] = (pathCounts[e.path] || 0) + 1;
      } else if (e.type === "add_to_cart") {
        addToCartCount++;
      } else if (e.type === "checkout_click") {
        checkoutClicksCount++;
      }
    }

    const topPaths = Object.entries(pathCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, value]) => ({ label, value }));

    const durations = Object.values(sessionBounds).map((b) => (b.max - b.min) / 1000);
    const avgDurationSec = durations.length ? durations.reduce((s, d) => s + d, 0) / durations.length : 0;

    const conversionRate = totalPageviews > 0 ? (checkoutClicksCount / totalPageviews) * 100 : 0;

    return {
      totalPageviews, uniqueSessions: sessions.size, addToCartCount, checkoutClicksCount,
      topPaths, avgDurationSec, conversionRate,
    };
  }, [events]);

  return (
    <div>
      <div className="admin-toolbar">
        <h2 style={{ fontSize: "1.5rem" }}>Pilotage</h2>
        <select className="input" style={{ maxWidth: 220 }} value={period} onChange={(e) => setPeriod(Number(e.target.value))}>
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ color: "var(--gray)" }}>Chargement…</p>
      ) : error ? (
        <p style={{ color: "#C0392B" }}>{error}</p>
      ) : (
        <>
          <div className="grid-4" style={{ gap: 16, marginBottom: 32 }}>
            <StatCard label="Visites" value={stats.totalPageviews} />
            <StatCard label="Sessions uniques" value={stats.uniqueSessions} />
            <StatCard label="Ajouts au panier" value={stats.addToCartCount} />
            <StatCard label="Clics « Procéder au paiement »" value={stats.checkoutClicksCount} />
            <StatCard label="Taux de conversion" value={`${stats.conversionRate.toFixed(1)}%`} />
            <StatCard label="Temps moyen sur le site" value={formatDuration(stats.avgDurationSec)} />
          </div>
          <p style={{ fontSize: "0.72rem", color: "var(--gray-light)", marginTop: -20, marginBottom: 32 }}>
            Taux de conversion = clics « Procéder au paiement » ÷ visites (pas de vraies ventes tant que le paiement réel n'est pas branché).
          </p>

          <div className="admin-chart-card" style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: "1.05rem", marginBottom: 20 }}>Activité du site</h3>
            <LineChart data={dailySeries} series={SERIES} />
          </div>

          <div className="admin-chart-card" style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: "1.05rem", marginBottom: 20 }}>Pages les plus visitées</h3>
            <BarChart data={stats.topPaths} />
          </div>
        </>
      )}

      <h3 style={{ fontSize: "1.05rem", marginBottom: 16 }}>Catégories</h3>
      <div className="admin-cat-grid">
        <CategoryTile to="/admin/products" icon={<IconBox />} label="Produits en ligne" sub="Catalogue" count={products.length} />
        <CategoryTile to="/admin/products/new" icon={<IconBox />} label="Nouveau produit" sub="Ajouter" count="+" />
        <CategoryTile to="/admin/bugs" icon={<IconBug />} label="Bugs" sub="Signalements ouverts" count={bugCount ?? "…"} />
        <CategoryTile to="/admin/access" icon={<IconKey />} label="Utilisateurs" sub="Comptes admin" count={userCount ?? "…"} />
      </div>
    </div>
  );
}
