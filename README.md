# A Little World Made Just for You 💖

A romantic, animated surprise website for Jennifer — built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

**Experience flow:** dreamy opening scene with an envelope → a flower growing and blooming petal by petal → a heart-framed photo reveal → an animated love letter that opens on tap → a small photo gallery → a final glowing-heart surprise scene.

---

## 1. Before you do anything: add your own photo and song

This project ships **without** any real photo, since I can't embed a photo of a real, identifiable person for you — you'll need to add it yourself. It's one drag-and-drop:

1. **Her photo** → save it as `public/jennifer.jpg` (exactly that name). Until you add it, that section shows a soft placeholder heart instead of a broken image.
2. **Background music** (optional) → save an MP3 as `public/audio/song.mp3`. If it's missing, the music button simply stays off — nothing breaks.
3. **Gallery photos** (optional) → drop up to four images into `public/gallery/` named `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, then open `src/App.tsx` and update the `<Gallery />` call:
   ```tsx
   <Gallery images={["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg"]} />
   ```

Everything else — her name, the letter, the colors — is already personalized.

---

## 2. Run it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). To preview on your phone over Wi-Fi, run `npm run dev -- --host` and use the "Network" address it prints.

To build and preview the production version:

```bash
npm run build
npm run preview
```

---

## 3. Put it on GitHub

1. Create a new, empty repository at [github.com/new](https://github.com/new) (skip adding a README there — you already have one).
2. In this project folder:
   ```bash
   git init
   git add .
   git commit -m "A little world made just for Jennifer"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME/YOUR_REPO` with your actual GitHub username and repo name.

`.gitignore` already excludes `node_modules` and `dist`, so the repo stays small.

---

## 4. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Click **Import** next to the repository you just pushed.
3. Vercel auto-detects Vite — leave the defaults:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**. Within a minute you'll get a live link like `your-project.vercel.app`.
5. Every future `git push` to `main` redeploys automatically.

No extra server configuration is needed — this is a fully static site.

---

## 5. Project structure

```
src/
  components/
    OpeningScreen.tsx   → envelope + "Open Your Surprise" scene
    AnimatedFlower.tsx  → stem, leaves, petal-by-petal bloom
    PhotoReveal.tsx     → heart-framed photo reveal
    LoveLetter.tsx      → tap-to-open envelope + unfolding letter
    Gallery.tsx         → small photo grid
    FinalSurprise.tsx   → glowing heart + "One More Surprise" button
    FloatingHearts.tsx  → falling petals/hearts + tap-to-spawn hearts
    StarField.tsx       → twinkling background stars
    MusicPlayer.tsx     → floating music on/off toggle
  hooks/
    useReducedMotion.ts → respects the OS "reduce motion" setting
  App.tsx               → wires the whole experience together
```

To change the names or the letter text, edit the constants near the top of `src/App.tsx`.

---

## 6. Final checklist

- [ ] Added `public/jennifer.jpg` (her real photo)
- [ ] Added `public/audio/song.mp3` (optional)
- [ ] Added gallery photos (optional) and updated `<Gallery images={...} />` in `App.tsx`
- [ ] `npm run build` completes with no errors
- [ ] Tested on a real phone: envelope opens, flower blooms, photo reveal shows the right image, letter opens on tap, gallery displays, "One More Surprise" reveals the closing message
- [ ] Tried it with the phone's "reduce motion" setting on — content still shows, just without the extra motion
- [ ] Pushed to GitHub and deployed on Vercel
- [ ] Opened the live Vercel link yourself before sending it to her
