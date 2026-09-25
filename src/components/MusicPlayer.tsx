import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  /** When this flips true (e.g. the moment the envelope is opened), playback is attempted. */
  armed: boolean;
  src?: string;
}

/**
 * Floating music toggle. Autoplay is never forced — browsers block it anyway —
 * so playback only starts once `armed` becomes true off the back of a real tap,
 * and errors (missing file, blocked audio) are swallowed quietly.
 */
export default function MusicPlayer({ armed, src = "/audio/song.mp3" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!armed || !audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setUnavailable(true));
  }, [armed]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setUnavailable(true));
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src={src}
        loop
        onError={() => setUnavailable(true)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        disabled={unavailable}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-plum-light/70 backdrop-blur-md border border-gold/40 text-gold shadow-lg transition-transform active:scale-90 disabled:opacity-40"
        title={unavailable ? "Add your song to public/audio/song.mp3" : undefined}
      >
        {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
