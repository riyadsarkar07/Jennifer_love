import { useEffect, useState } from "react";

export type BirthdayPhase = "before" | "today" | "after";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
  phase: BirthdayPhase;
  targetYear: number;
}

const BIRTHDAY_MONTH = 5;
const BIRTHDAY_DAY = 27;

export function getBirthdayState(from: Date): {
  target: Date;
  phase: BirthdayPhase;
} {
  const year = from.getFullYear();
  const start = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0);
  const end = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 23, 59, 59, 999);

  if (from >= start && from <= end) {
    return { target: start, phase: "today" };
  }

  if (from > end) {
    return {
      target: new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0),
      phase: "after",
    };
  }

  return { target: start, phase: "before" };
}

export function computeCountdown(now: Date): CountdownParts {
  const { target, phase } = getBirthdayState(now);
  const isBirthday = phase === "today";

  if (isBirthday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthday: true,
      phase,
      targetYear: target.getFullYear(),
    };
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    isBirthday: false,
    phase,
    targetYear: target.getFullYear(),
  };
}

export function useBirthdayCountdown(): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => computeCountdown(new Date()));

  useEffect(() => {
    setParts(computeCountdown(new Date()));
    const id = window.setInterval(() => setParts(computeCountdown(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return parts;
}
