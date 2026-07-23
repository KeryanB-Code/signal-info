import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { fetchBugReports, createBugReport, updateBugReportStatus } from "../../data/bugReportsApi.js";

const STATUS_LABEL = { ouvert: "Ouvert", en_cours: "En cours", resolu: "Résolu" };
const STATUS_BADGE = { ouvert: "badge-outline", en_cours: "badge-sand", resolu: "badge-dark" };

export default function AdminBugs() {
  const { profile } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setReports(await fetchBugReports());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await createBugReport({
        title: form.title.trim(),
        description: form.description.trim(),
        reportedByName: profile?.full_name || profile?.email || "Inconnu",
      });
      setForm({ title: "", description: "" });
      await load();
    } catch (e) {
      alert("Erreur : " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateBugReportStatus(id, status);
      await load();
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Signaler un bug</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 560, marginBottom: 40 }}>
        <div className="form-group">
          <label>Titre</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex : le bouton panier ne répond pas sur mobile"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="input"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Que s'est-il passé, sur quelle page ?"
          />
        </div>
        <button type="submit" className="btn btn-dark" disabled={saving}>
          {saving ? "Envoi…" : "Signaler"}
        </button>
      </form>

      <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>Signalements</h2>

      {loading ? (
        <p style={{ color: "var(--gray)" }}>Chargement…</p>
      ) : error ? (
        <p style={{ color: "#C0392B" }}>{error}</p>
      ) : reports.length === 0 ? (
        <p style={{ color: "var(--gray)" }}>Aucun bug signalé pour l'instant.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Signalé par</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td style={{ color: "var(--gray)", maxWidth: 320 }}>{r.description}</td>
                  <td style={{ color: "var(--gray)" }}>{r.reported_by_name}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className={`badge ${STATUS_BADGE[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                      <select
                        className="input"
                        style={{ width: "auto", padding: "4px 8px", fontSize: "0.75rem" }}
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      >
                        <option value="ouvert">Ouvert</option>
                        <option value="en_cours">En cours</option>
                        <option value="resolu">Résolu</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
