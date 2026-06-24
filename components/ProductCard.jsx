import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TiltCard from "./animations/TiltCard.jsx";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => navigate(`/produit/${product.id}`);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <TiltCard maxTilt={8} scale={1.015} glare={true} speed={500}>
        <div
          className="product-img-wrap relative"
          onMouseEnter={() => setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          <motion.img
            src={product.images[imgIdx] || product.images[0]}
            alt={`${product.brand} ${product.name}`}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            animate={{ opacity: 1 }}
            key={imgIdx}
            initial={{ opacity: 0.7 }}
            transition={{ duration: 0.25 }}
          />

          {/* Badges */}
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {product.new && <span className="badge badge-dark">Nouveau</span>}
            {!product.inStock && <span className="badge" style={{ background: "#F5E6E6", color: "#C0392B" }}>Bientôt dispo</span>}
            {product.tags[0] && product.inStock && !product.new && (
              <span className="badge badge-sand">{product.tags[0]}</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className="wishlist-btn"
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            title={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <motion.div whileTap={{ scale: 1.4 }} transition={{ type: "spring", stiffness: 400 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "var(--sand-dark)" : "none"} stroke={liked ? "var(--sand-dark)" : "var(--gray)"} strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </motion.div>
          </button>

          {/* Quick-add on hover */}
          <div className="product-card-actions">
            <button
              className="btn btn-dark"
              style={{ flex: 1, padding: "10px 16px", fontSize: "0.7rem" }}
              onClick={(e) => { e.stopPropagation(); if (onAddToCart) onAddToCart(product); }}
              disabled={!product.inStock}
            >
              {product.inStock ? "Ajouter au panier" : "Me notifier"}
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: "10px 14px", background: "white", color: "var(--dark)", fontSize: "0.7rem" }}
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              title="Essayer en 3D"
            >
              3D
            </button>
          </div>
        </div>
      </TiltCard>

      <div className="product-card-info" onClick={handleClick} style={{ cursor: "pointer" }}>
        <div className="product-card-brand">{product.brand}</div>
        <div className="product-card-name">{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="product-card-price">
            {product.price.toLocaleString("fr-FR")} €
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--sand)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontSize: "0.7rem", color: "var(--gray)" }}>
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        {product.correction && (
          <div style={{ fontSize: "0.65rem", color: "var(--sand-dark)", marginTop: 4, letterSpacing: ".05em" }}>
            Correction disponible
          </div>
        )}
      </div>
    </motion.div>
  );
}
