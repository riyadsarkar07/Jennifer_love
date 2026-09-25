import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { QUIZ_QUESTIONS } from "../data/quiz";
import { useAudio } from "../audio/AudioProvider";

export default function LoveQuiz() {
  const { playSfx } = useAudio();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[index];
  const progress = done ? 100 : ((index + (picked === null ? 0 : 1)) / total) * 100;

  const choose = (optionIndex: number) => {
    if (picked !== null || !q) return;
    playSfx("click");
    setPicked(optionIndex);
    const known = q.correctIndex !== null;
    const right = !known || optionIndex === q.correctIndex;
    if (right) {
      setScore((s) => s + 1);
      playSfx("success");
    }
  };

  const next = () => {
    if (index + 1 >= total) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  const replay = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <section id="quiz" className="flex scroll-mt-32 flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 text-center font-display text-[1.7rem] italic text-blossom sm:text-4xl"
      >
        How Well Do You Know Us?
      </motion.h2>
      <p className="mb-6 max-w-xs text-center font-body text-sm text-lavender">
        Answers live in `src/data/quiz.ts`. Until they are filled in, every guess is a sweet one.
      </p>

      <div className="mb-6 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-plum-light">
        <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-plum-light/55 px-5 py-6 shadow-lg">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Heart size={36} className="mx-auto mb-3 fill-rose text-rose animate-heartbeat" />
              <p className="font-display text-2xl italic text-blossom">
                {score} / {total}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-lavender">
                Knowing us is not about perfect scores. It is about choosing each other, again and again.
              </p>
              <button
                type="button"
                onClick={replay}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-rose px-5 py-2 font-body text-sm text-cream"
              >
                <RotateCcw size={14} />
                Play again
              </button>
            </motion.div>
          ) : q ? (
            <motion.div key={q.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <p className="mb-1 font-body text-xs uppercase tracking-wider text-gold">
                Question {index + 1} of {total}
              </p>
              <h3 className="mb-4 font-display text-xl italic text-blossom">{q.question}</h3>
              <div className="flex flex-col gap-2">
                {q.options.map((option, i) => {
                  const selected = picked === i;
                  const known = q.correctIndex !== null;
                  const isCorrect = known && i === q.correctIndex;
                  const show = picked !== null;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={picked !== null}
                      onClick={() => choose(i)}
                      className={`min-h-[48px] rounded-xl border px-4 py-3 text-left font-body text-sm transition-colors ${
                        show && selected && (isCorrect || !known)
                          ? "border-gold bg-gold/20 text-cream"
                          : show && selected && known
                            ? "border-rose bg-rose/20 text-cream"
                            : "border-gold/25 bg-plum/40 text-lavender hover:border-gold/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <div className="mt-4">
                  <p className="font-body text-sm text-blossom">{q.note}</p>
                  <button
                    type="button"
                    onClick={next}
                    className="mt-4 min-h-[44px] rounded-full bg-rose px-5 py-2 font-body text-sm text-cream"
                  >
                    {index + 1 >= total ? "See result" : "Next"}
                  </button>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
