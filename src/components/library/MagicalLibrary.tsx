"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MagicParticles } from "./MagicParticles";
import { WandCursor } from "./WandCursor";
import { ShelfBook } from "./ShelfBook";
import { DeskOpenBook } from "./DeskOpenBook";
import { BookSpread } from "./BookSpread";
import { SHELF_BOOKS, type BookId, type ShelfBookConfig } from "./types";
import { ROOM_IMAGE } from "./room-asset";
import styles from "./library.module.css";

function parseBookParam(value: string | null): BookId | null {
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

export function MagicalLibrary() {
  const searchParams = useSearchParams();
  const [openBook, setOpenBook] = useState<BookId | null>(null);
  const [burst, setBurst] = useState(false);
  const [burstPos, setBurstPos] = useState({ x: 0.7, y: 0.35 });
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const fromUrl = parseBookParam(searchParams.get("book"));
    if (fromUrl && fromUrl !== "home") {
      setOpenBook(fromUrl);
      setZoomed(true);
    }
  }, [searchParams]);

  const openShelfBook = useCallback((id: BookId, yRatio = 0.35) => {
    setBurstPos({ x: 0.78, y: yRatio });
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
    setTimeout(() => {
      setOpenBook(id);
      setZoomed(true);
    }, 400);
  }, []);

  const openHomeFull = useCallback(() => {
    setOpenBook("home");
    setZoomed(true);
  }, []);

  const closeBook = useCallback(() => {
    setZoomed(false);
    setTimeout(() => setOpenBook(null), 300);
    window.history.replaceState(null, "", "/");
  }, []);

  return (
    <div className={`${styles.library} ${zoomed ? styles.libraryZoomed : ""}`}>
      <MagicParticles burst={burst} burstX={burstPos.x} burstY={burstPos.y} />
      <WandCursor />

      <div className={styles.roomStage}>
        <div className={styles.roomFrame}>
          <Image
            src={ROOM_IMAGE.src}
            alt=""
            width={ROOM_IMAGE.width}
            height={ROOM_IMAGE.height}
            priority
            quality={100}
            className={styles.roomBg}
            sizes="(max-width: 900px) 100vw, 56vh"
          />
          <div className={styles.roomVignette} aria-hidden />
          <div className={styles.sunRays} aria-hidden />

        <motion.header
          className={styles.roomTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className={styles.roomTitleText}>Dilber Özer&apos;s Living Library</h1>
          <p className={styles.roomSubtitle}>A magical archive of mind &amp; craft</p>
        </motion.header>

        <motion.aside
          className={styles.bookshelf}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          <div className={styles.shelfPlank} aria-hidden />
          <div className={styles.shelfBooks}>
            {SHELF_BOOKS.map((book, i) => (
              <ShelfBook
                key={book.id}
                book={book}
                disabled={!!openBook}
                onOpen={() => openShelfBook(book.id, 0.28 + i * 0.08)}
              />
            ))}
          </div>
        </motion.aside>

        <motion.div
          className={styles.desk}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <div className={styles.deskSurface} aria-hidden />
          {!openBook && <DeskOpenBook onExpand={openHomeFull} />}
        </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {openBook && <BookSpread bookId={openBook} onClose={closeBook} />}
      </AnimatePresence>
    </div>
  );
}
