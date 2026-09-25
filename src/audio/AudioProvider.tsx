import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type SfxName = "bloom" | "sparkle" | "paper" | "shutter" | "whoosh" | "click" | "success";

const SFX_SRC: Record<SfxName, string> = {
  bloom: "/audio/bloom.wav",
  sparkle: "/audio/sparkle.wav",
  paper: "/audio/paper.wav",
  shutter: "/audio/shutter.wav",
  whoosh: "/audio/whoosh.wav",
  click: "/audio/click.wav",
  success: "/audio/success.wav",
};

const SFX_VOLUME: Record<SfxName, number> = {
  bloom: 0.28,
  sparkle: 0.26,
  paper: 0.22,
  shutter: 0.2,
  whoosh: 0.18,
  click: 0.16,
  success: 0.24,
};

interface AudioContextValue {
  musicOn: boolean;
  sfxOn: boolean;
  muted: boolean;
  toggleMusic: () => void;
  toggleSfx: () => void;
  toggleMute: () => void;
  playSfx: (name: SfxName) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const lastPlay = useRef(0);

  const playSfx = useCallback(
    (name: SfxName) => {
      if (muted || !sfxOn) return;
      const now = Date.now();
      if (now - lastPlay.current < 180) return;
      lastPlay.current = now;
      try {
        const audio = new Audio(SFX_SRC[name]);
        audio.volume = SFX_VOLUME[name];
        void audio.play().catch(() => undefined);
      } catch {
        /* missing files fail quietly */
      }
    },
    [muted, sfxOn]
  );

  const toggleMusic = useCallback(() => {
    const audio = musicRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    audio.volume = 0.3;
    audio
      .play()
      .then(() => {
        setMusicOn(true);
        setMuted(false);
      })
      .catch(() => setMusicOn(false));
  }, [musicOn]);

  const toggleSfx = useCallback(() => {
    setSfxOn((v) => !v);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      const audio = musicRef.current;
      if (audio) {
        if (next) audio.pause();
        else if (musicOn) void audio.play().catch(() => undefined);
      }
      return next;
    });
  }, [musicOn]);

  const value = useMemo(
    () => ({ musicOn, sfxOn, muted, toggleMusic, toggleSfx, toggleMute, playSfx }),
    [musicOn, sfxOn, muted, toggleMusic, toggleSfx, toggleMute, playSfx]
  );

  return (
    <AudioCtx.Provider value={value}>
      <audio ref={musicRef} src="/audio/song.wav" loop preload="auto" />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    return {
      musicOn: false,
      sfxOn: false,
      muted: true,
      toggleMusic: () => undefined,
      toggleSfx: () => undefined,
      toggleMute: () => undefined,
      playSfx: () => undefined,
    };
  }
  return ctx;
}
