import { useState, useEffect } from "react";

const PIN_CODE = "2101";

function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const handleDigit = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next); setError(false);
    if (next.length === 4) {
      if (next === PIN_CODE) setTimeout(() => onUnlock(), 200);
      else { setShake(true); setError(true); setTimeout(() => { setPin(""); setShake(false); }, 500); }
    }
  };
  return (
    <div style={{ minHeight:"100vh",background:"#f7f4ee",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        @keyframes shakeAnim{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ animation:"fadeIn 0.5s ease",textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Source Serif 4',Georgia,serif",fontSize:36,fontWeight:900,color:"#1a1814",letterSpacing:"-1px",marginBottom:6 }}>Signal</h1>
        <p style={{ fontSize:12,color:"#9c9788",fontWeight:300,marginBottom:36 }}>Entrez votre code d'accès</p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",marginBottom:36,animation:shake?"shakeAnim 0.4s ease":"none" }}>
          {[0,1,2,3].map(i=>(<div key={i} style={{ width:14,height:14,borderRadius:"50%",background:i<pin.length?(error?"#c0392b":"#1a1814"):"transparent",border:`2px solid ${error?"#c0392b":i<pin.length?"#1a1814":"#d5d0c7"}`,transition:"all 0.15s" }}/>))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,68px)",gap:10,justifyContent:"center" }}>
          {[1,2,3,4,5,6,7,8,9,null,0,"del"].map((d,i)=>{
            if(d===null)return <div key={i}/>;
            const isDel=d==="del";
            return(<button key={i} onClick={()=>isDel?setPin(p=>p.slice(0,-1)):handleDigit(String(d))} style={{ width:68,height:68,borderRadius:"50%",cursor:"pointer",background:isDel?"transparent":"#fff",border:isDel?"none":"1px solid #e8e4dc",boxShadow:isDel?"none":"0 1px 3px rgba(0,0,0,0.04)",fontSize:isDel?18:22,fontWeight:isDel?300:400,color:isDel?"#9c9788":"#1a1814",fontFamily:isDel?"'DM Sans',sans-serif":"'Source Serif 4',Georgia,serif",display:"flex",alignItems:"center",justifyContent:"center" }}>{isDel?"⌫":d}</button>);
          })}
        </div>
        {error&&<p style={{ marginTop:20,fontSize:12,color:"#c0392b",fontWeight:500 }}>Code incorrect</p>}
      </div>
    </div>
  );
}

const now = Date.now();
const h = 3600000;
const d = 86400000;

const BRIEFING = {
  date: "mercredi 9 avril 2026",
  updatedAt: "08:30",
  summary: [
    "Cessez-le-feu US/Iran J+2 — L'Iran impose un péage en Bitcoin/stablecoins aux pétroliers dans le détroit d'Ormuz : 1$/baril (~2M$ par superpétrolier). Seulement 2 navires ont transité depuis l'accord, 800+ restent bloqués. Maersk reste prudent.",
    "L'Iran évoque la présence de mines dans Ormuz et propose 2 routes alternatives. Pipeline Est-Ouest saoudien frappé par un drone malgré la trêve. Négociations prévues à Islamabad. Trump évoque un « joint-venture » avec l'Iran.",
    "Crypto : Bitcoin bondit de 66k$ à 69k$ sur le cessez-le-feu. L'utilisation étatique du BTC comme instrument de péage maritime est un précédent mondial. France : déclaration obligatoire des portefeuilles crypto >5 000€.",
    "France : ouverture de la déclaration des revenus 2025 dès aujourd'hui (9 avril). Prime d'activité revalorisée +50€/mois. RSA, AAH, APL revalorisés +0,9%. Envoyé Spécial ce soir : « Goodbye Dubaï ? » — les expatriés face à la crise.",
    "Institut des Libertés (6 avril) : Charles Gave publie « Retours sur ma carrière et l'histoire financière ». J.-B. Noé : Birmanie, guerre sans fin.",
  ],
};

const CATEGORIES = [
  { id:"all",label:"Tout",icon:"◉" },
  { id:"politique",label:"Politique",icon:"🏛" },
  { id:"geopolitique",label:"Géopo",icon:"🌍" },
  { id:"business",label:"Business",icon:"💼" },
  { id:"finance",label:"Finance",icon:"📈" },
  { id:"tech",label:"Tech",icon:"⚡" },
  { id:"podcasts",label:"Podcasts",icon:"🎙" },
];

const catColors={politique:"#2c3e50",geopolitique:"#c0392b",finance:"#8e6f3e",business:"#27ae60",tech:"#6c3483",podcasts:"#d35400"};

const ITEMS = [
  // === 9 AVRIL 2026 — ACTUS DU JOUR ===
  { id:"t1",title:"Iran impose un péage en Bitcoin aux pétroliers dans Ormuz : 1$/baril (~2M$/navire) — payable en BTC ou stablecoins",source:"@CerfiaFR",category:"finance",type:"twitter",time:now-1*h,tag:"BREAKING" },
  { id:"t2",title:"Seulement 2 navires ont transité par Ormuz depuis le cessez-le-feu — 800+ toujours bloqués dans le Golfe",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-2*h,tag:"FLASH" },
  { id:"t3",title:"Pipeline Est-Ouest saoudien frappé par un drone malgré la trêve — l'Arabie exige un accès libre au détroit",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-3*h },
  { id:"t4",title:"Maersk : « Le cessez-le-feu crée des possibilités mais ne garantit pas la sécurité maritime »",source:"@CerfiaFR",category:"business",type:"twitter",time:now-4*h },
  { id:"t5",title:"Bitcoin bondit de 66k$ à 69k$ après l'annonce du cessez-le-feu — crypto en mode risk-on",source:"@elonmusk",category:"finance",type:"twitter",time:now-5*h },
  { id:"t6",title:"Négociations US/Iran prévues à Islamabad — Trump évoque un « joint-venture » pour sécuriser Ormuz",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-6*h },
  { id:"t7",title:"Iran évoque des mines dans Ormuz et annonce 2 routes maritimes alternatives près de ses côtes",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-7*h },
  { id:"t8",title:"France : déclaration des revenus 2025 ouverte à partir d'aujourd'hui (9 avril)",source:"@actuenvif",category:"politique",type:"twitter",time:now-2*h },
  { id:"t9",title:"Prime d'activité revalorisée de +50€/mois dès avril — RSA, AAH, APL : +0,9%",source:"@actuenvif",category:"politique",type:"twitter",time:now-8*h },
  { id:"t10",title:"France : déclaration obligatoire des portefeuilles crypto auto-hébergés dès 5 000€",source:"@actuenvif",category:"finance",type:"twitter",time:now-10*h },
  { id:"t11",title:"Envoyé Spécial ce soir : « Goodbye Dubaï ? » — expatriés français face à la crise au Moyen-Orient",source:"@GBX_Press",category:"geopolitique",type:"twitter",time:now-4*h },
  { id:"t12",title:"Israël continue de bombarder le Liban, fragilisant la trêve avec l'Iran",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-9*h },
  { id:"t13",title:"CIA et Mossad auraient piraté les caméras de surveillance de Téhéran depuis des années (FT)",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-12*h },
  { id:"t14",title:"Lecornu annonce des aides carburant ciblées pour la semaine prochaine",source:"@SirAfuera",category:"politique",type:"twitter",time:now-14*h },
  { id:"t15",title:"Un drone iranien frappe le Nakhitchevan (enclave azerbaïdjanaise) — nouveau pays ciblé",source:"@CerfiaFR",category:"geopolitique",type:"twitter",time:now-16*h },

  // === WEB ===
  { id:"w1",title:"Retours sur ma carrière et l'histoire financière — Charles Gave",source:"Inst. des Libertés",category:"finance",type:"web",time:now-3*d },
  { id:"w2",title:"Birmanie : une guerre sans fin — J.-B. Noé",source:"Inst. des Libertés",category:"geopolitique",type:"web",time:now-7*d },
  { id:"w3",title:"Iran : divergence en vue — J.-B. Noé",source:"Inst. des Libertés",category:"geopolitique",type:"web",time:now-13*d },
  { id:"w4",title:"Réallocation gérants : actions à 48% des portefeuilles — obligataire et cash profitent",source:"L'Agefi",category:"finance",type:"web",time:now-6*d },
  { id:"w5",title:"Notes souveraines FR/US en sursis de dégradation",source:"L'Agefi",category:"finance",type:"web",time:now-8*d },
  { id:"w6",title:"SpaceX dépose sa demande d'IPO — devance OpenAI et Anthropic",source:"L'Agefi",category:"finance",type:"web",time:now-9*d },
  { id:"w7",title:"Plan soutien avril : 70M€ pour secteurs touchés par la hausse énergie",source:"Business France",category:"business",type:"web",time:now-5*d },
  { id:"w8",title:"Prêts trésorerie jusqu'à 50k€ pour entreprises (hausse carburants)",source:"BFM Économie",category:"business",type:"web",time:now-5*d },

  // === PODCASTS ===
  { id:"p1",title:"Marchés émergents 2026 : TSMC, Samsung, Chine, Inde",source:"Finary",category:"podcasts",type:"podcast",time:now-1*d,duration:"1h12",
    ideas:["Droits de douane Trump = opportunités émergents","TSMC/Samsung gagnants de l'IA","Risque Taïwan surévalué","Inde surperforme","Pièges gouvernance bourse émergente"] },
  { id:"p2",title:"Crise Iran/Ormuz — pétrole, inflation, réaction Fed/BCE",source:"L'éco par mon père",category:"podcasts",type:"podcast",time:now-2*d,duration:"48min",
    ideas:["Baril 150$+ si blocage Ormuz","Europe sans stock suffisant","BCE doit baisser malgré inflation","Engrais → alimentaire → instabilité","Charbon en transition"] },
  { id:"p3",title:"Guerre en Iran : analyse géopo — J.-B. Noé",source:"Conflits Géopolitique",category:"podcasts",type:"podcast",time:now-3*d,duration:"35min",
    ideas:["Iran joue l'attrition","Alliances redéfinies au MO","Manifs internes fragilisent","Parallèle 1980-88"] },
  { id:"p4",title:"Tabous : jets privés, milliardaires — Hakim Benotmane",source:"Sans Permission",category:"podcasts",type:"podcast",time:now-4*d,duration:"2h08",
    ideas:["125M€ CA en kebabs","Amitié entrepreneurs fragile","Jets = outil ou piège ?","Liberté financière ≠ identité"] },
  { id:"p5",title:"Serbie : pourquoi regarder Belgrade",source:"Idriss Aberkane",category:"podcasts",type:"podcast",time:now-5*d,duration:"1h25",
    ideas:["300k vs corruption","Résistance civile Est","Gilets jaunes inversé"] },
  { id:"p6",title:"Entrepreneuriat et liberté géographique",source:"Olivier Roland Radio",category:"podcasts",type:"podcast",time:now-6*d,duration:"52min",
    ideas:["Remote-first compétitif","Portugal/Dubaï/Estonie","Location-independent 12 mois"] },
  { id:"p7",title:"Growth hacking 2026 × IA",source:"Opal",category:"podcasts",type:"podcast",time:now-7*d,duration:"38min",
    ideas:["IA = acquisition, pas rétention","Communautés > funnel","Short-form = levier #1"] },
].sort((a,b)=>b.time-a.time).map(i=>({...i,saved:false}));

function timeAgo(ts){const diff=Date.now()-ts;const mins=Math.floor(diff/60000);if(mins<60)return`${mins}m`;const hrs=Math.floor(mins/60);if(hrs<24)return`${hrs}h`;return`${Math.floor(hrs/24)}j`;}

function Dashboard(){
  const[items,setItems]=useState(ITEMS);
  const[cat,setCat]=useState("all");
  const[q,setQ]=useState("");
  const[showSaved,setShowSaved]=useState(false);
  const[expandedPodcast,setExpandedPodcast]=useState(null);
  const[briefingOpen,setBriefingOpen]=useState(true);
  const[mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true)},[]);
  const toggleSave=(id)=>setItems(p=>p.map(i=>i.id===id?{...i,saved:!i.saved}:i));
  const filtered=items.filter(i=>{
    if(showSaved&&!i.saved)return false;
    if(cat!=="all"&&i.category!==cat)return false;
    if(q&&!i.title.toLowerCase().includes(q.toLowerCase())&&!i.source.toLowerCase().includes(q.toLowerCase()))return false;
    return true;
  });

  return(
    <div style={{minHeight:"100vh",background:"#f7f4ee",color:"#3d3a33",fontFamily:"'Source Serif 4',Georgia,serif",maxWidth:480,margin:"0 auto"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;0,8..60,900;1,8..60,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>

      <div style={{padding:"20px 20px 0",borderBottom:"2px solid #1a1814"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <h1 style={{fontSize:34,fontWeight:900,letterSpacing:"-1px",color:"#1a1814",lineHeight:1}}>Signal</h1>
            <p style={{fontSize:11,color:"#9c9788",fontFamily:"'DM Sans',sans-serif",fontWeight:300,marginTop:4}}>{BRIEFING.date} · màj {BRIEFING.updatedAt}</p>
          </div>
          <button onClick={()=>setShowSaved(!showSaved)} style={{background:showSaved?"rgba(192,57,43,0.08)":"transparent",border:`1px solid ${showSaved?"#c0392b":"#d5d0c7"}`,borderRadius:6,padding:"5px 10px",color:showSaved?"#c0392b":"#9c9788",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",marginTop:4}}>★ {items.filter(i=>i.saved).length}</button>
        </div>
        <div style={{marginTop:16,marginBottom:14}}>
          <button onClick={()=>setBriefingOpen(!briefingOpen)} style={{background:"none",border:"none",color:"#c0392b",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6,marginBottom:briefingOpen?12:0}}>
            <span style={{display:"inline-block",transform:briefingOpen?"rotate(90deg)":"rotate(0)",transition:"transform 0.2s",fontSize:9}}>▶</span>BRIEF DU JOUR
          </button>
          {briefingOpen&&(<div style={{animation:"fadeUp 0.3s ease"}}>{BRIEFING.summary.map((s,i)=>(<p key={i} style={{fontSize:13.5,lineHeight:1.7,color:"#5a5650",marginBottom:10,paddingLeft:14,borderLeft:`3px solid ${i===0?"#c0392b":"#e0dbd2"}`,fontWeight:300}}>{i===0&&<span style={{color:"#c0392b",fontWeight:700,fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.8px",display:"block",marginBottom:2}}>ESSENTIEL</span>}{s}</p>))}</div>)}
        </div>
        <div style={{background:"#fff",border:"1px solid #e0dbd2",borderRadius:8,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:8,boxShadow:"0 1px 2px rgba(0,0,0,0.03)"}}>
          <span style={{color:"#c0b9aa",fontSize:14}}>⌕</span>
          <input type="text" placeholder="Rechercher…" value={q} onChange={e=>setQ(e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:"#3d3a33",fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif"}}/>
          {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:"#9c9788",cursor:"pointer",fontSize:14}}>✕</button>}
        </div>
        <div style={{display:"flex",gap:3,overflowX:"auto",paddingBottom:14}}>
          {CATEGORIES.map(c=>{const active=cat===c.id;const color=c.id==="all"?"#1a1814":catColors[c.id];return(<button key={c.id} onClick={()=>setCat(c.id)} style={{flexShrink:0,padding:"5px 11px",borderRadius:5,cursor:"pointer",background:active?(c.id==="all"?"#1a1814":color):"transparent",border:active?"none":"1px solid #e0dbd2",color:active?"#f7f4ee":"#9c9788",fontSize:11,fontWeight:active?500:300,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:10}}>{c.icon}</span>{c.label}</button>)})}
        </div>
      </div>

      <div style={{padding:"8px 20px 100px"}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"50px 0",color:"#c0b9aa"}}><p style={{fontSize:14,fontStyle:"italic"}}>Aucun résultat</p></div>}
        {filtered.map((item,i)=>{
          const color=catColors[item.category]||"#2c3e50";
          const isPodcast=item.type==="podcast";
          const isExpanded=expandedPodcast===item.id;
          return(<div key={item.id} onClick={()=>isPodcast&&setExpandedPodcast(isExpanded?null:item.id)} style={{padding:"12px 14px",marginBottom:5,borderRadius:8,background:"#fff",border:`1px solid ${isExpanded?color+"30":"#ece8e0"}`,boxShadow:isExpanded?`0 2px 8px ${color}10`:"0 1px 2px rgba(0,0,0,0.02)",cursor:isPodcast?"pointer":"default",transition:"all 0.2s",animation:mounted?`fadeUp 0.25s ease ${Math.min(i*0.018,0.4)}s both`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6,flexWrap:"wrap"}}>
                  {item.tag&&<span style={{fontSize:8.5,fontWeight:700,color:"#fff",background:"#c0392b",padding:"1.5px 6px",borderRadius:3,fontFamily:"'DM Sans',sans-serif"}}>{item.tag}</span>}
                  <span style={{fontSize:8.5,fontWeight:500,color:color,background:color+"0c",padding:"2px 6px",borderRadius:3,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.4px"}}>{item.category}</span>
                  {item.duration&&<span style={{fontSize:9.5,color:"#9c9788",fontFamily:"'DM Sans',sans-serif"}}>⏱ {item.duration}</span>}
                  <span style={{fontSize:9.5,color:"#c0b9aa",marginLeft:"auto",fontFamily:"'DM Sans',sans-serif"}}>{timeAgo(item.time)}</span>
                </div>
                <p style={{fontSize:14,lineHeight:1.55,fontWeight:400,color:"#2a2722",marginBottom:4}}>{item.title}</p>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:10.5,color:"#9c9788",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{item.type==="twitter"?"𝕏":item.type==="podcast"?"🎙":"🌐"} {item.source}</span>
                  {isPodcast&&item.ideas&&<span style={{fontSize:8.5,color:color,fontFamily:"'DM Sans',sans-serif",fontWeight:500,opacity:0.6}}>{isExpanded?"▲ fermer":"▼ idées clés"}</span>}
                </div>
              </div>
              <button onClick={e=>{e.stopPropagation();toggleSave(item.id)}} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:item.saved?"#c0392b":"#ddd8cf",flexShrink:0,marginTop:1}}>{item.saved?"★":"☆"}</button>
            </div>
            {isPodcast&&isExpanded&&item.ideas&&(
              <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${color}12`,animation:"fadeUp 0.2s ease"}}>
                <p style={{fontSize:9.5,fontWeight:700,color:color,fontFamily:"'DM Sans',sans-serif",letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>Idées clés</p>
                {item.ideas.map((idea,j)=>(<div key={j} style={{display:"flex",gap:7,marginBottom:6}}><span style={{color:color,fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:700,flexShrink:0}}>{j+1}.</span><p style={{fontSize:12.5,lineHeight:1.5,color:"#5a5650",fontWeight:300}}>{idea}</p></div>))}
              </div>
            )}
          </div>);
        })}
      </div>

      <div style={{position:"fixed",bottom:14,left:"50%",transform:"translateX(-50%)",background:"rgba(247,244,238,0.95)",backdropFilter:"blur(10px)",border:"1px solid #e0dbd2",borderRadius:16,padding:"6px 14px",display:"flex",alignItems:"center",gap:7,zIndex:30,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div style={{width:5,height:5,borderRadius:"50%",background:"#c0392b",boxShadow:"0 0 6px rgba(192,57,43,0.3)",animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:9.5,color:"#9c9788",fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{filtered.length} éléments · 7𝕏 · 4🌐 · 7🎙 · màj {BRIEFING.updatedAt}</span>
      </div>
    </div>
  );
}

export default function App(){
  const[unlocked,setUnlocked]=useState(false);
  return unlocked?<Dashboard/>:<PinScreen onUnlock={()=>setUnlocked(true)}/>;
}
