import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useAudio } from "../audio/AudioProvider";

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
  { left: "8%", delay: 0, duration: 9, size: 18, rotate: -12 },
  { left: "22%", delay: 1.4, duration: 11, size: 22, rotate: 18 },
  { left: "38%", delay: 2.2, duration: 8, size: 16, rotate: -8 },
  { left: "55%", delay: 0.6, duration: 10, size: 20, rotate: 14 },
  { left: "70%", delay: 3, duration: 12, size: 17, rotate: -16 },
  { left: "84%", delay: 1.8, duration: 9.5, size: 21, rotate: 10 },
  { left: "46%", delay: 4, duration: 11, size: 15, rotate: -20 },
  { left: "92%", delay: 2.6, duration: 10, size: 19, rotate: 8 },
];

const RINGS = [
  { src: "/rose/ring-outer.png", delay: 0, from: 0.42, z: 1 },
  { src: "/rose/ring-mid.png", delay: 0.45, from: 0.52, z: 2 },
  { src: "/rose/ring-inner.png", delay: 0.9, from: 0.62, z: 3 },
  { src: "/rose/ring-center.png", delay: 1.3, from: 0.72, z: 4 },
] as const;

export default function AnimatedFlower() {
  const ref = useRef<HTMLDivElement>(null);
  const bloomed = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();
  const play = inView || reduced;
  const bloomStart = reduced ? 0 : 1.7;

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
          animate={play ? { opacity: [0, 0.75, 0.42] } : {}}
          transition={{ delay: bloomStart + 1.2, duration: 2.4, repeat: Infinity, repeatType: "mirror" }}
          className="absolute left-1/2 top-[6%] h-48 w-48 -translate-x-1/2 rounded-full bg-rose/40 blur-3xl sm:h-56 sm:w-56"
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
              <img
                src="/rose/petal-fall.png"
                alt=""
                width={p.size}
                height={Math.round(p.size * 1.27)}
                className="select-none opacity-80"
                style={{ transform: `rotate(${p.rotate}deg)` }}
                draggable={false}
              />
            </span>
          ))}

        <motion.div
          className="relative h-full w-full"
          initial={false}
          animate={play && !reduced ? { rotate: [0, 1.4, -1.1, 0.7, 0] } : {}}
          transition={{ delay: bloomStart + 2.4, duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-4 w-28 -translate-x-1/2 rounded-full bg-black/45 blur-md" />

          <motion.img
            src="/rose/stem.png"
            alt=""
            draggable={false}
            className="pointer-events-none absolute bottom-[3%] left-1/2 z-0 h-[68%] w-auto -translate-x-1/2 select-none object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 28, scaleY: 0.2 }}
            animate={play ? { opacity: 1, y: 0, scaleY: 1 } : {}}
            transition={{ duration: reduced ? 0.2 : 1.55, ease: "easeOut" }}
            style={{ transformOrigin: "50% 100%" }}
          />

          <div
            className="absolute left-1/2 top-[1%] z-10 w-[86%] -translate-x-1/2 sm:top-0 sm:w-[90%]"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 78% at 50% 52%, #000 64%, transparent 82%)",
              maskImage:
                "radial-gradient(ellipse 78% 78% at 50% 52%, #000 64%, transparent 82%)",
            }}
          >
            {RINGS.map((ring) => (
              <motion.img
                key={ring.src}
                src={ring.src}
                alt=""
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
                style={{ zIndex: ring.z }}
                initial={{ opacity: 0, scale: ring.from }}
                animate={
                  play
                    ? {
                        opacity: 1,
                        scale: 1,
                        rotate: reduced ? 0 : [0, 1.2, -0.8, 0],
                      }
                    : {}
                }
                transition={{
                  opacity: {
                    delay: reduced ? 0 : bloomStart + ring.delay,
                    duration: reduced ? 0.2 : 0.85,
                  },
                  scale: {
                    delay: reduced ? 0 : bloomStart + ring.delay,
                    duration: reduced ? 0.2 : 1.15,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  rotate: {
                    delay: bloomStart + 2.6 + ring.delay,
                    duration: 7.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}

            <motion.img
              src="/rose/bloom.png"
              alt="A blooming red rose"
              draggable={false}
              className="relative z-[5] h-auto w-full select-none object-contain drop-shadow-[0_12px_28px_rgba(196,65,92,0.35)]"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={play ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: reduced ? 0 : bloomStart + 1.55,
                duration: reduced ? 0.25 : 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </motion.div>

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
