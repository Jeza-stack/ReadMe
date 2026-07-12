'use client';

import { useEffect, useRef } from 'react';

/**
 * Ambient background for the glass-night theme: a soft gradient ground
 * (via the .app-atmosphere CSS layer) plus a drifting bokeh particle field.
 * Fixed, non-interactive, and respects prefers-reduced-motion.
 */
export function ThemeAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const darkHues: number[][] = [
      [46, 107, 255],   // blue
      [65, 216, 255],   // cyan
      [120, 160, 255],  // periwinkle
      [255, 150, 50],   // orange-gold
    ];
    const lightHues: number[][] = [
      [40, 90, 220],
      [30, 150, 210],
      [90, 120, 210],
      [240, 130, 20],
    ];
    const isLight = () => !document.documentElement.classList.contains('dark');
    let W = 0, H = 0, points: any[] = [], raf = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth * dpr;
      H = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    const seed = () => {
      const hues = isLight() ? lightHues : darkHues;
      points = [];
      const n = Math.min(70, Math.floor(window.innerWidth / 18));
      for (let i = 0; i < n; i++) {
        const h = hues[Math.random() < 0.2 ? 3 : Math.floor(Math.random() * 3)];
        points.push({
          x: Math.random() * W, y: Math.random() * H,
          r: (Math.random() * 3 + 1) * dpr,
          vy: (-Math.random() * 0.28 - 0.06) * dpr,
          vx: (Math.random() - 0.5) * 0.15 * dpr,
          a: Math.random() * 0.5 + 0.15,
          tw: Math.random() * Math.PI * 2,
          h,
        });
      }
    };
    const draw = (animate: boolean) => {
      const mul = isLight() ? 0.5 : 1;
      ctx.clearRect(0, 0, W, H);
      for (const p of points) {
        if (animate) { p.y += p.vy; p.x += p.vx; p.tw += 0.02; }
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        const a = p.a * (0.6 + 0.4 * Math.sin(p.tw)) * mul;
        ctx.beginPath();
        ctx.shadowBlur = 14 * dpr;
        ctx.shadowColor = `rgba(${p.h[0]},${p.h[1]},${p.h[2]},${a})`;
        ctx.fillStyle = `rgba(${p.h[0]},${p.h[1]},${p.h[2]},${a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (animate) raf = requestAnimationFrame(() => draw(true));
    };

    resize(); seed();
    if (reduce) draw(false); else draw(true);

    const onResize = () => { resize(); seed(); };
    const onThemeChange = () => { seed(); if (reduce) draw(false); };
    window.addEventListener('resize', onResize);
    window.addEventListener('themechange', onThemeChange);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('themechange', onThemeChange);
    };
  }, []);

  return (
    <>
      <div className="app-atmosphere" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
    </>
  );
}
