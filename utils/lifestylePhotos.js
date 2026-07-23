const LIFESTYLE_FEMME = [
  "/images/lifestyle-femme-1.png",
  "/images/lifestyle-femme-2.png",
  "/images/lifestyle-femme-3.png",
  "/images/lifestyle-femme-4.png",
  "/images/lifestyle-femme-5.png",
  "/images/cat-femme-2.png",
];

const LIFESTYLE_HOMME = [
  "/images/lifestyle-homme-1.png",
  "/images/lifestyle-homme-2.png",
  "/images/lifestyle-homme-3.png",
  "/images/lifestyle-homme-4.png",
  "/images/lifestyle-homme-5.png",
  "/images/lifestyle-homme-6.png",
  "/images/lifestyle-homme-7.png",
  "/images/lifestyle-homme-8.png",
  "/images/cat-homme.png",
];

export function getLifestylePhoto(product) {
  const pool = product.gender === "homme" ? LIFESTYLE_HOMME : LIFESTYLE_FEMME;
  const hash = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[hash % pool.length];
}
