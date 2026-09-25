import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface FloatingHeartsProps {
  /** Ambient petals/hearts drifting down continuously. */
  ambient?: boolean;
  density?: number;
  /** If true, tapping anywhere in this layer spawns a heart burst. */
  interactive?: boolean;
  className?: string;
}

let idCounter = 0;

/**
 * Ambient falling rose petals + floating hearts, and/or a tap layer that
 * spawns little hearts wherever the person taps.
 */
export default function FloatingHearts({
  ambient = true,
  density = 10,
  interactive = false,
  className = "",
}: FloatingHeartsProps) {
  const reduced = useReducedMotion();
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);

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
    setTaps((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    window.setTimeout(() => {
      setTaps((prev) => prev.filter((t) => t.id !== id));
    }, 1200);
  }, []);

  // Listen on the whole document so taps still spawn hearts without this
  // layer intercepting (and thus blocking) real buttons underneath it.
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
              <Heart
                size={item.size}
                className="fill-rose-light text-rose-light drop-shadow"
              />
            ) : (
              <svg width={item.size} height={item.size} viewBox="0 0 24 24" className="drop-shadow">
                <path
                  d="M12 2c3 4-2 6-2 10 0 4 4 6 2 10-3-4 2-6 2-10 0-4-4-6-2-10z"
                  fill="#E88BA0"
                  opacity="0.85"
                />
              </svg>
            )}
          </span>
        ))}

      <AnimatePresence>
        {taps.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 1, scale: 0.4, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -70 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ position: "absolute", left: t.x - 10, top: t.y - 10 }}
          >
            <Heart size={22} className="fill-rose text-rose" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
