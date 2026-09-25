import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import StarField from "./StarField";

interface OpeningScreenProps {
  onOpen: () => void;
  girlfriendName: string;
}

/** The very first thing she sees: a dreamy envelope scene with one glowing button. */
export default function OpeningScreen({ onOpen, girlfriendName }: OpeningScreenProps) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-plum-deep via-plum to-plum-light px-6 text-center"
    >
      <StarField count={55} />

      {/* soft glow behind the envelope */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-rose/30 blur-3xl" />

      <motion.p
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative font-display text-2xl italic text-blossom sm:text-3xl"
      >
        Hey, My Love {girlfriendName.split(" ")[0]} 💖
      </motion.p>

      <motion.button
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: "backOut" }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open your surprise"
        className="relative my-10 flex h-40 w-52 flex-col items-center justify-center rounded-2xl border border-gold/50 bg-plum-light/60 shadow-2xl backdrop-blur-sm animate-pulseGlow sm:h-48 sm:w-64"
      >
        <Sparkles className="absolute -top-4 -left-4 text-gold animate-twinkle" size={22} />
        <Sparkles className="absolute -bottom-3 -right-3 text-blossom animate-twinkle" size={18} />
        <Mail className="text-gold" size={54} strokeWidth={1.3} />
        <span className="mt-4 font-body text-sm tracking-wide text-cream/90 sm:text-base">
          A little world, made just for you
        </span>
      </motion.button>

      <motion.button
        onClick={onOpen}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        whileTap={{ scale: 0.95 }}
        className="relative rounded-full bg-rose px-8 py-3 font-body text-base font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light"
      >
        Open Your Surprise
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="relative mt-8 font-body text-xs text-lavender"
      >
        best with sound on
      </motion.p>
    </motion.div>
  );
}
