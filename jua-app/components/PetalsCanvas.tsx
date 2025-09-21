"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vr: number;
  life: number;
};

export default function PetalsCanvas({ burstKey }: { burstKey: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const petals = petalsRef;
    const raf = rafRef;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const width = () => canvas.clientWidth;
    const height = () => canvas.clientHeight;

    const spawnBurst = (count = 90) => {
      for (let i = 0; i < count; i += 1) {
        petals.current.push({
          x: width() / 2,
          y: height() / 2,
          vx: (Math.random() * 2 - 1) * 2.5,
          vy: -(Math.random() * 2 + 1) * 2.2,
          r: 6 + Math.random() * 8,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() * 2 - 1) * 0.02,
          life: 1,
        });
      }
    };

    let previous = performance.now();
    const tick = (time: number) => {
      const dt = Math.min(33, time - previous);
      previous = time;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (const petal of petals.current) {
        petal.vy += 0.002 * dt;
        petal.vx += Math.sin(time * 0.001 + petal.rot) * 0.001 * dt;
        petal.x += petal.vx * (dt / 16);
        petal.y += petal.vy * (dt / 16);
        petal.rot += petal.vr * dt;
        petal.life -= petal.y > height() + 50 ? 0.02 : 0.004;
      }

      petals.current = petals.current.filter((petal) => petal.life > 0);

      for (const petal of petals.current) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, petal.life));
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rot);
        ctx.fillStyle = "rgba(219,95,122,0.9)";
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.r, petal.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf.current = window.requestAnimationFrame(tick);
    };

    raf.current = window.requestAnimationFrame(tick);
    spawnBurst(90);

    return () => {
      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const petals = petalsRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    for (let i = 0; i < 120; i += 1) {
      petals.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() * 2 - 1) * 3.2,
        vy: -(Math.random() * 2 + 1) * 2.8,
        r: 6 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() * 2 - 1) * 0.03,
        life: 1,
      });
    }
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
