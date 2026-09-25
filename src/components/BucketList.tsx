import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Pencil, Plus, Trash2, X } from "lucide-react";
import { BUCKET_STORAGE_KEY, DEFAULT_BUCKET_LIST, type BucketGoal } from "../data/bucketList";
import { useAudio } from "../audio/AudioProvider";

interface StoredState {
  items: BucketGoal[];
  doneIds: string[];
}

function loadState(): StoredState {
  try {
    const raw = window.localStorage.getItem(BUCKET_STORAGE_KEY);
    if (!raw) return { items: DEFAULT_BUCKET_LIST, doneIds: [] };
    const parsed = JSON.parse(raw) as StoredState;
    if (!Array.isArray(parsed.items) || !Array.isArray(parsed.doneIds)) {
      return { items: DEFAULT_BUCKET_LIST, doneIds: [] };
    }
    return parsed;
  } catch {
    return { items: DEFAULT_BUCKET_LIST, doneIds: [] };
  }
}

export default function BucketList() {
  const { playSfx } = useAudio();
  const [items, setItems] = useState<BucketGoal[]>(DEFAULT_BUCKET_LIST);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [burstId, setBurstId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadState();
    setItems(stored.items);
    setDoneIds(stored.doneIds);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(BUCKET_STORAGE_KEY, JSON.stringify({ items, doneIds }));
  }, [items, doneIds, ready]);

  const upcoming = useMemo(() => items.filter((g) => !doneIds.includes(g.id)), [items, doneIds]);
  const completed = useMemo(() => items.filter((g) => doneIds.includes(g.id)), [items, doneIds]);
  const progress = items.length === 0 ? 0 : (completed.length / items.length) * 100;

  const saveGoal = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    playSfx("click");
    if (editingId) {
      setItems((prev) =>
        prev.map((g) => (g.id === editingId ? { ...g, title: trimmedTitle, description: description.trim() } : g))
      );
      setEditingId(null);
    } else {
      setItems((prev) => [
        ...prev,
        { id: `goal-${Date.now()}`, title: trimmedTitle, description: description.trim() },
      ]);
    }
    setTitle("");
    setDescription("");
  };

  const markDone = (id: string) => {
    if (doneIds.includes(id)) return;
    playSfx("success");
    setDoneIds((prev) => [...prev, id]);
    setBurstId(id);
    window.setTimeout(() => setBurstId((cur) => (cur === id ? null : cur)), 900);
  };

  const removeGoal = (id: string) => {
    setItems((prev) => prev.filter((g) => g.id !== id));
    setDoneIds((prev) => prev.filter((d) => d !== id));
  };

  const startEdit = (goal: BucketGoal) => {
    setEditingId(goal.id);
    setTitle(goal.title);
    setDescription(goal.description);
  };

  return (
    <section id="dreams" className="flex scroll-mt-16 flex-col items-center px-4 py-16 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 max-w-[18rem] text-center font-display text-[1.7rem] italic leading-tight text-blossom sm:max-w-lg sm:text-4xl"
      >
        Our Dreams, Our Plans, Our Forever.
      </motion.h2>
      <p className="mb-5 max-w-xs text-center font-body text-sm text-lavender sm:max-w-md">
        Saved on this device only. Completing a dream stays here after you refresh.
      </p>

      <div className="mb-2 w-full max-w-md">
        <div className="mb-1 flex justify-between font-body text-xs text-gold">
          <span>Progress</span>
          <span>
            {completed.length} / {items.length}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-plum-light">
          <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form
        className="mt-6 w-full max-w-md rounded-2xl border border-gold/25 bg-plum-light/50 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveGoal();
        }}
      >
        <label htmlFor="dream-title" className="mb-1 block font-body text-xs text-gold">
          Dream title
        </label>
        <input
          id="dream-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A new dream"
          className="mb-3 w-full min-h-[44px] rounded-lg border border-gold/20 bg-plum/50 px-3 py-2 font-body text-sm text-cream outline-none placeholder:text-lavender/50"
        />
        <label htmlFor="dream-note" className="mb-1 block font-body text-xs text-gold">
          Short note
        </label>
        <textarea
          id="dream-note"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short note"
          rows={2}
          className="mb-3 w-full rounded-lg border border-gold/20 bg-plum/50 px-3 py-2 font-body text-sm text-cream outline-none placeholder:text-lavender/50"
        />
        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-rose px-4 py-2 font-body text-sm text-cream"
        >
          {editingId ? <Pencil size={14} /> : <Plus size={14} />}
          {editingId ? "Save dream" : "Add dream"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setDescription("");
            }}
            className="ml-2 min-h-[44px] rounded-full px-3 py-2 font-body text-sm text-lavender"
          >
            Cancel
          </button>
        )}
      </form>

      <GoalGroup
        heading="Upcoming"
        goals={upcoming}
        burstId={burstId}
        onDone={markDone}
        onEdit={startEdit}
        onRemove={removeGoal}
      />
      <GoalGroup
        heading="Completed"
        goals={completed}
        burstId={burstId}
        completed
        onDone={markDone}
        onEdit={startEdit}
        onRemove={removeGoal}
      />
    </section>
  );
}

function GoalGroup({
  heading,
  goals,
  burstId,
  completed = false,
  onDone,
  onEdit,
  onRemove,
}: {
  heading: string;
  goals: BucketGoal[];
  burstId: string | null;
  completed?: boolean;
  onDone: (id: string) => void;
  onEdit: (goal: BucketGoal) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="mb-3 font-display text-xl italic text-gold">{heading}</h3>
      {goals.length === 0 && <p className="font-body text-sm text-lavender/70">Nothing here yet.</p>}
      <ul className="flex flex-col gap-3">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.li
              key={goal.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative rounded-2xl border border-gold/25 bg-plum-light/55 px-4 py-4"
            >
              {burstId === goal.id && (
                <Heart size={22} className="absolute right-4 top-3 fill-rose text-rose animate-heartbeat" />
              )}
              <h4 className="pr-8 font-display text-lg italic text-blossom">{goal.title}</h4>
              {goal.description && <p className="mt-1 font-body text-sm text-lavender">{goal.description}</p>}
              {goal.targetDate && <p className="mt-1 font-body text-xs text-gold">{goal.targetDate}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {!completed && (
                  <button
                    type="button"
                    onClick={() => onDone(goal.id)}
                    className="inline-flex min-h-[40px] items-center gap-1 rounded-full bg-rose px-3 py-1.5 font-body text-xs text-cream"
                  >
                    <Check size={12} />
                    Mark as Done
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onEdit(goal)}
                  className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs text-gold"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(goal.id)}
                  className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-rose/30 px-3 py-1.5 font-body text-xs text-rose-light"
                >
                  {completed ? <X size={12} /> : <Trash2 size={12} />}
                  Remove
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
