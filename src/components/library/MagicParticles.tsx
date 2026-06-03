"use client";

import { useEffect, useRef } from "react";
import styles from "./library.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  gold: boolean;
};

type MagicParticlesProps = {
  burst?: boolean;
  burstX?: number;
  burstY?: number;
};

export function MagicParticles({ burst, burstX = 0.5, burstY = 0.5 }: MagicParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(burst);

  useEffect(() => {
    burstRef.current = burst;
  }, [burst]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const surface: HTMLCanvasElement = canvasRef.current;

    const ctxRaw = surface.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    let animationId = 0;
    const particles: Particle[] = [];
    const count = 80;

    function resize() {
      surface.width = window.innerWidth;
      surface.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * surface.width,
        y: Math.random() * surface.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        gold: Math.random() > 0.6,
      });
    }

    function spawnBurst() {
      const cx = burstX * surface.width;
      const cy = burstY * surface.height;
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1,
          gold: true,
        });
      }
    }

    if (burst) spawnBurst();

    function draw() {
      ctx.clearRect(0, 0, surface.width, surface.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.002;
        p.vy += 0.01;

        if (p.alpha <= 0 || p.y > surface.height + 20) {
          if (i >= count) particles.splice(i, 1);
          else {
            p.x = Math.random() * surface.width;
            p.y = surface.height + Math.random() * 40;
            p.vx = (Math.random() - 0.5) * 0.3;
            p.vy = -Math.random() * 0.5 - 0.1;
            p.alpha = Math.random() * 0.6 + 0.2;
          }
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(255, 210, 120, ${p.alpha})`
          : `rgba(255, 248, 220, ${p.alpha * 0.7})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [burst, burstX, burstY]);

  return <canvas ref={canvasRef} className={styles.particlesCanvas} aria-hidden />;
}
