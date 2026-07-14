import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RequireRole({ roles }) {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--gray)" }}>
        Chargement…
      </div>
    );
  }

  if (!roles.includes(role)) return <Navigate to="/admin/products" replace />;

  return <Outlet />;
}
