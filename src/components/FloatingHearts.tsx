import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface FloatingHeartsProps {
  ambient?: boolean;
  density?: number;
  interactive?: boolean;
  className?: string;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

let idCounter = 0;

export default function FloatingHearts({
  ambient = true,
  density = 10,
  interactive = false,
  className = "",
}: FloatingHeartsProps) {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const ambientItems = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : density }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 7,
        size: Math.random() * 10 + 14,
        isHeart: i % 3 === 0,
      })),
    [density, reduced]
  );

  const handleTap = useCallback((e: MouseEvent) => {
    const id = idCounter++;
    const x = e.clientX;
    const y = e.clientY;
    setBursts((prev) => [...prev, { id, x, y }]);

    const pieces: Spark[] = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.4;
      const dist = 28 + Math.random() * 26;
      return {
        id: idCounter++,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 18,
      };
    });
    setSparks((prev) => [...prev, ...pieces]);

    window.setTimeout(() => {
      setBursts((prev) => prev.filter((t) => t.id !== id));
    }, 900);
    window.setTimeout(() => {
      const ids = new Set(pieces.map((p) => p.id));
      setSparks((prev) => prev.filter((s) => !ids.has(s.id)));
    }, 1100);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    document.addEventListener("click", handleTap);
    return () => document.removeEventListener("click", handleTap);
  }, [interactive, handleTap]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {ambient &&
        ambientItems.map((item) => (
          <span
            key={item.id}
            className="absolute top-0 animate-drift opacity-80"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            {item.isHeart ? (
              <Heart size={item.size} className="fill-rose-light text-rose-light drop-shadow animate-heartbeat" />
            ) : (
              <svg width={item.size} height={item.size * 1.25} viewBox="0 0 20 26" className="drop-shadow">
                <path
                  d="M10 2 C 4 8 2 14 6 20 C 8 24 10 25 10 25 C 10 25 12 24 14 20 C 18 14 16 8 10 2 Z"
                  fill="#E88BA0"
                  opacity="0.85"
                />
              </svg>
            )}
          </span>
        ))}

      <AnimatePresence>
        {bursts.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            style={{ position: "fixed", left: t.x - 12, top: t.y - 12 }}
          >
            <Heart size={24} className="fill-rose text-rose" />
          </motion.span>
        ))}
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.7 }}
            animate={{ opacity: 0, x: s.dx, y: s.dy, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
            style={{ position: "fixed", left: s.x - 8, top: s.y - 8 }}
          >
            <Heart size={14} className="fill-rose-light text-rose-light" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
