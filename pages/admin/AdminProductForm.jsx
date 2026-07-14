import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext.jsx";
import { createProduct, updateProduct, uploadProductImage } from "../../data/productsApi.js";

const CATEGORIES = ["optique", "soleil"];
const GENDERS = ["homme", "femme", "mixte"];
const STYLES = ["minimaliste", "classique", "statement", "sport-chic", "prestige"];

const EMPTY_FORM = {
  id: "",
  brand: "",
  name: "",
  ref: "",
  subtitle: "",
  price: "",
  category: "optique",
  gender: "mixte",
  style: "classique",
  materials: "",
  colors: "",
  tags: "",
  description: "",
  rating: "0",
  reviewCount: "0",
  inStock: true,
  new: false,
  correction: false,
  images: [],
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function productToForm(p) {
  return {
    id: p.id,
    brand: p.brand || "",
    name: p.name || "",
    ref: p.ref || "",
    subtitle: p.subtitle || "",
    price: String(p.price ?? ""),
    category: p.category || "optique",
    gender: p.gender || "mixte",
    style: p.style || "classique",
    materials: (p.materials || []).join(", "),
    colors: (p.colors || []).join(", "),
    tags: (p.tags || []).join(", "),
    description: p.description || "",
    rating: String(p.rating ?? "0"),
    reviewCount: String(p.reviewCount ?? "0"),
    inStock: !!p.inStock,
    new: !!p.new,
    correction: !!p.correction,
    images: p.images || [],
  };
}

export default function AdminProductForm() {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const { products, loading, reload, BRANDS } = useProducts();
  const isEdit = Boolean(routeId);

  const [form, setForm] = useState(EMPTY_FORM);
  const [idTouched, setIdTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isEdit || loading) return;
    const existing = products.find((p) => p.id === routeId);
    if (existing) {
      setForm(productToForm(existing));
      setIdTouched(true);
    } else {
      setNotFound(true);
    }
  }, [isEdit, loading, products, routeId]);

  const handleField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleNameChange = (value) => {
    handleField("name", value);
    if (!isEdit && !idTouched) {
      handleField("id", slugify(`${form.brand} ${value}`));
    }
  };

  const handleBrandChange = (value) => {
    handleField("brand", value);
    if (!isEdit && !idTouched) {
      handleField("id", slugify(`${value} ${form.name}`));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (!form.id) {
      alert("Renseigne d'abord la marque et le nom (ou l'identifiant) avant d'ajouter des photos.");
      return;
    }
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadProductImage(file, form.id)));
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    } catch (err) {
      alert("Erreur lors de l'upload : " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (url) => {
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  };

  const validate = () => {
    const errs = {};
    if (!form.id.trim()) errs.id = "Identifiant requis.";
    if (!form.brand.trim()) errs.brand = "Marque requise.";
    if (!form.name.trim()) errs.name = "Nom requis.";
    if (!form.price || Number(form.price) <= 0) errs.price = "Prix requis.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const product = {
      id: form.id.trim(),
      brand: form.brand.trim(),
      name: form.name.trim(),
      ref: form.ref.trim(),
      subtitle: form.subtitle.trim(),
      price: Number(form.price),
      category: form.category,
      gender: form.gender,
      style: form.style,
      materials: form.materials.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      description: form.description,
      rating: Number(form.rating) || 0,
      reviewCount: Number(form.reviewCount) || 0,
      inStock: form.inStock,
      new: form.new,
      correction: form.correction,
      images: form.images,
    };
    try {
      if (isEdit) await updateProduct(routeId, product);
      else await createProduct(product);
      await reload();
      navigate("/admin/products");
    } catch (err) {
      alert("Erreur lors de l'enregistrement : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && loading) return <p style={{ color: "var(--gray)" }}>Chargement…</p>;
  if (notFound) return <p style={{ color: "var(--gray)" }}>Produit introuvable.</p>;

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: 24 }}>
        {isEdit ? `Éditer — ${form.name || form.id}` : "Nouveau produit"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Marque</label>
            <input
              className="input"
              list="brand-list"
              value={form.brand}
              onChange={(e) => handleBrandChange(e.target.value)}
            />
            <datalist id="brand-list">
              {BRANDS.map((b) => <option key={b} value={b} />)}
            </datalist>
            {errors.brand && <div className="form-error">{errors.brand}</div>}
          </div>
          <div className="form-group">
            <label>Identifiant (slug)</label>
            <input
              className="input"
              value={form.id}
              disabled={isEdit}
              onChange={(e) => { setIdTouched(true); handleField("id", slugify(e.target.value)); }}
            />
            {errors.id && <div className="form-error">{errors.id}</div>}
          </div>
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input className="input" value={form.name} onChange={(e) => handleNameChange(e.target.value)} />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Référence</label>
            <input className="input" value={form.ref} onChange={(e) => handleField("ref", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Prix (€)</label>
            <input className="input" type="number" value={form.price} onChange={(e) => handleField("price", e.target.value)} />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </div>
        </div>

        <div className="form-group">
          <label>Sous-titre</label>
          <input className="input" value={form.subtitle} onChange={(e) => handleField("subtitle", e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Catégorie</label>
            <select className="input" value={form.category} onChange={(e) => handleField("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select className="input" value={form.gender} onChange={(e) => handleField("gender", e.target.value)}>
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Style</label>
          <select className="input" value={form.style} onChange={(e) => handleField("style", e.target.value)}>
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Matériaux (séparés par des virgules)</label>
          <input className="input" value={form.materials} onChange={(e) => handleField("materials", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Coloris (séparés par des virgules)</label>
          <input className="input" value={form.colors} onChange={(e) => handleField("colors", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tags (séparés par des virgules)</label>
          <input className="input" value={form.tags} onChange={(e) => handleField("tags", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="input" value={form.description} onChange={(e) => handleField("description", e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Note (0-5)</label>
            <input className="input" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => handleField("rating", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nombre d'avis</label>
            <input className="input" type="number" min="0" value={form.reviewCount} onChange={(e) => handleField("reviewCount", e.target.value)} />
          </div>
        </div>

        <label className="form-check">
          <input type="checkbox" checked={form.inStock} onChange={(e) => handleField("inStock", e.target.checked)} />
          En stock
        </label>
        <label className="form-check">
          <input type="checkbox" checked={form.new} onChange={(e) => handleField("new", e.target.checked)} />
          Nouveauté
        </label>
        <label className="form-check">
          <input type="checkbox" checked={form.correction} onChange={(e) => handleField("correction", e.target.checked)} />
          Verres correcteurs disponibles
        </label>

        <div className="form-group" style={{ marginTop: 8 }}>
          <label>Photos</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading || !form.id} />
          {!form.id && <p style={{ fontSize: "0.75rem", color: "var(--gray)", marginTop: 4 }}>Renseigne la marque et le nom d'abord.</p>}
          {uploading && <p style={{ fontSize: "0.75rem", color: "var(--gray)", marginTop: 4 }}>Envoi en cours…</p>}
          <div className="admin-image-grid">
            {form.images.map((url) => (
              <div key={url} className="admin-image-thumb">
                <img src={url} alt="" />
                <div className="admin-image-remove" onClick={() => removeImage(url)}>×</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button type="button" className="btn btn-outline" onClick={() => navigate("/admin/products")} disabled={saving}>
            Annuler
          </button>
          <button type="submit" className="btn btn-dark" disabled={saving}>
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer le produit"}
          </button>
        </div>
      </form>
    </div>
  );
}
