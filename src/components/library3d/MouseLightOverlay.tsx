"use client";

import { useEffect, useState } from "react";
import styles from "./library3d.module.css";

type MouseLightOverlayProps = {
  enabled?: boolean;
};

export function MouseLightOverlay({ enabled = true }: MouseLightOverlayProps) {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <div
      className={styles.mouseLight}
      style={{
        left: pos.x,
        top: pos.y,
      }}
      aria-hidden
    />
  );
}
