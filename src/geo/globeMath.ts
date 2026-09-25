export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Camera {
  lat: number;
  lon: number;
  zoom: number;
}

const DEG = Math.PI / 180;

export function toRad(deg: number): number {
  return deg * DEG;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpLon(a: number, b: number, t: number): number {
  let d = b - a;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return a + d * t;
}

export function easeInOutCubic(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  const x = 1 - clamp(t, 0, 1);
  return 1 - x * x * x;
}

export function latLonToVec(lat: number, lon: number): Vec3 {
  const latR = toRad(lat);
  const lonR = toRad(lon);
  const c = Math.cos(latR);
  return {
    x: c * Math.sin(lonR),
    y: Math.sin(latR),
    z: c * Math.cos(lonR),
  };
}

export function vecToLatLon(v: Vec3): { lat: number; lon: number } {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  const lat = Math.asin(clamp(v.y / len, -1, 1)) / DEG;
  const lon = Math.atan2(v.x, v.z) / DEG;
  return { lat, lon };
}

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = clamp(dot(a, b), -1, 1);
  const omega = Math.acos(d);
  if (omega < 1e-5) return { x: a.x, y: a.y, z: a.z };
  const sinO = Math.sin(omega);
  const w0 = Math.sin((1 - t) * omega) / sinO;
  const w1 = Math.sin(t * omega) / sinO;
  return {
    x: a.x * w0 + b.x * w1,
    y: a.y * w0 + b.y * w1,
    z: a.z * w0 + b.z * w1,
  };
}

export function greatCircle(origin: Vec3, dest: Vec3, steps: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    pts.push(slerp(origin, dest, i / steps));
  }
  return pts;
}

export function rotateToCamera(v: Vec3, cam: Camera): Vec3 {
  const lon = toRad(cam.lon);
  const lat = toRad(cam.lat);
  const cosL = Math.cos(lon);
  const sinL = Math.sin(lon);
  const x1 = v.x * cosL - v.z * sinL;
  const z1 = v.x * sinL + v.z * cosL;
  const cosP = Math.cos(lat);
  const sinP = Math.sin(lat);
  return {
    x: x1,
    y: v.y * cosP - z1 * sinP,
    z: v.y * sinP + z1 * cosP,
  };
}

export function project(v: Vec3, cx: number, cy: number, radius: number): Vec2 {
  return {
    x: cx + v.x * radius,
    y: cy - v.y * radius,
  };
}


