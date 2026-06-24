import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/boutique", label: "Boutique" },
  { to: "/diagnostic", label: "Diagnostic" },
  { to: "/conseil", label: "Espace Conseil" },
  { to: "/boutiques", label: "Nos Boutiques" },
  { to: "/magazine", label: "Magazine" },
];

const BRAND_LIST = [
  "Cartier", "Fred", "Dita", "John Dalia",
  "Miu Miu", "Céline", "Gucci", "Saint Laurent",
];

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Bandeau revendeur officiel */}
      <div className="authorized-banner">
        Revendeur officiel agréé&nbsp;·&nbsp;Livraison offerte dès 250€&nbsp;·&nbsp;Paiement 4× sans frais
      </div>

      <nav className="navbar" style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none" }}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            Maison <span>Regard</span>
          </Link>

          <div className="navbar-nav">
            {/* Dropdown Marques */}
            <div className="brand-nav-dropdown">
              <Link
                to="/boutique"
                style={{
                  fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  fontWeight: 400, color: "var(--gray)", transition: "color .2s",
                }}
              >
                Marques
              </Link>
              <div className="brand-nav-dropdown-menu">
                {BRAND_LIST.map((brand) => (
                  <Link
                    key={brand}
                    to={`/boutique?brand=${encodeURIComponent(brand)}`}
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={location.pathname.startsWith(l.to) ? "active" : ""}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <Link to="/compte" className="navbar-icon-btn" title="Mon compte">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
            <Link to="/boutique" className="navbar-icon-btn" title="Ma sélection">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>
            <Link to="/panier" className="navbar-icon-btn" title="Panier">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="navbar-logo">
              Maison <span style={{ color: "var(--sand-dark)" }}>Regard</span>
            </span>
            <button onClick={() => setMobileOpen(false)} style={{ fontSize: "1.5rem", color: "var(--dark)" }}>
              ×
            </button>
          </div>
          <nav>
            <Link to="/boutique">Boutique</Link>
            {BRAND_LIST.map((brand) => (
              <Link
                key={brand}
                to={`/boutique?brand=${encodeURIComponent(brand)}`}
                style={{ fontSize: "1.1rem", paddingLeft: 16 }}
              >
                {brand}
              </Link>
            ))}
            {NAV_LINKS.slice(1).map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
            <Link to="/sav">SAV & Retours</Link>
            <Link to="/compte">Mon Compte</Link>
          </nav>
          <div style={{ marginTop: "auto", paddingTop: 32 }}>
            <Link to="/conseil" className="btn btn-dark" style={{ width: "100%", display: "flex" }}>
              Prendre RDV Visio
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
