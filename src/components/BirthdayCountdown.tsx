import { motion } from "framer-motion";
import { useBirthdayCountdown } from "../hooks/useBirthdayCountdown";

interface BirthdayCountdownProps {
  name: string;
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function BirthdayCountdown({ name }: BirthdayCountdownProps) {
  const parts = useBirthdayCountdown();
  const firstName = name.split(" ")[0];
  const values = {
    days: parts.days,
    hours: parts.hours,
    minutes: parts.minutes,
    seconds: parts.seconds,
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <p className="mb-4 max-w-[18rem] text-center font-body text-sm text-lavender sm:max-w-none sm:text-base">
        {parts.isBirthday
          ? `Today is ${firstName}'s birthday`
          : `Until ${firstName}'s birthday — June 27, ${parts.targetYear}`}
      </p>

      <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
        {UNITS.map((unit, i) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.45 }}
            className="flex flex-col items-center rounded-2xl border border-gold/35 bg-plum-light/60 px-1 py-3 shadow-lg backdrop-blur-sm sm:py-4"
          >
            <span className="font-display text-2xl tabular-nums text-gold sm:text-3xl">
              {pad(values[unit.key])}
            </span>
            <span className="mt-1 font-body text-[10px] uppercase tracking-wider text-blossom sm:text-xs">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
