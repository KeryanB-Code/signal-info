import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../lib/supabaseClient.js";
import { fetchAllProfiles } from "../../data/profilesApi.js";
import { ROLE_LABEL, ROLE_BADGE, GRANT_MATRIX } from "../../data/roles.js";

export default function AdminAccess() {
  const { role: callerRole } = useAuth();
  const roleOptions = GRANT_MATRIX[callerRole] || [];

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", fullName: "", role: roleOptions[0] || "coequipier" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setProfiles(await fetchAllProfiles());
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
    setError(null);
    setSuccess(null);
    if (form.password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Ta session a expiré, reconnecte-toi.");
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          fullName: form.fullName.trim(),
          role: form.role,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur inconnue");
      setSuccess(`Compte créé pour ${json.email}.`);
      setForm({ email: "", password: "", fullName: "", role: roleOptions[0] || "coequipier" });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 24 }}>Créer un accès</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: 40 }}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom complet</label>
          <input
            className="input"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe (min. 8 caractères)</label>
          <input
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <p style={{ fontSize: "0.75rem", color: "var(--gray)", marginTop: 4 }}>
            À communiquer toi-même à la personne concernée.
          </p>
        </div>
        <div className="form-group">
          <label>Rôle</label>
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            {roleOptions.map((r) => (
              <option key={r} value={r}>{ROLE_LABEL[r]}</option>
            ))}
          </select>
        </div>
        {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}
        {success && <p style={{ fontSize: "0.85rem", color: "#2E7D32", marginBottom: 12 }}>{success}</p>}
        <button type="submit" className="btn btn-dark" disabled={saving}>
          {saving ? "Création…" : "Créer l'accès"}
        </button>
      </form>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 16 }}>Comptes existants</h2>

      {loading ? (
        <p style={{ color: "var(--gray)" }}>Chargement…</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Nom</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id}>
                  <td>{p.email}</td>
                  <td>{p.full_name || "—"}</td>
                  <td><span className={`badge ${ROLE_BADGE[p.role]}`}>{ROLE_LABEL[p.role]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
