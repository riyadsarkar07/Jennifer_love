import { useMemo } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface StarFieldProps {
  count?: number;
  className?: string;
}

/** Soft twinkling stars and glowing dust used behind hero moments. */
export default function StarField({ count = 40, className = "" }: StarFieldProps) {
  const reduced = useReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2.5,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className={reduced ? "absolute rounded-full bg-cream/70" : "absolute rounded-full bg-cream/70 animate-twinkle"}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px 1px rgba(251,243,236,0.6)",
          }}
        />
      ))}
    </div>
  );
}
