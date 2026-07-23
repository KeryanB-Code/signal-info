/**
 * EnhancedMarquee — bande défilante avec masques flou aux bords + pause hover.
 * Usage: <EnhancedMarquee items={["Cartier", "Fred", ...]} speed={30} />
 */
export default function EnhancedMarquee({ items = [], speed = 28, gap = 64, renderItem }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: gap,
          alignItems: "center",
          width: "max-content",
          animation: `marqueeSlide ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) =>
          renderItem ? (
            renderItem(item, i)
          ) : (
            <span
              key={i}
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.1rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gray-light)",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--sand-dark)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--gray-light)")}
            >
              {item}
            </span>
          )
        )}
      </div>

      <style>{`
        @keyframes marqueeSlide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
