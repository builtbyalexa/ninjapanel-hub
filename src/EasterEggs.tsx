import { useEffect, useRef, useCallback } from "react";

// ─── Shared shuriken SVG path ─────────────────────────────
const SHURIKEN_PATH =
  "M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z";

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  color: string;
  life: number; // 0–1, decreasing
}

function createShurikenEl(color: string, size: number): HTMLDivElement {
  const div = document.createElement("div");
  div.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    width: ${size}px;
    height: ${size}px;
    will-change: transform, opacity;
  `;
  div.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}">
    <path d="${SHURIKEN_PATH}"/>
  </svg>`;
  document.body.appendChild(div);
  return div;
}

// ─── Logo Burst ───────────────────────────────────────────
export function useLogoBurst() {
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const burst = useCallback((originX: number, originY: number) => {
    const count = 5;

    for (let i = 0; i < count; i++) {
      // Only angles in the lower half + sides: 0° to 180° (right, down, left) 
      // mapped to radians: 0 to π, then spread evenly
      const angle = (i / (count - 1)) * Math.PI; // 0 = right, π/2 = down, π = left
      const speed = 3.5 + Math.random() * 2;
      const size = 18 + Math.random() * 10;
      const el = createShurikenEl("#f6821f", size);

      particlesRef.current.push({
        el,
        x: originX - size / 2,
        y: originY - size / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.abs(Math.sin(angle)) * speed, // always positive = downward
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 8),
        scale: 1,
        opacity: 0.55,
        color: "#f6821f",
        life: 1,
      });
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const tick = () => {
      let alive = false;
      const W = window.innerWidth;
      const H = window.innerHeight;

      for (const p of particlesRef.current) {
        if (p.life <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gentle gravity pulling down
        p.rotation += p.rotationSpeed;

        // Bounce off left/right walls — lose a bit of energy each bounce
        if (p.x <= 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.7; }
        if (p.x + p.scale * 24 >= W) { p.x = W - p.scale * 24; p.vx = -Math.abs(p.vx) * 0.7; }

        // Fade out once they fall off the bottom
        if (p.y > H) {
          p.life = 0;
        } else {
          // Fade gently in last 30% of screen height
          const fadeStart = H * 0.7;
          if (p.y > fadeStart) {
            p.opacity = Math.max(0, 0.55 * (1 - (p.y - fadeStart) / (H * 0.3)));
          }
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        p.el.style.opacity = String(p.opacity);
      }

      if (alive) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        for (const p of particlesRef.current) p.el.remove();
        particlesRef.current = [];
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      for (const p of particlesRef.current) p.el.remove();
    };
  }, []);

  return burst;
}

// ─── Idle Tumbleweed Shuriken ─────────────────────────────
export function IdleShuriken() {
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  const resetIdle = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(launch, 30_000);
  }, []);

  const launch = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    const size = 28;
    const el = createShurikenEl("#f6821f", size);
    // Random Y anywhere in the visible viewport, avoiding nav (top 60px)
    const startY = 80 + Math.random() * (window.innerHeight - 160);
    let x = -size;
    let rotation = 0;

    el.style.opacity = "0.75";
    el.style.transform = `translate(${x}px, ${startY}px) rotate(0deg)`;

    const speed = 1.8 + Math.random() * 1.2;

    const tick = () => {
      x += speed;
      rotation += 3.5;
      el.style.transform = `translate(${x}px, ${startY}px) rotate(${rotation}deg)`;

      if (x < window.innerWidth + size) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        el.remove();
        activeRef.current = false;
        // Schedule next one after another 30s of idle
        resetIdle();
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [resetIdle]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    idleTimerRef.current = setTimeout(launch, 30_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resetIdle, launch]);

  return null;
}
