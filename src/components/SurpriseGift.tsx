import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Heart, RotateCcw } from "lucide-react";
import { useAudio } from "../audio/AudioProvider";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MESSAGE =
  "Surprise, my love! I wish I could be there beside you, holding your hand and making every moment unforgettable. Until then, this little gift carries all my love for you.";

const BURST = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.cos((Math.PI * 2 * i) / 10) * (70 + (i % 3) * 18),
  y: Math.sin((Math.PI * 2 * i) / 10) * (50 + (i % 2) * 20) - 30,
  heart: i % 2 === 0,
}));

export default function SurpriseGift() {
  const { playSfx } = useAudio();
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened || opening) return;
    setOpening(true);
    playSfx("sparkle");
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, reduced ? 80 : 750);
  };

  const replay = () => {
    setOpened(false);
    setOpening(false);
  };

  return (
    <section id="gift" className="relative flex scroll-mt-16 flex-col items-center overflow-hidden px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center font-display text-[1.7rem] italic text-blossom sm:text-4xl"
      >
        A Little Gift, Just for You
      </motion.h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="box"
            type="button"
            onClick={open}
            disabled={opening}
            aria-label="Open the surprise gift"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative flex h-[180px] w-[180px] items-end justify-center sm:h-[200px] sm:w-[200px]"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gold/30 blur-xl"
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <motion.div
              className="relative h-[112px] w-[148px] rounded-md bg-rose shadow-2xl sm:h-[124px] sm:w-[164px]"
              style={{ transform: "perspective(420px) rotateX(8deg)" }}
              animate={reduced || opening ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gold" />
              <div className="absolute left-0 top-[44%] h-7 w-full bg-gold" />
              <motion.div
                className="absolute -top-9 left-1/2 h-11 w-[164px] -translate-x-1/2 rounded-sm bg-rose-light shadow-lg sm:w-[180px]"
                animate={
                  opening
                    ? { y: -78, rotate: -22, opacity: 0 }
                    : reduced
                      ? {}
                      : { y: [0, -3, 0] }
                }
                transition={opening ? { duration: 0.7, ease: "easeIn" } : { duration: 2.6, repeat: Infinity }}
              >
                <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gold" />
              </motion.div>
              <Gift
                size={22}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-cream"
              />
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl border border-gold/35 bg-plum-light/70 px-5 py-7 text-center shadow-2xl backdrop-blur-sm"
          >
            {BURST.map((b) => (
              <motion.span
                key={b.id}
                className="pointer-events-none absolute left-1/2 top-0"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, x: b.x, y: b.y, scale: 1.1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                {b.heart ? (
                  <Heart size={14} className="fill-rose-light text-rose-light" />
                ) : (
                  <span className="block h-2 w-2 rounded-full bg-gold" />
                )}
              </motion.span>
            ))}
            <Heart size={28} className="mx-auto mb-3 fill-rose text-rose animate-heartbeat" />
            <p className="font-display text-xl italic leading-relaxed text-blossom">{MESSAGE}</p>
            <p className="mt-4 font-script text-2xl text-rose">Riyad</p>
            <button
              type="button"
              onClick={replay}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold/40 px-5 py-2 font-body text-sm text-gold"
            >
              <RotateCcw size={14} />
              Open again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!opened && (
        <p className="mt-5 font-body text-sm text-lavender">Tap the box to open your surprise</p>
      )}
    </section>
  );
}
