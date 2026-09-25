import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plane, RotateCcw } from "lucide-react";
import { useAudio } from "../audio/AudioProvider";
import { playJourneyChime } from "../audio/journeyChime";
import {
  FLIGHT_DESTINATION,
  FLIGHT_MESSAGE,
  FLIGHT_ORIGIN,
  type JourneyPlace,
} from "../data/flightJourney";
import { useReducedMotion } from "../hooks/useReducedMotion";
import TravelGlobe, { type JourneyPhase } from "./TravelGlobe";

interface FlyToYouProps {
  origin?: JourneyPlace;
  destination?: JourneyPlace;
  message?: string;
}

const HEARTS = [
  { top: "10%", left: "6%", size: 12, delay: 0 },
  { top: "16%", left: "92%", size: 15, delay: 0.6 },
  { top: "78%", left: "8%", size: 13, delay: 1.1 },
  { top: "84%", left: "90%", size: 14, delay: 0.4 },
];

export default function FlyToYou({
  origin = FLIGHT_ORIGIN,
  destination = FLIGHT_DESTINATION,
  message = FLIGHT_MESSAGE,
}: FlyToYouProps) {
  const reduced = useReducedMotion();
  const { playSfx, muted, sfxOn } = useAudio();
  const [playing, setPlaying] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [phase, setPhase] = useState<JourneyPhase>("idle");

  const destLine = useMemo(() => {
    const city = destination.city ? `${destination.city}, ` : "";
    return `${origin.city ?? origin.name} to ${city}the Philippines`;
  }, [destination.city, origin.city, origin.name]);

  const start = () => {
    playSfx("whoosh");
    setPhase("origin");
    setPlaying(true);
  };

  const replay = () => {
    playSfx("click");
    setPhase("origin");
    setPlaying(true);
    setReplayKey((k) => k + 1);
  };

  const handlePhase = useCallback((next: JourneyPhase) => {
    setPhase((prev) => (prev === next ? prev : next));
  }, []);

  const prevPhase = useRef<JourneyPhase>("idle");
  useEffect(() => {
    if (prevPhase.current === phase) return;
    prevPhase.current = phase;
    if (phase === "arrival") playSfx("sparkle");
    if (phase === "message" && !muted && sfxOn) playJourneyChime();
  }, [phase, playSfx, muted, sfxOn]);

  const showMessage = phase === "message" || phase === "done" || reduced;

  return (
    <section
      id="fly"
      className="relative flex scroll-mt-32 flex-col items-center overflow-hidden px-4 py-16 sm:py-20"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/25 blur-3xl sm:h-80 sm:w-80"
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {HEARTS.map((h, i) => (
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-2 max-w-[20rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-none sm:text-4xl"
      >
        One Day, I'll Fly to You {"\u2764\uFE0F"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 mb-6 max-w-[20rem] text-center font-body text-sm text-lavender sm:max-w-md sm:text-base"
      >
        A future flight from Bangladesh to Jennifer's home.
      </motion.p>

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[1.6rem] border border-gold/30 bg-plum-deep/70 shadow-[0_0_40px_rgba(196,65,92,0.18)] backdrop-blur-sm">
        <TravelGlobe
          origin={origin}
          destination={destination}
          playing={playing || reduced}
          replayKey={replayKey}
          reduced={reduced}
          onPhase={handlePhase}
        />

        <AnimatePresence>
          {!playing && !reduced && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-plum-deep/45 px-4"
            >
              <p className="mb-5 max-w-xs text-center font-body text-sm text-blossom/90 sm:text-base">
                Watch the journey from {destLine}.
              </p>
              <button
                type="button"
                onClick={start}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-rose px-7 py-3 font-body text-sm font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light sm:text-base"
              >
                <Plane size={16} />
                Start Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-5 flex min-h-[44px] items-center gap-3">
        {playing && !reduced && (
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold/40 bg-plum-light/60 px-5 py-2 font-body text-xs text-gold sm:text-sm"
          >
            <RotateCcw size={14} />
            Replay
          </button>
        )}
      </div>

      <AnimatePresence>
        {showMessage && (playing || reduced) && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mt-4 max-w-[20rem] text-center font-display text-lg italic leading-relaxed text-blossom sm:max-w-lg sm:text-2xl"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="relative z-10 mt-4 font-body text-[11px] text-lavender/70">
        Destination: {destination.city ?? destination.name}
      </p>
    </section>
  );
}
