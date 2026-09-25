export interface BucketGoal {
  id: string;
  title: string;
  description: string;
  targetDate?: string;
}

export const DEFAULT_BUCKET_LIST: BucketGoal[] = [
  {
    id: "meet-in-person",
    title: "Meet each other in person for the first time",
    description: "The day the distance finally becomes a hug.",
  },
  {
    id: "watch-sunset",
    title: "Watch the sunset together",
    description: "Sit side by side and watch the sky change colors.",
  },
  {
    id: "travel-together",
    title: "Travel to a beautiful destination together",
    description: "Pick a place, pack light, and make the trip ours.",
  },
  {
    id: "celebrate-birthday",
    title: "Celebrate a special birthday together",
    description: "June 27, or any birthday, with cake and both of us there.",
  },
  {
    id: "first-photo",
    title: "Take our first photo together",
    description: "One frame with both of us in it — a memory we can keep.",
  },
  {
    id: "peaceful-evening",
    title: "Spend a peaceful evening talking together",
    description: "No rush, no screens, just conversation.",
  },
  {
    id: "more-memories",
    title: "Create more beautiful memories",
    description: "Keep adding little moments until the list never ends.",
  },
];

export const BUCKET_STORAGE_KEY = "jennifer-love-bucket-list";
