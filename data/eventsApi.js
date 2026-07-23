import { supabase } from "../lib/supabaseClient.js";
import { getSessionId } from "../utils/sessionId.js";

// Avale les erreurs — le tracking ne doit jamais casser l'UX du site public.
// sessionId a un défaut pour qu'un futur appel qui l'oublierait n'insère pas
// silencieusement session_id: undefined (fausserait les stats "sessions uniques").
export async function logEvent({ type, path = null, productId = null, sessionId = getSessionId() }) {
  const { error } = await supabase
    .from("events")
    .insert({ type, path, product_id: productId, session_id: sessionId });
  if (error) console.error("logEvent failed:", error.message);
}

// sinceDays borne la requête (au lieu de tout rapatrier puis filtrer côté
// client) — un site avec du trafic accumule vite des dizaines de milliers de
// lignes (un événement par pageview/ajout panier/clic paiement), et sans
// filtre on finit par heurter la limite par défaut de PostgREST en silence.
export async function fetchEvents(sinceDays = 30) {
  let query = supabase.from("events").select("*").order("created_at", { ascending: false }).limit(5000);
  if (sinceDays > 0) {
    const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();
    query = query.gte("created_at", since);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
