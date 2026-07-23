import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) setError("Identifiants incorrects.");
    else navigate("/admin");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }}>
        <div style={{ background: "white", padding: "48px", border: "1px solid var(--border)" }}>
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", marginBottom: 4 }}>
              Maison <span style={{ color: "var(--sand-dark)" }}>Regard</span>
            </div>
            <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Administration</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: "0.72rem", letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                placeholder="votre@email.com"
                required
              />
            </div>
            <div style={{ marginBottom: error ? 12 : 24 }}>
              <label style={{ fontSize: "0.72rem", letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p style={{ fontSize: "0.8rem", color: "#C0392B", marginBottom: 20 }}>{error}</p>
            )}
            <button
              type="submit"
              className="btn btn-dark"
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
