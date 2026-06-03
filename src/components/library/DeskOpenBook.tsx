"use client";

import { motion } from "framer-motion";
import { HomeBookContent } from "./content/HomeBookContent";
import styles from "./library.module.css";

type DeskOpenBookProps = {
  onExpand: () => void;
};

export function DeskOpenBook({ onExpand }: DeskOpenBookProps) {
  return (
    <motion.div
      className={styles.deskBook}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <button
        type="button"
        className={styles.deskBookInner}
        onClick={onExpand}
        aria-label="Expand home book to full view"
      >
        <div className={styles.deskSpread}>
          <div className={styles.deskPage}>
            <HomeBookContent side="left" />
          </div>
          <div className={styles.deskSpine} aria-hidden />
          <div className={styles.deskPage}>
            <HomeBookContent side="right" />
          </div>
        </div>
        <span className={styles.deskHint}>Click to read in full ✦</span>
      </button>
    </motion.div>
  );
}
