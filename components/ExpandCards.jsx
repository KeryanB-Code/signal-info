import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpandCards({ cards, height = 600 }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="expand-cards" style={{ height }}>
      {cards.map((card, i) => {
        const isActive = activeIdx === i;
        const isShrunk = activeIdx !== null && !isActive;
        return (
          <div
            key={i}
            className={`expand-card${isActive ? " expand-card--active" : isShrunk ? " expand-card--shrunk" : ""}`}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => navigate(card.to)}
          >
            {card.video ? (
              <video autoPlay muted loop playsInline>
                <source src={card.video} type="video/mp4" />
              </video>
            ) : (
              <img src={card.img} alt={card.brand} />
            )}
            <div className="expand-card-overlay">
              <div className="expand-card-brand">{card.brand}</div>
              {card.sub && <div className="expand-card-sub">{card.sub}</div>}
              <div className="expand-card-cta">Voir la collection →</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
