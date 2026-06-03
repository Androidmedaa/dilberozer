"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { BookId } from "./types";
import styles from "./library.module.css";
import { HomeBookContent } from "./content/HomeBookContent";
import { AboutBookContent } from "./content/AboutBookContent";
import { ProjectsBookContent } from "./content/ProjectsBookContent";
import { InternshipsBookContent } from "./content/InternshipsBookContent";
import { ContactBookContent } from "./content/ContactBookContent";

const TITLES: Record<BookId, string> = {
  home: "Home — The Living Chronicle",
  projects: "Projects",
  about: "About Me",
  internships: "Internships",
  contact: "Contact",
};

type BookSpreadProps = {
  bookId: BookId;
  onClose: () => void;
  swapMode?: boolean;
};

export function BookSpread({ bookId, onClose, swapMode }: BookSpreadProps) {
  return (
    <motion.div
      className={styles.readingOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: swapMode ? 0.55 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.readingBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        aria-hidden
      />

      <motion.article
        className={styles.openBook}
        initial={{ scale: 0.88, opacity: 0, rotateY: -18 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.92, opacity: 0, rotateY: 12 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          mass: 0.9,
        }}
        style={{ transformPerspective: 1200 }}
        role="dialog"
        aria-modal="true"
        aria-label={TITLES[bookId]}
      >
        <header className={styles.openBookHeader}>
          <h2 className={styles.openBookTitle}>{TITLES[bookId]}</h2>
          <button type="button" className={styles.closeBookBtn} onClick={onClose}>
            Close book ✕
          </button>
        </header>

        <div className={styles.spread}>
          <motion.div
            className={styles.pageLeft}
            initial={{ rotateY: 72, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.pageInner} data-page="left">
              <BookPageContent bookId={bookId} side="left" />
            </div>
          </motion.div>
          <div className={styles.spineCenter} aria-hidden />
          <motion.div
            className={styles.pageRight}
            initial={{ rotateY: -72, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.pageInner} data-page="right">
              <BookPageContent bookId={bookId} side="right" />
            </div>
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function BookPageContent({
  bookId,
  side,
}: {
  bookId: BookId;
  side: "left" | "right";
}) {
  switch (bookId) {
    case "home":
      return <HomeBookContent side={side} />;
    case "about":
      return <AboutBookContent side={side} />;
    case "projects":
      return <ProjectsBookContent side={side} />;
    case "internships":
      return <InternshipsBookContent side={side} />;
    case "contact":
      return <ContactBookContent side={side} />;
    default:
      return null;
  }
}
