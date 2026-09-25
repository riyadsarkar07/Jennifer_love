import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  armed: boolean;
  src?: string;
}

export default function MusicPlayer({ armed, src = "/audio/song.wav" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!armed || unavailable || !audioRef.current) return;
    audioRef.current.volume = 0.42;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [armed, unavailable]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.volume = 0.42;
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
        onError={() => setUnavailable(true)}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={unavailable}
        aria-label={playing ? "Pause music" : "Play music"}
        title={unavailable ? "Music file is unavailable" : playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-gold shadow-lg backdrop-blur-md transition-transform active:scale-90 disabled:opacity-40"
      >
        {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
