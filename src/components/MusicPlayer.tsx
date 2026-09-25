import { useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

interface MusicPlayerProps {
  src?: string;
}

export default function MusicPlayer({ src = "/audio/song.wav" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.volume = 0.32;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  return (
    <div className="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onEnded={() => {
          const audio = audioRef.current;
          if (!audio) return;
          audio.currentTime = 0;
          void audio.play().catch(() => setPlaying(false));
        }}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={unavailable}
        aria-label={playing ? "Pause music" : "Play music"}
        title={unavailable ? "Music file is unavailable" : playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-gold shadow-lg backdrop-blur-md transition-transform active:scale-90 disabled:opacity-40"
      >
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </button>
    </div>
  );
}
