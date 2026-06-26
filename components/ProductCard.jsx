import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => navigate(`/produit/${product.id}`);
  const colorCount = product.colors?.length || 1;

  /* images[1] = clean product shot (default), images[0] = editorial worn shot (hover) */
  const mainImg = product.images[1] || product.images[0];
  const wornImg = product.images[0] !== mainImg ? product.images[0] : null;

  return (
    <motion.div
      className="product-card-v2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={handleClick}
    >
      <div className="product-card-v2-img">
        {/* Clean product shot — default view */}
        <img src={mainImg} alt={`${product.brand} ${product.name}`} />

        {/* Editorial worn shot — crossfades in on hover */}
        {wornImg && (
          <img
            src={wornImg}
            alt={`${product.brand} ${product.name} — porté`}
            className="product-card-v2-img-worn"
          />
        )}

        {/* Wishlist heart */}
        <button
          className="product-card-v2-wishlist"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          title={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            style={{ color: liked ? "#C4A882" : "#6B6B6B" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* New badge */}
        {product.new && (
          <span className="product-card-v2-badge-new">Nouveau</span>
        )}

        {/* Color count */}
        <span className="product-card-v2-colors">
          {colorCount} {colorCount > 1 ? "couleurs" : "couleur"}
        </span>

        {/* Basket icon — appears on hover */}
        <button
          className="product-card-v2-basket"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart && product.inStock) onAddToCart(product);
          }}
          title="Ajouter au panier"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0C0C0C" strokeWidth="1.6">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      <div className="product-card-v2-info">
        <div className="product-card-v2-brand">{product.brand}</div>
        <div className="product-card-v2-name">{product.name}</div>
        <div className="product-card-v2-price-row">
          <span className="product-card-v2-price">
            {product.price.toLocaleString("fr-FR")} €
          </span>
          {product.ref && (
            <span className="product-card-v2-ref">Réf. {product.ref}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
