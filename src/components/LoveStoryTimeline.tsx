import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { TIMELINE_EVENTS } from "../data/timeline";

export default function LoveStoryTimeline() {
  const [openId, setOpenId] = useState<string | null>(TIMELINE_EVENTS[0]?.id ?? null);

  return (
    <section id="story" className="flex scroll-mt-16 flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-lg sm:text-4xl"
      >
        Every Love Story Has a Beginning. Ours Is My Favorite.
      </motion.h2>
      <p className="mb-10 max-w-xs text-center font-body text-sm text-lavender sm:max-w-md">
        Tap a moment to open it. Dates and stories live in `src/data/timeline.ts`.
      </p>

      <ol className="relative w-full max-w-md border-l border-gold/30 pl-6 sm:max-w-lg">
        {TIMELINE_EVENTS.map((event, i) => {
          const expanded = openId === event.id;
          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06 }}
              className="relative mb-6 last:mb-0"
            >
              <span className="absolute -left-[31px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-plum-light ring-2 ring-gold/70">
                <Heart size={10} className="fill-rose text-rose" />
              </span>
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : event.id)}
                aria-expanded={expanded}
                className="flex w-full min-h-[44px] items-start justify-between gap-3 rounded-2xl border border-gold/25 bg-plum-light/55 px-4 py-4 text-left shadow-md"
              >
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider text-gold">
                    {event.upcoming ? "Upcoming" : event.date}
                  </p>
                  <h3 className="mt-1 font-display text-lg italic text-blossom">{event.title}</h3>
                </div>
                <ChevronDown
                  size={18}
                  className={`mt-1 shrink-0 text-gold transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-gold/15 bg-plum/40 px-4 py-3">
                      <p className="font-body text-sm leading-relaxed text-lavender">{event.story}</p>
                      {event.photo && (
                        <img
                          src={event.photo}
                          alt=""
                          className="mt-3 h-36 w-full rounded-lg object-cover"
                          style={{ objectPosition: "center 18%" }}
                        />
                      )}
                      {event.upcoming && (
                        <p className="mt-2 font-body text-xs text-gold">This chapter is still ahead of us.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
