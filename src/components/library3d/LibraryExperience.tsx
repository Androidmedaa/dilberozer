"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { BookSpread } from "@/components/library/BookSpread";
import type { BookId } from "@/components/library/types";
import type { LightingSettings } from "./scene/SceneLighting";
import { WandCursor } from "./WandCursor";
import { MouseLightOverlay } from "./MouseLightOverlay";
import { LightControlPanel } from "./LightControlPanel";
import { BookMenuPanel } from "./BookMenuPanel";
import styles from "./library3d.module.css";

const LibraryScene = dynamic(
  () => import("./scene/LibraryScene").then((m) => m.LibraryScene),
  {
    ssr: false,
    loading: () => (
      <div className={styles.canvasLoading}>Entering the library…</div>
    ),
  },
);

const DEFAULT_LIGHTING: LightingSettings = {
  lightsOn: true,
  ambientIntensity: 0.65,
  warmth: 0.55,
};

function parseBook(value: string | null): BookId | null {
  if (
    value === "about" ||
    value === "projects" ||
    value === "ai-projects" ||
    value === "internships" ||
    value === "contact" ||
    value === "home"
  ) {
    if (value === "ai-projects") return "projects";
    return value;
  }
  return null;
}

export function LibraryExperience() {
  const searchParams = useSearchParams();
  const [focusedBook, setFocusedBook] = useState<BookId | null>(null);
  const [showSpread, setShowSpread] = useState(false);
  const [showAiHint, setShowAiHint] = useState(false);
  const [lighting, setLighting] = useState<LightingSettings>(DEFAULT_LIGHTING);
  const [menuHoverBook, setMenuHoverBook] = useState<BookId | null>(null);

  useEffect(() => {
    const fromUrl = parseBook(searchParams.get("book"));
    if (fromUrl) {
      setFocusedBook(fromUrl);
      setShowSpread(false);
    }
  }, [searchParams]);

  const handleSelectBook = useCallback((id: BookId) => {
    setShowSpread(false);
    setFocusedBook(id);
    const url = id === "home" ? "/" : `/?book=${id}`;
    window.history.replaceState(null, "", url);
  }, []);

  const handleReadingReady = useCallback(() => {
    setShowSpread(true);
  }, []);

  const handleOverviewReady = useCallback(() => {
    setShowSpread(false);
  }, []);

  const handleCloseBook = useCallback(() => {
    setShowSpread(false);
    setFocusedBook(null);
    window.history.replaceState(null, "", "/");
  }, []);

  const wandActive = focusedBook === null && !showSpread;

  return (
    <div className={styles.root}>
      <div className={styles.canvasWrap}>
        <LibraryScene
          focusedBook={focusedBook}
          menuHighlightBook={focusedBook ?? menuHoverBook}
          onSelectBook={handleSelectBook}
          onReadingReady={handleReadingReady}
          onOverviewReady={handleOverviewReady}
          lighting={lighting}
        />
      </div>

      <MouseLightOverlay enabled={wandActive && lighting.lightsOn} />
      <WandCursor enabled={wandActive} />

      <div
        className={styles.vignette}
        data-lights={lighting.lightsOn ? "on" : "off"}
        aria-hidden
      />

      <header className={styles.header}>
        <p className={styles.name}>Dilber Özer</p>
        <p className={styles.tagline}>Living Knowledge Library</p>
      </header>

      <p className={styles.hint}>Open the central chronicle or choose a volume from the menu →</p>

      <BookMenuPanel
        activeBook={focusedBook}
        onSelect={handleSelectBook}
        onHover={setMenuHoverBook}
        disabled={showSpread}
      />

      <LightControlPanel settings={lighting} onChange={setLighting} />

      <div className={styles.cornerUi}>
        <button
          type="button"
          className={styles.talkBtn}
          onClick={() => setShowAiHint((v) => !v)}
          aria-expanded={showAiHint}
        >
          <span className={styles.micIcon} aria-hidden>
            🎤
          </span>
          Talk to AI
        </button>
        {showAiHint && (
          <p className={styles.aiHint} role="status">
            Ask me about Dilber — voice assistant returns in a future chapter. For now,
            open the books or email{" "}
            <a href="mailto:dilberozer.ceng@gmail.com">dilberozer.ceng@gmail.com</a>.
          </p>
        )}
      </div>

      <AnimatePresence>
        {showSpread && focusedBook && (
          <BookSpread bookId={focusedBook} onClose={handleCloseBook} swapMode />
        )}
      </AnimatePresence>
    </div>
  );
}
