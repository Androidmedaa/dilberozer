"use client";

import { motion } from "framer-motion";
import type { ShelfBookConfig } from "./types";
import styles from "./library.module.css";

type ShelfBookProps = {
  book: ShelfBookConfig;
  onOpen: () => void;
  disabled?: boolean;
};

export function ShelfBook({ book, onOpen, disabled }: ShelfBookProps) {
  return (
    <motion.button
      type="button"
      className={`${styles.shelfBook} ${styles[`shelfBook_${book.size}`]}`}
      onClick={onOpen}
      disabled={disabled}
      aria-label={`Open ${book.title}`}
      whileHover={{ z: 40, y: -12, scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={
        {
          "--spine": book.spineColor,
          "--cover": book.coverColor,
          "--accent": book.accent,
        } as React.CSSProperties
      }
    >
      <span className={styles.shelfBookGlow} aria-hidden />
      <span className={styles.shelfBookDust} aria-hidden />
      <span className={styles.shelfBookSpine}>
        <span className={styles.shelfBookTitle}>{book.title}</span>
        <span className={styles.shelfBookSub}>{book.subtitle}</span>
      </span>
      {book.size === "small-sealed" && (
        <span className={styles.shelfBookSeal} aria-hidden>
          ✦
        </span>
      )}
    </motion.button>
  );
}
