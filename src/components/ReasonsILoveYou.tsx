import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Smile, Sparkles, Star, Sun, Gift } from "lucide-react";

const REASONS = [
  { title: "Your Beautiful Smile", icon: Smile, text: "It lights up every room you walk into." },
  { title: "Your Kind Heart", icon: Heart, text: "The way you care makes the world feel softer." },
  { title: "Your Amazing Personality", icon: Sparkles, text: "Being with you always feels like home." },
  { title: "You Make Me Happy", icon: Sun, text: "Even ordinary days feel special with you." },
  { title: "You Always Make Me Smile", icon: Gift, text: "Your presence is my favorite kind of joy." },
  { title: "You Are Special to Me", icon: Star, text: "There is no one else quite like you, Jennifer." },
];

export default function ReasonsILoveYou() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section ref={ref} className="flex flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center font-display text-[1.7rem] italic text-blossom sm:mb-10 sm:text-4xl"
      >
        Reasons I Love You
      </motion.h2>

      <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-2 sm:gap-4">
        {REASONS.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.12 + i * 0.14, duration: 0.55, ease: "easeOut" }}
              className="rounded-2xl border border-gold/30 bg-plum-light/55 px-5 py-5 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-2 text-gold">
                <Icon size={18} />
                <h3 className="font-display text-lg italic text-blossom">{reason.title}</h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-lavender">{reason.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
