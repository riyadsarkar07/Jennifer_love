import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

interface GalleryProps {
  /** Paths under /public, e.g. ["/gallery/1.jpg", ...]. Empty slots show a placeholder heart. */
  images?: string[];
}

/** A small tilted photo gallery — add real images to /public/gallery to fill it in. */
export default function Gallery({ images = [] }: GalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const slots = Array.from({ length: 4 }, (_, i) => images[i]);
  const rotations = [-6, 4, -3, 7];

  return (
    <div ref={ref} className="flex flex-col items-center px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center font-display text-3xl italic text-blossom sm:text-4xl"
      >
        Little moments, kept safe
      </motion.h2>

      <div className="grid w-full max-w-sm grid-cols-2 gap-5 sm:max-w-md">
        {slots.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            animate={inView ? { opacity: 1, y: 0, rotate: rotations[i] } : {}}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "backOut" }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            className="aspect-square overflow-hidden rounded-lg border-4 border-cream bg-lavender/40 shadow-xl"
          >
            {src ? (
              <img src={src} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lavender to-blossom">
                <Heart className="text-cream/80" size={28} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-6 max-w-xs text-center font-body text-xs text-lavender"
      >
        add your favorite photos to <code className="rounded bg-cream/10 px-1">public/gallery</code>
      </motion.p>
    </div>
  );
}
