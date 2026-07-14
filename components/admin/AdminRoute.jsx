import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminRoute() {
  const { session, role, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "120px 0", textAlign: "center", color: "var(--gray)" }}>
        Chargement…
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  if (!role) {
    return (
      <div style={{ padding: "120px 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 12 }}>Accès non configuré</p>
        <p style={{ color: "var(--gray)" }}>
          Ce compte est connecté mais n'a pas encore de rôle assigné. Demande à un administrateur de te créer un accès.
        </p>
      </div>
    );
  }

  return <Outlet />;
}
