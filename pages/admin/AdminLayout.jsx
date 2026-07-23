import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";
import { PILOTAGE_ROLES, ROLE_LABEL } from "../../data/roles.js";
import { IconHome, IconExternal, IconBox, IconPlus, IconBug, IconChart, IconKey, IconLogout } from "../../components/admin/AdminIcons.jsx";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { offline } = useProducts();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const navClass = ({ isActive }) => `admin-nav-item${isActive ? " active" : ""}`;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="admin-header">
        <div className="container" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="label text-sand mb-8">Maison Regard</div>
            <h1>Administration</h1>
            {role && <div className="admin-role-badge">{ROLE_LABEL[role]}</div>}
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn-outline">
            <IconExternal style={{ width: 14, height: 14 }} />
            Voir le site
          </a>
        </div>
      </div>
      <div className="container">
        <div className="admin-body">
          <div className="admin-sidebar">
            <div className="admin-nav-group">
              <NavLink to="/admin" end className={navClass}>
                <IconHome /><span>Accueil</span>
              </NavLink>
              <NavLink to="/admin/products" end className={navClass}>
                <IconBox /><span>Produits</span>
              </NavLink>
              <NavLink to="/admin/products/new" className={navClass}>
                <IconPlus /><span>Nouveau produit</span>
              </NavLink>
              <NavLink to="/admin/bugs" className={navClass}>
                <IconBug /><span>Bugs</span>
              </NavLink>
              {PILOTAGE_ROLES.includes(role) && (
                <>
                  <NavLink to="/admin/pilotage" className={navClass}>
                    <IconChart /><span>Pilotage</span>
                  </NavLink>
                  <NavLink to="/admin/access" className={navClass}>
                    <IconKey /><span>Accès</span>
                  </NavLink>
                </>
              )}
            </div>
            <div className="admin-nav-divider" />
            <button className="admin-nav-item admin-nav-logout" onClick={handleLogout}>
              <IconLogout /><span>Se déconnecter</span>
            </button>
          </div>
          <div className="admin-content">
            {offline && (
              <div className="admin-offline-banner">
                <strong>Mode dégradé — base de données injoignable.</strong> Le site public affiche le
                catalogue de secours intégré au code. Les produits listés ici ne sont pas ceux de la base, et
                toute création, modification ou suppression échouera. Vérifie que le projet Supabase est bien
                actif, puis recharge la page.
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
