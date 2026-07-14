import { createClient } from "@supabase/supabase-js";
import { ROLES, GRANT_MATRIX } from "../data/roles.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: "Server misconfigured" });

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing bearer token" });

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1. Vérifie l'identité de l'appelant à partir de son propre token.
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData?.user) return res.status(401).json({ error: "Invalid session" });
  const caller = userData.user;

  // 2. Récupère le rôle de l'appelant (lecture safe : identité déjà vérifiée à l'étape 1).
  const { data: callerProfile } = await admin.from("profiles").select("role").eq("id", caller.id).maybeSingle();
  const allowedRoles = callerProfile && GRANT_MATRIX[callerProfile.role];
  if (!allowedRoles) return res.status(403).json({ error: "Not authorized to create accounts" });

  // 3. Valide le payload.
  const { email, password, fullName, role } = req.body || {};
  if (!email || !password || !role) {
    return res.status(400).json({ error: "email, password and role are required" });
  }
  if (!ROLES.includes(role)) return res.status(400).json({ error: "Invalid role" });
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: `${callerProfile.role} cannot create ${role} accounts` });
  }
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });

  // 4. Crée l'utilisateur Auth.
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created?.user) {
    return res.status(400).json({ error: createError?.message || "Could not create user" });
  }

  // 5. Insère la ligne profil. En cas d'échec, on compense en supprimant le
  //    compte Auth créé pour éviter un compte orphelin sans profil (Auth et
  //    Postgres sont deux systèmes séparés, pas de transaction atomique
  //    possible entre les deux — c'est le correctif le plus proche).
  const { error: insertError } = await admin
    .from("profiles")
    .insert({ id: created.user.id, email, full_name: fullName || null, role });

  if (insertError) {
    await admin.auth.admin.deleteUser(created.user.id).catch(() => {});
    return res.status(500).json({ error: "Failed to create profile: " + insertError.message });
  }

  return res.status(200).json({ id: created.user.id, email, role, fullName: fullName || null });
}
