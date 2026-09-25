import { useEffect, useRef } from "react";
import {
  FLIGHT_DESTINATION,
  FLIGHT_ORIGIN,
  LAND_POLYGONS,
  type JourneyPlace,
} from "../data/flightJourney";
import {
  clamp,
  easeInOutCubic,
  easeOutCubic,
  greatCircle,
  latLonToVec,
  lerp,
  lerpLon,
  project,
  rotateToCamera,
  slerp,
  vecToLatLon,
  type Camera,
  type Vec3,
} from "../geo/globeMath";

export type JourneyPhase = "idle" | "origin" | "flight" | "arrival" | "message" | "done";

interface TravelGlobeProps {
  origin?: JourneyPlace;
  destination?: JourneyPlace;
  playing: boolean;
  replayKey: number;
  reduced: boolean;
  onPhase: (phase: JourneyPhase) => void;
}

const ORIGIN_MS = 2400;
const HOLD_MS = 900;
const FLIGHT_MS = 9800;
const ARRIVAL_MS = 2100;
const MESSAGE_MS = 1500;

const OCEAN = ["#0b0614", "#160a22", "#241033"] as const;
const LAND = "#4a1d46";

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, fill: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(0, 0.32);
  ctx.bezierCurveTo(-0.55, -0.08, -0.48, -0.62, 0, -0.38);
  ctx.bezierCurveTo(0.48, -0.62, 0.55, -0.08, 0, 0.32);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}

function drawAirplane(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(232,185,120,0.55)";
  ctx.shadowBlur = 14;

  ctx.fillStyle = "#C9D4E8";
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(-7, 5);
  ctx.lineTo(-13, 11);
  ctx.lineTo(-16, 10);
  ctx.lineTo(-12, 0);
  ctx.lineTo(-16, -10);
  ctx.lineTo(-13, -11);
  ctx.lineTo(-7, -5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#F4F0EA";
  ctx.beginPath();
  ctx.moveTo(28, 0);
  ctx.bezierCurveTo(24, -3.6, 10, -5.2, -6, -4.6);
  ctx.lineTo(-22, -3.2);
  ctx.bezierCurveTo(-26, -2.6, -27, -1.2, -27, 0);
  ctx.bezierCurveTo(-27, 1.2, -26, 2.6, -22, 3.2);
  ctx.lineTo(-6, 4.6);
  ctx.bezierCurveTo(10, 5.2, 24, 3.6, 28, 0);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(42, 22, 48, 0.28)";
  ctx.lineWidth = 0.7;
  ctx.stroke();

  ctx.fillStyle = "#D8C4A8";
  ctx.beginPath();
  ctx.moveTo(26.5, 0);
  ctx.bezierCurveTo(23, -2.2, 14, -3.2, 6, -3);
  ctx.lineTo(6, 3);
  ctx.bezierCurveTo(14, 3.2, 23, 2.2, 26.5, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#8FA3C4";
  ctx.beginPath();
  ctx.moveTo(4, 0);
  ctx.lineTo(-1, 16);
  ctx.lineTo(-8, 15.2);
  ctx.lineTo(-4, 0);
  ctx.lineTo(-8, -15.2);
  ctx.lineTo(-1, -16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(42, 22, 48, 0.22)";
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.fillStyle = "#E8B978";
  ctx.beginPath();
  ctx.moveTo(-2, 7);
  ctx.lineTo(-5, 12.5);
  ctx.lineTo(-8, 12);
  ctx.lineTo(-4.5, 7);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-2, -7);
  ctx.lineTo(-5, -12.5);
  ctx.lineTo(-8, -12);
  ctx.lineTo(-4.5, -7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#5A6F8C";
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(-23, 7.5);
  ctx.lineTo(-26, 6.6);
  ctx.lineTo(-22, 0);
  ctx.lineTo(-26, -6.6);
  ctx.lineTo(-23, -7.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#3E1A40";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(8 - i * 3.2, 0, 1.15, 1.45, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#7EB7E0";
  ctx.beginPath();
  ctx.ellipse(20, 0, 2.1, 1.7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#C4415C";
  ctx.beginPath();
  ctx.moveTo(27.2, 0);
  ctx.lineTo(22, -1.4);
  ctx.lineTo(22, 1.4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  accent: string
) {
  ctx.save();
  ctx.font = "600 12px Quicksand, sans-serif";
  const w = ctx.measureText(text).width;
  const padX = 10;
  const boxW = w + padX * 2;
  const boxH = 22;
  const bx = x - boxW / 2;
  const by = y - boxH - 10;
  ctx.fillStyle = "rgba(24,8,25,0.82)";
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(bx, by, boxW, boxH, 11);
  else ctx.rect(bx, by, boxW, boxH);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#FBF3EC";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, by + boxH / 2 + 0.5);
  ctx.restore();
}

function isFront(v: Vec3): boolean {
  return v.z > 0.02;
}

export default function TravelGlobe({
  origin = FLIGHT_ORIGIN,
  destination = FLIGHT_DESTINATION,
  playing,
  replayKey,
  reduced,
  onPhase,
}: TravelGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(playing);
  const reducedRef = useRef(reduced);
  const onPhaseRef = useRef(onPhase);
  const originRef = useRef(origin);
  const destRef = useRef(destination);
  const replayRef = useRef(replayKey);

  useEffect(() => {
    playingRef.current = playing;
    reducedRef.current = reduced;
    onPhaseRef.current = onPhase;
    originRef.current = origin;
    destRef.current = destination;
    replayRef.current = replayKey;
  }, [playing, reduced, onPhase, origin, destination, replayKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let last = performance.now();
    let elapsed = 0;
    let idleLon = 105;
    let cam: Camera = { lat: 18, lon: 105, zoom: 1.02 };
    let lastPhase: JourneyPhase = "idle";

    const stars = Array.from({ length: 70 }, (_, i) => ({
      x: (Math.sin(i * 12.9898) * 0.5 + 0.5) * 1000,
      y: (Math.sin(i * 78.233) * 0.5 + 0.5) * 700,
      r: (i % 5) * 0.25 + 0.5,
      tw: i * 0.37,
    }));

    const setPhase = (p: JourneyPhase) => {
      if (lastPhase === p) return;
      lastPhase = p;
      onPhaseRef.current(p);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let replaySeen = replayRef.current;
    let visible = true;
    let cachedPath: Vec3[] = [];
    let pathOriginLat = Number.NaN;
    let pathOriginLon = Number.NaN;
    let pathDestLat = Number.NaN;
    let pathDestLon = Number.NaN;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const render = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(render);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(40, now - last);
      last = now;

      if (replaySeen !== replayRef.current) {
        replaySeen = replayRef.current;
        elapsed = 0;
        lastPhase = "idle";
      }

      const cssW = wrap.clientWidth;
      const cssH = wrap.clientHeight;
      const originPlace = originRef.current;
      const destPlace = destRef.current;
      const a = latLonToVec(originPlace.lat, originPlace.lon);
      const b = latLonToVec(destPlace.lat, destPlace.lon);
      if (
        originPlace.lat !== pathOriginLat ||
        originPlace.lon !== pathOriginLon ||
        destPlace.lat !== pathDestLat ||
        destPlace.lon !== pathDestLon
      ) {
        pathOriginLat = originPlace.lat;
        pathOriginLon = originPlace.lon;
        pathDestLat = destPlace.lat;
        pathDestLon = destPlace.lon;
        cachedPath = greatCircle(a, b, 72);
      }
      const path = cachedPath;

      let flightT = 0;
      let originAlpha = 0;
      let destAlpha = 0;
      let trailT = 0;
      let showPlane = false;

      if (reducedRef.current) {
        cam = { lat: destPlace.lat, lon: destPlace.lon, zoom: 1.42 };
        flightT = 1;
        originAlpha = 1;
        destAlpha = 1;
        trailT = 1;
        showPlane = false;
        setPhase("done");
      } else if (!playingRef.current) {
        idleLon += dt * 0.0045;
        cam = { lat: 16, lon: idleLon, zoom: 1.02 };
        elapsed = 0;
        setPhase("idle");
      } else {
        elapsed += dt;
        const t1 = ORIGIN_MS;
        const t2 = t1 + HOLD_MS;
        const t3 = t2 + FLIGHT_MS;
        const t4 = t3 + ARRIVAL_MS;
        const t5 = t4 + MESSAGE_MS;

        if (elapsed < t1) {
          const k = easeOutCubic(elapsed / t1);
          cam = {
            lat: lerp(16, originPlace.lat, k),
            lon: lerpLon(idleLon, originPlace.lon, k),
            zoom: lerp(1.02, 1.58, k),
          };
          originAlpha = k;
          setPhase("origin");
        } else if (elapsed < t2) {
          cam = { lat: originPlace.lat, lon: originPlace.lon, zoom: 1.58 };
          originAlpha = 1;
          setPhase("origin");
        } else if (elapsed < t3) {
          flightT = easeInOutCubic((elapsed - t2) / FLIGHT_MS);
          const look = slerp(a, b, Math.min(1, flightT + 0.06));
          const ll = vecToLatLon(look);
          cam = {
            lat: ll.lat,
            lon: ll.lon,
            zoom: lerp(1.5, 1.32, flightT),
          };
          originAlpha = 1;
          trailT = flightT;
          showPlane = true;
          setPhase("flight");
        } else if (elapsed < t4) {
          const k = easeInOutCubic((elapsed - t3) / ARRIVAL_MS);
          cam = {
            lat: lerp(destPlace.lat, destPlace.lat, k),
            lon: lerpLon(vecToLatLon(b).lon, destPlace.lon, k),
            zoom: lerp(1.32, 1.62, k),
          };
          originAlpha = 1 - k * 0.35;
          destAlpha = k;
          trailT = 1;
          showPlane = k < 0.85;
          flightT = 1;
          setPhase("arrival");
        } else {
          cam = { lat: destPlace.lat, lon: destPlace.lon, zoom: 1.62 };
          originAlpha = 0.65;
          destAlpha = 1;
          trailT = 1;
          flightT = 1;
          showPlane = false;
          setPhase(elapsed < t5 ? "message" : "done");
        }
      }

      ctx.clearRect(0, 0, cssW, cssH);
      const cx = cssW / 2;
      const cy = cssH / 2 + 6;
      const radius = Math.min(cssW, cssH) * 0.36 * cam.zoom;

      stars.forEach((s) => {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * 0.0018 + s.tw));
        ctx.fillStyle = `rgba(251,243,236,${tw * 0.85})`;
        ctx.beginPath();
        ctx.arc((s.x % cssW), (s.y % cssH), s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const atm = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.22);
      atm.addColorStop(0, "rgba(196,65,92,0.0)");
      atm.addColorStop(0.55, "rgba(196,65,92,0.12)");
      atm.addColorStop(0.82, "rgba(232,185,120,0.22)");
      atm.addColorStop(1, "rgba(24,8,25,0)");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.22, 0, Math.PI * 2);
      ctx.fill();

      const ocean = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.32, radius * 0.08, cx, cy, radius);
      ocean.addColorStop(0, OCEAN[2]);
      ocean.addColorStop(0.45, OCEAN[1]);
      ocean.addColorStop(1, OCEAN[0]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = "rgba(232,185,120,0.12)";
      ctx.lineWidth = 0.6;
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 4) {
          const rv = rotateToCamera(latLonToVec(lat, lon), cam);
          if (!isFront(rv)) {
            started = false;
            continue;
          }
          const p = project(rv, cx, cy, radius);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          const rv = rotateToCamera(latLonToVec(lat, lon), cam);
          if (!isFront(rv)) {
            started = false;
            continue;
          }
          const p = project(rv, cx, cy, radius);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      LAND_POLYGONS.forEach((poly) => {
        const pts = poly.map(([lat, lon]) => rotateToCamera(latLonToVec(lat, lon), cam));
        if (!pts.some(isFront)) return;
        ctx.beginPath();
        let started = false;
        pts.forEach((rv) => {
          if (rv.z < -0.15) {
            started = false;
            return;
          }
          const p = project(rv, cx, cy, radius);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fillStyle = LAND;
        ctx.fill();
        ctx.strokeStyle = "rgba(232,185,120,0.18)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      const shade = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius * 0.7, cy + radius * 0.8);
      shade.addColorStop(0, "rgba(251,243,236,0.10)");
      shade.addColorStop(0.35, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(8,2,10,0.58)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      const drawRoute = (upto: number, glow: boolean) => {
        ctx.beginPath();
        let started = false;
        const n = Math.floor(upto * (path.length - 1));
        for (let i = 0; i <= n; i++) {
          const rv = rotateToCamera(path[i], cam);
          if (!isFront(rv)) {
            started = false;
            continue;
          }
          const p = project(rv, cx, cy, radius);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        if (glow) {
          ctx.strokeStyle = "rgba(232,137,160,0.95)";
          ctx.shadowColor = "rgba(232,185,120,0.9)";
          ctx.shadowBlur = 16;
          ctx.lineWidth = 3.4;
        } else {
          ctx.strokeStyle = "rgba(232,185,120,0.38)";
          ctx.shadowBlur = 0;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([5, 6]);
        }
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
      };

      if (trailT > 0.01) drawRoute(1, false);
      if (trailT > 0.01) drawRoute(trailT, true);

      const marker = (
        vec: Vec3,
        alpha: number,
        kind: "origin" | "dest",
        label: string
      ) => {
        if (alpha <= 0.02) return;
        const rv = rotateToCamera(vec, cam);
        if (!isFront(rv)) return;
        const p = project(rv, cx, cy, radius);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = kind === "origin" ? "#E8B978" : "#C4415C";
        ctx.shadowColor = kind === "origin" ? "rgba(232,185,120,0.9)" : "rgba(196,65,92,0.95)";
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 11 + Math.sin(now * 0.004) * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = kind === "origin" ? "rgba(232,185,120,0.7)" : "rgba(232,137,160,0.8)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        if (kind === "dest") drawHeart(ctx, p.x, p.y - 18, 11, "#E88BA0");
        drawLabel(ctx, label, p.x, p.y - (kind === "dest" ? 28 : 8), kind === "origin" ? "#E8B978" : "#E88BA0");
        ctx.globalAlpha = 1;
      };

      marker(a, originAlpha, "origin", originPlace.label);
      marker(b, destAlpha, "dest", destPlace.label);

      if (showPlane) {
        const t = clamp(flightT, 0.002, 0.998);
        const pos = slerp(a, b, t);
        const next = slerp(a, b, Math.min(1, t + 0.018));
        const rv = rotateToCamera(pos, cam);
        const nv = rotateToCamera(next, cam);
        if (isFront(rv)) {
          const p = project(rv, cx, cy, radius);
          const q = project(nv, cx, cy, radius);
          const ang = Math.atan2(q.y - p.y, q.x - p.x);
          const planeScale = Math.max(1.85, Math.min(cssW, cssH) / 210);
          drawAirplane(ctx, p.x, p.y, ang, planeScale);
        }
      }

      if (lastPhase === "message" || lastPhase === "done") {
        for (let i = 0; i < 14; i++) {
          const rise = ((now * 0.04 + i * 47) % (cssH * 0.7)) / (cssH * 0.7);
          const hx = cx + Math.sin(i * 1.7 + now * 0.001) * radius * 0.85;
          const hy = cy + radius * 0.7 - rise * radius * 1.5;
          ctx.globalAlpha = 0.35 * (1 - rise);
          drawHeart(ctx, hx, hy, 5 + (i % 4), i % 2 === 0 ? "#E88BA0" : "#E8B978");
          ctx.globalAlpha = 1;
        }
      }

      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(232,185,120,0.35)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const shine = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, 4, cx - radius * 0.35, cy - radius * 0.4, radius * 0.7);
      shine.addColorStop(0, "rgba(251,243,236,0.18)");
      shine.addColorStop(1, "rgba(251,243,236,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();
    };

    raf = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[360px] w-full sm:h-[460px] md:h-[520px]">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
