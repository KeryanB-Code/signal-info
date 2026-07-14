// Icônes ligne fine (SVG inline, pas de librairie) — cohérentes avec
// l'esthétique épurée du site (traits fins, pas de remplissage).
const base = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconHome = (p) => (
  <svg {...base} {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>
);
export const IconExternal = (p) => (
  <svg {...base} {...p}><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></svg>
);
export const IconBox = (p) => (
  <svg {...base} {...p}><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>
);
export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconBug = (p) => (
  <svg {...base} {...p}><rect x="8" y="7" width="8" height="12" rx="4" /><path d="M8 10H4M20 10h-4M8 15H4M20 15h-4M12 7V4M9 4l1.5 1.5M15 4l-1.5 1.5" /></svg>
);
export const IconChart = (p) => (
  <svg {...base} {...p}><path d="M4 20V10M11 20V4M18 20v-7" /><path d="M2 20h20" /></svg>
);
export const IconKey = (p) => (
  <svg {...base} {...p}><circle cx="8" cy="15" r="4" /><path d="M10.8 12.2 20 3M16 7l2 2M19 4l2 2" /></svg>
);
export const IconLogout = (p) => (
  <svg {...base} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>
);
