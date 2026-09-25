import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useAudio } from "../audio/AudioProvider";

interface LoveLetterProps {
  from: string;
  to: string;
  paragraphs: string[];
}

export default function LoveLetter({ from, to, paragraphs }: LoveLetterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const [open, setOpen] = useState(false);
  const { playSfx } = useAudio();
  const firstName = to.split(" ")[0];

  const openLetter = () => {
    playSfx("paper");
    setOpen(true);
  };

  const closeLetter = () => {
    playSfx("paper");
    setOpen(false);
  };

  return (
    <section id="letter" ref={ref} className="flex scroll-mt-16 flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-8 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:mb-10 sm:max-w-none sm:text-4xl"
      >
        A letter, written just for {firstName}
      </motion.h2>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="envelope"
            type="button"
            onClick={openLetter}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.88, y: -18, rotateX: 40 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-40 w-[240px] flex-col items-center justify-end pb-5 sm:h-44 sm:w-64"
            aria-label="Open the letter"
          >
            <motion.div
              className="absolute inset-0 rounded-xl bg-gold/25 blur-xl"
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-gold/40 bg-gradient-to-b from-[#F4E3C6] to-[#E0B87A] shadow-2xl">
              <div className="absolute inset-x-6 bottom-7 top-10 rounded-sm bg-cream/80" />
              <motion.div
                className="absolute inset-x-0 top-0 z-10 h-[58%] origin-top bg-gradient-to-b from-[#F8EBD6] to-[#D4A574]"
                style={{ clipPath: "polygon(0 0, 50% 78%, 100% 0)" }}
                animate={{ rotateX: [0, -18, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <Heart
                size={20}
                className="absolute left-1/2 top-[40%] z-20 -translate-x-1/2 fill-rose text-rose"
              />
            </div>
            <span className="relative z-20 mt-3 font-body text-sm font-semibold text-blossom">
              Tap to open the letter
            </span>
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute -right-2 -top-2 z-20"
            >
              <Heart size={22} className="fill-rose text-rose" />
            </motion.span>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            initial={{ opacity: 0, y: 36, rotateX: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-sm border border-gold/30 bg-[#FBF3EC] px-5 py-6 shadow-2xl sm:px-9 sm:py-9"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, rgba(196,65,92,0.08) 28px)",
            }}
          >
            <p className="mb-5 font-display text-xl italic text-plum-deep">
              My Dearest {firstName},
            </p>

            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.22, duration: 0.55 }}
                className="mb-4 font-body text-[15px] leading-relaxed text-plum-deep/90 sm:text-base"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + paragraphs.length * 0.22 + 0.35, duration: 0.7 }}
              className="mt-6 text-right font-script text-[1.65rem] leading-snug text-rose sm:text-3xl"
            >
              Forever yours,
              <br />
              {from} {"\u2764\uFE0F"}
            </motion.p>

            {[0, 1, 2, 3].map((i) => (
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

            <button
              type="button"
              onClick={closeLetter}
              className="relative z-10 mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-plum-deep/20 px-4 py-2 font-body text-sm text-plum-deep"
            >
              <RotateCcw size={14} />
              Close and open again
            </button>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
