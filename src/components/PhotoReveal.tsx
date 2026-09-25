import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

interface PhotoRevealProps {
  name: string;
  src?: string;
  caption?: string;
}

const ORBIT = [
  { top: "-6%", left: "82%", size: 18, delay: 0 },
  { top: "38%", left: "-12%", size: 16, delay: 0.5 },
  { top: "88%", left: "74%", size: 14, delay: 1 },
  { top: "8%", left: "-8%", size: 12, delay: 1.4 },
  { top: "70%", left: "96%", size: 15, delay: 0.8 },
];

export default function PhotoReveal({
  name,
  src = "/jennifer.jpg",
  caption = "You make my world brighter",
}: PhotoRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [failed, setFailed] = useState(false);

  return (
    <section ref={ref} className="flex flex-col items-center overflow-hidden px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center font-display text-[1.7rem] italic text-blossom sm:text-4xl"
      >
        {name}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mb-10 max-w-[16rem] text-center font-body text-sm text-lavender sm:max-w-xs sm:text-base"
      >
        {caption} <span className="text-rose-light">{"\u2764\uFE0F"}</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.78 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/45 blur-3xl sm:h-80 sm:w-80"
          animate={inView ? { opacity: [0.45, 0.85, 0.45], scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="jenniferHeartClip" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.92 C0.08,0.62 -0.05,0.32 0.18,0.12 C0.32,0.0 0.45,0.06 0.5,0.22 C0.55,0.06 0.68,0.0 0.82,0.12 C1.05,0.32 0.92,0.62 0.5,0.92 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative h-[270px] w-[250px] sm:h-[340px] sm:w-[320px]">
          <div
            className="absolute inset-0 bg-gold/90"
            style={{
              clipPath: "url(#jenniferHeartClip)",
              filter: "drop-shadow(0 0 22px rgba(232,137,160,0.85))",
            }}
          />
          <div
            className="absolute inset-[7px] overflow-hidden bg-plum-light sm:inset-[8px]"
            style={{ clipPath: "url(#jenniferHeartClip)" }}
          >
            {!failed ? (
              <motion.img
                src={src}
                alt={name}
                onError={() => setFailed(true)}
                initial={{ scale: 1.12 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 18%" }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-lavender via-blossom to-rose-light text-center">
                <Heart size={48} className="text-cream/90" />
                <p className="px-6 font-body text-sm text-plum-deep/80">
                  Add her photo at{" "}
                  <code className="rounded bg-cream/60 px-1">public/jennifer.jpg</code>
                </p>
              </div>
            )}
          </div>
        </div>

        {ORBIT.map((h, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{ top: h.top, left: h.left }}
            animate={inView ? { y: [0, -10, 0], opacity: [0.55, 1, 0.55], scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, delay: h.delay }}
          >
            <Heart size={h.size} className="fill-rose-light text-rose-light drop-shadow" />
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
