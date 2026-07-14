import { useEffect, useMemo, useRef, useState } from "react";

const PAD = { top: 16, right: 16, bottom: 28, left: 40 };

// Arrondit un maximum à un pas "propre" (1/2/5 × 10^n) pour les graduations Y.
function niceMax(value) {
  if (value <= 0) return 4;
  const exp = Math.floor(Math.log10(value));
  const base = Math.pow(10, exp);
  for (const step of [1, 2, 2.5, 5, 10]) {
    if (value <= step * base) return step * base;
  }
  return 10 * base;
}

function formatDay(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function LineChart({ data, series, height = 260 }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(600);
  const [hoverIdx, setHoverIdx] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const innerW = Math.max(width - PAD.left - PAD.right, 10);
  const innerH = height - PAD.top - PAD.bottom;

  const maxY = useMemo(() => {
    let m = 0;
    for (const row of data) {
      for (const s of series) m = Math.max(m, row[s.key] || 0);
    }
    return niceMax(m);
  }, [data, series]);

  const x = (i) => (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const y = (v) => innerH - (v / maxY) * innerH;

  const linePath = (key) =>
    data.map((row, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(row[key] || 0).toFixed(1)}`).join(" ");

  const yTicks = [0, maxY / 4, maxY / 2, (maxY * 3) / 4, maxY];

  // ~6 repères de date maximum sur l'axe X, quelle que soit la période.
  const xTickEvery = Math.max(1, Math.ceil(data.length / 6));

  const handleMove = (e) => {
    if (!data.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - PAD.left;
    const idx = Math.round((relX / innerW) * (data.length - 1));
    setHoverIdx(Math.min(Math.max(idx, 0), data.length - 1));
  };

  const hoverRow = hoverIdx != null ? data[hoverIdx] : null;
  const tooltipLeft = hoverIdx != null ? PAD.left + x(hoverIdx) : 0;
  const tooltipOnRight = tooltipLeft > width - 170;

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
        style={{ display: "block", overflow: "visible" }}
      >
        <g transform={`translate(${PAD.left},${PAD.top})`}>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={0} x2={innerW} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth={1} />
              <text x={-10} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="var(--gray)">
                {Math.round(t)}
              </text>
            </g>
          ))}

          {data.map((row, i) =>
            i % xTickEvery === 0 ? (
              <text key={i} x={x(i)} y={innerH + 18} textAnchor="middle" fontSize={10} fill="var(--gray)">
                {formatDay(row.date)}
              </text>
            ) : null
          )}

          {series.map((s) => (
            <path key={s.key} d={linePath(s.key)} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          ))}

          {series.map((s) => {
            const last = data[data.length - 1];
            if (!last) return null;
            return (
              <circle
                key={s.key}
                cx={x(data.length - 1)}
                cy={y(last[s.key] || 0)}
                r={4}
                fill={s.color}
                stroke="var(--white)"
                strokeWidth={2}
              />
            );
          })}

          {hoverIdx != null && (
            <line x1={x(hoverIdx)} x2={x(hoverIdx)} y1={0} y2={innerH} stroke="var(--gray-light)" strokeWidth={1} />
          )}
          {hoverIdx != null &&
            series.map((s) => (
              <circle key={s.key} cx={x(hoverIdx)} cy={y(hoverRow[s.key] || 0)} r={4} fill={s.color} stroke="var(--white)" strokeWidth={2} />
            ))}
        </g>
      </svg>

      {hoverRow && (
        <div
          style={{
            position: "absolute", top: PAD.top, left: tooltipOnRight ? tooltipLeft - 168 : tooltipLeft + 12,
            background: "var(--dark)", color: "white", padding: "10px 14px", fontSize: "0.78rem",
            minWidth: 150, pointerEvents: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ color: "var(--sand)", fontSize: "0.68rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>
            {formatDay(hoverRow.date)}
          </div>
          {series.map((s) => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ width: 10, height: 2, background: s.color, display: "inline-block" }} />
              <strong style={{ fontWeight: 600 }}>{hoverRow[s.key] || 0}</strong>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
        {series.map((s) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.75rem", color: "var(--gray)" }}>
            <span style={{ width: 12, height: 2, background: s.color, display: "inline-block" }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
