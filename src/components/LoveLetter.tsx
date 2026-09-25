import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";

interface LoveLetterProps {
  from: string;
  to: string;
  paragraphs: string[];
}

/** Tap the envelope, watch it open, then the full letter unfolds beneath it. */
export default function LoveLetter({ from, to, paragraphs }: LoveLetterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="flex flex-col items-center px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center font-display text-3xl italic text-blossom sm:text-4xl"
      >
        A letter, written just for {to.split(" ")[0]}
      </motion.h2>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="envelope"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-44 w-64 flex-col items-center justify-center gap-3 rounded-lg border border-gold/50 bg-gradient-to-b from-cream to-blossom shadow-2xl"
            aria-label="Open the letter"
          >
            <div className="absolute inset-x-0 top-0 h-1/2 border-b border-rose/30" style={{ clipPath: "polygon(0 0, 50% 65%, 100% 0)" }} />
            <Mail size={40} className="text-rose" strokeWidth={1.4} />
            <span className="font-body text-sm font-semibold text-plum">Tap to open the letter</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute -right-3 -top-3"
            >
              <Heart size={22} className="fill-rose text-rose" />
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-sm border border-gold/30 bg-cream p-6 shadow-2xl sm:p-9"
            style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(196,65,92,0.08) 28px)" }}
          >
            <p className="mb-5 font-display text-xl italic text-plum-deep">My Dearest {to.split(" ")[0]},</p>

            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
                className="mb-4 font-body text-[15px] leading-relaxed text-plum-deep/90 sm:text-base"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + paragraphs.length * 0.25 + 0.4, duration: 0.7 }}
              className="mt-6 text-right font-script text-3xl text-rose"
            >
              Forever yours, {from} ❤️
            </motion.p>

            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute"
                style={{ top: `${10 + i * 20}%`, right: `${-4 + (i % 2) * 90}%` }}
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                <Heart size={14} className="fill-rose-light text-rose-light" />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
