import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FinalSurpriseProps {
  name: string;
  from: string;
}

const PETALS = [
  { left: "8%", delay: 0, duration: 10, size: 14 },
  { left: "22%", delay: 1.5, duration: 12, size: 18 },
  { left: "40%", delay: 0.6, duration: 9, size: 12 },
  { left: "58%", delay: 2.2, duration: 11, size: 16 },
  { left: "74%", delay: 1.1, duration: 13, size: 13 },
  { left: "88%", delay: 2.8, duration: 10, size: 17 },
  { left: "32%", delay: 3.4, duration: 11, size: 11 },
  { left: "66%", delay: 0.3, duration: 9.5, size: 15 },
];

export default function FinalSurprise({ name, from }: FinalSurpriseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 animate-drift"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
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

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.85, ease: "backOut" }}
        className="relative mb-8"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 scale-[1.8] rounded-full bg-rose/40 blur-3xl"
          animate={inView ? { opacity: [0.4, 0.85, 0.4], scale: [1.6, 1.95, 1.6] } : {}}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
        <Heart size={108} className="relative fill-rose text-rose animate-heartbeat drop-shadow-xl" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="max-w-[18rem] font-display text-[1.85rem] italic leading-tight text-blossom sm:max-w-lg sm:text-4xl"
      >
        I Love You, {name} {"\u2764\uFE0F"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.75, duration: 0.8 }}
        className="mt-4 max-w-xs font-body text-sm text-lavender sm:text-base"
      >
        thank you for being the softest, warmest part of my world
      </motion.p>

      {!revealed && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.15, duration: 0.7 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setRevealed(true)}
          className="mt-10 min-h-[48px] rounded-full bg-rose px-7 py-3 font-body text-sm font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light sm:text-base"
        >
          One More Surprise {"\uD83D\uDC9D"}
        </motion.button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            className="mt-10 w-full max-w-sm rounded-2xl border border-gold/40 bg-plum-light/70 px-6 py-7 shadow-2xl backdrop-blur-sm"
          >
            <p className="font-display text-xl italic leading-relaxed text-blossom">
              Jennifer, if I could bottle this feeling and give it to you, I would. You are my favorite person, my
              sweetest thought, and the reason ordinary days feel like magic. I hope this little world reminds you,
              every time you open it, that you are deeply loved.
            </p>
            <p className="mt-5 font-script text-2xl text-rose">
              Always, {from} {"\u2764\uFE0F"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
