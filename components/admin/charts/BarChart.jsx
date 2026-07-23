import { useState } from "react";

const COLOR = "#B8863E"; // hue or 1 (magnitude, un seul hue) — validé (voir dataviz)

export default function BarChart({ data, color = COLOR }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...data.map((d) => d.value));

  if (data.length === 0) {
    return <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Aucune donnée pour cette période.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const isHover = hover === i;
        return (
          <div
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "default" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4 }}>
              <span style={{ color: "var(--dark)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
                {d.label}
              </span>
              <strong style={{ fontWeight: 600 }}>{d.value}</strong>
            </div>
            <div style={{ height: 10, background: "var(--bg)", borderRadius: 5, overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`, height: "100%", background: color, borderRadius: 5,
                  transition: "opacity .2s ease", opacity: isHover ? 0.8 : 1,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
