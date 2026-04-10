import { useState, useEffect } from "react";
const PIN_CODE="2101",UI="'DM Sans',sans-serif",SE="'Source Serif 4',Georgia,serif";

// Image with gradient fallback
function Img({src,grad,h:hh=120}){const[ok,setOk]=useState(true);if(!src||!ok)return grad?<div style={{width:"100%",height:hh,background:grad}}/>:null;return<img src={src} alt="" onError={()=>setOk(false)} style={{width:"100%",height:hh,objectFit:"cover",display:"block"}}/>;}

function PinScreen({onUnlock}){const[pin,setPin]=useState("");const[err,setErr]=useState(false);const[sh,setSh]=useState(false);const hit=d=>{if(pin.length>=4)return;const n=pin+d;setPin(n);setErr(false);if(n.length===4){if(n===PIN_CODE)setTimeout(()=>onUnlock(),200);else{setSh(true);setErr(true);setTimeout(()=>{setPin("");setSh(false)},500)}}};return(
<div style={{minHeight:"100vh",background:"#f7f4ee",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:UI}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600;8..60,700;8..60,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');@keyframes sk{0%,100%{transform:translateX(0)}25%,75%{transform:translateX(-8px)}50%{transform:translateX(8px)}}@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes pu{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
<div style={{animation:"fi .5s ease",textAlign:"center"}}>
<div style={{width:56,height:56,borderRadius:14,background:"#1a1814",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><span style={{fontSize:26,color:"#f7f4ee",fontFamily:SE,fontWeight:900}}>S</span></div>
<h1 style={{fontFamily:SE,fontSize:32,fontWeight:900,color:"#1a1814",letterSpacing:"-1px",marginBottom:4}}>Signal</h1>
<p style={{fontSize:12,color:"#9c9788",marginBottom:34}}>Entrez votre code d'accès</p>
<div style={{display:"flex",gap:14,justifyContent:"center",marginBottom:34,animation:sh?"sk .4s ease":"none"}}>{[0,1,2,3].map(i=><div key={i} style={{width:14,height:14,borderRadius:"50%",background:i<pin.length?(err?"#c0392b":"#1a1814"):"transparent",border:`2px solid ${err?"#c0392b":i<pin.length?"#1a1814":"#d5d0c7"}`,transition:"all .15s"}}/>)}</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,66px)",gap:10,justifyContent:"center"}}>{[1,2,3,4,5,6,7,8,9,null,0,"⌫"].map((d,i)=>{if(d===null)return<div key={i}/>;const dl=d==="⌫";return<button key={i} onClick={()=>dl?setPin(p=>p.slice(0,-1)):hit(String(d))} style={{width:66,height:66,borderRadius:"50%",cursor:"pointer",background:dl?"transparent":"#fff",border:dl?"none":"1px solid #e8e4dc",boxShadow:dl?"none":"0 1px 3px rgba(0,0,0,.04)",fontSize:dl?20:22,color:dl?"#9c9788":"#1a1814",fontFamily:dl?UI:SE,display:"flex",alignItems:"center",justifyContent:"center"}}>{d}</button>})}</div>
{err&&<p style={{marginTop:18,fontSize:12,color:"#c0392b",fontWeight:500}}>Code incorrect</p>}
</div></div>);}

// ─── SOURCES (same as v5, abbreviated for space) ────────────────
const SRC=[
{n:"Cerfia",h:"@CerfiaFR",t:"𝕏",cat:"Breaking News",o:"🇫🇷",logo:"📡",prop:"Pierre-Édouard Stérin (Otium/Odyssée Impact). Rachat 2025.",ctrl:"Dénoncé par Blast, France Info. -50k abonnés. Stérin 3× convoqué Assemblée, refusé. Infos parfois non vérifiées.",f:"⚠️"},
{n:"Idriss Aberkane",h:"@idrissaberkane",t:"𝕏",cat:"Opinion",o:"🇫🇷",logo:"🧠",prop:"Compte personnel.",ctrl:"Multiples fact-checks négatifs (AFP, Libé). Infox Covid, Gardasil.",f:"⚠️"},
{n:"Sir Afuera",h:"@SirAfuera",t:"𝕏",cat:"Politique",o:"🇫🇷",logo:"🏛",prop:"Indépendant.",ctrl:"Aucune.",f:"✅"},
{n:"Actu en Vif",h:"@actuenvif",t:"𝕏",cat:"Actu Flash",o:"🇫🇷",logo:"⚡",prop:"Indépendant.",ctrl:"Aucune.",f:"⚠️"},
{n:"La Maison Presse",h:"@LaMaisonPresse",t:"𝕏",cat:"Revue presse",o:"🇫🇷",logo:"📰",prop:"Indépendant.",ctrl:"Aucune.",f:"✅"},
{n:"GBX Press",h:"@GBX_Press",t:"𝕏",cat:"Actualité",o:"🇫🇷",logo:"📋",prop:"Indépendant.",ctrl:"Aucune.",f:"⚠️"},
{n:"Elon Musk",h:"@elonmusk",t:"𝕏",cat:"Tech",o:"🇺🇸",logo:"🚀",prop:"X Corp (44Md$, 2022).",ctrl:"Condamné tweets mensongers. Amende 120M€ UE. Modération réduite.",f:"⚠️"},
{n:"Inst. des Libertés",h:"institutdeslibertes.org",t:"🌐",cat:"Économie",o:"🇫🇷",logo:"🏦",prop:"Assoc. Charles Gave.",ctrl:"Think tank libéral assumé. Pas de condamnation.",f:"✅"},
{n:"L'Agefi",h:"agefi.fr",t:"🌐",cat:"Finance pro",o:"🇫🇷",logo:"📊",prop:"Groupe L'Opinion. Fondé 1911.",ctrl:"Aucune. Référence AMF.",f:"✅"},
{n:"BFM Économie",h:"bfmtv.com/economie",t:"🌐",cat:"Actu éco",o:"🇫🇷",logo:"📺",prop:"Altice (Drahi) → cession CMA CGM.",ctrl:"Drahi: enquête fraude fiscale. Sensationnalisme critiqué.",f:"✅"},
{n:"Business France",h:"businessfrance.fr",t:"🌐",cat:"État",o:"🇫🇷",logo:"🇫🇷",prop:"Établissement public.",ctrl:"Aucune.",f:"✅"},
{n:"Finary",h:"Podcast",t:"🎙",cat:"Investissement",o:"🇫🇷",logo:"💰",prop:"Finary SAS, CIF AMF.",ctrl:"Aucune.",f:"✅"},
{n:"L'éco par mon père",h:"Podcast",t:"🎙",cat:"Économie",o:"🇫🇷",logo:"👨‍👧",prop:"Institut des Libertés.",ctrl:"Vision libérale assumée.",f:"✅"},
{n:"Conflits",h:"Podcast",t:"🎙",cat:"Géopolitique",o:"🇫🇷",logo:"🗺",prop:"Revue Conflits SAS.",ctrl:"Aucune. Académique.",f:"✅"},
{n:"Sans Permission",h:"Podcast",t:"🎙",cat:"Business",o:"🇫🇷",logo:"🔥",prop:"Indépendant.",ctrl:"The Family (Ammar) liquidée.",f:"✅"},
{n:"Idriss Aberkane",h:"YouTube",t:"🎙",cat:"Géopo",o:"🇫🇷",logo:"🎤",prop:"Perso.",ctrl:"Cf. 𝕏.",f:"⚠️"},
{n:"Olivier Roland",h:"Podcast",t:"🎙",cat:"Entrepreneuriat",o:"🇫🇷",logo:"🎯",prop:"Perso.",ctrl:"Aucune.",f:"✅"},
{n:"Opal",h:"Podcast",t:"🎙",cat:"Growth",o:"🇫🇷",logo:"💎",prop:"Indépendant.",ctrl:"Aucune.",f:"✅"},
];
function SourcesPage({onBack}){const[fl,setFl]=useState("all");const[ex,setEx]=useState(null);const fs=fl==="all"?SRC:SRC.filter(s=>s.t===fl);return(
<div style={{minHeight:"100vh",background:"#f7f4ee",fontFamily:SE,maxWidth:480,margin:"0 auto"}}>
<div style={{padding:"20px 20px 14px",borderBottom:"2px solid #1a1814"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#1a1814"}}>←</button><div><h1 style={{fontSize:22,fontWeight:900,color:"#1a1814"}}>Sources & Transparence</h1><p style={{fontSize:10,color:"#9c9788",fontFamily:UI}}>Propriétaires · Controverses · Fiabilité</p></div></div>
<div style={{display:"flex",gap:4}}>{[["all","Toutes"],["𝕏","𝕏"],["🌐","Web"],["🎙","Podcasts"]].map(([k,l])=><button key={k} onClick={()=>setFl(k)} style={{padding:"5px 10px",borderRadius:5,cursor:"pointer",background:fl===k?"#1a1814":"transparent",border:fl===k?"none":"1px solid #e0dbd2",color:fl===k?"#f7f4ee":"#9c9788",fontSize:10.5,fontFamily:UI,fontWeight:fl===k?500:300}}>{l}</button>)}</div>
</div>
<div style={{padding:"10px 20px 40px"}}>{fs.map((s,i)=>{const op=ex===i;const fc=s.f==="✅"?"#27ae60":"#e67e22";return(
<div key={i} onClick={()=>setEx(op?null:i)} style={{background:"#fff",borderRadius:10,padding:"12px 14px",marginBottom:5,border:`1px solid ${op?"#1a181420":"#ece8e0"}`,cursor:"pointer",animation:`fu .2s ease ${Math.min(i*.03,.4)}s both`}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:10,background:"#f7f4ee",border:"1px solid #e8e4dc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.logo}</div><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:14,fontWeight:700,color:"#1a1814"}}>{s.n}</span><span style={{fontSize:9,color:fc,fontFamily:UI,fontWeight:600}}>{s.f}</span></div><p style={{fontSize:10,color:"#9c9788",fontFamily:UI}}>{s.t} · {s.cat} · {s.o}</p></div><span style={{fontSize:11,color:"#c0b9aa",transform:op?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span></div>
{op&&<div style={{marginTop:12,paddingTop:10,borderTop:"1px solid #f0ece4",animation:"fu .2s ease"}}>
<div style={{marginBottom:8}}><p style={{fontSize:8.5,fontWeight:700,color:"#2c3e50",fontFamily:UI,letterSpacing:".8px",marginBottom:2}}>PROPRIÉTAIRE</p><p style={{fontSize:11.5,lineHeight:1.5,color:"#5a5650",fontWeight:300}}>{s.prop}</p></div>
<div style={{marginBottom:8}}><p style={{fontSize:8.5,fontWeight:700,color:"#2c3e50",fontFamily:UI,letterSpacing:".8px",marginBottom:2}}>CONTROVERSES</p><p style={{fontSize:11.5,lineHeight:1.5,color:s.ctrl.includes("Aucune")?"#27ae60":"#c0392b",fontWeight:300}}>{s.ctrl}</p></div>
</div>}
</div>)})}</div></div>);}

// ─── NEWS — 10 AVRIL 2026 ───────────────────────────────────────
const now=Date.now(),h=3600000,D=86400000;
const BRIEF={date:"vendredi 10 avril 2026",upd:"09:00",pts:[
"Ormuz J+3 : Trump met en garde l'Iran contre le péage. Superpétrolier russe Arhimeda franchit le détroit (Bloomberg). Seulement 5 navires le 8 avril vs 120/jour avant-guerre. Hapag-Lloyd : « le retour à la normale prendra des semaines ».",
"Israël : 303 morts au Liban mercredi. Netanyahu ordonne négociations directes. L'Iran rebloque Ormuz en réponse. Macron appelle Trump et Pezeshkian — pousse pour extension au Liban.",
"Pourparlers Islamabad : J.D. Vance attendu samedi. 8 des 10 points iraniens donneraient à Téhéran une position plus forte qu'avant-guerre. Poutine annonce cessez-le-feu Ukraine (Pâques orthodoxe sam-dim).",
"Marchés : Brent rebondit à 96,77$ (+2,2%). Péage Ormuz : 2M$/navire en BTC. Déclaration revenus FR ouverte. Prime d'activité +50€/mois.",
]};
const CC={politique:"#2c3e50",geopolitique:"#c0392b",business:"#27ae60",finance:"#8e6f3e",tech:"#6c3483",podcasts:"#d35400"};
const CATS=[{id:"all",l:"Tout",i:"◉",c:"#1a1814"},{id:"politique",l:"Politique",i:"🏛",c:"#2c3e50"},{id:"geopolitique",l:"Géopo",i:"🌍",c:"#c0392b"},{id:"business",l:"Business",i:"💼",c:"#27ae60"},{id:"finance",l:"Finance",i:"📈",c:"#8e6f3e"},{id:"tech",l:"Tech",i:"⚡",c:"#6c3483"},{id:"podcasts",l:"Podcasts",i:"🎙",c:"#d35400"}];

const NEWS=[
{id:"1",title:"Trump met en garde l'Iran : « Ils feraient mieux d'arrêter le péage d'Ormuz ! »",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-1*h,tag:"BREAKING",sum:"Sur Truth Social, Trump réagit au péage iranien. Menace de conséquences si la pratique continue malgré le cessez-le-feu.",link:"https://x.com/CerfiaFR",img:"https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=250&fit=crop",grad:"linear-gradient(135deg,#1a0a0a,#3d1515)"},
{id:"2",title:"Superpétrolier russe Arhimeda franchit Ormuz — rare transit sous pavillon russe (Bloomberg)",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-2*h,tag:"FLASH",sum:"Le VLCC Arhimeda (pavillon russe, construit en 2000) a transité jeudi soir. Destination affichée : île de Kharg (hub pétrolier iranien).",link:"https://x.com/CerfiaFR",img:"https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&h=250&fit=crop",grad:"linear-gradient(135deg,#0a1520,#1a2a3d)"},
{id:"3",title:"303 morts au Liban mercredi — plus grande frappe israélienne depuis le 28 février",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-3*h,sum:"1150 blessés. Netanyahu ordonne négociations directes avec le Liban « dans les plus brefs délais ». Hezbollah tire des roquettes en réponse.",link:"https://x.com/CerfiaFR",img:"https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=250&fit=crop",grad:"linear-gradient(135deg,#1a1005,#3d2a10)"},
{id:"4",title:"J.D. Vance à Islamabad samedi — pourparlers US/Iran sur les 10 points",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-4*h,sum:"8 des 10 points donneraient à l'Iran une position plus forte qu'avant-guerre selon Le Grand Continent. Enrichissement uranium, contrôle Ormuz, levée sanctions.",link:"https://x.com/CerfiaFR"},
{id:"5",title:"L'Iran rebloque Ormuz après frappes israéliennes au Liban",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-5*h,sum:"Fars News : pétroliers ne circulent plus. L'Iran considère les frappes au Liban comme une violation du cessez-le-feu.",link:"https://x.com/CerfiaFR"},
{id:"6",title:"Brent rebondit à 96,77$ (+2,2%) — l'euphorie du cessez-le-feu retombe",source:"L'Agefi",category:"finance",type:"web",time:now-3*h,sum:"Après -13% mercredi, le pétrole remonte. Hapag-Lloyd : « le retour à la normale prendra des semaines, pas des jours ». 400+ pétroliers attendent hors du Golfe.",link:"https://agefi.fr",img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=250&fit=crop",grad:"linear-gradient(135deg,#0a150a,#1a3d1a)"},
{id:"7",title:"Macron appelle Trump et Pezeshkian — extension du cessez-le-feu au Liban demandée",source:"@actuenvif",category:"politique",type:"twitter",time:now-6*h,sum:"Macron juge l'extension au Liban « condition nécessaire » pour un cessez-le-feu « crédible et durable ». UK : Starmer discute plan maritime avec Trump.",link:"https://x.com/actuenvif"},
{id:"8",title:"Poutine annonce cessez-le-feu Ukraine pour Pâques orthodoxe (sam-dim)",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-7*h,sum:"Cessez-le-feu unilatéral russe « à partir de 16h samedi ». Réaction ukrainienne attendue.",link:"https://x.com/CerfiaFR"},
{id:"9",title:"Péage Ormuz : 2M$/navire en Bitcoin — Trump exige l'arrêt immédiat",source:"@elonmusk",category:"finance",type:"twitter",time:now-8*h,sum:"1$/baril. La Garde révolutionnaire contrôle le passage. Paiement en BTC/stablecoins pour contourner SWIFT. Légalité contestée (UNCLOS).",link:"https://x.com/elonmusk",img:"https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=250&fit=crop",grad:"linear-gradient(135deg,#15100a,#3d2a0a)"},
{id:"10",title:"Déclaration revenus 2025 ouverte — simulateur disponible",source:"@actuenvif",category:"politique",type:"twitter",time:now-10*h,sum:"Campagne ouverte depuis le 9 avril. Dates limites par département. Simulateur sur impots.gouv.fr.",link:"https://x.com/actuenvif"},
{id:"11",title:"Prime d'activité +50€/mois — 3,8M de foyers reçoivent le chèque énergie",source:"@actuenvif",category:"politique",type:"twitter",time:now-12*h,sum:"Loi de finances 2026. RSA, AAH, APL +0,9%. Chèque énergie envoyé automatiquement à partir du 1er avril.",link:"https://x.com/actuenvif"},
// WEB
{id:"w1",title:"Retours sur ma carrière et l'histoire financière — Charles Gave",source:"Inst. des Libertés",category:"finance",type:"web",time:now-4*D,sum:"50 ans de finance : crises, monnaies, Asie, erreurs européennes.",link:"https://institutdeslibertes.org/retours-sur-ma-carriere-et-sur-lhistoire-financiere/"},
{id:"w2",title:"Cessez-le-feu trop court pour relancer le trafic — analystes maritimes",source:"L'Agefi",category:"finance",type:"web",time:now-6*h,sum:"2 semaines insuffisantes. 200 pétroliers + 200 vraquiers bloqués. Le trafic ne se normalisera pas avant « des semaines, voire des mois » (Hapag-Lloyd).",link:"https://agefi.fr"},
// PODCASTS
{id:"p1",title:"Marchés émergents 2026 : TSMC, Samsung, Chine, Inde",source:"Finary",category:"podcasts",type:"podcast",time:now-2*D,duration:"1h12",ideas:["Droits de douane Trump = opportunités","TSMC/Samsung gagnants IA","Risque Taïwan surévalué","Inde surperforme"],link:"https://open.spotify.com/show/66ynGa6NJn4xmdgl4lp4sF"},
{id:"p2",title:"Crise Iran/Ormuz — pétrole, inflation, Fed/BCE",source:"L'éco par mon père",category:"podcasts",type:"podcast",time:now-3*D,duration:"48min",ideas:["Baril 150$+ si blocage","Europe sans stock","BCE doit baisser","Charbon en transition"],link:"https://open.spotify.com/show/55tahpcoRuaWhnPZTWO0Tj"},
{id:"p3",title:"Guerre Iran : analyse géopo — J.-B. Noé",source:"Conflits",category:"podcasts",type:"podcast",time:now-4*D,duration:"35min",ideas:["Iran joue attrition","Alliances redéfinies","Manifs fragilisent","Parallèle 1980-88"],link:"https://open.spotify.com/show/2R47RsdPn70kVpLIK0cIKl"},
{id:"p4",title:"Tabous : jets privés, milliardaires — Benotmane",source:"Sans Permission",category:"podcasts",type:"podcast",time:now-5*D,duration:"2h08",ideas:["125M€ CA kebabs","Amitié fragile","Jets = piège ?","Liberté ≠ identité"],link:"https://open.spotify.com/show/1smmmXX9zxgkfLwLb7bZD6"},
].sort((a,b)=>b.time-a.time).map(i=>({...i,saved:false}));

function timeAgo(ts){const m=Math.floor((Date.now()-ts)/60000);if(m<60)return`${m}m`;const hr=Math.floor(m/60);if(hr<24)return`${hr}h`;return`${Math.floor(hr/24)}j`;}

function Dashboard({onSrc}){
const[items,setItems]=useState(NEWS);const[cat,setCat]=useState("all");const[q,setQ]=useState("");const[sv,setSv]=useState(false);const[op,setOp]=useState(null);const[br,setBr]=useState(true);const[mt,setMt]=useState(false);
useEffect(()=>{setMt(true)},[]);const tog=id=>setItems(p=>p.map(i=>i.id===id?{...i,saved:!i.saved}:i));
const fl=items.filter(i=>{if(sv&&!i.saved)return false;if(cat!=="all"&&i.category!==cat)return false;if(q&&!i.title.toLowerCase().includes(q.toLowerCase())&&!i.source.toLowerCase().includes(q.toLowerCase()))return false;return true});
return(
<div style={{minHeight:"100vh",background:"#f7f4ee",color:"#3d3a33",fontFamily:SE,maxWidth:480,margin:"0 auto"}}>
<div style={{padding:"20px 20px 0",borderBottom:"2px solid #1a1814"}}>
{/* Centered Signal only */}
<div style={{textAlign:"center",marginBottom:10}}>
<h1 style={{fontSize:30,fontWeight:900,letterSpacing:"-1px",color:"#1a1814"}}>Signal</h1>
<p style={{fontSize:10.5,color:"#9c9788",fontFamily:UI,fontWeight:300,marginTop:3}}>{BRIEF.date} · màj {BRIEF.upd}</p>
</div>
<div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
<button onClick={onSrc} style={{background:"#fff",border:"1px solid #e0dbd2",borderRadius:8,padding:"6px 14px",color:"#2c3e50",fontSize:11,fontFamily:UI,cursor:"pointer",fontWeight:500,boxShadow:"0 1px 2px rgba(0,0,0,.03)"}}>📋 Sources</button>
<button onClick={()=>setSv(!sv)} style={{background:sv?"rgba(192,57,43,.08)":"#fff",border:`1px solid ${sv?"#c0392b":"#e0dbd2"}`,borderRadius:8,padding:"6px 14px",color:sv?"#c0392b":"#9c9788",fontSize:11,fontFamily:UI,cursor:"pointer",boxShadow:"0 1px 2px rgba(0,0,0,.03)"}}>★ {items.filter(i=>i.saved).length}</button>
</div>
{/* Brief */}
<div style={{marginBottom:12}}>
<button onClick={()=>setBr(!br)} style={{background:"none",border:"none",color:"#c0392b",fontSize:11,cursor:"pointer",fontFamily:UI,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6,marginBottom:br?8:0}}>
<span style={{display:"inline-block",transform:br?"rotate(90deg)":"rotate(0)",transition:"transform .2s",fontSize:9}}>▶</span>BRIEF DU JOUR</button>
{br&&<div style={{animation:"fu .3s ease"}}>{BRIEF.pts.map((s,i)=><p key={i} style={{fontSize:13,lineHeight:1.65,color:"#5a5650",marginBottom:8,paddingLeft:13,borderLeft:`3px solid ${i===0?"#c0392b":"#e0dbd2"}`,fontWeight:300}}>{i===0&&<span style={{color:"#c0392b",fontWeight:700,fontSize:9,fontFamily:UI,letterSpacing:".8px",display:"block",marginBottom:2}}>ESSENTIEL</span>}{s}</p>)}</div>}
</div>
{/* Search */}
<div style={{background:"#fff",border:"1px solid #e0dbd2",borderRadius:8,padding:"8px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8,boxShadow:"0 1px 2px rgba(0,0,0,.03)"}}>
<span style={{color:"#c0b9aa",fontSize:14}}>⌕</span>
<input type="text" placeholder="Rechercher…" value={q} onChange={e=>setQ(e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:"#3d3a33",fontSize:13,width:"100%",fontFamily:UI}}/>
{q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:"#9c9788",cursor:"pointer"}}>✕</button>}
</div>
{/* Categories */}
<div style={{display:"flex",justifyContent:"space-between",paddingBottom:12,gap:2}}>
{CATS.map(c=>{const a=cat===c.id;return<button key={c.id} onClick={()=>setCat(c.id)} style={{flex:1,padding:"7px 2px",borderRadius:8,cursor:"pointer",background:a?c.c:"transparent",border:a?"none":"1px solid #ece8e0",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:15}}>{c.i}</span><span style={{fontSize:8,fontFamily:UI,fontWeight:a?600:300,color:a?"#f7f4ee":"#9c9788"}}>{c.l}</span></button>})}
</div>
</div>
{/* Feed */}
<div style={{padding:"6px 20px 100px"}}>
{fl.length===0&&<div style={{textAlign:"center",padding:"50px 0"}}><p style={{fontSize:14,fontStyle:"italic",color:"#c0b9aa"}}>Aucun résultat</p></div>}
{fl.map((item,i)=>{const co=CC[item.category]||"#2c3e50";const pod=item.type==="podcast";const isOp=op===item.id;return(
<div key={item.id} onClick={()=>setOp(isOp?null:item.id)} style={{background:"#fff",borderRadius:10,marginBottom:6,overflow:"hidden",border:`1px solid ${isOp?co+"25":"#ece8e0"}`,boxShadow:isOp?`0 3px 12px ${co}08`:"0 1px 2px rgba(0,0,0,.02)",cursor:"pointer",transition:"all .2s",animation:mt?`fu .25s ease ${Math.min(i*.015,.4)}s both`:"none"}}>
{/* IMAGE with fallback */}
<Img src={item.img} grad={item.grad} h={130}/>
<div style={{padding:"11px 13px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5,flexWrap:"wrap"}}>
{item.tag&&<span style={{fontSize:8,fontWeight:700,color:"#fff",background:"#c0392b",padding:"1.5px 6px",borderRadius:3,fontFamily:UI}}>{item.tag}</span>}
<span style={{fontSize:8,fontWeight:500,color:co,background:co+"0c",padding:"2px 6px",borderRadius:3,fontFamily:UI,textTransform:"uppercase",letterSpacing:".3px"}}>{item.category}</span>
{item.duration&&<span style={{fontSize:9,color:"#9c9788",fontFamily:UI}}>⏱ {item.duration}</span>}
<span style={{fontSize:9,color:"#c0b9aa",marginLeft:"auto",fontFamily:UI}}>{timeAgo(item.time)}</span>
</div>
<p style={{fontSize:13.5,lineHeight:1.5,fontWeight:500,color:"#1a1814",marginBottom:3}}>{item.title}</p>
<span style={{fontSize:10.5,color:"#9c9788",fontFamily:UI,fontWeight:300}}>{item.type==="twitter"?"𝕏":item.type==="podcast"?"🎙":"🌐"} {item.source}</span>
</div>
<button onClick={e=>{e.stopPropagation();tog(item.id)}} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:item.saved?"#c0392b":"#ddd8cf",flexShrink:0}}>{item.saved?"★":"☆"}</button>
</div>
{isOp&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #f0ece4",animation:"fu .2s ease"}}>
{item.sum&&<p style={{fontSize:12.5,lineHeight:1.6,color:"#5a5650",fontWeight:300,marginBottom:10}}>{item.sum}</p>}
{pod&&item.ideas&&<div style={{marginBottom:10}}><p style={{fontSize:9,fontWeight:700,color:co,fontFamily:UI,letterSpacing:"1px",textTransform:"uppercase",marginBottom:6}}>Idées clés</p>{item.ideas.map((id,j)=><div key={j} style={{display:"flex",gap:6,marginBottom:4}}><span style={{color:co,fontSize:10.5,fontFamily:UI,fontWeight:700,flexShrink:0}}>{j+1}.</span><p style={{fontSize:12,lineHeight:1.5,color:"#5a5650",fontWeight:300}}>{id}</p></div>)}</div>}
{item.link&&<a href={item.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:"inline-flex",alignItems:"center",gap:6,background:co,color:"#fff",padding:"7px 14px",borderRadius:6,fontSize:11,fontFamily:UI,fontWeight:500,textDecoration:"none"}}>{item.type==="twitter"?"Voir sur 𝕏 →":item.type==="podcast"?"Écouter →":"Lire →"}</a>}
</div>}
</div></div>)})}
</div>
<div style={{position:"fixed",bottom:14,left:"50%",transform:"translateX(-50%)",background:"rgba(247,244,238,.95)",backdropFilter:"blur(10px)",border:"1px solid #e0dbd2",borderRadius:16,padding:"6px 14px",display:"flex",alignItems:"center",gap:7,zIndex:30,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}><div style={{width:5,height:5,borderRadius:"50%",background:"#c0392b",boxShadow:"0 0 6px rgba(192,57,43,.3)",animation:"pu 2s infinite"}}/><span style={{fontSize:9.5,color:"#9c9788",fontFamily:UI,fontWeight:300}}>{fl.length} éléments · màj {BRIEF.upd}</span></div>
</div>);}

export default function App(){const[ok,setOk]=useState(false);const[pg,setPg]=useState("d");if(!ok)return<PinScreen onUnlock={()=>setOk(true)}/>;if(pg==="s")return<SourcesPage onBack={()=>setPg("d")}/>;return<Dashboard onSrc={()=>setPg("s")}/>;}
