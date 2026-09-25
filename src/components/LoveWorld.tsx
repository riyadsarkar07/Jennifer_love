import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { LOVE_WORLD_SCENES } from "../data/loveWorld";
import { CoupleScene } from "../illustrations/CoupleArt";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FLOATING = [
  { top: "8%", left: "8%", size: 12, delay: 0 },
  { top: "14%", left: "90%", size: 14, delay: 0.5 },
  { top: "78%", left: "6%", size: 11, delay: 1 },
  { top: "84%", left: "92%", size: 13, delay: 0.3 },
];

export default function LoveWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();

  return (
    <section
      id="love-world"
      ref={ref}
      className="relative flex scroll-mt-32 flex-col items-center overflow-hidden px-4 py-16 sm:py-20"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-rose/25 blur-3xl sm:h-64 sm:w-64"
        animate={reduced ? { opacity: 0.4 } : { opacity: [0.28, 0.6, 0.28], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduced &&
        FLOATING.map((h, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute"
            style={{ top: h.top, left: h.left }}
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3.2 + i * 0.2, repeat: Infinity, delay: h.delay }}
          >
            <Heart size={h.size} className="fill-rose-light text-rose-light" />
          </motion.span>
        ))}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-2 max-w-[20rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-none sm:text-4xl"
      >
        Our Little Love World {"\u2764\uFE0F"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 mb-8 max-w-[20rem] text-center font-body text-sm text-lavender sm:max-w-md sm:text-base"
      >
        Tiny drawings of us, made with all my heart.
      </motion.p>

      <div className="relative z-10 grid w-full max-w-md grid-cols-1 gap-4 sm:max-w-3xl sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4">
        {LOVE_WORLD_SCENES.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: reduced ? 0 : 0.08 + i * 0.08, duration: 0.55, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-gold/30 bg-blossom/20 shadow-lg shadow-rose/10 backdrop-blur-sm"
          >
            <div className="aspect-[10/11] w-full min-h-[220px]">
              <CoupleScene scene={item.scene} />
            </div>
            <p className="px-3 py-3 text-center font-display text-sm italic leading-snug text-blossom sm:text-base">
              {item.caption} <span className="text-rose-light">{"\u2764\uFE0F"}</span>
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
