import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Gift, Heart, Lock } from "lucide-react";
import BirthdayCountdown from "./BirthdayCountdown";
import { useBirthdayCountdown } from "../hooks/useBirthdayCountdown";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { playSound } from "../hooks/useSound";

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
            animate={
              play && !reduced
                ? { opacity: [0.55, 1, 0.7], scale: [0.85, 1.18, 0.92], y: [0, -2, 0] }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.65, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${c.x + 3}px 28px` }}
          />
          <motion.ellipse
            cx={c.x + 3}
            cy="16"
            rx="2.4"
            ry="4"
            fill="#FBF3EC"
            animate={play && !reduced ? { opacity: [0.4, 0.95, 0.4], y: [0, -3, 0] } : { opacity: 0.7 }}
            transition={{ duration: 0.55, delay: c.delay, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}

function BirthdayLetter({ firstName, from }: { firstName: string; from: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, rotateX: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-sm border border-gold/30 bg-[#FBF3EC] px-4 py-5 shadow-2xl sm:px-8 sm:py-8"
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
        className="mt-5 text-right font-script text-[1.45rem] leading-snug text-rose sm:text-3xl"
      >
        Forever yours,
        <br />
        {from}
      </motion.p>
    </motion.article>
  );
}

export default function BirthdaySurprise({ name, from, images }: BirthdaySurpriseProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const parts = useBirthdayCountdown();
  const isBirthday = parts.phase === "today";
  const hasEnded = parts.phase === "after";
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const celebrated = useRef(false);
  const firstName = name.split(" ")[0];
  const photos = images.filter(Boolean);
  const play = inView;

  useEffect(() => {
    if (!isBirthday) {
      setEnvelopeOpen(false);
      setGiftOpened(false);
      setOpening(false);
      celebrated.current = false;
      return;
    }
    if (celebrated.current) return;
    celebrated.current = true;
    playSound("/audio/celebrate.wav", 0.5);
    if (reduced) {
      setGiftOpened(true);
      setEnvelopeOpen(true);
      return;
    }
    const t1 = window.setTimeout(() => setOpening(true), 700);
    const t2 = window.setTimeout(() => {
      playSound("/audio/gift.wav", 0.55);
      setGiftOpened(true);
      setOpening(false);
    }, 1400);
    const t3 = window.setTimeout(() => setEnvelopeOpen(true), 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isBirthday, reduced]);

  const openGift = () => {
    if (!isBirthday || giftOpened || opening) return;
    setOpening(true);
    playSound("/audio/gift.wav", 0.6);
    window.setTimeout(() => {
      setGiftOpened(true);
      setEnvelopeOpen(true);
      setOpening(false);
    }, reduced ? 80 : 700);
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden px-4 py-16 sm:py-20"
    >
      {isBirthday && !reduced &&
        CONFETTI.map((c, i) => (
          <span
            key={`confetti-${i}`}
            className="pointer-events-none absolute top-0 h-2.5 w-1.5 rounded-sm animate-drift"
            style={{
              left: c.left,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: "8.5s",
            }}
          />
        ))}

      {isBirthday && !reduced &&
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-3 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-lg sm:text-4xl"
      >
        {isBirthday ? `Happy Birthday ${firstName}` : `${firstName}'s Birthday`}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 mb-8 max-w-xs text-center font-body text-sm text-lavender sm:text-base"
      >
        {isBirthday
          ? "June 27 — a little celebration, made just for you"
          : hasEnded
            ? "This year's birthday surprise has ended"
            : "A surprise waits for June 27"}
      </motion.p>

      {hasEnded && (
        <p className="mb-6 max-w-[20rem] text-center font-body text-sm text-blossom sm:max-w-md">
          The birthday letter is tucked away until next June 27. Until then, here is the countdown to her next birthday.
        </p>
      )}

      <BirthdayCountdown name={name} parts={parts} ended={hasEnded} />

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: "backOut" }}
        className="relative mt-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/35 blur-3xl" />
        <BirthdayCake play={play || isBirthday} reduced={reduced} />
      </motion.div>

      {isBirthday && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-4 px-3 text-center font-display text-xl italic text-gold sm:text-2xl"
        >
          Happy Birthday, {name}
        </motion.p>
      )}

      <div className="mt-12 flex w-full max-w-md flex-col items-center">
        {!isBirthday && (
          <div className="flex w-full flex-col items-center">
            <div className="relative flex h-[150px] w-[160px] items-end justify-center opacity-80 sm:h-[170px] sm:w-[180px]">
              <div className="relative h-[108px] w-[140px] rounded-md bg-rose/80 shadow-2xl sm:h-[120px] sm:w-[156px]">
                <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gold/80" />
                <div className="absolute left-0 top-[42%] h-7 w-full bg-gold/80" />
                <div className="absolute -top-8 left-1/2 h-10 w-[156px] -translate-x-1/2 rounded-sm bg-rose-light/80 shadow-lg sm:w-[172px]">
                  <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gold/80" />
                </div>
                <Lock
                  size={18}
                  className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-cream"
                />
              </div>
            </div>
            <p className="mt-5 max-w-[16rem] text-center font-body text-sm text-lavender">
              {hasEnded
                ? "The birthday gift will unlock again on June 27."
                : "This gift unlocks on June 27."}
            </p>
          </div>
        )}

        {isBirthday && (
          <AnimatePresence mode="wait">
            {!giftOpened && !envelopeOpen ? (
              <motion.div
                key="gift"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
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
            ) : !envelopeOpen ? (
              <motion.button
                key="envelope"
                type="button"
                onClick={() => {
                  playSound("/audio/gift.wav", 0.45);
                  setEnvelopeOpen(true);
                }}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -12 }}
                className="relative flex h-40 w-[240px] flex-col items-center justify-end pb-4"
                aria-label="Open the birthday letter"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg border border-gold/40 bg-gradient-to-b from-[#F4E3C6] to-[#E0B87A] shadow-2xl">
                  <div className="absolute inset-x-6 bottom-7 top-10 rounded-sm bg-cream/80" />
                  <motion.div
                    className="absolute inset-x-0 top-0 z-10 h-[58%] origin-top bg-gradient-to-b from-[#F8EBD6] to-[#D4A574]"
                    style={{ clipPath: "polygon(0 0, 50% 78%, 100% 0)" }}
                    animate={{ rotateX: [0, -24, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <Heart
                    size={20}
                    className="absolute left-1/2 top-[40%] z-20 -translate-x-1/2 fill-rose text-rose"
                  />
                </div>
                <span className="relative z-20 mt-3 font-body text-sm font-semibold text-blossom">
                  Opening your letter
                </span>
              </motion.button>
            ) : (
              <BirthdayLetter key="letter" firstName={firstName} from={from} />
            )}
          </AnimatePresence>
        )}
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 mb-6 text-center font-display text-2xl italic text-blossom sm:text-3xl"
      >
        Birthday Memories
      </motion.h3>

      <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg sm:gap-4">
        {photos.map((src, i) => (
          <motion.figure
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, rotate: [-4, 5, -2, 4, -3][i] ?? 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08 * i, duration: 0.5, ease: "backOut" }}
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
