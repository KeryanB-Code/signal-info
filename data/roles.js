// Source unique pour tout ce qui concerne les rôles — partagé entre le
// navigateur (AdminAccess.jsx, AdminLayout.jsx, App.jsx) ET la fonction
// serverless api/create-user.js (Node, pas d'import.meta.env ici, donc pas
// de dépendance à un client Supabase ou à Vite : que des constantes pures,
// même principe que data/productMapper.js).

export const ROLES = ["administrateur", "manager", "coequipier"];

export const ROLE_LABEL = {
  administrateur: "Administrateur",
  manager: "Manager",
  coequipier: "Coéquipier",
};

export const ROLE_BADGE = {
  administrateur: "badge-dark",
  manager: "badge-sand",
  coequipier: "badge-outline",
};

// Qui peut créer quel rôle depuis /admin/access — appliqué à la fois côté
// client (filtrer le <select>) et côté serveur (seule application réelle).
export const GRANT_MATRIX = {
  administrateur: ["administrateur", "manager", "coequipier"],
  manager: ["coequipier"],
};

// Rôles autorisés à voir Pilotage/Accès — utilisé par App.jsx (RequireRole)
// et AdminLayout.jsx (affichage des liens de nav), pour ne jamais les
// laisser diverger.
export const PILOTAGE_ROLES = ["administrateur", "manager"];
