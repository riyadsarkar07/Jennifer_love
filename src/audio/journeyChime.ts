/** Soft piano-like chime. Call only after a user gesture, and only when SFX is allowed. */
export function playJourneyChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 987.77];
    const now = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = "sine";
      osc.frequency.value = freq;
      filter.type = "lowpass";
      filter.frequency.value = 2400;
      const t0 = now + i * 0.42;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.045, t0 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 1.6);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 1.7);
    });
    window.setTimeout(() => {
      void ctx.close().catch(() => undefined);
    }, 3200);
  } catch {
    /* audio should never break the page */
  }
}
