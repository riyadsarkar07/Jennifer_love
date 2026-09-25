import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScreen from "./components/OpeningScreen";
import AnimatedFlower from "./components/AnimatedFlower";
import PhotoReveal from "./components/PhotoReveal";
import LoveLetter from "./components/LoveLetter";
import Gallery from "./components/Gallery";
import ReasonsILoveYou from "./components/ReasonsILoveYou";
import BirthdaySurprise from "./components/BirthdaySurprise";
import FinalSurprise from "./components/FinalSurprise";
import FloatingHearts from "./components/FloatingHearts";
import StarField from "./components/StarField";
import MusicPlayer from "./components/MusicPlayer";

const GIRLFRIEND_NAME = "Jennifer Dumaog";
const MY_NAME = "Riyad";

const GALLERY_IMAGES = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
];

const LETTER_PARAGRAPHS = [
  "I wish I could be beside you right now, hold your hand, look into your eyes, and tell you how much you mean to me.",
  "You are one of the most beautiful parts of my life. Your smile makes my days brighter, and even the smallest moments with you become precious memories.",
  "No matter how far apart we are, you will always have a special place in my heart. I wish I could give you a thousand roses, but today I made this little digital garden just for you.",
  "Thank you for being you, for bringing happiness into my life, and for making my world feel more beautiful.",
  "If I could make one wish today, it would be to see you smile and remind you how deeply you are loved.",
  "You are my favorite person, my sweetest thought, and my most beautiful feeling.",
];

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-plum-deep font-body">
      <MusicPlayer armed={opened} />

      <AnimatePresence mode="wait">
        {!opened && (
          <OpeningScreen
            key="opening"
            onOpen={() => setOpened(true)}
            girlfriendName={GIRLFRIEND_NAME}
          />
        )}
      </AnimatePresence>

      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full overflow-x-hidden bg-gradient-to-b from-plum-deep via-plum to-plum-light"
        >
          <div className="pointer-events-none fixed inset-0 -z-10">
            <StarField count={28} />
          </div>
          <FloatingHearts interactive density={7} className="fixed inset-0 z-40" />

          <AnimatedFlower />
          <PhotoReveal
            name={GIRLFRIEND_NAME}
            src="/jennifer.jpg"
            caption="You make my world brighter"
          />
          <LoveLetter from={MY_NAME} to={GIRLFRIEND_NAME} paragraphs={LETTER_PARAGRAPHS} />
          <Gallery images={GALLERY_IMAGES} />
          <ReasonsILoveYou />
          <BirthdaySurprise name={GIRLFRIEND_NAME} from={MY_NAME} images={GALLERY_IMAGES} />
          <FinalSurprise name={GIRLFRIEND_NAME} from={MY_NAME} />
        </motion.main>
      )}
    </div>
  );
}
