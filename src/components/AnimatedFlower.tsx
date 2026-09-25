import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useAudio } from "../audio/AudioProvider";

const OUTER_PETALS = [
  { rotate: 0, delay: 0 },
  { rotate: 72, delay: 0.1 },
  { rotate: 144, delay: 0.2 },
  { rotate: 216, delay: 0.3 },
  { rotate: 288, delay: 0.4 },
];

const MID_PETALS = [
  { rotate: 36, delay: 0.5 },
  { rotate: 108, delay: 0.58 },
  { rotate: 180, delay: 0.66 },
  { rotate: 252, delay: 0.74 },
  { rotate: 324, delay: 0.82 },
];

const INNER_PETALS = [
  { rotate: 12, delay: 0.9 },
  { rotate: 84, delay: 0.96 },
  { rotate: 156, delay: 1.02 },
  { rotate: 228, delay: 1.08 },
  { rotate: 300, delay: 1.14 },
];

const SPARKLES = [
  { top: "8%", left: "28%", delay: 0 },
  { top: "14%", left: "70%", delay: 0.4 },
  { top: "22%", left: "18%", delay: 0.8 },
  { top: "6%", left: "52%", delay: 1.1 },
  { top: "28%", left: "78%", delay: 0.2 },
  { top: "18%", left: "42%", delay: 1.5 },
  { top: "32%", left: "32%", delay: 0.6 },
  { top: "10%", left: "84%", delay: 1.3 },
];

const FALLING_PETALS = [
  { left: "8%", delay: 0, duration: 9, size: 14 },
  { left: "22%", delay: 1.4, duration: 11, size: 18 },
  { left: "38%", delay: 2.2, duration: 8, size: 12 },
  { left: "55%", delay: 0.6, duration: 10, size: 16 },
  { left: "70%", delay: 3, duration: 12, size: 13 },
  { left: "84%", delay: 1.8, duration: 9.5, size: 17 },
  { left: "46%", delay: 4, duration: 11, size: 11 },
  { left: "92%", delay: 2.6, duration: 10, size: 15 },
];

function RosePetal({
  fill,
  scale = 1,
}: {
  fill: string;
  scale?: number;
}) {
  return (
    <path
      d="M0 6 C -6 4 -16 -6 -18 -26 C -20 -46 -10 -60 0 -68 C 10 -60 20 -46 18 -26 C 16 -6 6 4 0 6 Z"
      fill={fill}
      transform={`scale(${scale})`}
      stroke="rgba(196,65,92,0.18)"
      strokeWidth={0.6}
    />
  );
}

export default function AnimatedFlower() {
  const ref = useRef<HTMLDivElement>(null);
  const bloomed = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();
  const play = inView || reduced;
  const bloomStart = reduced ? 0 : 2.15;

  useEffect(() => {
    if (!inView || bloomed.current) return;
    bloomed.current = true;
    const delay = reduced ? 80 : 2200;
    const id = window.setTimeout(() => playSfx("bloom"), delay);
    return () => window.clearTimeout(id);
  }, [inView, playSfx, reduced]);

  return (
    <section
      id="garden"
      ref={ref}
      className="relative flex scroll-mt-32 flex-col items-center overflow-hidden px-4 py-14 sm:py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-4 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:mb-6 sm:max-w-none sm:text-4xl"
      >
        A garden grew, just for you
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 mb-6 max-w-xs text-center font-body text-sm text-lavender sm:mb-8"
      >
        watch this rose bloom, petal by petal
      </motion.p>

      <div className="relative h-[420px] w-[min(92vw,340px)] sm:h-[520px] sm:w-[400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={play ? { opacity: [0, 0.7, 0.45] } : {}}
          transition={{ delay: bloomStart + 1.2, duration: 2.4, repeat: Infinity, repeatType: "mirror" }}
          className="absolute left-1/2 top-[8%] h-48 w-48 -translate-x-1/2 rounded-full bg-rose/35 blur-3xl sm:h-56 sm:w-56"
        />

        {!reduced &&
          FALLING_PETALS.map((p, i) => (
            <span
              key={i}
              className="pointer-events-none absolute top-0 animate-drift"
              style={{
                left: p.left,
                animationDelay: `${p.delay + 3.5}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              <svg width={p.size} height={p.size * 1.3} viewBox="0 0 20 26">
                <path
                  d="M10 2 C 4 8 2 14 6 20 C 8 24 10 25 10 25 C 10 25 12 24 14 20 C 18 14 16 8 10 2 Z"
                  fill={i % 2 === 0 ? "#E88BA0" : "#C4415C"}
                  opacity="0.75"
                />
              </svg>
            </span>
          ))}

        <motion.svg
          viewBox="0 0 280 400"
          className="relative h-full w-full overflow-visible"
          initial={false}
          animate={play && !reduced ? { rotate: [0, 1.6, -1.2, 0.8, 0] } : {}}
          transition={{ delay: bloomStart + 2.4, duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3E7A4A" />
              <stop offset="50%" stopColor="#5FA86C" />
              <stop offset="100%" stopColor="#3E7A4A" />
            </linearGradient>
            <radialGradient id="petalOuter" cx="50%" cy="72%" r="70%">
              <stop offset="0%" stopColor="#FBE4E8" />
              <stop offset="40%" stopColor="#F6C9D0" />
              <stop offset="78%" stopColor="#E88BA0" />
              <stop offset="100%" stopColor="#C4415C" />
            </radialGradient>
            <radialGradient id="petalMid" cx="50%" cy="70%" r="68%">
              <stop offset="0%" stopColor="#FFF5F6" />
              <stop offset="45%" stopColor="#F6C9D0" />
              <stop offset="100%" stopColor="#D45A74" />
            </radialGradient>
            <radialGradient id="petalInner" cx="50%" cy="68%" r="65%">
              <stop offset="0%" stopColor="#FFF8F6" />
              <stop offset="50%" stopColor="#E88BA0" />
              <stop offset="100%" stopColor="#B8324E" />
            </radialGradient>
            <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F6E3A1" />
              <stop offset="70%" stopColor="#E8B978" />
              <stop offset="100%" stopColor="#C48A3A" />
            </radialGradient>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7EC48A" />
              <stop offset="100%" stopColor="#3E7A4A" />
            </linearGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx="140" cy="388" rx="38" ry="8" fill="#1A0A1C" opacity="0.45" />

          <motion.path
            d="M140 388 C 136 300, 146 230, 140 148"
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={7}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : {}}
            transition={{ duration: reduced ? 0.2 : 1.7, ease: "easeInOut" }}
          />

          <motion.path
            d="M140 288 C 92 268, 58 292, 42 328 C 78 322, 118 308, 140 288 Z"
            fill="url(#leafGrad)"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              play
                ? { opacity: 1, scale: 1, rotate: reduced ? 0 : [0, -4, 2, 0] }
                : {}
            }
            transition={{
              opacity: { delay: reduced ? 0 : 1.15, duration: 0.55 },
              scale: { delay: reduced ? 0 : 1.15, duration: 0.7, ease: "backOut" },
              rotate: { delay: 4.2, duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformOrigin: "140px 288px" }}
          />
          <motion.path
            d="M140 248 C 188 228, 224 250, 238 286 C 200 282, 162 268, 140 248 Z"
            fill="url(#leafGrad)"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              play
                ? { opacity: 1, scale: 1, rotate: reduced ? 0 : [0, 4, -2, 0] }
                : {}
            }
            transition={{
              opacity: { delay: reduced ? 0 : 1.4, duration: 0.55 },
              scale: { delay: reduced ? 0 : 1.4, duration: 0.7, ease: "backOut" },
              rotate: { delay: 4.6, duration: 7.5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformOrigin: "140px 248px" }}
          />
          <motion.path
            d="M140 318 C 108 312, 86 328, 74 352 C 104 346, 128 334, 140 318 Z"
            fill="#4E8B5C"
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: reduced ? 0 : 1.65, duration: 0.55, ease: "backOut" }}
            style={{ transformOrigin: "140px 318px" }}
          />

          <g transform="translate(140 142)">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.g
                key={`sepal-${angle}`}
                transform={`rotate(${angle})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={play ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: reduced ? 0 : 1.85 + i * 0.06, duration: 0.4, ease: "backOut" }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <path
                  d="M0 4 C -7 0 -12 -16 -6 -30 C -2 -36 2 -36 6 -30 C 12 -16 7 0 0 4 Z"
                  fill="#3E7A4A"
                />
              </motion.g>
            ))}

            <motion.ellipse
              cx={0}
              cy={-10}
              rx={16}
              ry={22}
              fill="#C4415C"
              initial={{ scale: 0, opacity: 1 }}
              animate={play ? { scale: [0, 1, 1, 0.4], opacity: [0, 1, 1, 0] } : {}}
              transition={{ delay: reduced ? 0 : 2.0, duration: reduced ? 0.2 : 1.1, times: [0, 0.35, 0.7, 1] }}
            />

            {OUTER_PETALS.map((p) => (
              <g key={`outer-${p.rotate}`} transform={`rotate(${p.rotate})`}>
                <motion.g
                  initial={{ scale: 0.12, opacity: 0 }}
                  animate={play ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: reduced ? 0 : bloomStart + p.delay,
                    duration: reduced ? 0.2 : 0.7,
                    ease: "backOut",
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                  filter="url(#softGlow)"
                >
                  <RosePetal fill="url(#petalOuter)" scale={1.18} />
                </motion.g>
              </g>
            ))}

            {MID_PETALS.map((p) => (
              <g key={`mid-${p.rotate}`} transform={`rotate(${p.rotate})`}>
                <motion.g
                  initial={{ scale: 0.12, opacity: 0 }}
                  animate={play ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: reduced ? 0 : bloomStart + p.delay,
                    duration: reduced ? 0.2 : 0.65,
                    ease: "backOut",
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <RosePetal fill="url(#petalMid)" scale={0.92} />
                </motion.g>
              </g>
            ))}

            {INNER_PETALS.map((p) => (
              <g key={`inner-${p.rotate}`} transform={`rotate(${p.rotate})`}>
                <motion.g
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={play ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: reduced ? 0 : bloomStart + p.delay,
                    duration: reduced ? 0.2 : 0.55,
                    ease: "backOut",
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <RosePetal fill="url(#petalInner)" scale={0.62} />
                </motion.g>
              </g>
            ))}

            <motion.g
              initial={{ scale: 0 }}
              animate={play ? { scale: 1 } : {}}
              transition={{ delay: reduced ? 0 : bloomStart + 1.35, duration: 0.5, ease: "backOut" }}
            >
              <circle cx={0} cy={0} r={14} fill="url(#centerGrad)" />
              <circle cx={-4} cy={-3} r={2.2} fill="#FFF6D2" />
              <circle cx={5} cy={-2} r={1.8} fill="#FFF6D2" />
              <circle cx={1} cy={4} r={1.6} fill="#F6E3A1" />
              <circle cx={-6} cy={3} r={1.4} fill="#F6E3A1" />
              <circle cx={6} cy={4} r={1.3} fill="#FFF6D2" />
            </motion.g>
          </g>
        </motion.svg>

        {!reduced &&
          SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-gold"
              style={{
                top: s.top,
                left: s.left,
                boxShadow: "0 0 8px 2px rgba(232,185,120,0.85)",
              }}
              initial={{ opacity: 0 }}
              animate={play ? { opacity: [0, 1, 0], y: [0, -18, -34], scale: [0.6, 1.2, 0.4] } : {}}
              transition={{
                delay: bloomStart + 1.6 + s.delay,
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 1.2,
              }}
            />
          ))}
      </div>
    </section>
  );
}
