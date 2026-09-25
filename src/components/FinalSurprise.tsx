import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FinalSurpriseProps {
  name: string;
  from: string;
}

/** The closing scene: a heartbeat glow, the final message, and one last surprise button. */
export default function FinalSurprise({ name, from }: FinalSurpriseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [revealed, setRevealed] = useState(false);

  return (
    <div ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="relative mb-8"
      >
        <div className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-rose/30 blur-3xl" />
        <Heart size={96} className="relative fill-rose text-rose animate-heartbeat drop-shadow-xl" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-display text-3xl italic text-blossom sm:text-4xl"
      >
        I Love You, {name} ❤️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 max-w-xs font-body text-sm text-lavender sm:text-base"
      >
        thank you for being the softest, warmest part of my world
      </motion.p>

      {!revealed && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setRevealed(true)}
          className="mt-10 rounded-full bg-rose px-7 py-3 font-body text-sm font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light sm:text-base"
        >
          One More Surprise 💝
        </motion.button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            className="mt-10 max-w-xs rounded-2xl border border-gold/40 bg-plum-light/60 px-6 py-6 shadow-2xl backdrop-blur-sm"
          >
            <p className="font-script text-2xl text-blossom">
              wherever you are, that's my favorite place to be
            </p>
            <p className="mt-3 font-body text-xs text-lavender">— {from}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
