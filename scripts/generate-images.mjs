/**
 * Generates luxury SVG product images for Maison Regard eyewear.
 * Each product gets 3 images: worn on face, product on white, detail close-up.
 * Run: node scripts/generate-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/images');
fs.mkdirSync(OUT, { recursive: true });

// ── Color map ──────────────────────────────────────────────────────────────
const COLOR_MAP = {
  'Or': '#C9A84C', 'Or jaune': '#C9A84C', 'Or brossé': '#B8922A',
  'Argent': '#AFAFAF', 'Or rose': '#C4858A',
  'Acier brossé': '#8C8C8C', 'Acier': '#909090',
  'Noir': '#1C1C1E', 'Noir mat': '#262626',
  'Écaille': '#7B4A2D', 'Écaille claire': '#A06040',
  'Havane': '#6B3A2A', 'Havane clair': '#8B5A3A',
  'Bordeaux': '#5C1B2B',
  'Blanc': '#E8E0D5', 'Ivoire': '#EDE5D8',
  'Rose poudré': '#D4A0A8',
  'Gun': '#555560', 'Gunmetal': '#555560', 'Platine': '#D8D6D2',
  'Bleu glacier': '#8AB0C4',
  'Corne brune': '#6B4226', 'Corne brune / Or': '#6B4226',
  'Corne blanche / Or': '#C8B89A',
  'Or / Fumé': '#C9A84C', 'Platine / Gris': '#AFAFAF',
  'Or / Écaille': '#C9A84C', 'Or / Blanc': '#C9A84C', 'Or / Gris': '#C9A84C',
  'Palladium / Noir': '#A0A0A8', 'Noir / Or': '#1C1C1E',
  'Argent / Noir / Bleu': '#AFAFAF',
  'Noir / Écaille': '#1C1C1E', 'Havane clair / Or': '#8B5A3A',
  'Gunmetal / Écaille': '#555560',
  'Noir / Gris': '#1C1C1E',
  'Ink Swirl / Or': '#2C2C40', 'Crystal Clear / Or': '#DDDDE8',
  'Titane / Fumé': '#B0B0B8',
  // New brand colors
  'Argent / Gris': '#AFAFAF', 'Or / Brun': '#C9A84C',
  'Havane / Or': '#6B3A2A', 'Bordeaux / Or': '#5C1B2B',
  'Écaille / Or': '#7B4A2D', 'Or / Rose': '#C9A84C', 'Or / Vert': '#C9A84C',
  'Havane / Noir': '#6B3A2A',
};

function frameColor(colorsArr) {
  for (const c of colorsArr) {
    if (COLOR_MAP[c]) return COLOR_MAP[c];
  }
  return '#1C1C1E';
}

function lensColor(fc) {
  // Slightly transparent tinted lens based on frame color
  const r = parseInt(fc.slice(1,3), 16);
  const g = parseInt(fc.slice(3,5), 16);
  const b = parseInt(fc.slice(5,7), 16);
  return `rgba(${r},${g},${b},0.18)`;
}

// ── Frame SVG shapes ───────────────────────────────────────────────────────
// Viewport: 800 × 600, glasses centered around (400, 300)

function frameRectangularSlim(fc, lc) {
  // Slim metal rectangular — Cartier Santos, YSL M116
  return `
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${fc}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${fc}" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/></filter>
  </defs>
  <!-- Left lens -->
  <rect x="130" y="270" width="210" height="110" rx="6" ry="6" fill="${lc}" stroke="url(#lg)" stroke-width="3.5" filter="url(#sh)"/>
  <!-- Right lens -->
  <rect x="460" y="270" width="210" height="110" rx="6" ry="6" fill="${lc}" stroke="url(#lg)" stroke-width="3.5" filter="url(#sh)"/>
  <!-- Bridge -->
  <rect x="340" y="310" width="120" height="5" rx="2" fill="${fc}"/>
  <!-- Left temple -->
  <line x1="130" y1="310" x2="40" y2="320" stroke="${fc}" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="670" y1="310" x2="760" y2="320" stroke="${fc}" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Nose pads -->
  <ellipse cx="350" cy="318" rx="5" ry="7" fill="${fc}" opacity="0.8"/>
  <ellipse cx="450" cy="318" rx="5" ry="7" fill="${fc}" opacity="0.8"/>
  <!-- Lens reflection -->
  <line x1="155" y1="285" x2="200" y2="282" stroke="white" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round"/>
  <line x1="485" y1="285" x2="530" y2="282" stroke="white" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round"/>`;
}

function frameCatEye(fc, lc) {
  // Cat-eye — Cartier Panthère
  return `
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${fc}"/>
      <stop offset="100%" stop-color="${fc}" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2"/></filter>
  </defs>
  <!-- Left lens (cat-eye shape) -->
  <path d="M 130,310 Q 170,255 265,260 Q 340,263 355,305 Q 355,355 260,358 Q 175,358 130,340 Z"
        fill="${lc}" stroke="url(#lg)" stroke-width="5" stroke-linejoin="round" filter="url(#sh)"/>
  <!-- Right lens -->
  <path d="M 445,305 Q 460,263 535,260 Q 630,255 670,310 Q 670,340 625,358 Q 540,358 445,355 Z"
        fill="${lc}" stroke="url(#lg)" stroke-width="5" stroke-linejoin="round" filter="url(#sh)"/>
  <!-- Bridge -->
  <path d="M 355,305 Q 390,295 445,305" fill="none" stroke="${fc}" stroke-width="4" stroke-linecap="round"/>
  <!-- Left temple -->
  <line x1="132" y1="325" x2="40" y2="340" stroke="${fc}" stroke-width="5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="668" y1="325" x2="760" y2="340" stroke="${fc}" stroke-width="5" stroke-linecap="round"/>
  <!-- Reflection -->
  <line x1="165" y1="278" x2="220" y2="272" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>
  <line x1="475" y1="278" x2="530" y2="272" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>`;
}

function frameRound(fc, lc) {
  // Round — Gucci GG Logo Round
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-opacity="0.18"/></filter>
  </defs>
  <!-- Left lens (circle) -->
  <circle cx="248" cy="308" r="105" fill="${lc}" stroke="${fc}" stroke-width="5" filter="url(#sh)"/>
  <!-- Right lens -->
  <circle cx="552" cy="308" r="105" fill="${lc}" stroke="${fc}" stroke-width="5" filter="url(#sh)"/>
  <!-- Bridge -->
  <path d="M 353,295 Q 400,280 447,295" fill="none" stroke="${fc}" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Left temple -->
  <line x1="144" y1="308" x2="40" y2="320" stroke="${fc}" stroke-width="5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="656" y1="308" x2="760" y2="320" stroke="${fc}" stroke-width="5" stroke-linecap="round"/>
  <!-- Nose pads -->
  <ellipse cx="365" cy="302" rx="5" ry="7" fill="${fc}" opacity="0.7"/>
  <ellipse cx="435" cy="302" rx="5" ry="7" fill="${fc}" opacity="0.7"/>
  <!-- Reflection arc -->
  <path d="M 190,280 Q 215,265 245,278" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.55" stroke-linecap="round"/>
  <path d="M 494,280 Q 519,265 549,278" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

function frameRectGeometric(fc, lc) {
  // Bold geometric rectangle — YSL SL 467, Céline-like
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="6" stdDeviation="9" flood-opacity="0.2"/></filter>
  </defs>
  <!-- Left lens -->
  <rect x="110" y="255" width="240" height="135" rx="3" ry="3" fill="${lc}" stroke="${fc}" stroke-width="6" filter="url(#sh)"/>
  <!-- Right lens -->
  <rect x="450" y="255" width="240" height="135" rx="3" ry="3" fill="${lc}" stroke="${fc}" stroke-width="6" filter="url(#sh)"/>
  <!-- Bridge -->
  <rect x="350" y="303" width="100" height="8" rx="3" fill="${fc}"/>
  <!-- Left temple -->
  <line x1="110" y1="312" x2="30" y2="322" stroke="${fc}" stroke-width="6" stroke-linecap="square"/>
  <!-- Right temple -->
  <line x1="690" y1="312" x2="770" y2="322" stroke="${fc}" stroke-width="6" stroke-linecap="square"/>
  <!-- Reflection -->
  <line x1="135" y1="270" x2="195" y2="267" stroke="white" stroke-width="2" stroke-opacity="0.5"/>
  <line x1="475" y1="270" x2="535" y2="267" stroke="white" stroke-width="2" stroke-opacity="0.5"/>`;
}

function frameButterfly(fc, lc) {
  // Butterfly/oversized — Miu Miu MU 01VV
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.22"/></filter>
  </defs>
  <!-- Left lens (butterfly: wide top, narrowing slightly to inner) -->
  <path d="M 80,275 Q 130,235 250,245 Q 340,252 360,300 Q 350,360 250,365 Q 140,368 80,340 Z"
        fill="${lc}" stroke="${fc}" stroke-width="5.5" filter="url(#sh)"/>
  <!-- Right lens -->
  <path d="M 440,300 Q 460,252 550,245 Q 670,235 720,275 Q 720,340 660,365 Q 550,368 440,360 Z"
        fill="${lc}" stroke="${fc}" stroke-width="5.5" filter="url(#sh)"/>
  <!-- Bridge -->
  <path d="M 360,300 Q 400,288 440,300" fill="none" stroke="${fc}" stroke-width="4" stroke-linecap="round"/>
  <!-- Left temple -->
  <line x1="82" y1="308" x2="20" y2="325" stroke="${fc}" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="718" y1="308" x2="780" y2="325" stroke="${fc}" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Decorative hinge detail -->
  <circle cx="82" cy="308" r="6" fill="${fc}"/>
  <circle cx="718" cy="308" r="6" fill="${fc}"/>
  <!-- Reflection -->
  <line x1="115" y1="258" x2="175" y2="252" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>
  <line x1="470" y1="258" x2="530" y2="252" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>`;
}

function frameOvalMinimal(fc, lc) {
  // Slim oval — John Dalia, Gucci GG1158S
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.14"/></filter>
  </defs>
  <!-- Left lens -->
  <ellipse cx="248" cy="308" rx="115" ry="75" fill="${lc}" stroke="${fc}" stroke-width="3" filter="url(#sh)"/>
  <!-- Right lens -->
  <ellipse cx="552" cy="308" rx="115" ry="75" fill="${lc}" stroke="${fc}" stroke-width="3" filter="url(#sh)"/>
  <!-- Bridge (thin) -->
  <path d="M 363,298 Q 400,288 437,298" fill="none" stroke="${fc}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Left temple (thin) -->
  <line x1="133" y1="305" x2="40" y2="315" stroke="${fc}" stroke-width="3" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="667" y1="305" x2="760" y2="315" stroke="${fc}" stroke-width="3" stroke-linecap="round"/>
  <!-- Nose pads -->
  <ellipse cx="372" cy="300" rx="3.5" ry="5" fill="${fc}" opacity="0.6"/>
  <ellipse cx="428" cy="300" rx="3.5" ry="5" fill="${fc}" opacity="0.6"/>
  <!-- Reflection -->
  <line x1="175" y1="285" x2="215" y2="280" stroke="white" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round"/>
  <line x1="479" y1="285" x2="519" y2="280" stroke="white" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round"/>`;
}

function frameDoubleBridge(fc, lc) {
  // Aviator / double bridge — Cartier C Décor
  return `
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${fc}"/>
      <stop offset="100%" stop-color="${fc}" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-opacity="0.18"/></filter>
  </defs>
  <!-- Left lens (teardrop aviator) -->
  <path d="M 148,270 Q 240,240 340,280 Q 355,310 340,345 Q 270,390 180,380 Q 120,360 120,320 Q 120,290 148,270 Z"
        fill="${lc}" stroke="url(#lg)" stroke-width="3" filter="url(#sh)"/>
  <!-- Right lens -->
  <path d="M 460,280 Q 560,240 652,270 Q 680,290 680,320 Q 680,360 620,380 Q 530,390 460,345 Q 445,310 460,280 Z"
        fill="${lc}" stroke="url(#lg)" stroke-width="3" filter="url(#sh)"/>
  <!-- Double bridge top -->
  <path d="M 340,278 Q 400,265 460,278" fill="none" stroke="${fc}" stroke-width="3" stroke-linecap="round"/>
  <!-- Double bridge bottom -->
  <path d="M 342,295 Q 400,283 458,295" fill="none" stroke="${fc}" stroke-width="2" stroke-linecap="round"/>
  <!-- Left temple -->
  <line x1="125" y1="315" x2="35" y2="330" stroke="${fc}" stroke-width="4" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="675" y1="315" x2="765" y2="330" stroke="${fc}" stroke-width="4" stroke-linecap="round"/>
  <!-- Reflection -->
  <line x1="165" y1="265" x2="215" y2="258" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>
  <line x1="480" y1="258" x2="530" y2="265" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

function frameSportShield(fc, lc) {
  // Sport shield — Fred B1 W.M
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2"/></filter>
  </defs>
  <!-- Single shield lens -->
  <path d="M 90,270 Q 200,240 400,242 Q 600,240 710,270 Q 730,300 710,350 Q 600,390 400,392 Q 200,390 90,350 Q 70,300 90,270 Z"
        fill="${lc}" stroke="${fc}" stroke-width="5" filter="url(#sh)"/>
  <!-- Center divider (nose bridge integrated) -->
  <path d="M 370,242 Q 400,280 370,360" fill="none" stroke="${fc}" stroke-width="3" opacity="0.4"/>
  <path d="M 430,242 Q 400,280 430,360" fill="none" stroke="${fc}" stroke-width="3" opacity="0.4"/>
  <!-- Left temple -->
  <line x1="93" y1="305" x2="25" y2="320" stroke="${fc}" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="707" y1="305" x2="775" y2="320" stroke="${fc}" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Cable detail (Fred signature) -->
  <path d="M 93,295 Q 70,300 60,315" fill="none" stroke="${fc}" stroke-width="2" stroke-dasharray="3,2" opacity="0.6"/>
  <!-- Reflection sweep -->
  <path d="M 130,265 Q 250,253 400,256 Q 550,253 670,265" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.4" stroke-linecap="round"/>`;
}

function frameMarine(fc, lc) {
  // Fred Force 10 — rectangular with cable detail
  return `
  <defs>
    <filter id="sh"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-opacity="0.17"/></filter>
  </defs>
  <!-- Left lens -->
  <rect x="115" y="260" width="225" height="120" rx="12" ry="12" fill="${lc}" stroke="${fc}" stroke-width="4.5" filter="url(#sh)"/>
  <!-- Right lens -->
  <rect x="460" y="260" width="225" height="120" rx="12" ry="12" fill="${lc}" stroke="${fc}" stroke-width="4.5" filter="url(#sh)"/>
  <!-- Bridge -->
  <rect x="340" y="306" width="120" height="8" rx="4" fill="${fc}"/>
  <!-- Left temple with cable wire detail -->
  <line x1="115" y1="315" x2="35" y2="325" stroke="${fc}" stroke-width="4.5" stroke-linecap="round"/>
  <line x1="100" y1="308" x2="35" y2="316" stroke="${fc}" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round" stroke-dasharray="4,3"/>
  <!-- Right temple -->
  <line x1="685" y1="315" x2="765" y2="325" stroke="${fc}" stroke-width="4.5" stroke-linecap="round"/>
  <line x1="700" y1="308" x2="765" y2="316" stroke="${fc}" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round" stroke-dasharray="4,3"/>
  <!-- Reflection -->
  <line x1="140" y1="276" x2="195" y2="273" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>
  <line x1="485" y1="276" x2="540" y2="273" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

function frameSquareThick(fc, lc) {
  // John Dalia Project 01 — épais acétate 8mm, charnière titane visible
  return `
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${fc}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${fc}" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.22"/></filter>
  </defs>
  <!-- Left lens (square thick) -->
  <rect x="118" y="255" width="220" height="175" rx="4" ry="4" fill="${lc}" stroke="url(#lg)" stroke-width="13" filter="url(#sh)"/>
  <!-- Right lens -->
  <rect x="462" y="255" width="220" height="175" rx="4" ry="4" fill="${lc}" stroke="url(#lg)" stroke-width="13" filter="url(#sh)"/>
  <!-- Bridge (slim) -->
  <rect x="338" y="326" width="124" height="10" rx="4" fill="${fc}" opacity="0.9"/>
  <!-- Charnière titane gauche (barre métallique) -->
  <rect x="107" y="330" width="22" height="8" rx="2" fill="#B0B0B8" opacity="0.95"/>
  <!-- Charnière titane droite -->
  <rect x="671" y="330" width="22" height="8" rx="2" fill="#B0B0B8" opacity="0.95"/>
  <!-- Left temple -->
  <line x1="119" y1="338" x2="35" y2="348" stroke="${fc}" stroke-width="11" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="681" y1="338" x2="765" y2="348" stroke="${fc}" stroke-width="11" stroke-linecap="round"/>
  <!-- Lens reflection -->
  <line x1="146" y1="272" x2="205" y2="269" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>
  <line x1="490" y1="272" x2="549" y2="269" stroke="white" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>`;
}

function frameMachBrow(fc, lc) {
  // Dita Mach-Six — titanium aérospatial, double barre de sourcil, vis hexagonales
  return `
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${fc}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${fc}" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="sh"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-opacity="0.14"/></filter>
  </defs>
  <!-- Left lens (rectangular narrow) -->
  <rect x="125" y="278" width="215" height="95" rx="3" ry="3" fill="${lc}" stroke="url(#lg)" stroke-width="2.5" filter="url(#sh)"/>
  <!-- Right lens -->
  <rect x="460" y="278" width="215" height="95" rx="3" ry="3" fill="${lc}" stroke="url(#lg)" stroke-width="2.5" filter="url(#sh)"/>
  <!-- Double brow bar top gauche -->
  <rect x="125" y="262" width="215" height="5" rx="2" fill="${fc}"/>
  <!-- Double brow bar top droit -->
  <rect x="460" y="262" width="215" height="5" rx="2" fill="${fc}"/>
  <!-- Double brow bar secondaire (légèrement en dessous) -->
  <rect x="125" y="271" width="215" height="3" rx="1" fill="${fc}" opacity="0.55"/>
  <rect x="460" y="271" width="215" height="3" rx="1" fill="${fc}" opacity="0.55"/>
  <!-- Bridge fin -->
  <rect x="340" y="292" width="120" height="4" rx="2" fill="${fc}"/>
  <!-- Vis hexagonales gauche (jonction charnière) -->
  <polygon points="128,278 136,273 144,278 144,287 136,292 128,287" fill="none" stroke="${fc}" stroke-width="1.5"/>
  <circle cx="136" cy="283" r="2" fill="${fc}"/>
  <!-- Vis hexagonales droit -->
  <polygon points="656,278 664,273 672,278 672,287 664,292 656,287" fill="none" stroke="${fc}" stroke-width="1.5"/>
  <circle cx="664" cy="283" r="2" fill="${fc}"/>
  <!-- Left temple (très fin) -->
  <line x1="127" y1="320" x2="38" y2="330" stroke="${fc}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Right temple -->
  <line x1="673" y1="320" x2="762" y2="330" stroke="${fc}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Nose pads precision -->
  <ellipse cx="350" cy="302" rx="4" ry="6" fill="${fc}" opacity="0.7"/>
  <ellipse cx="450" cy="302" rx="4" ry="6" fill="${fc}" opacity="0.7"/>
  <!-- Reflection -->
  <line x1="150" y1="288" x2="198" y2="285" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>
  <line x1="485" y1="288" x2="533" y2="285" stroke="white" stroke-width="1.5" stroke-opacity="0.55" stroke-linecap="round"/>`;
}

const FRAME_RENDERERS = {
  'rectangular-slim': frameRectangularSlim,
  'cat-eye': frameCatEye,
  'round': frameRound,
  'rectangular-geo': frameRectGeometric,
  'butterfly': frameButterfly,
  'oval-minimal': frameOvalMinimal,
  'double-bridge': frameDoubleBridge,
  'sport-shield': frameSportShield,
  'marine': frameMarine,
  'square-thick': frameSquareThick,
  'mach-brow': frameMachBrow,
};

// ── Product definitions ────────────────────────────────────────────────────
const PRODUCTS = [
  // Cartier
  { id: 'cartier-premiere-ct0362s', frame: 'rectangular-slim', colors: ['Corne brune / Or'],   brand: 'CARTIER',         name: 'Première de Cartier' },
  { id: 'cartier-c-decor-ct0330s',  frame: 'rectangular-slim', colors: ['Or'],                  brand: 'CARTIER',         name: 'C Décor CT0330S' },
  { id: 'cartier-signature-ct0012s',frame: 'double-bridge',    colors: ['Or'],                  brand: 'CARTIER',         name: 'Signature C CT0012S' },
  { id: 'cartier-ct0046s',          frame: 'rectangular-slim', colors: ['Or'],                  brand: 'CARTIER',         name: 'CT0046S' },
  // Louis Vuitton
  { id: 'lv-discovery-z1531u',      frame: 'sport-shield',     colors: ['Or / Fumé'],           brand: 'LOUIS VUITTON',   name: 'LV Discovery PM' },
  { id: 'lv-rise-z1623u',           frame: 'rectangular-slim', colors: ['Or / Gris'],           brand: 'LOUIS VUITTON',   name: 'LV Rise' },
  // Chopard
  { id: 'chopard-sch349s',          frame: 'oval-minimal',     colors: ['Or'],                  brand: 'CHOPARD',         name: 'Imperiale' },
  { id: 'chopard-sch318s',          frame: 'rectangular-slim', colors: ['Or / Fumé'],           brand: 'CHOPARD',         name: 'Classic SCH318S' },
  // Fred
  { id: 'fred-force10-fg40023u16a',    frame: 'marine',        colors: ['Acier brossé', 'Noir'], brand: 'FRED',           name: 'Force 10' },
  { id: 'fred-force10-round-fg40028u01a', frame: 'round',      colors: ['Noir'],                brand: 'FRED',            name: 'Force 10 Round' },
  { id: 'fred-force10-geo-fg40040u16v',   frame: 'rectangular-geo', colors: ['Argent'],         brand: 'FRED',            name: 'Force 10 Geometric' },
  // Dita
  { id: 'dita-mach-six',            frame: 'mach-brow',        colors: ['Or'],                  brand: 'DITA',            name: 'Mach-Six' },
  { id: 'dita-grand-apx',           frame: 'butterfly',        colors: ['Noir'],                brand: 'DITA',            name: 'Grand-APX' },
  { id: 'dita-mach-one-s',          frame: 'sport-shield',     colors: ['Platine'],             brand: 'DITA',            name: 'Mach-One-S' },
  // John Dalia
  { id: 'john-dalia-project01-c603', frame: 'square-thick',   colors: ['Noir'],                brand: 'JOHN DALIA',      name: 'Project 01 C603' },
  { id: 'john-dalia-project01-c621', frame: 'square-thick',   colors: ['Havane'],              brand: 'JOHN DALIA',      name: 'Project 01 C621' },
  { id: 'john-dalia-kai-c432',       frame: 'rectangular-slim', colors: ['Gun'],               brand: 'JOHN DALIA',      name: 'Kaï C432' },
  // Tom Ford
  { id: 'tom-ford-colette-ft0833',  frame: 'butterfly',        colors: ['Havane clair'],        brand: 'TOM FORD',        name: 'Colette' },
  { id: 'tom-ford-buckley-ft0778',  frame: 'rectangular-geo',  colors: ['Noir / Gris'],         brand: 'TOM FORD',        name: 'Buckley' },
  // Prada
  { id: 'prada-symbole-pr17ws',     frame: 'cat-eye',          colors: ['Or / Fumé'],           brand: 'PRADA',           name: 'Symbole PR 17WS' },
  { id: 'prada-pr08ys',             frame: 'rectangular-slim', colors: ['Noir'],                brand: 'PRADA',           name: 'Runway PR 08YS' },
  // Bottega Veneta
  { id: 'bottega-bv1224s',          frame: 'rectangular-slim', colors: ['Or / Fumé'],           brand: 'BOTTEGA VENETA',  name: 'Angle BV1224S' },
  { id: 'bottega-bv1033o',          frame: 'oval-minimal',     colors: ['Havane'],              brand: 'BOTTEGA VENETA',  name: 'Oval BV1033O' },
  // Fendi
  { id: 'fendi-fe40077u',           frame: 'rectangular-slim', colors: ['Noir / Or'],           brand: 'FENDI',           name: 'FF Lettering' },
  { id: 'fendi-fe40040u',           frame: 'butterfly',        colors: ['Havane clair / Or'],   brand: 'FENDI',           name: 'First' },
  // Céline
  { id: 'celine-cl40195u',          frame: 'rectangular-geo',  colors: ['Noir'],                brand: 'CÉLINE',          name: 'Triomphe' },
  { id: 'celine-cl40198u',          frame: 'cat-eye',          colors: ['Havane clair / Or'],   brand: 'CÉLINE',          name: 'Cat Eye' },
  // Givenchy
  { id: 'givenchy-gv7201s',         frame: 'rectangular-geo',  colors: ['Noir'],                brand: 'GIVENCHY',        name: 'GV 7201/S' },
  { id: 'givenchy-gv40002u',        frame: 'rectangular-slim', colors: ['Havane'],              brand: 'GIVENCHY',        name: 'GV40002U' },
  // Saint Laurent
  { id: 'saint-laurent-sl573',      frame: 'rectangular-geo',  colors: ['Noir / Gris'],         brand: 'SAINT LAURENT',   name: 'SL 573' },
  { id: 'saint-laurent-slm98',      frame: 'rectangular-slim', colors: ['Écaille'],             brand: 'SAINT LAURENT',   name: 'SL M98' },
  // Miu Miu
  { id: 'miu-miu-mu54ys',           frame: 'butterfly',        colors: ['Noir / Or'],           brand: 'MIU MIU',         name: 'MU 54YS' },
  { id: 'miu-miu-mu04ws',           frame: 'round',            colors: ['Or'],                  brand: 'MIU MIU',         name: 'MU 04WS' },
  // Gucci
  { id: 'gucci-gg1520s',            frame: 'round',            colors: ['Or / Fumé'],           brand: 'GUCCI',           name: 'GG1520S' },
  { id: 'gucci-gg0817s',            frame: 'cat-eye',          colors: ['Havane clair / Or'],   brand: 'GUCCI',           name: 'GG0817S' },
  // Versace
  { id: 'versace-ve2249',           frame: 'rectangular-slim', colors: ['Or / Fumé'],           brand: 'VERSACE',         name: 'Medusa Biggie' },
  { id: 'versace-ve4460',           frame: 'round',            colors: ['Or'],                  brand: 'VERSACE',         name: 'Medusa Round' },
  // Balenciaga
  { id: 'balenciaga-bb0165s',       frame: 'rectangular-geo',  colors: ['Noir / Or'],           brand: 'BALENCIAGA',      name: 'BB0165S' },
  { id: 'balenciaga-bb0011s',       frame: 'oval-minimal',     colors: ['Noir'],                brand: 'BALENCIAGA',      name: 'Extreme Oval' },
  // Burberry
  { id: 'burberry-be4415',          frame: 'rectangular-slim', colors: ['Havane / Or'],         brand: 'BURBERRY',        name: 'B Print' },
  { id: 'burberry-be4394',          frame: 'round',            colors: ['Havane'],              brand: 'BURBERRY',        name: 'Heritage' },
  // Mont Blanc
  { id: 'mont-blanc-mb0025s',       frame: 'oval-minimal',     colors: ['Argent / Gris'],       brand: 'MONT BLANC',      name: 'MB0025S' },
  { id: 'mont-blanc-mb0117s',       frame: 'rectangular-geo',  colors: ['Noir / Gris'],         brand: 'MONT BLANC',      name: 'MB0117S' },
];

// ── SVG generators ─────────────────────────────────────────────────────────

function svgWorn(product, frameRenderer, fc, lc) {
  // Lifestyle shot: dark editorial background, visible face silhouette
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="bg" cx="55%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#1E1610"/>
      <stop offset="100%" stop-color="#080604"/>
    </radialGradient>
    <radialGradient id="glow" cx="58%" cy="28%" r="50%">
      <stop offset="0%" stop-color="#F0D8B0" stop-opacity="0.28"/>
      <stop offset="70%" stop-color="#C09050" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#080604" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="skinGrad" cx="55%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#E8C888"/>
      <stop offset="50%" stop-color="#C89050"/>
      <stop offset="100%" stop-color="#986828"/>
    </radialGradient>
    <filter id="faceSoft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <ellipse cx="440" cy="180" rx="380" ry="280" fill="url(#glow)"/>
  <!-- Shoulders -->
  <path d="M 80,540 Q 220,470 400,482 Q 580,470 720,540 L 720,600 L 80,600 Z" fill="#100C08"/>
  <!-- Neck -->
  <rect x="358" y="350" width="84" height="110" rx="42" fill="#C09050" filter="url(#faceSoft)" opacity="0.7"/>
  <!-- Face -->
  <ellipse cx="400" cy="250" rx="155" ry="190" fill="url(#skinGrad)" filter="url(#faceSoft)" opacity="0.75"/>
  <!-- Shadow side -->
  <ellipse cx="400" cy="250" rx="155" ry="190" fill="#080604" opacity="0.35" style="transform-origin: left center"/>
  <!-- Hair top -->
  <path d="M 250,180 Q 235,80 400,60 Q 565,80 550,180 Q 520,100 480,80 Q 440,65 400,62 Q 360,65 320,80 Q 276,100 250,180 Z" fill="#0C0906"/>
  <!-- Hair sides -->
  <path d="M 248,232 Q 218,175 232,110 Q 254,60 400,60 Q 330,72 294,108 Q 248,156 248,232 Z" fill="#0A0806"/>
  <path d="M 552,232 Q 582,175 568,110 Q 546,60 400,60 Q 470,72 506,108 Q 552,156 552,232 Z" fill="#0A0806"/>
  <!-- Glasses positioned at eye level -->
  <g transform="translate(0, -20)">${frameRenderer(fc, lc)}</g>
</svg>`;
}

function svgProduct(product, frameRenderer, fc, lc) {
  // Product shot: clean pure white background, glasses fill frame
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F4F4F2"/>
    </radialGradient>
    <radialGradient id="shadow" cx="50%" cy="82%" r="38%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <!-- Ground shadow -->
  <ellipse cx="400" cy="390" rx="260" ry="18" fill="url(#shadow)"/>
  <!-- Glasses — scaled 1.5x from center to fill frame -->
  <g transform="translate(400,295) scale(1.5) translate(-400,-295)">
    ${frameRenderer(fc, lc)}
  </g>
</svg>`;
}

function svgDetail(product, frameRenderer, fc, lc) {
  // Detail shot: dark luxury background, zoomed frame
  const serif = 'Garamond, Georgia, serif';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="bg" cx="35%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#2A2520"/>
      <stop offset="100%" stop-color="#1A1614"/>
    </radialGradient>
    <radialGradient id="glow" cx="40%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#C4A882" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#C4A882" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <ellipse cx="340" cy="290" rx="320" ry="260" fill="url(#glow)"/>
  <!-- Glasses, slightly larger (scale 1.15 from center) -->
  <g transform="translate(400,300) scale(1.18) translate(-400,-300)">${frameRenderer(fc, lc)}</g>
  <!-- Brand signature bottom right -->
  <text x="740" y="576" text-anchor="end" font-family="${serif}" font-size="10" letter-spacing="0.35em" fill="#C4A882" opacity="0.6" font-weight="300">${product.brand}</text>
</svg>`;
}

// ── Generate all images ────────────────────────────────────────────────────
let count = 0;
for (const p of PRODUCTS) {
  const renderer = FRAME_RENDERERS[p.frame];
  if (!renderer) { console.warn(`No renderer for ${p.frame}`); continue; }
  const fc = frameColor(p.colors);
  const lc = lensColor(fc);

  const files = [
    [`${p.id}-1.svg`, svgWorn(p, renderer, fc, lc)],
    [`${p.id}-2.svg`, svgProduct(p, renderer, fc, lc)],
    [`${p.id}-3.svg`, svgDetail(p, renderer, fc, lc)],
  ];

  for (const [fname, content] of files) {
    fs.writeFileSync(path.join(OUT, fname), content, 'utf8');
    count++;
  }
  console.log(`✓ ${p.id} (${p.frame}, ${fc})`);
}

console.log(`\n✅ Generated ${count} SVG images in public/images/`);
