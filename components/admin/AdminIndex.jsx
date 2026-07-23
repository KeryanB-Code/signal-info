import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { PILOTAGE_ROLES } from "../../data/roles.js";

// Page d'accueil de l'admin : Pilotage pour administrateur/manager (le
// tableau de bord), Produits pour coequipier (qui n'a pas accès à Pilotage).
export default function AdminIndex() {
  const { role } = useAuth();
  return <Navigate to={PILOTAGE_ROLES.includes(role) ? "/admin/pilotage" : "/admin/products"} replace />;
}
