import type { ReactNode } from "react";

const SKIN = "#F6D5C6";
const BLUSH = "#E88BA0";
const HAIR_G = "#3A1C2E";
const HAIR_B = "#241318";
const EYE = "#2B0F2C";
const CREAM = "#FBF3EC";
const ROSE = "#C4415C";
const PINK = "#E88BA0";
const BLOSSOM = "#F6C9D0";
const GOLD = "#E8B978";
const LAV = "#C9A9DD";
const PLUM = "#3E1A40";

function Sparkles({ uid }: { uid: string }) {
  return (
    <g opacity="0.9">
      <circle cx="22" cy="36" r="2.2" fill={GOLD} />
      <circle cx="178" cy="42" r="1.8" fill={BLOSSOM} />
      <circle cx="28" cy="168" r="1.6" fill={LAV} />
      <circle cx="174" cy="160" r="2" fill={GOLD} />
      <path d={`M40 24 l1.6 4.2 4.2 1.6-4.2 1.6L40 35.6 38.4 31.4 34.2 29.8 38.4 28.2Z`} fill={GOLD} id={`${uid}-sp`} />
      <path d="M160 22 l1.4 3.6 3.6 1.4-3.6 1.4L160 32 158.6 28.4 155 27 158.6 25.6Z" fill={PINK} />
    </g>
  );
}

function HeartPetals() {
  return (
    <g>
      <path d="M18 86 C14 78 6 80 10 90 C12 96 18 100 18 100 C18 100 24 96 26 90 C30 80 22 78 18 86Z" fill={PINK} opacity="0.7" />
      <path d="M182 78 C178 70 170 72 174 82 C176 88 182 92 182 92 C182 92 188 88 190 82 C194 72 186 70 182 78Z" fill={ROSE} opacity="0.65" />
    </g>
  );
}

function Rose({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 8 C-1 14 0 22 0 26" stroke="#4A6B3A" strokeWidth="1.4" fill="none" />
      <ellipse cx="-3" cy="16" rx="4" ry="2.2" fill="#6B8F4E" transform="rotate(-30)" />
      <circle cx="0" cy="2" r="5.2" fill={ROSE} />
      <circle cx="-2.4" cy="0.4" r="3.2" fill={PINK} />
      <circle cx="2" cy="1.2" r="2.4" fill={BLOSSOM} />
    </g>
  );
}

function GirlFace({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="16" ry="18" fill={SKIN} />
      <ellipse cx={cx - 5.5} cy={cy + 4} rx="3.2" ry="2" fill={BLUSH} opacity="0.7" />
      <ellipse cx={cx + 5.5} cy={cy + 4} rx="3.2" ry="2" fill={BLUSH} opacity="0.7" />
      <ellipse cx={cx - 5} cy={cy - 1} rx="2.1" ry="2.6" fill={EYE} />
      <ellipse cx={cx + 5} cy={cy - 1} rx="2.1" ry="2.6" fill={EYE} />
      <circle cx={cx - 4.4} cy={cy - 1.8} r="0.7" fill={CREAM} />
      <circle cx={cx + 5.6} cy={cy - 1.8} r="0.7" fill={CREAM} />
      <path d={`M${cx - 3} ${cy + 8} Q${cx} ${cy + 11} ${cx + 3} ${cy + 8}`} stroke={ROSE} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function BoyFace({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="15.5" ry="17.5" fill={SKIN} />
      <ellipse cx={cx - 5.2} cy={cy + 4} rx="2.8" ry="1.8" fill={BLUSH} opacity="0.55" />
      <ellipse cx={cx + 5.2} cy={cy + 4} rx="2.8" ry="1.8" fill={BLUSH} opacity="0.55" />
      <ellipse cx={cx - 4.8} cy={cy - 1} rx="2.1" ry="2.7" fill={EYE} />
      <ellipse cx={cx + 4.8} cy={cy - 1} rx="2.1" ry="2.7" fill={EYE} />
      <circle cx={cx - 4.2} cy={cy - 1.9} r="0.7" fill={CREAM} />
      <circle cx={cx + 5.4} cy={cy - 1.9} r="0.7" fill={CREAM} />
      <path d={`M${cx - 2.6} ${cy + 8.2} Q${cx} ${cy + 10.4} ${cx + 2.6} ${cy + 8.2}`} stroke={PLUM} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function GirlHairBack({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy - 4} rx="20" ry="22" fill={HAIR_G} />
      <path d={`M${cx - 19} ${cy} Q${cx - 26} ${cy + 28} ${cx - 14} ${cy + 46} Q${cx - 18} ${cy + 22} ${cx - 16} ${cy + 8}`} fill={HAIR_G} />
      <path d={`M${cx + 19} ${cy} Q${cx + 26} ${cy + 28} ${cx + 14} ${cy + 46} Q${cx + 18} ${cy + 22} ${cx + 16} ${cy + 8}`} fill={HAIR_G} />
    </g>
  );
}

function GirlHairFront({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 16} ${cy - 10} Q${cx - 8} ${cy - 22} ${cx} ${cy - 20} Q${cx + 8} ${cy - 22} ${cx + 16} ${cy - 10} Q${cx + 10} ${cy - 6} ${cx} ${cy - 8} Q${cx - 10} ${cy - 6} ${cx - 16} ${cy - 10}`} fill={HAIR_G} />
      <path d={`M${cx - 14} ${cy - 8} Q${cx - 10} ${cy + 6} ${cx - 12} ${cy + 16}`} stroke={HAIR_G} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={`M${cx + 14} ${cy - 8} Q${cx + 10} ${cy + 6} ${cx + 12} ${cy + 16}`} stroke={HAIR_G} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function BoyHair({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 16} ${cy - 2} Q${cx - 14} ${cy - 22} ${cx} ${cy - 24} Q${cx + 14} ${cy - 22} ${cx + 16} ${cy - 2} Q${cx + 8} ${cy - 12} ${cx} ${cy - 10} Q${cx - 8} ${cy - 12} ${cx - 16} ${cy - 2}`} fill={HAIR_B} />
      <path d={`M${cx - 6} ${cy - 22} Q${cx - 2} ${cy - 28} ${cx + 2} ${cy - 22}`} fill={HAIR_B} />
    </g>
  );
}

function Frame({ uid, children }: { uid: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-sky`} cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#5A2458" />
          <stop offset="55%" stopColor="#3E1A40" />
          <stop offset="100%" stopColor="#241018" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="58%" r="45%">
          <stop offset="0%" stopColor="#E88BA0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E88BA0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A1D46" stopOpacity="0" />
          <stop offset="100%" stopColor="#2B0F2C" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" rx="22" fill={`url(#${uid}-sky)`} />
      <ellipse cx="100" cy="150" rx="70" ry="36" fill={`url(#${uid}-glow)`} />
      <rect x="0" y="168" width="200" height="52" fill={`url(#${uid}-ground)`} />
      <Sparkles uid={uid} />
      <HeartPetals />
      {children}
    </svg>
  );
}

export function SceneHug() {
  return (
    <Frame uid="hug">
      <GirlHairBack cx={108} cy={78} />
      <ellipse cx="92" cy="128" rx="22" ry="28" fill="#4A2A48" />
      <ellipse cx="108" cy="132" rx="24" ry="30" fill={ROSE} />
      <ellipse cx="108" cy="118" rx="20" ry="8" fill={BLOSSOM} />
      <path d="M70 118 Q62 132 74 148" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M128 122 Q142 128 132 150" stroke={SKIN} strokeWidth="7" fill="none" strokeLinecap="round" />
      <BoyHair cx={88} cy={80} />
      <BoyFace cx={88} cy={84} />
      <GirlHairFront cx={108} cy={80} />
      <GirlFace cx={108} cy={82} />
      <path d="M96 72 Q102 66 110 70" fill="none" stroke={HAIR_G} strokeWidth="3" strokeLinecap="round" />
      <path d="M78 108 Q100 118 122 112" fill="none" stroke={PINK} strokeWidth="2" opacity="0.5" />
      <path d="M84 58 C80 50 70 52 74 62 C76 68 84 72 84 72 C84 72 92 68 94 62 C98 52 88 50 84 58Z" fill={PINK} />
      <path d="M124 52 C120 44 110 46 114 56 C116 62 124 66 124 66 C124 66 132 62 134 56 C138 46 128 44 124 52Z" fill={ROSE} />
    </Frame>
  );
}

export function SceneHands() {
  return (
    <Frame uid="hands">
      <GirlHairBack cx={128} cy={72} />
      <ellipse cx="72" cy="138" rx="16" ry="34" fill="#4A2A48" />
      <ellipse cx="128" cy="140" rx="17" ry="34" fill={ROSE} />
      <ellipse cx="128" cy="118" rx="15" ry="7" fill={BLOSSOM} />
      <path d="M84 126 Q100 138 116 126" stroke={SKIN} strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="134" r="5.5" fill={SKIN} />
      <BoyHair cx={72} cy={74} />
      <BoyFace cx={72} cy={78} />
      <GirlHairFront cx={128} cy={74} />
      <GirlFace cx={128} cy={76} />
      <ellipse cx="72" cy="176" rx="10" ry="5" fill="#2B1A22" />
      <ellipse cx="128" cy="176" rx="10" ry="5" fill="#3A1528" />
      <path d="M96 48 C92 40 82 42 86 52 C88 58 96 62 96 62 C96 62 104 58 106 52 C110 42 100 40 96 48Z" fill={PINK} />
      <path d="M150 44 C146 36 136 38 140 48 C142 54 150 58 150 58 C150 58 158 54 160 48 C164 38 154 36 150 44Z" fill={GOLD} />
      <Rose x={48} y={150} s={0.9} />
      <Rose x={160} y={148} s={0.85} />
    </Frame>
  );
}

export function SceneCuddle() {
  return (
    <Frame uid="cuddle">
      <ellipse cx="100" cy="168" rx="48" ry="12" fill="#2B0F2C" opacity="0.5" />
      <path d="M54 150 Q54 118 86 112 Q118 108 140 122 Q150 130 150 150 Z" fill="#4A2A48" />
      <path d="M86 128 Q114 118 146 132 Q150 148 128 152 Q96 156 86 140 Z" fill={ROSE} />
      <GirlHairBack cx={118} cy={88} />
      <BoyHair cx={86} cy={92} />
      <BoyFace cx={86} cy={96} />
      <GirlHairFront cx={118} cy={90} />
      <GirlFace cx={118} cy={92} />
      <path d="M102 118 Q110 128 128 124" stroke={SKIN} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M70 48 C66 40 56 42 60 52 C62 58 70 62 70 62 C70 62 78 58 80 52 C84 42 74 40 70 48Z" fill={PINK} />
      <path d="M148 40 C144 32 134 34 138 44 C140 50 148 54 148 54 C148 54 156 50 158 44 C162 34 152 32 148 40Z" fill={BLOSSOM} />
      <circle cx="42" cy="120" r="3" fill={GOLD} opacity="0.8" />
      <circle cx="166" cy="128" r="2.4" fill={LAV} />
    </Frame>
  );
}

export function SceneGaze() {
  return (
    <Frame uid="gaze">
      <GirlHairBack cx={128} cy={86} />
      <ellipse cx="74" cy="140" rx="20" ry="30" fill="#4A2A48" />
      <ellipse cx="128" cy="142" rx="21" ry="30" fill={ROSE} />
      <ellipse cx="128" cy="122" rx="17" ry="7" fill={BLOSSOM} />
      <BoyHair cx={74} cy={88} />
      <BoyFace cx={74} cy={92} />
      <GirlHairFront cx={128} cy={88} />
      <GirlFace cx={128} cy={90} />
      <path d="M90 128 Q100 136 112 130" stroke={SKIN} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M100 72 C96 64 86 66 90 76 C92 82 100 86 100 86 C100 86 108 82 110 76 C114 66 104 64 100 72Z" fill={PINK} />
      <path d="M64 56 C60 48 50 50 54 60 C56 66 64 70 64 70 C64 70 72 66 74 60 C78 50 68 48 64 56Z" fill={GOLD} />
      <path d="M148 50 C144 42 134 44 138 54 C140 60 148 64 148 64 C148 64 156 60 158 54 C162 44 152 42 148 50Z" fill={ROSE} />
      <path d="M92 84 Q100 90 110 84" stroke={PINK} strokeWidth="1.4" fill="none" opacity="0.7" />
    </Frame>
  );
}

export function SceneRoses() {
  return (
    <Frame uid="roses">
      <GirlHairBack cx={126} cy={80} />
      <ellipse cx="70" cy="138" rx="18" ry="32" fill="#4A2A48" />
      <ellipse cx="128" cy="140" rx="19" ry="32" fill={ROSE} />
      <ellipse cx="128" cy="120" rx="16" ry="7" fill={BLOSSOM} />
      <BoyHair cx={70} cy={82} />
      <BoyFace cx={70} cy={86} />
      <GirlHairFront cx={126} cy={82} />
      <GirlFace cx={126} cy={84} />
      <path d="M86 118 Q92 108 98 96" stroke={SKIN} strokeWidth="6" fill="none" strokeLinecap="round" />
      <Rose x={100} y={78} s={1.15} />
      <Rose x={88} y={86} s={0.85} />
      <Rose x={110} y={88} s={0.8} />
      <path d="M48 160" />
      <Rose x={40} y={158} s={0.7} />
      <Rose x={160} y={154} s={0.75} />
      <Rose x={174} y={168} s={0.6} />
      <path d="M58 48 C54 40 44 42 48 52 C50 58 58 62 58 62 C58 62 66 58 68 52 C72 42 62 40 58 48Z" fill={PINK} />
    </Frame>
  );
}

export function SceneStars() {
  return (
    <Frame uid="stars">
      <circle cx="36" cy="40" r="1.4" fill={CREAM} />
      <circle cx="58" cy="28" r="1.1" fill={GOLD} />
      <circle cx="150" cy="30" r="1.5" fill={CREAM} />
      <circle cx="172" cy="48" r="1.2" fill={LAV} />
      <circle cx="88" cy="26" r="1" fill={BLOSSOM} />
      <path d="M30 38 l0.8 2.2 2.2 0.8-2.2 0.8L30 44 29.2 41.8 27 41 29.2 40.2Z" fill={GOLD} />
      <path d="M168 26 l1 2.6 2.6 1-2.6 1L168 33.2 167 30.6 164.4 29.6 167 28.6Z" fill={PINK} />
      <ellipse cx="100" cy="176" rx="54" ry="10" fill="#1A0A1C" opacity="0.55" />
      <path d="M58 158 Q60 124 92 118 Q130 114 144 136 Q148 150 140 158 Z" fill="#4A2A48" />
      <path d="M96 132 Q128 122 148 140 Q146 156 118 158 Q96 156 96 140 Z" fill={ROSE} />
      <GirlHairBack cx={122} cy={96} />
      <BoyHair cx={84} cy={100} />
      <BoyFace cx={84} cy={104} />
      <GirlHairFront cx={122} cy={98} />
      <GirlFace cx={122} cy={100} />
      <path d="M70 34 C66 26 56 28 60 38 C62 44 70 48 70 48 C70 48 78 44 80 38 C84 28 74 26 70 34Z" fill={GOLD} />
    </Frame>
  );
}

export function SceneForehead() {
  return (
    <Frame uid="fore">
      <GirlHairBack cx={114} cy={86} />
      <ellipse cx="86" cy="140" rx="22" ry="30" fill="#4A2A48" />
      <ellipse cx="116" cy="142" rx="23" ry="30" fill={ROSE} />
      <ellipse cx="116" cy="122" rx="18" ry="7" fill={BLOSSOM} />
      <BoyHair cx={88} cy={90} />
      <BoyFace cx={88} cy={94} />
      <GirlHairFront cx={114} cy={88} />
      <GirlFace cx={114} cy={90} />
      <path d="M70 124 Q64 138 78 152" stroke={SKIN} strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M132 126 Q140 138 128 152" stroke={SKIN} strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M78 56 C74 48 64 50 68 60 C70 66 78 70 78 70 C78 70 86 66 88 60 C92 50 82 48 78 56Z" fill={PINK} />
      <path d="M130 48 C126 40 116 42 120 52 C122 58 130 62 130 62 C130 62 138 58 140 52 C144 42 134 40 130 48Z" fill={ROSE} />
      <path d="M100 70 C96 62 86 64 90 74 C92 80 100 84 100 84 C100 84 108 80 110 74 C114 64 104 62 100 70Z" fill={BLOSSOM} />
    </Frame>
  );
}

export function SceneDance() {
  return (
    <Frame uid="dance">
      <GirlHairBack cx={118} cy={74} />
      <ellipse cx="82" cy="128" rx="18" ry="28" fill="#4A2A48" transform="rotate(-8 82 128)" />
      <path d="M100 118 Q128 108 142 128 Q138 158 112 168 Q92 162 96 138 Z" fill={ROSE} />
      <path d="M108 122 Q130 118 138 132" fill={BLOSSOM} />
      <path d="M70 118 Q62 108 54 122" stroke={SKIN} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M128 112 Q148 96 158 108" stroke={SKIN} strokeWidth="6" fill="none" strokeLinecap="round" />
      <BoyHair cx={84} cy={78} />
      <BoyFace cx={84} cy={82} />
      <GirlHairFront cx={116} cy={76} />
      <GirlFace cx={116} cy={78} />
      <path d="M96 108 Q104 118 118 110" stroke={SKIN} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="168" rx="9" ry="4.5" fill="#2B1A22" />
      <ellipse cx="124" cy="172" rx="11" ry="5" fill="#3A1528" />
      <path d="M48 44 C44 36 34 38 38 48 C40 54 48 58 48 58 C48 58 56 54 58 48 C62 38 52 36 48 44Z" fill={PINK} />
      <path d="M160 38 C156 30 146 32 150 42 C152 48 160 52 160 52 C160 52 168 48 170 42 C174 32 164 30 160 38Z" fill={GOLD} />
      <path d="M100 36 C96 28 86 30 90 40 C92 46 100 50 100 50 C100 50 108 46 110 40 C114 30 104 28 100 36Z" fill={ROSE} />
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
