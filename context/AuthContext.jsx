import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { fetchOwnProfile } from "../data/profilesApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = en cours de vérification
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  // Suit la requête la plus récente pour ignorer une réponse en retard
  // (ex: déconnexion + reconnexion rapide avec un autre compte).
  const requestIdRef = useRef(0);

  const loadProfile = useCallback(async (sess) => {
    const requestId = ++requestIdRef.current;
    if (!sess) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    try {
      const data = await fetchOwnProfile(sess.user.id);
      if (requestId !== requestIdRef.current) return; // une requête plus récente a pris le dessus
      setProfile(data);
    } catch (e) {
      console.error("Failed to load profile:", e);
      if (requestId !== requestIdRef.current) return;
      setProfile(null);
    } finally {
      if (requestId === requestIdRef.current) setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadProfile(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      loadProfile(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        role: profile?.role ?? null,
        loading: session === undefined || profileLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
