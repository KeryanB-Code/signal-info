// Pure mapping functions between the DB row shape (snake_case, is_new) and
// the front-end product shape (camelCase, new) already used across every page.
// No Supabase/browser import here on purpose: this file is shared by the
// browser data-access layer (data/productsApi.js) AND the Node migration
// script (scripts/migrate-products.mjs), which cannot use import.meta.env.

export function rowToProduct(row) {
  return {
    id: row.id,
    brand: row.brand,
    name: row.name,
    ref: row.ref,
    subtitle: row.subtitle,
    price: row.price,
    category: row.category,
    gender: row.gender,
    style: row.style,
    materials: row.materials || [],
    colors: row.colors || [],
    description: row.description,
    images: row.images || [],
    rating: row.rating != null ? Number(row.rating) : 0,
    reviewCount: row.review_count || 0,
    inStock: row.in_stock,
    new: row.is_new,
    correction: row.correction,
    tags: row.tags || [],
  };
}

export function productToRow(product) {
  return {
    id: product.id,
    brand: product.brand,
    name: product.name,
    ref: product.ref,
    subtitle: product.subtitle,
    price: product.price,
    category: product.category,
    gender: product.gender,
    style: product.style,
    materials: product.materials || [],
    colors: product.colors || [],
    description: product.description,
    images: product.images || [],
    rating: product.rating || 0,
    review_count: product.reviewCount || 0,
    in_stock: product.inStock,
    is_new: product.new,
    correction: product.correction,
    tags: product.tags || [],
  };
}
