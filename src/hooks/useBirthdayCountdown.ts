import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
  targetYear: number;
}

const BIRTHDAY_MONTH = 5;
const BIRTHDAY_DAY = 27;

export function getNextBirthday(from: Date): { target: Date; isBirthday: boolean } {
  const year = from.getFullYear();
  const birthdayThisYear = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0);
  const birthdayEnd = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 23, 59, 59, 999);

  if (from >= birthdayThisYear && from <= birthdayEnd) {
    return { target: birthdayThisYear, isBirthday: true };
  }

  if (from > birthdayEnd) {
    return { target: new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0), isBirthday: false };
  }

  return { target: birthdayThisYear, isBirthday: false };
}

function compute(now: Date): CountdownParts {
  const { target, isBirthday } = getNextBirthday(now);
  if (isBirthday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true, targetYear: target.getFullYear() };
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return { days, hours, minutes, seconds, isBirthday: false, targetYear: target.getFullYear() };
}

export function useBirthdayCountdown(): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => compute(new Date()));

  useEffect(() => {
    setParts(compute(new Date()));
    const id = window.setInterval(() => setParts(compute(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return parts;
}
