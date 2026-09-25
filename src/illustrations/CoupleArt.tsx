import type { ReactNode } from "react";

const SKIN = "#F7D4C4";
const BLUSH = "#F4A3B5";
const LINE = "#4A2040";
const HAIR_G = "#3B1A2C";
const HAIR_B = "#2A1618";
const CREAM = "#FFF6F0";
const ROSE = "#D45A74";
const PINK = "#F0A0B4";
const BLOSSOM = "#F8D0D8";
const GOLD = "#E8B978";
const SHIRT = "#5C3A62";
const DRESS = "#E87894";

function Frame({ uid, children }: { uid: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#FFE8EE" />
          <stop offset="55%" stopColor="#F6D0DC" />
          <stop offset="100%" stopColor="#E8B8D0" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" rx="22" fill={`url(#${uid}-bg)`} />
      <ellipse cx="100" cy="168" rx="72" ry="28" fill={`url(#${uid}-glow)`} />
      {children}
    </svg>
  );
}

function MiniHeart({ x, y, s = 1, fill = ROSE }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 -6 C-8 -16 -22 -6 -8 6 C-4 10 0 14 0 14 C0 14 4 10 8 6 C22 -6 8 -16 0 -6Z"
        fill={fill}
        stroke={LINE}
        strokeWidth={1.2 / s}
        strokeLinejoin="round"
      />
    </g>
  );
}

function StarDot({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
      fill={GOLD}
      stroke={LINE}
      strokeWidth={0.8 / s}
    />
  );
}

function Rose({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 6 C0 14 0 22 0 28" stroke="#4F7A3E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="-4" cy="16" rx="5" ry="2.4" fill="#6B9A4E" stroke={LINE} strokeWidth="0.7" transform="rotate(-28)" />
      <circle cx="0" cy="1" r="7" fill={ROSE} stroke={LINE} strokeWidth="1.1" />
      <circle cx="-2.5" cy="-1" r="4.2" fill={PINK} />
      <circle cx="2.2" cy="0.4" r="3" fill={BLOSSOM} />
    </g>
  );
}

function GirlHead({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx="21" ry="24" fill={HAIR_G} stroke={LINE} strokeWidth="1.4" />
      <path d={`M${cx - 20} ${cy + 6} Q${cx - 28} ${cy + 34} ${cx - 12} ${cy + 52}`} fill={HAIR_G} stroke={LINE} strokeWidth="1.2" />
      <path d={`M${cx + 20} ${cy + 6} Q${cx + 28} ${cy + 34} ${cx + 12} ${cy + 52}`} fill={HAIR_G} stroke={LINE} strokeWidth="1.2" />
      <ellipse cx={cx} cy={cy + 4} rx="16" ry="17.5" fill={SKIN} stroke={LINE} strokeWidth="1.3" />
      <path d={`M${cx - 16} ${cy - 4} Q${cx} ${cy - 20} ${cx + 16} ${cy - 4} Q${cx + 8} ${cy + 2} ${cx} ${cy - 2} Q${cx - 8} ${cy + 2} ${cx - 16} ${cy - 4}`} fill={HAIR_G} />
      <ellipse cx={cx - 5.5} cy={cy + 8} rx="3.4" ry="2.1" fill={BLUSH} opacity="0.85" />
      <ellipse cx={cx + 5.5} cy={cy + 8} rx="3.4" ry="2.1" fill={BLUSH} opacity="0.85" />
      <ellipse cx={cx - 5} cy={cy + 2.5} rx="3.1" ry="3.8" fill={LINE} />
      <ellipse cx={cx + 5} cy={cy + 2.5} rx="3.1" ry="3.8" fill={LINE} />
      <circle cx={cx - 4} cy={cy + 1.2} r="1.1" fill={CREAM} />
      <circle cx={cx + 6} cy={cy + 1.2} r="1.1" fill={CREAM} />
      <path d={`M${cx - 3.2} ${cy + 13} Q${cx} ${cy + 16.5} ${cx + 3.2} ${cy + 13}`} stroke={ROSE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function BoyHead({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 4} rx="15.5" ry="17" fill={SKIN} stroke={LINE} strokeWidth="1.3" />
      <path
        d={`M${cx - 16} ${cy + 2} Q${cx - 15} ${cy - 18} ${cx} ${cy - 21} Q${cx + 15} ${cy - 18} ${cx + 16} ${cy + 2} Q${cx + 6} ${cy - 8} ${cx} ${cy - 6} Q${cx - 6} ${cy - 8} ${cx - 16} ${cy + 2}`}
        fill={HAIR_B}
        stroke={LINE}
        strokeWidth="1.2"
      />
      <ellipse cx={cx - 5.2} cy={cy + 8} rx="3" ry="1.8" fill={BLUSH} opacity="0.7" />
      <ellipse cx={cx + 5.2} cy={cy + 8} rx="3" ry="1.8" fill={BLUSH} opacity="0.7" />
      <ellipse cx={cx - 4.8} cy={cy + 2.8} rx="3" ry="3.7" fill={LINE} />
      <ellipse cx={cx + 4.8} cy={cy + 2.8} rx="3" ry="3.7" fill={LINE} />
      <circle cx={cx - 3.8} cy={cy + 1.5} r="1.05" fill={CREAM} />
      <circle cx={cx + 5.8} cy={cy + 1.5} r="1.05" fill={CREAM} />
      <path d={`M${cx - 2.8} ${cy + 13} Q${cx} ${cy + 15.6} ${cx + 2.8} ${cy + 13}`} stroke={LINE} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function SceneHug() {
  return (
    <Frame uid="hug">
      <MiniHeart x={42} y={46} s={0.72} fill={PINK} />
      <MiniHeart x={164} y={40} s={0.62} fill={ROSE} />
      <StarDot x={28} y={88} s={0.7} />
      <ellipse cx="88" cy="148" rx="24" ry="32" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <ellipse cx="116" cy="152" rx="26" ry="34" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <path d="M116 128 Q132 128 138 118" fill={BLOSSOM} stroke={LINE} strokeWidth="1" />
      <path d="M64 128 Q52 142 70 158" stroke={SKIN} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M140 132 Q154 142 136 160" stroke={SKIN} strokeWidth="8" fill="none" strokeLinecap="round" />
      <BoyHead cx={86} cy={82} />
      <GirlHead cx={118} cy={78} />
      <MiniHeart x={102} y={58} s={0.45} fill={GOLD} />
    </Frame>
  );
}

export function SceneHands() {
  return (
    <Frame uid="hands">
      <MiniHeart x={100} y={36} s={0.55} fill={PINK} />
      <StarDot x={30} y={56} s={0.65} />
      <StarDot x={172} y={60} s={0.55} />
      <ellipse cx="68" cy="154" rx="20" ry="36" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <ellipse cx="132" cy="156" rx="21" ry="36" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <path d="M132 132 Q146 132 150 122" fill={BLOSSOM} />
      <path d="M86 138 Q100 152 114 138" stroke={SKIN} strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="148" r="7" fill={SKIN} stroke={LINE} strokeWidth="1.1" />
      <BoyHead cx={68} cy={78} />
      <GirlHead cx={132} cy={74} />
      <Rose x={36} y={168} s={0.85} />
      <Rose x={168} y={164} s={0.8} />
    </Frame>
  );
}

export function SceneCuddle() {
  return (
    <Frame uid="cuddle">
      <MiniHeart x={36} y={48} s={0.5} fill={GOLD} />
      <MiniHeart x={168} y={42} s={0.6} fill={PINK} />
      <ellipse cx="100" cy="186" rx="54" ry="12" fill="#E2A8BC" opacity="0.45" />
      <path d="M48 168 Q50 118 92 110 Q140 106 154 132 Q160 168 154 172 Z" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <path d="M86 136 Q124 118 156 140 Q158 168 120 174 Q86 170 86 148 Z" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <BoyHead cx={84} cy={96} />
      <GirlHead cx={122} cy={90} />
      <path d="M104 128 Q114 140 132 132" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export function SceneGaze() {
  return (
    <Frame uid="gaze">
      <MiniHeart x={100} y={44} s={0.7} fill={ROSE} />
      <StarDot x={34} y={70} s={0.7} />
      <StarDot x={168} y={66} s={0.6} />
      <ellipse cx="70" cy="156" rx="22" ry="34" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <ellipse cx="132" cy="158" rx="23" ry="34" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <path d="M132 134 Q148 132 152 122" fill={BLOSSOM} />
      <path d="M90 140 Q100 150 112 140" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      <BoyHead cx={70} cy={86} />
      <GirlHead cx={132} cy={82} />
      <path d="M88 88 Q100 96 112 88" stroke={PINK} strokeWidth="1.6" fill="none" />
    </Frame>
  );
}

export function SceneRoses() {
  return (
    <Frame uid="roses">
      <MiniHeart x={28} y={50} s={0.5} fill={PINK} />
      <ellipse cx="66" cy="156" rx="20" ry="34" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <ellipse cx="130" cy="158" rx="21" ry="34" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <BoyHead cx={66} cy={82} />
      <GirlHead cx={130} cy={78} />
      <path d="M84 126 Q92 112 100 96" stroke={SKIN} strokeWidth="7.5" fill="none" strokeLinecap="round" />
      <Rose x={102} y={72} s={1.15} />
      <Rose x={40} y={168} s={0.75} />
      <Rose x={168} y={160} s={0.8} />
      <Rose x={182} y={178} s={0.55} />
    </Frame>
  );
}

export function SceneStars() {
  return (
    <Frame uid="stars">
      <StarDot x={28} y={36} s={0.8} />
      <StarDot x={58} y={24} s={0.5} />
      <StarDot x={150} y={26} s={0.7} />
      <StarDot x={176} y={48} s={0.55} />
      <MiniHeart x={100} y={32} s={0.45} fill={GOLD} />
      <ellipse cx="100" cy="186" rx="56" ry="11" fill="#D9A0B8" opacity="0.4" />
      <path d="M54 170 Q56 126 90 118 Q136 112 150 140 Q154 170 146 174 Z" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <path d="M94 140 Q130 124 154 146 Q150 172 116 176 Q94 170 94 150 Z" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <BoyHead cx={82} cy={100} />
      <GirlHead cx={124} cy={94} />
    </Frame>
  );
}

export function SceneForehead() {
  return (
    <Frame uid="fore">
      <MiniHeart x={44} y={42} s={0.55} fill={PINK} />
      <MiniHeart x={160} y={38} s={0.5} fill={ROSE} />
      <ellipse cx="86" cy="156" rx="24" ry="34" fill={SHIRT} stroke={LINE} strokeWidth="1.4" />
      <ellipse cx="120" cy="158" rx="25" ry="34" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <path d="M66 136 Q54 150 74 166" stroke={SKIN} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M140 138 Q154 150 132 166" stroke={SKIN} strokeWidth="8" fill="none" strokeLinecap="round" />
      <BoyHead cx={88} cy={90} />
      <GirlHead cx={120} cy={84} />
      <MiniHeart x={104} y={62} s={0.38} fill={GOLD} />
    </Frame>
  );
}

export function SceneDance() {
  return (
    <Frame uid="dance">
      <MiniHeart x={36} y={40} s={0.5} fill={PINK} />
      <MiniHeart x={164} y={36} s={0.55} fill={GOLD} />
      <StarDot x={100} y={28} s={0.6} />
      <ellipse cx="78" cy="146" rx="20" ry="32" fill={SHIRT} stroke={LINE} strokeWidth="1.4" transform="rotate(-10 78 146)" />
      <path d="M96 128 Q132 112 150 136 Q146 172 112 180 Q88 168 96 146 Z" fill={DRESS} stroke={LINE} strokeWidth="1.4" />
      <path d="M64 128 Q50 116 42 132" stroke={SKIN} strokeWidth="7.5" fill="none" strokeLinecap="round" />
      <path d="M132 118 Q154 98 166 112" stroke={SKIN} strokeWidth="7.5" fill="none" strokeLinecap="round" />
      <path d="M94 122 Q104 134 118 122" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      <BoyHead cx={80} cy={78} />
      <GirlHead cx={118} cy={72} />
      <ellipse cx="72" cy="186" rx="10" ry="5" fill="#C48AA0" />
      <ellipse cx="126" cy="190" rx="12" ry="5" fill="#C48AA0" />
    </Frame>
  );
}

const SCENES = {
  hug: SceneHug,
  hands: SceneHands,
  cuddle: SceneCuddle,
  gaze: SceneGaze,
  roses: SceneRoses,
  stars: SceneStars,
  forehead: SceneForehead,
  dance: SceneDance,
} as const;

export function CoupleScene({ scene }: { scene: keyof typeof SCENES }) {
  const Art = SCENES[scene];
  return <Art />;
}
