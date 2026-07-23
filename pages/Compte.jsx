import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";

const TABS = [
  { id: "orders", label: "Mes commandes", icon: "📦" },
  { id: "wishlist", label: "Ma sélection", icon: "♥" },
  { id: "diagnostic", label: "Mon diagnostic", icon: "👁" },
  { id: "renewal", label: "Renouvellement", icon: "📅" },
  { id: "profile", label: "Mon profil", icon: "👤" },
];

export default function Compte() {
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const SAMPLE_ORDERS = products.length > 4 ? [
    {
      id: "MR-2025-0042",
      date: "15 mars 2025",
      product: products[0],
      status: "Livré",
      statusColor: "#27ae60",
      total: 890,
    },
    {
      id: "MR-2025-0018",
      date: "4 janvier 2025",
      product: products[4],
      status: "Livré",
      statusColor: "#27ae60",
      total: 395,
    },
  ] : [];

  if (!isLoggedIn) {
    return (
      <div className="pt-nav" style={{ minHeight: "100vh", background: "#F0EBE2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }}>
          <div style={{ background: "white", padding: "48px", border: "1px solid var(--border)" }}>
            <div className="text-center" style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", marginBottom: 4 }}>
                Maison <span style={{ color: "var(--sand-dark)" }}>Regard</span>
              </div>
              <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Mon espace client</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: "0.72rem", letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                  placeholder="votre@email.com"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: "0.72rem", letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn btn-dark" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                Se connecter
              </button>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <a href="#" style={{ fontSize: "0.78rem", color: "var(--gray)", textDecoration: "underline" }}>
                  Mot de passe oublié ?
                </a>
              </div>
            </form>

            <div className="divider" style={{ margin: "28px 0" }} />

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--gray)", marginBottom: 12 }}>Pas encore de compte ?</p>
              <button
                className="btn btn-outline"
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
                onClick={() => setIsLoggedIn(true)}
              >
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-nav" style={{ minHeight: "100vh" }}>
      <div style={{ background: "#F0EBE2", padding: "40px 0 32px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-4">Bonjour,</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300 }}>
            Mon espace Maison Regard
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", minHeight: "60vh" }}>
          {/* Sidebar */}
          <div className="compte-sidebar">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={`compte-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            ))}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              <button
                className="compte-nav-item"
                style={{ width: "100%", color: "#C0392B", fontSize: "0.82rem" }}
                onClick={() => setIsLoggedIn(false)}
              >
                <span>→</span>
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="compte-content">
            {activeTab === "orders" && (
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 24 }}>
                  Mes commandes
                </h2>
                {SAMPLE_ORDERS.map((order) => (
                  <div key={order.id} className="order-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "var(--gray)", letterSpacing: ".05em" }}>COMMANDE</div>
                        <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{order.id}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{order.date}</div>
                      </div>
                      <span style={{ fontSize: "0.75rem", background: order.statusColor + "15", color: order.statusColor, padding: "4px 12px", borderRadius: 2, fontWeight: 500 }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <div style={{ width: 60, height: 60, background: "#F5F3EF", overflow: "hidden", flexShrink: 0 }}>
                        <img src={order.product.images[0]} alt={order.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--sand-dark)", letterSpacing: ".1em", textTransform: "uppercase" }}>{order.product.brand}</div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "1rem" }}>{order.product.name}</div>
                      </div>
                      <div style={{ fontWeight: 500 }}>{order.total.toLocaleString("fr-FR")} €</div>
                    </div>
                    <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                      <button className="btn btn-ghost" style={{ fontSize: "0.72rem" }}>
                        Voir la facture
                      </button>
                      <button className="btn btn-ghost" style={{ fontSize: "0.72rem" }}>
                        Demander un SAV
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 24 }}>
                  Ma sélection sauvegardée
                </h2>
                <div className="grid-3">
                  {products.slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/produit/${p.id}`} style={{ display: "block" }}>
                      <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "#F5F3EF", marginBottom: 10 }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--sand-dark)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 2 }}>{p.brand}</div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "0.95rem" }}>{p.name}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--gray)" }}>{p.price.toLocaleString("fr-FR")} €</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "diagnostic" && (
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 8 }}>
                  Mon diagnostic
                </h2>
                <p style={{ color: "var(--gray)", marginBottom: 32 }}>Votre profil visuel et vos préférences sont conservés pour affiner les recommandations.</p>
                <div style={{ padding: "32px", background: "#F0EBE2", border: "1px solid var(--border)", marginBottom: 24 }}>
                  <div className="label text-sand mb-12">Votre profil</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                      { label: "Forme du visage", value: "Ovale" },
                      { label: "Style préféré", value: "Minimaliste" },
                      { label: "Usage principal", value: "Optique" },
                      { label: "Budget", value: "500 – 800 €" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div style={{ fontSize: "0.65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gray)", marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "1.05rem" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/diagnostic" className="btn btn-outline">
                  Refaire le diagnostic
                </Link>
              </div>
            )}

            {activeTab === "renewal" && (
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 8 }}>
                  Renouvellement conseillé
                </h2>
                <p style={{ color: "var(--gray)", marginBottom: 32 }}>Vos montures et leur date de renouvellement recommandée.</p>
                <div style={{ padding: "28px", border: "1px solid var(--border)", background: "white", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "0.65rem", color: "var(--sand-dark)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>Cartier</div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", marginBottom: 4 }}>Santos-Dumont</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>Achetée le 15 mars 2025</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginBottom: 2 }}>Renouvellement conseillé</div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--sand-dark)" }}>Mars 2027</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, height: 4, background: "var(--border)", borderRadius: 2 }}>
                    <div style={{ width: "10%", height: "100%", background: "var(--sand)", borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginTop: 4 }}>3 mois sur 24 écoulés</div>
                </div>
                <div style={{ padding: "20px", border: "1px dashed var(--border)", textAlign: "center" }}>
                  <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>
                    Nous vous enverrons un rappel 3 mois avant la date de renouvellement recommandée.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: 24 }}>
                  Mon profil
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 560 }}>
                  {[
                    { label: "Prénom", value: "Claire" },
                    { label: "Nom", value: "M." },
                    { label: "Email", value: "claire.m@example.fr" },
                    { label: "Téléphone", value: "+33 6 XX XX XX XX" },
                    { label: "Ville", value: "Lyon" },
                    { label: "Boutique favorite", value: "Saint Clair" },
                  ].map((field) => (
                    <div key={field.label}>
                      <div style={{ fontSize: "0.65rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4, color: "var(--gray)" }}>
                        {field.label}
                      </div>
                      <input
                        defaultValue={field.value}
                        style={{
                          width: "100%", padding: "10px 14px", border: "1px solid var(--border)",
                          fontSize: "0.875rem", background: "white",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button className="btn btn-dark" style={{ marginTop: 24 }}>
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
