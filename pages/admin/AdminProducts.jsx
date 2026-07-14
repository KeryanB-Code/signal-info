import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { deleteProduct } from "../../data/productsApi.js";
import { fetchEvents } from "../../data/eventsApi.js";
import { PILOTAGE_ROLES } from "../../data/roles.js";
import BarChart from "../../components/admin/charts/BarChart.jsx";

export default function AdminProducts() {
  const { products, loading, reload, BRANDS } = useProducts();
  const { role } = useAuth();
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("Toutes");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [topAdded, setTopAdded] = useState(null);

  // Détail réservé aux rôles Pilotage : les coequipier n'ont pas accès à la
  // table events en lecture (RLS), donc pas de fetch pour eux.
  useEffect(() => {
    if (!PILOTAGE_ROLES.includes(role)) return;
    fetchEvents(30)
      .then((events) => {
        const counts = {};
        for (const e of events) {
          if (e.type === "add_to_cart" && e.product_id) counts[e.product_id] = (counts[e.product_id] || 0) + 1;
        }
        const ranked = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([productId, value]) => {
            const p = products.find((pr) => pr.id === productId);
            return { label: p ? `${p.brand} — ${p.name}` : productId, value };
          });
        setTopAdded(ranked);
      })
      .catch(() => setTopAdded([]));
  }, [role, products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (brandFilter !== "Toutes") list = list.filter((p) => p.brand === brandFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.ref || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, search, brandFilter]);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(confirmDelete.id);
      await reload();
      setConfirmDelete(null);
    } catch (e) {
      alert("Erreur lors de la suppression : " + e.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 4 }}>Produits</h2>
          <div className="label" style={{ color: "var(--gray)" }}>
            {loading ? "Chargement…" : `${filtered.length} produit${filtered.length > 1 ? "s" : ""}`}
          </div>
        </div>
        <Link to="/admin/products/new" className="btn btn-dark">
          + Nouveau produit
        </Link>
      </div>

      {topAdded && topAdded.length > 0 && (
        <div className="admin-chart-card" style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: 16 }}>Les plus ajoutés au panier (30 derniers jours)</h3>
          <BarChart data={topAdded} />
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <input
          type="text"
          className="input"
          style={{ maxWidth: 280 }}
          placeholder="Rechercher (nom, marque, réf.)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input"
          style={{ maxWidth: 220 }}
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          {["Toutes", ...BRANDS].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ color: "var(--gray)" }}>Chargement…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "var(--gray)" }}>Aucun produit ne correspond.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Marque</th>
                <th>Nom</th>
                <th>Réf.</th>
                <th>Prix</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="admin-thumb" />
                    ) : (
                      <div className="admin-thumb" />
                    )}
                  </td>
                  <td>{p.brand}</td>
                  <td>{p.name}</td>
                  <td style={{ color: "var(--gray)" }}>{p.ref}</td>
                  <td>{p.price.toLocaleString("fr-FR")} €</td>
                  <td>
                    <span className={`badge ${p.inStock ? "badge-sand" : "badge-outline"}`}>
                      {p.inStock ? "En stock" : "Rupture"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Link to={`/admin/products/${p.id}/edit`} className="admin-btn-outline">
                        Éditer
                      </Link>
                      <button className="admin-btn-outline admin-btn-danger" onClick={() => setConfirmDelete(p)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => !deleting && setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <button className="modal-close" onClick={() => setConfirmDelete(null)}>×</button>
            <div style={{ padding: 32 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 12 }}>
                Supprimer « {confirmDelete.name} » ?
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray)", marginBottom: 24 }}>
                Cette action est définitive. Le produit disparaîtra immédiatement du site public.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirmDelete(null)} disabled={deleting}>
                  Annuler
                </button>
                <button className="btn btn-dark" style={{ flex: 1, justifyContent: "center", background: "#B0483B", borderColor: "#B0483B" }} onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Suppression…" : "Supprimer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
