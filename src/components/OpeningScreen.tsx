import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import StarField from "./StarField";
import { useAudio } from "../audio/AudioProvider";

interface OpeningScreenProps {
  onOpen: () => void;
  girlfriendName: string;
}

const PETALS = [
  { left: "6%", delay: 0, duration: 10, size: 14 },
  { left: "18%", delay: 1.2, duration: 12, size: 18 },
  { left: "32%", delay: 2.4, duration: 9, size: 12 },
  { left: "48%", delay: 0.6, duration: 11, size: 16 },
  { left: "64%", delay: 1.8, duration: 13, size: 13 },
  { left: "78%", delay: 3, duration: 10, size: 17 },
  { left: "90%", delay: 0.9, duration: 12, size: 11 },
  { left: "24%", delay: 3.6, duration: 9.5, size: 15 },
];

const HEARTS = [
  { left: "12%", delay: 0.4, size: 16 },
  { left: "40%", delay: 1.6, size: 12 },
  { left: "68%", delay: 0.8, size: 18 },
  { left: "86%", delay: 2.2, size: 14 },
];

export default function OpeningScreen({ onOpen, girlfriendName }: OpeningScreenProps) {
  const firstName = girlfriendName.split(" ")[0];
  const { playSfx } = useAudio();
  const open = () => {
    playSfx("sparkle");
    onOpen();
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-plum-deep via-plum to-plum-light px-5 py-10 text-center"
    >
      <StarField count={48} />

      {PETALS.map((p, i) => (
        <span
          key={`p-${i}`}
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
              opacity="0.72"
            />
          </svg>
        </span>
      ))}

      {HEARTS.map((h, i) => (
        <span
          key={`h-${i}`}
          className="pointer-events-none absolute top-0 animate-drift"
          style={{
            left: h.left,
            animationDelay: `${h.delay}s`,
            animationDuration: "11s",
          }}
        >
          <Heart size={h.size} className="fill-rose-light text-rose-light" />
        </span>
      ))}

      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-rose/28 blur-3xl" />

      <motion.p
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="relative max-w-[18rem] font-display text-[1.65rem] italic leading-snug text-blossom sm:max-w-none sm:text-3xl"
      >
        Hey, My Love {firstName}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative mt-2 font-body text-sm text-lavender sm:text-base"
      >
        a little world, made just for you
      </motion.p>

      <motion.button
        onClick={open}
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 0.75, ease: "backOut" }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open your surprise"
        className="relative my-8 flex h-[148px] w-[210px] flex-col items-center justify-center sm:my-10 sm:h-48 sm:w-64"
      >
        <motion.div
          className="absolute inset-0 rounded-[22px] bg-gold/30 blur-xl"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-b from-[#F4E3C6] to-[#E8C99A] shadow-2xl">
          <div
            className="absolute inset-x-0 top-0 z-10 h-[58%] origin-top bg-gradient-to-b from-[#F8EBD6] to-[#D4A574]"
            style={{ clipPath: "polygon(0 0, 50% 72%, 100% 0)" }}
          />
          <div className="absolute inset-x-[18%] bottom-[22%] top-[42%] rounded-sm bg-cream/70" />
          <Heart
            size={22}
            className="absolute left-1/2 top-[46%] z-20 -translate-x-1/2 fill-rose text-rose"
          />
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute -right-2 -top-2 z-20"
          >
            <Heart size={20} className="fill-rose text-rose drop-shadow" />
          </motion.span>
        </div>
      </motion.button>

      <motion.button
        onClick={open}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: 0.7 }}
        whileTap={{ scale: 0.95 }}
        className="relative min-h-[48px] rounded-full bg-rose px-8 py-3 font-body text-base font-semibold text-cream shadow-lg shadow-rose/40 transition-colors hover:bg-rose-light"
      >
        Open Your Surprise
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="relative mt-7 font-body text-xs text-lavender"
      >
        best with sound on
      </motion.p>
    </motion.div>
  );
}
