"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./library.module.css";

type TrailDot = { x: number; y: number; id: number; life: number };

export function WandCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.body.classList.add("library-cursor-active");

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      idRef.current += 1;
      setTrail((prev) => [
        ...prev.slice(-18),
        { x: e.clientX, y: e.clientY, id: idRef.current, life: 1 },
      ]);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((t) => ({ ...t, life: t.life - 0.08 }))
          .filter((t) => t.life > 0),
      );
    }, 40);

    return () => {
      document.body.classList.remove("library-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wandLayer} aria-hidden>
      {trail.map((t) => (
        <span
          key={t.id}
          className={styles.wandTrail}
          style={{
            left: t.x,
            top: t.y,
            opacity: t.life * 0.7,
            transform: `translate(-50%, -50%) scale(${0.3 + t.life * 0.5})`,
          }}
        />
      ))}
      {visible && (
        <div
          className={styles.wandTip}
          style={{ left: pos.x, top: pos.y }}
        >
          <span className={styles.wandStar}>✦</span>
        </div>
      )}
    </div>
  );
}
