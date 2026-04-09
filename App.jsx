import { useState, useEffect } from "react";

const PIN_CODE = "2101";

// ─── PIN SCREEN ─────────────────────────────────────────────────
function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleDigit = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === PIN_CODE) {
        setTimeout(() => onUnlock(), 200);
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setPin(""); setShake(false); }, 500);
      }
    }
  };

  const handleDelete = () => { setPin(p => p.slice(0, -1)); setError(false); };

  return (
    <div style={{
      minHeight: "100vh", background: "#f7f4ee", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        @keyframes shakeAnim { 0%,100% { transform:translateX(0); } 20%,60% { transform:translateX(-8px); } 40%,80% { transform:translateX(8px); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 36, fontWeight: 900, color: "#1a1814", letterSpacing: "-1px", marginBottom: 6 }}>Signal</h1>
        <p style={{ fontSize: 12, color: "#9c9788", fontWeight: 300, marginBottom: 36 }}>Entrez votre code d'accès</p>

        {/* Dots */}
        <div style={{
          display: "flex", gap: 14, justifyContent: "center", marginBottom: 36,
          animation: shake ? "shakeAnim 0.4s ease" : "none",
        }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: "50%",
              background: i < pin.length ? (error ? "#c0392b" : "#1a1814") : "transparent",
              border: `2px solid ${error ? "#c0392b" : i < pin.length ? "#1a1814" : "#d5d0c7"}`,
              transition: "all 0.15s",
            }} />
          ))}
        </div>

        {/* Keypad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 68px)", gap: 10, justifyContent: "center" }}>
          {[1,2,3,4,5,6,7,8,9,null,0,"del"].map((d, i) => {
            if (d === null) return <div key={i} />;
            const isDel = d === "del";
            return (
              <button key={i} onClick={() => isDel ? handleDelete() : handleDigit(String(d))} style={{
                width: 68, height: 68, borderRadius: "50%", cursor: "pointer",
                background: isDel ? "transparent" : "#ffffff",
                border: isDel ? "none" : "1px solid #e8e4dc",
                boxShadow: isDel ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
                fontSize: isDel ? 18 : 22, fontWeight: isDel ? 300 : 400,
                color: isDel ? "#9c9788" : "#1a1814",
                fontFamily: isDel ? "'DM Sans', sans-serif" : "'Source Serif 4', Georgia, serif",
                transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
                onMouseDown={e => { if (!isDel) e.currentTarget.style.background = "#f0ece4"; }}
                onMouseUp={e => { if (!isDel) e.currentTarget.style.background = "#ffffff"; }}
              >
                {isDel ? "⌫" : d}
              </button>
            );
          })}
        </div>

        {error && <p style={{ marginTop: 20, fontSize: 12, color: "#c0392b", fontWeight: 500 }}>Code incorrect</p>}
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────
const now = Date.now();
const h = 3600000;
const d = 86400000;

const BRIEFING = {
  date: new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  updatedAt: new Date(now - 45 * 60000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
  summary: [
    "Cessez-le-feu de 2 semaines US/Iran annoncé par Trump — 48h données à l'Iran pour rouvrir Ormuz sous menace d'escalade. Le F-35 israélien abat un Yak-130 iranien — premier combat aérien de l'histoire de l'appareil.",
    "Les Kurdes d'Irak ouvrent un second front contre l'Iran. Le Canada n'exclut pas une participation militaire. Belgrade : 300 000 manifestants, record historique pour la Serbie.",
    "France : Retailleau place LFI sous surveillance post-municipales. Lecornu annonce des aides carburant ciblées. L'Assemblée adopte un texte anti-fraudes. Déclaration des revenus ouverte le 9 avril.",
    "Marchés : gérants en réallocation massive — actions à 48% (vs 53%). Notes souveraines FR/US en sursis. SpaceX dépose son IPO. Dette privée : retraits de 22-40% sur certains fonds.",
    "Charles Gave (IDL) : « Retours sur ma carrière et l'histoire financière ». J.-B. Noé analyse la Birmanie et la divergence iranienne.",
  ],
};

const CATEGORIES = [
  { id: "all", label: "Tout", icon: "◉" },
  { id: "politique", label: "Politique", icon: "🏛" },
  { id: "geopolitique", label: "Géopo", icon: "🌍" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "finance", label: "Finance", icon: "📈" },
  { id: "tech", label: "Tech", icon: "⚡" },
  { id: "podcasts", label: "Podcasts", icon: "🎙" },
];

const catColors = { politique: "#2c3e50", geopolitique: "#c0392b", finance: "#8e6f3e", business: "#27ae60", tech: "#6c3483", podcasts: "#d35400" };

const ITEMS = [
  { id: "c1", title: "Cessez-le-feu de 2 semaines US/Iran — Trump donne 48h pour rouvrir Ormuz", source: "@CerfiaFR", category: "geopolitique", type: "twitter", time: now - 2*h, tag: "ALERTE" },
  { id: "c2", title: "Le F-35 israélien abat un Yak-130 iranien au-dessus de Téhéran — 1er combat aérien du F-35", source: "@CerfiaFR", category: "geopolitique", type: "twitter", time: now - 5*h, tag: "FLASH" },
  { id: "c3", title: "Artemis II : 4 astronautes en route vers la Lune — 1ère depuis Apollo 17", source: "@CerfiaFR", category: "tech", type: "twitter", time: now - 8*h },
  { id: "c4", title: "Trump suspend les accords commerciaux avec l'Espagne", source: "@CerfiaFR", category: "geopolitique", type: "twitter", time: now - 12*h },
  { id: "c5", title: "Carney (Canada) n'exclut pas une participation militaire au Moyen-Orient", source: "@CerfiaFR", category: "geopolitique", type: "twitter", time: now - 14*h },
  { id: "c6", title: "TGV percute un convoi militaire — conducteur décédé", source: "@CerfiaFR", category: "politique", type: "twitter", time: now - 20*h },
  { id: "c7", title: "Kurdes d'Irak : offensive contre l'Iran", source: "@CerfiaFR", category: "geopolitique", type: "twitter", time: now - 26*h },
  { id: "a1", title: "Belgrade : +300 000 personnes — record historique Serbie", source: "@idrissaberkane", category: "geopolitique", type: "twitter", time: now - 3*h },
  { id: "a2", title: "Teisseire : survécu aux guerres, pas à la désindustrialisation", source: "@idrissaberkane", category: "business", type: "twitter", time: now - 18*h },
  { id: "e1", title: "SpaceX dépose son dossier d'IPO — devance OpenAI et Anthropic", source: "@elonmusk", category: "finance", type: "twitter", time: now - 4*h, tag: "FLASH" },
  { id: "e2", title: "Grok 3.5 — plus grande fenêtre de contexte IA", source: "@elonmusk", category: "tech", type: "twitter", time: now - 10*h },
  { id: "e3", title: "Tesla Q1 2026 : 530k livraisons, au-dessus des attentes", source: "@elonmusk", category: "finance", type: "twitter", time: now - 24*h },
  { id: "v1", title: "Retailleau place LFI sous surveillance post-municipales", source: "@actuenvif", category: "politique", type: "twitter", time: now - 6*h },
  { id: "v2", title: "Pologne et Roumanie : ~2Md€ à payer à Pfizer", source: "@actuenvif", category: "geopolitique", type: "twitter", time: now - 15*h },
  { id: "v3", title: "Procès Sarkozy (financement libyen) dans l'indifférence", source: "@actuenvif", category: "politique", type: "twitter", time: now - 36*h },
  { id: "g1", title: "Audiovisuel public : Patrier-Leitus et conflits d'intérêts", source: "@GBX_Press", category: "politique", type: "twitter", time: now - 7*h },
  { id: "m1", title: "Sauvetage du pilote US en Iran — les coulisses", source: "@LaMaisonPresse", category: "geopolitique", type: "twitter", time: now - 9*h },
  { id: "m2", title: "Blocage d'Ormuz : déflagration économique mondiale", source: "@LaMaisonPresse", category: "finance", type: "twitter", time: now - 28*h },
  { id: "s1", title: "Budget 2026 : déficit vs services publics", source: "@SirAfuera", category: "politique", type: "twitter", time: now - 11*h },
  { id: "s2", title: "GNL russe → Europe : record T1 2026", source: "@SirAfuera", category: "finance", type: "twitter", time: now - 32*h },
  { id: "idl1", title: "Retours sur ma carrière et l'histoire financière — Charles Gave", source: "Inst. des Libertés", category: "finance", type: "web", time: now - 2*d },
  { id: "idl2", title: "Birmanie : une guerre sans fin — J.-B. Noé", source: "Inst. des Libertés", category: "geopolitique", type: "web", time: now - 6*d },
  { id: "idl3", title: "Comment piller l'État sans risque — Charles Gave", source: "Inst. des Libertés", category: "finance", type: "web", time: now - 9*d },
  { id: "idl4", title: "Iran : divergence en vue — J.-B. Noé", source: "Inst. des Libertés", category: "geopolitique", type: "web", time: now - 13*d },
  { id: "ag1", title: "Dette privée : défauts, fraudes, retraits massifs", source: "L'Agefi", category: "finance", type: "web", time: now - 6*d },
  { id: "ag2", title: "Notes souveraines FR/US en sursis de dégradation", source: "L'Agefi", category: "finance", type: "web", time: now - 8*d },
  { id: "ag3", title: "Réallocation gérants : actions à 48% — obligataire profite", source: "L'Agefi", category: "finance", type: "web", time: now - 3*d },
  { id: "ag4", title: "SpaceX dépose IPO, devance OpenAI et Anthropic", source: "L'Agefi", category: "finance", type: "web", time: now - 5*d },
  { id: "ag5", title: "Microsoft : 1 600 Md¥ au Japon pour infras IA", source: "L'Agefi", category: "tech", type: "web", time: now - 7*d },
  { id: "bfm1", title: "Iran menace d'anéantir Stargate AI à Abu Dhabi (30Md$)", source: "BFM Économie", category: "tech", type: "web", time: now - 1*d },
  { id: "bfm2", title: "Lecornu : aides carburant ciblées semaine prochaine", source: "BFM Économie", category: "politique", type: "web", time: now - 2*d },
  { id: "bfm3", title: "Assemblée adopte texte anti-fraudes en 1ère lecture", source: "BFM Économie", category: "politique", type: "web", time: now - 1*d },
  { id: "bfm4", title: "Prêts trésorerie 50k€ pour entreprises (hausse carburants)", source: "BFM Économie", category: "business", type: "web", time: now - 4*d },
  { id: "bfm5", title: "AirAsia augmente prix — low-cost touché", source: "BFM Économie", category: "business", type: "web", time: now - 3*d },
  { id: "bf1", title: "Plan soutien avril : 70M€ secteurs énergie", source: "Business France", category: "business", type: "web", time: now - 4*d },
  { id: "pf1", title: "Marchés émergents 2026 : TSMC, Samsung, Chine, Inde", source: "Finary", category: "podcasts", type: "podcast", time: now - 1*d, duration: "1h12",
    ideas: ["Droits de douane Trump = opportunités émergents", "TSMC/Samsung gagnants de l'IA", "Risque Taïwan surévalué", "Inde surperforme", "Pièges gouvernance bourse émergente"] },
  { id: "pf2", title: "Bulle IA 2026 ? Danger crédit se profile", source: "Finary", category: "podcasts", type: "podcast", time: now - 14*d, duration: "28min",
    ideas: ["Bulle sur le crédit privé, pas l'IA", "Taux élevés = entreprises fragiles", "Parallèle 2008"] },
  { id: "pe1", title: "Crise Iran/Ormuz — pétrole, inflation, Fed/BCE", source: "L'éco par mon père", category: "podcasts", type: "podcast", time: now - 2*d, duration: "48min",
    ideas: ["Baril 150$+ si blocage Ormuz", "Europe sans stock suffisant", "BCE doit baisser malgré inflation", "Engrais → alimentaire → instabilité", "Charbon en transition"] },
  { id: "pe2", title: "« Allez vers l'Est » — ricardienne vs schumpétérienne", source: "L'éco par mon père", category: "podcasts", type: "podcast", time: now - 9*d, duration: "46min",
    ideas: ["Asie construit, Occident stagne", "Dollar perd statut via swaps", "ETFs chinois + oblig indiennes", "IA trop capitalistique"] },
  { id: "pc1", title: "Guerre en Iran : analyse géopo — J.-B. Noé", source: "Conflits Géopolitique", category: "podcasts", type: "podcast", time: now - 3*d, duration: "35min",
    ideas: ["Iran joue attrition", "Alliances redéfinies", "Manifs internes fragilisent", "Parallèle 1980-88"] },
  { id: "ps1", title: "Tabous : jets privés, milliardaires — Hakim Benotmane", source: "Sans Permission", category: "podcasts", type: "podcast", time: now - 4*d, duration: "2h08",
    ideas: ["125M€ CA en kebabs", "Amitié entrepreneurs fragile", "Jets = outil ou piège ?", "Liberté financière ≠ identité"] },
  { id: "pi1", title: "Serbie : pourquoi regarder Belgrade", source: "Idriss Aberkane", category: "podcasts", type: "podcast", time: now - 5*d, duration: "1h25",
    ideas: ["300k vs corruption", "Résistance civile Est", "Gilets jaunes inversé"] },
  { id: "po1", title: "Entrepreneuriat et liberté géographique", source: "Olivier Roland Radio", category: "podcasts", type: "podcast", time: now - 6*d, duration: "52min",
    ideas: ["Remote-first compétitif", "Portugal/Dubaï/Estonie", "Location-independent 12 mois"] },
  { id: "poa1", title: "Growth hacking 2026 × IA", source: "Opal", category: "podcasts", type: "podcast", time: now - 7*d, duration: "38min",
    ideas: ["IA = acquisition, pas rétention", "Communautés > funnel", "Short-form = levier #1"] },
].sort((a, b) => b.time - a.time).map(i => ({ ...i, saved: false }));

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}j`;
}

function Dashboard() {
  const [items, setItems] = useState(ITEMS);
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [expandedPodcast, setExpandedPodcast] = useState(null);
  const [briefingOpen, setBriefingOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const toggleSave = (id) => setItems(p => p.map(i => i.id === id ? { ...i, saved: !i.saved } : i));
  const filtered = items.filter(i => {
    if (showSaved && !i.saved) return false;
    if (cat !== "all" && i.category !== cat) return false;
    if (q && !i.title.toLowerCase().includes(q.toLowerCase()) && !i.source.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f7f4ee", color: "#3d3a33", fontFamily: "'Source Serif 4', Georgia, serif", maxWidth: 480, margin: "0 auto" }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }`}</style>

      {/* MASTHEAD */}
      <div style={{ padding: "20px 20px 0", borderBottom: "2px solid #1a1814" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-1px", color: "#1a1814", lineHeight: 1 }}>Signal</h1>
            <p style={{ fontSize: 11, color: "#9c9788", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginTop: 4 }}>{BRIEFING.date} · màj {BRIEFING.updatedAt}</p>
          </div>
          <button onClick={() => setShowSaved(!showSaved)} style={{
            background: showSaved ? "rgba(192,57,43,0.08)" : "transparent",
            border: `1px solid ${showSaved ? "#c0392b" : "#d5d0c7"}`, borderRadius: 6, padding: "5px 10px",
            color: showSaved ? "#c0392b" : "#9c9788", fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginTop: 4,
          }}>★ {items.filter(i => i.saved).length}</button>
        </div>

        <div style={{ marginTop: 16, marginBottom: 14 }}>
          <button onClick={() => setBriefingOpen(!briefingOpen)} style={{
            background: "none", border: "none", color: "#c0392b", fontSize: 11, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 6, marginBottom: briefingOpen ? 12 : 0,
          }}>
            <span style={{ display: "inline-block", transform: briefingOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 9 }}>▶</span>
            BRIEF DU JOUR
          </button>
          {briefingOpen && (
            <div style={{ animation: "fadeUp 0.3s ease" }}>
              {BRIEFING.summary.map((s, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: "#5a5650", marginBottom: 10, paddingLeft: 14, borderLeft: `3px solid ${i === 0 ? "#c0392b" : "#e0dbd2"}`, fontWeight: 300 }}>
                  {i === 0 && <span style={{ color: "#c0392b", fontWeight: 700, fontSize: 9, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.8px", display: "block", marginBottom: 2 }}>ESSENTIEL</span>}
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e0dbd2", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
          <span style={{ color: "#c0b9aa", fontSize: 14 }}>⌕</span>
          <input type="text" placeholder="Rechercher…" value={q} onChange={e => setQ(e.target.value)} style={{ background: "transparent", border: "none", outline: "none", color: "#3d3a33", fontSize: 13, width: "100%", fontFamily: "'DM Sans', sans-serif" }} />
          {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", color: "#9c9788", cursor: "pointer", fontSize: 14 }}>✕</button>}
        </div>

        <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 14 }}>
          {CATEGORIES.map(c => {
            const active = cat === c.id;
            const color = c.id === "all" ? "#1a1814" : catColors[c.id];
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                flexShrink: 0, padding: "5px 11px", borderRadius: 5, cursor: "pointer",
                background: active ? (c.id === "all" ? "#1a1814" : color) : "transparent",
                border: active ? "none" : "1px solid #e0dbd2",
                color: active ? "#f7f4ee" : "#9c9788", fontSize: 11, fontWeight: active ? 500 : 300,
                fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 4,
              }}><span style={{ fontSize: 10 }}>{c.icon}</span>{c.label}</button>
            );
          })}
        </div>
      </div>

      {/* FEED */}
      <div style={{ padding: "8px 20px 100px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "50px 0", color: "#c0b9aa" }}><p style={{ fontSize: 14, fontStyle: "italic" }}>Aucun résultat</p></div>}
        {filtered.map((item, i) => {
          const color = catColors[item.category] || "#2c3e50";
          const isPodcast = item.type === "podcast";
          const isExpanded = expandedPodcast === item.id;
          return (
            <div key={item.id} onClick={() => isPodcast && setExpandedPodcast(isExpanded ? null : item.id)} style={{
              padding: "12px 14px", marginBottom: 5, borderRadius: 8, background: "#fff",
              border: `1px solid ${isExpanded ? color + "30" : "#ece8e0"}`,
              boxShadow: isExpanded ? `0 2px 8px ${color}10` : "0 1px 2px rgba(0,0,0,0.02)",
              cursor: isPodcast ? "pointer" : "default", transition: "all 0.2s",
              animation: mounted ? `fadeUp 0.25s ease ${Math.min(i * 0.018, 0.4)}s both` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
                    {item.tag && <span style={{ fontSize: 8.5, fontWeight: 700, color: "#fff", background: "#c0392b", padding: "1.5px 6px", borderRadius: 3, fontFamily: "'DM Sans', sans-serif" }}>{item.tag}</span>}
                    <span style={{ fontSize: 8.5, fontWeight: 500, color: color, background: color + "0c", padding: "2px 6px", borderRadius: 3, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.4px" }}>{item.category}</span>
                    {item.duration && <span style={{ fontSize: 9.5, color: "#9c9788", fontFamily: "'DM Sans', sans-serif" }}>⏱ {item.duration}</span>}
                    <span style={{ fontSize: 9.5, color: "#c0b9aa", marginLeft: "auto", fontFamily: "'DM Sans', sans-serif" }}>{timeAgo(item.time)}</span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 400, color: "#2a2722", marginBottom: 4 }}>{item.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10.5, color: "#9c9788", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{item.type === "twitter" ? "𝕏" : item.type === "podcast" ? "🎙" : "🌐"} {item.source}</span>
                    {isPodcast && item.ideas && <span style={{ fontSize: 8.5, color: color, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, opacity: 0.6 }}>{isExpanded ? "▲ fermer" : "▼ idées clés"}</span>}
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); toggleSave(item.id); }} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: item.saved ? "#c0392b" : "#ddd8cf", flexShrink: 0, marginTop: 1 }}>{item.saved ? "★" : "☆"}</button>
              </div>
              {isPodcast && isExpanded && item.ideas && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${color}12`, animation: "fadeUp 0.2s ease" }}>
                  <p style={{ fontSize: 9.5, fontWeight: 700, color: color, fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Idées clés</p>
                  {item.ideas.map((idea, j) => (
                    <div key={j} style={{ display: "flex", gap: 7, marginBottom: 6 }}>
                      <span style={{ color: color, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, flexShrink: 0 }}>{j + 1}.</span>
                      <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#5a5650", fontWeight: 300 }}>{idea}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", background: "rgba(247,244,238,0.95)", backdropFilter: "blur(10px)", border: "1px solid #e0dbd2", borderRadius: 16, padding: "6px 14px", display: "flex", alignItems: "center", gap: 7, zIndex: 30, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c0392b", boxShadow: "0 0 6px rgba(192,57,43,0.3)", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 9.5, color: "#9c9788", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{filtered.length} éléments · 7𝕏 · 4🌐 · 7🎙 · màj {BRIEFING.updatedAt}</span>
      </div>
    </div>
  );
}

// ─── ROOT ───────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <Dashboard /> : <PinScreen onUnlock={() => setUnlocked(true)} />;
}
