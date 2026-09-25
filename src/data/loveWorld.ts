export interface LoveScene {
  id: string;
  caption: string;
  scene: "hug" | "hands" | "cuddle" | "gaze" | "roses" | "stars" | "forehead" | "dance";
}

export const LOVE_WORLD_SCENES: LoveScene[] = [
  { id: "hug", scene: "hug", caption: "You are my favorite person" },
  { id: "hands", scene: "hands", caption: "Your hand in mine" },
  { id: "cuddle", scene: "cuddle", caption: "My favorite place is beside you" },
  { id: "gaze", scene: "gaze", caption: "Forever with you" },
  { id: "roses", scene: "roses", caption: "A garden grown just for us" },
  { id: "stars", scene: "stars", caption: "Under the same sky" },
  { id: "forehead", scene: "forehead", caption: "Every heartbeat says your name" },
  { id: "dance", scene: "dance", caption: "Dance with me, Jennifer" },
];
