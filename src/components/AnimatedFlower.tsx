import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** A hand-drawn SVG flower that grows its stem, sprouts leaves, then blooms petal by petal. */
export default function AnimatedFlower() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const play = inView || reduced;

  return (
    <div ref={ref} className="relative flex flex-col items-center py-16">
      <h2 className="mb-8 text-center font-display text-3xl italic text-blossom sm:text-4xl">
        A garden grew, just for you
      </h2>

      <div className="relative h-80 w-72 sm:h-96 sm:w-80">
        {/* glow behind bloom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={play ? { opacity: [0, 0.6, 0.4] } : {}}
          transition={{ delay: 2.2, duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-blossom/40 blur-3xl"
        />

        <svg viewBox="0 0 240 320" className="relative h-full w-full overflow-visible">
          {/* stem */}
          <motion.path
            d="M120 300 C 118 230, 122 170, 120 110"
            fill="none"
            stroke="#4E8B5C"
            strokeWidth={5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* leaves */}
          {[
            { d: "M120 230 C 80 220, 55 245, 45 275 C 90 270, 115 255, 120 230 Z", delay: 1.2 },
            { d: "M120 190 C 160 180, 185 200, 195 230 C 150 228, 125 215, 120 190 Z", delay: 1.5 },
          ].map((leaf, i) => (
            <motion.path
              key={i}
              d={leaf.d}
              fill="#5FA86C"
              initial={{ opacity: 0, scale: 0 }}
              animate={play ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: leaf.delay, duration: 0.6, ease: "backOut" }}
              style={{ transformOrigin: "120px 210px" }}
            />
          ))}

          {/* petals, blooming one after another */}
          <g transform="translate(120 108)">
            {PETAL_ANGLES.map((angle, i) => (
              <motion.ellipse
                key={angle}
                cx={0}
                cy={-34}
                rx={16}
                ry={30}
                fill={i % 2 === 0 ? "#E88BA0" : "#F6C9D0"}
                initial={{ scale: 0, opacity: 0 }}
                animate={play ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.9 + i * 0.12, duration: 0.5, ease: "backOut" }}
                style={{ transform: `rotate(${angle}deg)`, transformOrigin: "0px 0px" }}
              />
            ))}
            {/* center */}
            <motion.circle
              cx={0}
              cy={0}
              r={14}
              fill="#E8B978"
              initial={{ scale: 0 }}
              animate={play ? { scale: 1 } : {}}
              transition={{ delay: 2.9, duration: 0.5, ease: "backOut" }}
            />
          </g>
        </svg>

        {/* soft sparkles around the bloom */}
        {!reduced &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-gold"
              style={{
                top: `${18 + Math.random() * 30}%`,
                left: `${30 + Math.random() * 40}%`,
                boxShadow: "0 0 8px 2px rgba(232,185,120,0.8)",
              }}
              initial={{ opacity: 0 }}
              animate={play ? { opacity: [0, 1, 0], y: [0, -16, -30] } : {}}
              transition={{
                delay: 3.2 + i * 0.3,
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            />
          ))}
      </div>
    </div>
  );
}
