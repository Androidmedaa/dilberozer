"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./library3d.module.css";

type TrailDot = { x: number; y: number; id: number; life: number };

type WandCursorProps = {
  enabled?: boolean;
};

export function WandCursor({ enabled = true }: WandCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      document.body.style.cursor = "";
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.body.classList.add("library-wand-active");

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      idRef.current += 1;
      setTrail((prev) => [
        ...prev.slice(-24),
        { x: e.clientX, y: e.clientY, id: idRef.current, life: 1 },
      ]);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((t) => ({ ...t, life: t.life - 0.06 }))
          .filter((t) => t.life > 0),
      );
    }, 32);

    return () => {
      document.body.classList.remove("library-wand-active");
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.wandLayer} aria-hidden>
      {trail.map((t) => (
        <span
          key={t.id}
          className={styles.wandTrail}
          style={{
            left: t.x,
            top: t.y,
            opacity: t.life * 0.85,
            transform: `translate(-50%, -50%) scale(${0.35 + t.life * 0.65})`,
          }}
        />
      ))}
      {visible && (
        <>
          <span
            className={styles.wandGlow}
            style={{ left: pos.x, top: pos.y }}
          />
          <div className={styles.wandTip} style={{ left: pos.x, top: pos.y }}>
            <svg
              className={styles.wandSvg}
              viewBox="0 0 32 32"
              width="28"
              height="28"
              aria-hidden
            >
              <line
                x1="16"
                y1="28"
                x2="16"
                y2="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="8" r="4" fill="currentColor" />
              <path
                d="M16 4 L18 2 M16 4 L14 2 M16 4 L16 1"
                stroke="#fff8dc"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
