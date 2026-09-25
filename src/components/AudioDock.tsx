import { Music, Pause, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../audio/AudioProvider";

export default function AudioDock() {
  const { musicOn, sfxOn, muted, toggleMusic, toggleSfx, toggleMute } = useAudio();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end p-2 sm:p-3">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/30 bg-plum-deep/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicOn ? "Pause music" : "Play music"}
          title={musicOn ? "Pause music" : "Play music"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-gold transition-transform active:scale-90"
        >
          {musicOn && !muted ? <Pause size={18} /> : <Music size={18} />}
        </button>
        <button
          type="button"
          onClick={toggleSfx}
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
