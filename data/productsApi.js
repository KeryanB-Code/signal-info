import { supabase } from "../lib/supabaseClient.js";
import { rowToProduct, productToRow } from "./productMapper.js";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data.map(rowToProduct);
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToProduct(data) : null;
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(productToRow(product))
    .select()
    .single();
  if (error) throw error;
  return rowToProduct(data);
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(productToRow(product))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return rowToProduct(data);
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file, productId) {
  const path = `${productId}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
