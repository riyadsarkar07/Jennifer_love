import { useEffect, useState } from "react";

/** First meeting: 23 September 2026, 12:47 PM, Asia/Dhaka (UTC+6). */
export const LOVE_START_ISO = "2026-09-23T12:47:00+06:00";
export const LOVE_START_MS = Date.parse(LOVE_START_ISO);

export interface ElapsedParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

export function computeElapsed(nowMs: number, startMs: number = LOVE_START_MS): ElapsedParts {
  const diff = nowMs - startMs;
  if (!Number.isFinite(diff) || diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: false };
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    started: true,
  };
}

export function useLoveJourney(): ElapsedParts {
  const [parts, setParts] = useState<ElapsedParts>(() => computeElapsed(Date.now()));

  useEffect(() => {
    setParts(computeElapsed(Date.now()));
    const id = window.setInterval(() => setParts(computeElapsed(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return parts;
}
