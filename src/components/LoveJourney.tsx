import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useLoveJourney } from "../hooks/useLoveJourney";
import { useAudio } from "../audio/AudioProvider";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const HEARTS = [
  { top: "8%", left: "10%", size: 14, delay: 0 },
  { top: "18%", left: "88%", size: 16, delay: 0.5 },
  { top: "72%", left: "6%", size: 12, delay: 1.1 },
  { top: "80%", left: "90%", size: 15, delay: 0.8 },
];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function LoveJourney() {
  const parts = useLoveJourney();
  const { muted, sfxOn } = useAudio();
  const [tickOn, setTickOn] = useState(false);
  const values = {
    days: parts.days,
    hours: parts.hours,
    minutes: parts.minutes,
    seconds: parts.seconds,
  };

  useEffect(() => {
    if (!tickOn || muted || !sfxOn) return;
    const audio = new Audio("/audio/click.wav");
    audio.volume = 0.08;
    void audio.play().catch(() => undefined);
  }, [parts.seconds, tickOn, muted, sfxOn]);

  return (
    <section id="journey" className="relative flex scroll-mt-32 flex-col items-center overflow-hidden px-4 py-16 sm:py-20">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/30 blur-3xl sm:h-72 sm:w-72"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {HEARTS.map((h, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute"
          style={{ top: h.top, left: h.left }}
          animate={{ y: [0, -10, 0], opacity: [0.45, 1, 0.45], scale: [1, 1.12, 1] }}
          transition={{ duration: 3 + i * 0.25, repeat: Infinity, delay: h.delay }}
        >
          <Heart size={h.size} className="fill-rose-light text-rose-light drop-shadow" />
        </motion.span>
      ))}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-2 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-none sm:text-4xl"
      >
        Our Love Journey
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 mb-8 max-w-[18rem] text-center font-body text-sm text-lavender sm:max-w-md sm:text-base"
      >
        Every Second With You Is Special.
      </motion.p>

      <p className="relative z-10 mb-5 font-body text-sm text-blossom sm:text-base">
        We have been together for:
      </p>

      <div className="relative z-10 grid w-full max-w-lg grid-cols-4 gap-1.5 sm:gap-3">
        {UNITS.map((unit, i) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08 * i, duration: 0.45 }}
            className="flex min-w-0 flex-col items-center rounded-2xl border border-gold/35 bg-plum-light/60 px-1 py-3 shadow-lg backdrop-blur-sm sm:py-4"
          >
            <motion.span
              key={`${unit.key}-${values[unit.key]}`}
              initial={{ opacity: 0.45, y: 4, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
              className="font-display text-[1.35rem] tabular-nums text-gold sm:text-3xl"
            >
              {pad(values[unit.key])}
            </motion.span>
            <span className="mt-1 font-body text-[9px] uppercase tracking-wider text-blossom sm:text-xs">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="relative z-10 mt-7 max-w-[18rem] text-center font-body text-sm italic text-lavender sm:max-w-md sm:text-base"
      >
        And our story is just beginning, Jennifer.
      </motion.p>

      <button
        type="button"
        onClick={() => setTickOn((v) => !v)}
        aria-pressed={tickOn}
        className="relative z-10 mt-5 min-h-[44px] rounded-full border border-gold/35 px-4 py-2 font-body text-xs text-gold"
      >
        {tickOn ? "Soft tick on" : "Soft tick off"}
      </button>
    </section>
  );
}
