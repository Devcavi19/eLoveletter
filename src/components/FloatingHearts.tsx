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
              d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5.2 5.3 5c2-.1 3.4 1 4.7 2.6C11.3 6 12.7 5 14.7 5 18 5.2 19.6 8.6 22 11.8 19.5 16.4 12 21 12 21Z"
              fill="var(--wine-glow)"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
