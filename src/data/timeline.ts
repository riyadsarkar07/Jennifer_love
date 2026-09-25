export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  story: string;
  photo?: string;
  upcoming?: boolean;
}

/**
 * Edit this file to add real dates, stories, and photos.
 * Do not invent personal memories — leave placeholders until you fill them in.
 */
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "first-met",
    date: "23 September 2026, 12:47 PM (Asia/Dhaka)",
    title: "The day we first met",
    story: "The moment our story began. Add the details of that first meeting here.",
    photo: "/gallery/3.jpg",
  },
  {
    id: "first-conversation",
    date: "Add the real date here",
    title: "Our first conversation",
    story: "Placeholder: write what you talked about, and how it felt.",
  },
  {
    id: "first-video-call",
    date: "Add the real date here",
    title: "Our first video call",
    story: "Placeholder: the first time you saw each other on a call.",
  },
  {
    id: "first-i-love-you",
    date: "Add the real date here",
    title: 'The day we first said "I love you"',
    story: "Placeholder: who said it, where you were, and how the moment felt.",
  },
  {
    id: "most-memorable",
    date: "Add the real date here",
    title: "Our most memorable moment",
    story: "Placeholder: the memory you both still talk about.",
    photo: "/gallery/2.jpg",
  },
  {
    id: "first-in-person",
    date: "Someday soon",
    title: "Our future first meeting in person",
    story: "A chapter still waiting to be written — meeting face to face.",
    upcoming: true,
  },
  {
    id: "more-memories",
    date: "Whenever they happen",
    title: "More special memories",
    story: "Leave space here for the moments you have not lived yet. Add new entries below as they arrive.",
    upcoming: true,
  },
];
