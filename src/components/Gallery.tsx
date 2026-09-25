import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef(0);
  const photos = images.filter(Boolean);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((i) => (i === null || photos.length === 0 ? i : (i + photos.length - 1) % photos.length));
  }, [photos.length]);
  const next = useCallback(() => {
    setActive((i) => (i === null || photos.length === 0 ? i : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 48) prev();
    if (dx < -48) next();
  };

  return (
    <section ref={ref} className="flex flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center font-display text-[1.7rem] italic text-blossom sm:mb-10 sm:text-4xl"
      >
        Our Memories
      </motion.h2>

      <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg sm:gap-5">
        {photos.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            animate={inView ? { opacity: 1, y: 0, rotate: [-5, 4, -3, 6, -2][i] ?? 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.55, ease: "backOut" }}
            whileTap={{ scale: 0.97, rotate: 0 }}
            onClick={() => setActive(i)}
            className={`aspect-[3/4] overflow-hidden rounded-xl border-4 border-cream bg-lavender/40 shadow-xl ${
              i === photos.length - 1 && photos.length % 2 === 1 ? "col-span-2 mx-auto w-[48%]" : ""
            }`}
            aria-label={`Open memory ${i + 1}`}
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 18%" }}
            />
          </motion.button>
        ))}

        {photos.length === 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg border-4 border-cream bg-gradient-to-br from-lavender to-blossom"
            >
              <Heart className="text-cream/80" size={28} />
            </div>
          ))}
      </div>

      <AnimatePresence>
        {active !== null && photos[active] && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-deep/92 px-3 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-plum-light/80 text-cream"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-plum-light/80 text-cream sm:left-4"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.img
              key={photos[active]}
              src={photos[active]}
              alt={`Memory ${active + 1}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82dvh] max-w-[min(100%,920px)] rounded-lg object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-plum-light/80 text-cream sm:right-4"
            >
              <ChevronRight size={24} />
            </button>

            <p className="absolute bottom-4 left-0 right-0 text-center font-body text-xs text-lavender">
              {active + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
