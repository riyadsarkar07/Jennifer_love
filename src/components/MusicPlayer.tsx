import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  armed: boolean;
  src?: string;
}

export default function MusicPlayer({ armed, src = "/audio/song.mp3" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!armed || unavailable || !audioRef.current) return;
    audioRef.current.volume = 0.45;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false);
      });
  }, [armed, unavailable]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  if (unavailable) return null;

  return (
    <div className="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <audio ref={audioRef} src={src} loop preload="none" onError={() => setUnavailable(true)} />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-plum-light/70 text-gold shadow-lg backdrop-blur-md transition-transform active:scale-90"
      >
        {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
