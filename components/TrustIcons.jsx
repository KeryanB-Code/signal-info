// Icônes filaires du bloc de réassurance de la fiche produit.
// Tracé fin volontaire (1.25) pour rester dans le registre du site : pas d'emoji,
// pas d'aplat — la même discrétion que le reste du design system.

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconStar = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z" />
  </svg>
);

export const IconWarranty = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9.5" r="5.5" />
    <path d="M9.8 14.2L8.5 21l3.5-2 3.5 2-1.3-6.8" />
  </svg>
);

export const IconDelivery = (p) => (
  <svg {...base} {...p}>
    <path d="M3 7.5l9-4 9 4-9 4-9-4z" />
    <path d="M3 7.5v9l9 4 9-4v-9" />
    <path d="M12 11.5v9" />
  </svg>
);

// Deux cercles reliés : la monture, clin d'œil au métier.
export const IconGlasses = (p) => (
  <svg {...base} {...p}>
    <circle cx="6.5" cy="14" r="3.5" />
    <circle cx="17.5" cy="14" r="3.5" />
    <path d="M10 14c.7-1 3.3-1 4 0" />
    <path d="M3 14c0-2.5.8-4.5 2-6" />
    <path d="M21 14c0-2.5-.8-4.5-2-6" />
  </svg>
);
