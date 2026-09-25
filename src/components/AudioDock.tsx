import { useEffect, useState } from "react";
import { Music, Pause, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../audio/AudioProvider";

const TOP_THRESHOLD_PX = 8;

export default function AudioDock() {
  const { musicOn, sfxOn, muted, toggleMusic, toggleSfx, toggleMute } = useAudio();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setAtTop(y <= TOP_THRESHOLD_PX);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end p-2 transition-opacity duration-500 ease-in-out sm:p-3 ${
        atTop ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!atTop}
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-gold/30 bg-plum-deep/80 px-2 py-1.5 shadow-lg backdrop-blur-md ${
          atTop ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={toggleMusic}
          tabIndex={atTop ? 0 : -1}
          aria-label={musicOn ? "Pause music" : "Play music"}
          title={musicOn ? "Pause music" : "Play music"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-gold transition-transform active:scale-90"
        >
          {musicOn && !muted ? <Pause size={18} /> : <Music size={18} />}
        </button>
        <button
          type="button"
          onClick={toggleSfx}
          tabIndex={atTop ? 0 : -1}
          aria-label={sfxOn ? "Mute sound effects" : "Enable sound effects"}
          title={sfxOn ? "Sound effects on" : "Sound effects off"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 transition-transform active:scale-90 ${
            sfxOn && !muted ? "text-gold" : "text-lavender/50"
          }`}
        >
          <Sparkles size={16} />
        </button>
        <button
          type="button"
          onClick={toggleMute}
          tabIndex={atTop ? 0 : -1}
          aria-label={muted ? "Unmute all audio" : "Mute all audio"}
          title={muted ? "Unmute" : "Mute all"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-gold transition-transform active:scale-90"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
