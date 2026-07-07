import { useMemo } from "react";
import "./FloatingHearts.css";

interface Props {
  active: boolean;
}

interface Petal {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
}

export default function FloatingHearts({ active }: Props) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.18 + Math.random() * 0.25,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="petals" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="var(--wine-glow)"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
