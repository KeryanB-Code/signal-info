import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../data/productsApi.js";
import { BRANDS, PRODUCTS } from "../data/products.js";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setOffline(false);
      setError(null);
    } catch (e) {
      // Supabase injoignable (projet en pause, coupure réseau, clé absente) :
      // on sert le catalogue statique d'origine plutôt qu'une page d'erreur.
      // Un site vitrine vide est pire qu'un catalogue légèrement daté — et une
      // démo client ne doit jamais dépendre de la disponibilité du back-office.
      // `offline` reste vrai pour que l'admin sache que l'édition est morte.
      console.warn("Catalogue Supabase injoignable, repli sur le catalogue local :", e.message);
      setProducts(PRODUCTS);
      setOffline(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, offline, reload, BRANDS }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
