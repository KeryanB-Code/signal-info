const LIFESTYLE_FEMME = [
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1530785602389-07594beba8d4?auto=format&fit=crop&w=700&h=880&q=85",
];

const LIFESTYLE_HOMME = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=700&h=880&q=85",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=700&h=880&q=85",
];

export function getLifestylePhoto(product) {
  const pool = product.gender === "homme" ? LIFESTYLE_HOMME : LIFESTYLE_FEMME;
  const hash = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[hash % pool.length];
}
