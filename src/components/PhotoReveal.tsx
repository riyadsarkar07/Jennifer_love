import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

interface PhotoRevealProps {
  name: string;
  /** Path under /public, e.g. "/jennifer.jpg". Drop the real photo there. */
  src?: string;
}

/** Heart-framed photo reveal. Falls back to a soft placeholder until a real photo is added. */
export default function PhotoReveal({ name, src = "/jennifer.jpg" }: PhotoRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [failed, setFailed] = useState(false);

  return (
    <div ref={ref} className="flex flex-col items-center px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center font-display text-3xl italic text-blossom sm:text-4xl"
      >
        This is her — {name.split(" ")[0]}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 scale-125 rounded-full bg-rose/30 blur-3xl" />

        <div
          className="relative h-64 w-64 overflow-hidden border-[6px] border-gold/70 shadow-2xl sm:h-80 sm:w-80"
          style={{ clipPath: "path('M 128 250 C 30 190, 0 120, 45 65 C 85 15, 150 30, 128 80 C 106 30, 171 15, 211 65 C 256 120, 226 190, 128 250 Z')" }}
        >
          {!failed ? (
            <img
              src={src}
              alt={name}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-lavender via-blossom to-rose-light text-center">
              <Heart size={48} className="text-cream/90" />
              <p className="px-6 font-body text-sm text-plum-deep/80">
                Add her photo at{" "}
                <code className="rounded bg-cream/60 px-1">public/jennifer.jpg</code>
              </p>
            </div>
          )}
        </div>

        {/* orbiting sparkle hearts */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              top: `${[-6, 40, 90][i]}%`,
              left: `${[85, -10, 70][i]}%`,
            }}
            animate={inView ? { y: [0, -10, 0], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
          >
            <Heart size={18} className="fill-rose-light text-rose-light" />
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 max-w-xs text-center font-body text-sm text-lavender sm:text-base"
      >
        every little detail of you is my favorite thing to notice
      </motion.p>
    </div>
  );
}
