export function playSound(src: string, volume = 0.55) {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    void audio.play().catch(() => undefined);
  } catch {
    /* missing or blocked audio should never break the page */
  }
}
