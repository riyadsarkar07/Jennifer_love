import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Gift, Heart } from "lucide-react";
import BirthdayCountdown from "./BirthdayCountdown";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface BirthdaySurpriseProps {
  name: string;
  from: string;
  images: string[];
}

const BIRTHDAY_PARAGRAPHS = [
  "June 27 is a special day because the world received someone as beautiful and wonderful as you.",
  "I wish I could be beside you today, hold your hand, see your smile, and make every moment unforgettable.",
  "You bring happiness, warmth, and love into my life in ways words can never fully explain.",
  "On your birthday, I wish you endless happiness, beautiful memories, and all the love your heart can hold.",
  "Thank you for being such a special part of my life.",
];

const CONFETTI = [
  { left: "8%", delay: 0, color: "#E88BA0", rotate: 20 },
  { left: "18%", delay: 0.4, color: "#E8B978", rotate: -12 },
  { left: "30%", delay: 0.8, color: "#F6C9D0", rotate: 28 },
  { left: "44%", delay: 0.2, color: "#C4415C", rotate: -24 },
  { left: "58%", delay: 1.1, color: "#C9A9DD", rotate: 16 },
  { left: "72%", delay: 0.55, color: "#E8B978", rotate: -8 },
  { left: "84%", delay: 0.9, color: "#E88BA0", rotate: 32 },
  { left: "92%", delay: 0.15, color: "#F6C9D0", rotate: -18 },
];

const FIREWORKS = [
  { top: "12%", left: "14%", delay: 0, color: "#E88BA0" },
  { top: "8%", left: "78%", delay: 0.7, color: "#E8B978" },
  { top: "22%", left: "88%", delay: 1.4, color: "#F6C9D0" },
  { top: "18%", left: "6%", delay: 1.9, color: "#C9A9DD" },
];

const CANDLES = [
  { x: 70, delay: 0 },
  { x: 100, delay: 0.15 },
  { x: 130, delay: 0.3 },
];

function BirthdayCake({ play, reduced }: { play: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 200 170" className="h-[150px] w-[200px] sm:h-[180px] sm:w-[240px]" aria-hidden="true">
      <ellipse cx="100" cy="158" rx="70" ry="10" fill="#1A0A1C" opacity="0.35" />
      <rect x="40" y="108" width="120" height="42" rx="8" fill="#C4415C" />
      <rect x="40" y="108" width="120" height="10" rx="5" fill="#E88BA0" />
      <rect x="52" y="78" width="96" height="36" rx="8" fill="#F6C9D0" />
      <rect x="52" y="78" width="96" height="9" rx="4" fill="#FBF3EC" />
      <rect x="64" y="54" width="72" height="30" rx="7" fill="#E8B978" />
      <rect x="64" y="54" width="72" height="8" rx="4" fill="#FBF3EC" />
      {[58, 82, 106, 130, 148].map((x) => (
        <circle key={x} cx={x} cy="114" r="4" fill="#E8B978" />
      ))}
      {CANDLES.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="28" width="6" height="28" rx="2" fill="#FBF3EC" />
          <motion.ellipse
            cx={c.x + 3}
            cy="22"
            rx="5"
            ry="9"
            fill="#E8B978"
            initial={{ opacity: 0.7, scale: 0.8 }}
            animate={
              play && !reduced
                ? { opacity: [0.55, 1, 0.7], scale: [0.85, 1.15, 0.9], y: [0, -1.5, 0] }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.7, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${c.x + 3}px 28px` }}
          />
          <circle cx={c.x + 3} cy="24" r="2" fill="#FBF3EC" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

export default function BirthdaySurprise({ name, from, images }: BirthdaySurpriseProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const firstName = name.split(" ")[0];
  const photos = images.filter(Boolean);
  const play = inView || reduced;

  const openGift = () => {
    if (opened || opening) return;
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, reduced ? 80 : 700);
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden px-4 py-16 sm:py-20"
    >
      {!reduced &&
        CONFETTI.map((c, i) => (
          <span
            key={`confetti-${i}`}
            className="pointer-events-none absolute top-0 h-2.5 w-1.5 rounded-sm animate-drift"
            style={{
              left: c.left,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: "8.5s",
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}

      {!reduced &&
        FIREWORKS.map((f, i) => (
          <motion.span
            key={`fw-${i}`}
            className="pointer-events-none absolute h-3 w-3 rounded-full"
            style={{ top: f.top, left: f.left, background: f.color, boxShadow: `0 0 16px 4px ${f.color}` }}
            animate={play ? { scale: [0.3, 2.4, 0], opacity: [0, 1, 0] } : {}}
            transition={{ duration: 2.2, delay: f.delay, repeat: Infinity, repeatDelay: 2.4 }}
          />
        ))}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-3 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-lg sm:text-4xl"
      >
        Happy Birthday {firstName}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 mb-8 max-w-xs text-center font-body text-sm text-lavender sm:text-base"
      >
        June 27 — a little celebration, made just for you
      </motion.p>

      <BirthdayCountdown name={name} />

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.7, ease: "backOut" }}
        className="relative mt-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/35 blur-3xl" />
        <BirthdayCake play={play} reduced={reduced} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-4 font-display text-xl italic text-gold sm:text-2xl"
      >
        Happy Birthday, {name}
      </motion.p>

      <div className="mt-12 flex w-full max-w-md flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 18 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
              className="flex w-full flex-col items-center"
            >
              <button
                type="button"
                onClick={openGift}
                aria-label="Open your birthday gift"
                className="relative flex h-[150px] w-[160px] items-end justify-center sm:h-[170px] sm:w-[180px]"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gold/30 blur-xl"
                  animate={{ opacity: [0.35, 0.85, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <div className="relative h-[108px] w-[140px] rounded-md bg-rose shadow-2xl sm:h-[120px] sm:w-[156px]">
                  <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gold" />
                  <div className="absolute left-0 top-[42%] h-7 w-full bg-gold" />
                  <motion.div
                    className="absolute -top-8 left-1/2 h-10 w-[156px] -translate-x-1/2 rounded-sm bg-rose-light shadow-lg sm:w-[172px]"
                    animate={
                      opening
                        ? { y: -72, rotate: -18, opacity: 0 }
                        : reduced
                          ? {}
                          : { y: [0, -4, 0] }
                    }
                    transition={
                      opening
                        ? { duration: 0.65, ease: "easeIn" }
                        : { duration: 2.2, repeat: Infinity }
                    }
                  >
                    <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gold" />
                  </motion.div>
                  <Heart
                    size={16}
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 fill-cream text-cream"
                  />
                </div>
              </button>
              <button
                type="button"
                onClick={openGift}
                className="mt-6 min-h-[48px] rounded-full bg-rose px-6 py-3 font-body text-sm font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light sm:text-base"
              >
                Open Your Birthday Gift
              </button>
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 28, rotateX: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="relative w-full overflow-hidden rounded-sm border border-gold/30 bg-[#FBF3EC] px-5 py-6 shadow-2xl sm:px-8 sm:py-8"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 27px, rgba(196,65,92,0.08) 28px)",
              }}
            >
              <div className="mb-4 flex items-center justify-center gap-2 text-rose">
                <Gift size={18} />
                <Heart size={16} className="fill-rose text-rose animate-heartbeat" />
                <Gift size={18} />
              </div>
              <p className="mb-4 text-center font-display text-xl italic text-plum-deep">
                Happy Birthday, My Dearest {firstName}!
              </p>
              {BIRTHDAY_PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.18, duration: 0.5 }}
                  className="mb-3 font-body text-[15px] leading-relaxed text-plum-deep/90 sm:text-base"
                >
                  {p}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="mt-2 font-body text-[15px] font-semibold text-plum-deep sm:text-base"
              >
                Happy Birthday, My Love!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.7 }}
                className="mt-5 text-right font-script text-[1.55rem] leading-snug text-rose sm:text-3xl"
              >
                Forever yours,
                <br />
                {from}
              </motion.p>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute"
                  style={{ top: `${12 + i * 22}%`, right: `${-2 + (i % 2) * 94}%` }}
                  animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  <Heart size={14} className="fill-rose-light text-rose-light" />
                </motion.span>
              ))}
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-16 mb-6 text-center font-display text-2xl italic text-blossom sm:text-3xl"
      >
        Birthday Memories
      </motion.h3>

      <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg sm:gap-4">
        {photos.map((src, i) => (
          <motion.figure
            key={src}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={play ? { opacity: 1, y: 0, rotate: [-4, 5, -2, 4, -3][i] ?? 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "backOut" }}
            className={`relative overflow-hidden rounded-xl border-4 border-gold/70 bg-cream shadow-xl ${
              i === photos.length - 1 && photos.length % 2 === 1 ? "col-span-2 mx-auto w-[48%]" : ""
            }`}
          >
            <img
              src={src}
              alt={`${firstName} memory ${i + 1}`}
              className="aspect-[3/4] h-full w-full object-cover"
              style={{ objectPosition: "center 18%" }}
            />
            <span className="absolute right-1.5 top-1.5">
              <Heart size={14} className="fill-rose text-rose drop-shadow" />
            </span>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
