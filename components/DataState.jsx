// Bloc de chargement/erreur réutilisable pour les pages qui dépendent de
// useProducts() — évite de dupliquer le même style à chaque page et
// surface enfin les erreurs de fetch (auparavant silencieuses : la page
// rendait un catalogue vide sans dire pourquoi).
export default function DataState({ loading, error, children }) {
  if (loading) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center", color: "var(--gray)" }}>
        Chargement…
      </div>
    );
  }
  if (error) {
    return (
      <div className="pt-nav" style={{ padding: "120px 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", marginBottom: 12 }}>Un problème est survenu</p>
        <p style={{ color: "var(--gray)" }}>Impossible de charger les données. Réessaie dans quelques instants.</p>
      </div>
    );
  }
  return children;
}
