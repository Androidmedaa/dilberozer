"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PortfolioImage } from "@/components/ui/PortfolioImage";
import styles from "./image-lightbox.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
  unoptimized?: boolean;
  zoomSrc?: string;
  zoomWidth?: number;
  zoomHeight?: number;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const current = images[currentIndex];
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  const isDiagramZoom = Boolean(current?.zoomSrc);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setZoom(1);
  }, [currentIndex, current?.src]);

  const clampZoom = useCallback(
    (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)),
    [],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
      if (isDiagramZoom && (event.key === "+" || event.key === "=")) {
        setZoom((prev) => clampZoom(prev + 0.25));
      }
      if (isDiagramZoom && event.key === "-") {
        setZoom((prev) => clampZoom(prev - 0.25));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [clampZoom, isDiagramZoom, onClose, onNext, onPrev]);

  if (!current || !mounted) return null;

  const zoomSrc = current.zoomSrc ?? current.src;
  const zoomWidth = current.zoomWidth ?? 2400;
  const zoomHeight = current.zoomHeight ?? 1800;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Image preview">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close image preview"
        onClick={onClose}
      />

      <div className={`${styles.content} ${isDiagramZoom ? styles.contentZoom : ""}`}>
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          ×
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              aria-label="Previous image"
              onClick={onPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              aria-label="Next image"
              onClick={onNext}
            >
              ›
            </button>
          </>
        )}

        <figure className={`${styles.figure} ${isDiagramZoom ? styles.figureZoom : ""}`}>
          {isDiagramZoom ? (
            <>
              <div className={styles.zoomToolbar} aria-label="Zoom controls">
                <button
                  type="button"
                  className={styles.zoomBtn}
                  aria-label="Zoom out"
                  onClick={() => setZoom((prev) => clampZoom(prev - 0.25))}
                >
                  −
                </button>
                <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  className={styles.zoomBtn}
                  aria-label="Zoom in"
                  onClick={() => setZoom((prev) => clampZoom(prev + 0.25))}
                >
                  +
                </button>
                <button
                  type="button"
                  className={styles.zoomBtn}
                  aria-label="Reset zoom"
                  onClick={() => setZoom(1)}
                >
                  Reset
                </button>
              </div>
              <div className={styles.zoomScroll}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={zoomSrc}
                  alt={current.alt}
                  width={zoomWidth}
                  height={zoomHeight}
                  className={styles.zoomImage}
                  style={{ width: `${zoom * 100}%` }}
                  draggable={false}
                />
              </div>
            </>
          ) : (
            <div className={styles.imageWrap}>
              <PortfolioImage
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className={styles.image}
                priority
                unoptimized={current.unoptimized ?? current.src.toLowerCase().endsWith(".svg")}
              />
            </div>
          )}
          {current.caption && <figcaption className={styles.caption}>{current.caption}</figcaption>}
        </figure>
      </div>
    </div>,
    document.body,
  );
}
