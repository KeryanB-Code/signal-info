/**
 * One-off migration: pushes the hardcoded PRODUCTS from data/products.js
 * into the Supabase `products` table using the service-role key (bypasses RLS).
 * Idempotent (upsert on id) — safe to re-run.
 * Run once: node --env-file=.env.local scripts/migrate-products.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { PRODUCTS } from "../data/products.js";
import { productToRow } from "../data/productMapper.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  console.error("Run with: node --env-file=.env.local scripts/migrate-products.mjs");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const rows = PRODUCTS.map(productToRow);
const { data, error } = await supabase.from("products").upsert(rows, { onConflict: "id" }).select();

if (error) {
  console.error("Migration failed:", error);
  process.exit(1);
}

console.log(`Migrated ${data.length} products.`);
