import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ScrollProgress, CustomCursor } from "./components/animations/ScrollProgress.jsx";
import PageTransition from "./components/animations/PageTransition.jsx";
import IntroScreen from "./components/animations/IntroScreen.jsx";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import Product from "./pages/Product.jsx";
import Diagnostic from "./pages/Diagnostic.jsx";
import Conseil from "./pages/Conseil.jsx";
import Boutiques from "./pages/Boutiques.jsx";
import SAV from "./pages/SAV.jsx";
import Magazine from "./pages/Magazine.jsx";
import Compte from "./pages/Compte.jsx";
import Capsule from "./pages/Capsule.jsx";
import BrandMosaic from "./pages/BrandMosaic.jsx";
import Marques from "./pages/Marques.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Panier({ items, onRemove }) {
  return (
    <div className="pt-nav" style={{ minHeight: "60vh" }}>
      <div style={{ background: "#F0EBE2", padding: "64px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="label text-sand mb-8">Maison Regard</div>
          <h1 className="h2">Mon Panier</h1>
        </div>
      </div>
      <div className="container" style={{ padding: "48px 24px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🛍</div>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 8 }}>Votre panier est vide</p>
            <p style={{ color: "var(--gray)", marginBottom: 32 }}>Découvrez notre sélection de montures de luxe.</p>
            <a href="/boutique" className="btn btn-dark">Voir la boutique</a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>
            <div>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 80, height: 100, background: "#F5F3EF", overflow: "hidden", flexShrink: 0 }}>
                    <img src={item.images[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--sand-dark)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>{item.brand}</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", marginBottom: 8 }}>{item.name}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--gray)" }}>{item.price.toLocaleString("fr-FR")} €</div>
                  </div>
                  <button onClick={() => onRemove(i)} style={{ color: "var(--gray-light)", fontSize: "1.2rem", alignSelf: "flex-start" }}>×</button>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: "white", border: "1px solid var(--border)", padding: "32px" }}>
                <div className="label" style={{ marginBottom: 20, color: "var(--dark)" }}>Récapitulatif</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--gray)" }}>Sous-total</span>
                  <span>{items.reduce((s, i) => s + i.price, 0).toLocaleString("fr-FR")} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--gray)" }}>Livraison</span>
                  <span style={{ color: "var(--sand-dark)" }}>Offerte</span>
                </div>
                <div className="divider" style={{ marginBottom: 20 }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, fontFamily: "var(--serif)", fontSize: "1.3rem" }}>
                  <span>Total</span>
                  <span>{items.reduce((s, i) => s + i.price, 0).toLocaleString("fr-FR")} €</span>
                </div>
                <div style={{ background: "#FFFEF9", border: "1px solid var(--border)", padding: "16px", marginBottom: 20 }}>
                  <div style={{ fontSize: "0.65rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, color: "var(--sand-dark)", marginBottom: 8 }}>
                    ALMA · Paiement fractionné
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[2, 3, 4].map((x) => (
                      <div key={x} style={{ flex: 1, padding: "8px 4px", border: "1px solid var(--border)", textAlign: "center", cursor: "pointer", background: x === 3 ? "var(--sand-light)" : "white" }}>
                        <div style={{ fontSize: "0.875rem", fontFamily: "var(--serif)", fontWeight: x === 3 ? 600 : 400 }}>{x}x</div>
                        <div style={{ fontSize: "0.65rem", color: "var(--gray)" }}>
                          {Math.ceil(items.reduce((s, i) => s + i.price, 0) / x).toLocaleString("fr-FR")} €
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn btn-dark" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  Procéder au paiement
                </button>
                <p style={{ fontSize: "0.7rem", color: "var(--gray)", textAlign: "center", marginTop: 12 }}>
                  Paiement sécurisé · SSL · Visa / Mastercard / Alma
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-nav" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: "6rem", fontWeight: 300, color: "var(--border)", lineHeight: 1 }}>404</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 300, marginBottom: 16, marginTop: 8 }}>Page introuvable</h2>
        <p style={{ color: "var(--gray)", marginBottom: 32 }}>Cette page n'existe pas ou a été déplacée.</p>
        <a href="/" className="btn btn-dark">Retour à l'accueil</a>
      </div>
    </div>
  );
}

function AppInner() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <IntroScreen />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar cartCount={cart.length} />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/boutique" element={<Boutique onAddToCart={addToCart} />} />
          <Route path="/produit/:id" element={<Product onAddToCart={addToCart} />} />
          <Route path="/diagnostic" element={<Diagnostic onAddToCart={addToCart} />} />
          <Route path="/conseil" element={<Conseil />} />
          <Route path="/boutiques" element={<Boutiques />} />
          <Route path="/sav" element={<SAV />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:id" element={<Magazine />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/panier" element={<Panier items={cart} onRemove={removeFromCart} />} />
          <Route path="/capsule" element={<Capsule onAddToCart={addToCart} />} />
          <Route path="/marques" element={<Marques />} />
          <Route path="/marque/:brand" element={<BrandMosaic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
