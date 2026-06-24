import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(""); }
  };

  return (
    <>
      <div className="newsletter">
        <div className="container text-center">
          <div className="label text-sand mb-12">Newsletter</div>
          <h2 className="h2 text-white mb-8">
            Les nouveautés en avant-première
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
            Capsules exclusives, arrivages, guide visagisme — pour les initiés uniquement.
          </p>
          {sent ? (
            <p style={{ color: "var(--sand)", fontFamily: "var(--serif)", fontSize: "1.1rem" }}>
              Bienvenue dans la Maison. Vous recevrez les prochaines nouveautés en exclusivité.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: 460, margin: "0 auto" }}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit">S'inscrire</button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                Maison <span>Regard</span>
              </div>
              <p className="footer-desc">
                Opticien diplômé d'état. Sélection exclusive de montures de luxe : Cartier, Fred, Gucci, YSL, Miu Miu, Céline, John Dalia. Conseil personnalisé, essayage 3D, paiement en plusieurs fois.
              </p>
              <div className="footer-social" style={{ marginTop: 24 }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.07a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Boutique</h4>
              <Link to="/boutique">Toutes les montures</Link>
              <Link to="/boutique?cat=optique">Optique</Link>
              <Link to="/boutique?cat=soleil">Soleil</Link>
              <Link to="/boutique?brand=Cartier">Cartier</Link>
              <Link to="/boutique?brand=Gucci">Gucci</Link>
              <Link to="/capsule">Capsule Collection</Link>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <Link to="/diagnostic">Diagnostic Style</Link>
              <Link to="/conseil">Espace Conseil</Link>
              <Link to="/conseil">RDV Visio</Link>
              <Link to="/sav">SAV & Retours</Link>
              <Link to="/boutiques">Nos Boutiques</Link>
              <Link to="/magazine">Magazine</Link>
            </div>

            <div className="footer-col">
              <h4>Informations</h4>
              <Link to="/sav">Livraison</Link>
              <Link to="/sav">Retours</Link>
              <Link to="/sav">Correction</Link>
              <Link to="/sav">Garantie</Link>
              <a href="mailto:contact@maisonregard.fr">Contact</a>
              <a href="#">Mentions légales</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 Maison Regard — Opticien diplômé d'état</span>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
                alt="PayPal" style={{ height: 14, opacity: 0.5, filter: "brightness(10)" }}
              />
              <span style={{ opacity: 0.5 }}>Visa</span>
              <span style={{ opacity: 0.5 }}>Mastercard</span>
              <span style={{ opacity: 0.5, fontSize: "0.7rem", letterSpacing: ".05em" }}>ALMA</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
