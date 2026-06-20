import meadow from "@/assets/meadow-bg.jpg";
import nature from "@/assets/nature-bg.jpg";

const BG = { meadow, nature } as const;

type Variant = keyof typeof BG;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function NatureBackdrop({ variant = "nature" }: { variant?: Variant }) {
  const birds = Array.from({ length: 9 });
  const flowers = Array.from({ length: 18 });
  return (
    <>
      <div
        className="nature-bg"
        style={{ ["--nature-image" as never]: `url(${BG[variant]})` }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {birds.map((_, i) => {
          const top = rand(5, 70);
          const dur = rand(18, 38);
          const delay = rand(-30, 0);
          const scale = rand(0.5, 1.2);
          return (
            <span
              key={`b${i}`}
              className="fly-bird absolute text-aurora"
              style={{
                top: `${top}%`,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                ["--s" as never]: scale,
                fontSize: `${rand(18, 32)}px`,
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))",
              }}
              aria-hidden
            >
              <Bird />
            </span>
          );
        })}
        {flowers.map((_, i) => {
          const left = rand(0, 100);
          const dur = rand(14, 30);
          const delay = rand(-30, 0);
          const size = rand(14, 28);
          const emoji = ["🌸", "🌼", "🌺", "🍃", "🌿", "🦋", "🌷", "🌻"][i % 8];
          return (
            <span
              key={`f${i}`}
              className="drift absolute"
              style={{
                left: `${left}%`,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                fontSize: `${size}px`,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))",
              }}
              aria-hidden
            >
              {emoji}
            </span>
          );
        })}
      </div>
    </>
  );
}

function Bird() {
  return (
    <svg viewBox="0 0 64 32" width="1em" height="0.5em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22 C 14 4, 22 4, 32 18 C 42 4, 50 4, 62 22" />
    </svg>
  );
}