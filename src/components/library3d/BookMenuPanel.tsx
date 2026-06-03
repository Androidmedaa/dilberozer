"use client";

import { ALL_BOOKS, type BookId } from "@/components/library/types";
import styles from "./library3d.module.css";

type BookMenuPanelProps = {
  activeBook: BookId | null;
  onSelect: (id: BookId) => void;
  onHover?: (id: BookId | null) => void;
  disabled?: boolean;
};

export function BookMenuPanel({ activeBook, onSelect, onHover, disabled }: BookMenuPanelProps) {
  return (
    <nav className={styles.bookMenu} aria-label="Library volumes">
      <p className={styles.bookMenuTitle}>Volumes</p>
      <ul className={styles.bookMenuList}>
        {ALL_BOOKS.map((book) => {
          const isActive = activeBook === book.id;
          return (
            <li key={book.id}>
              <button
                type="button"
                className={`${styles.bookMenuItem} ${isActive ? styles.bookMenuItemActive : ""}`}
                style={
                  {
                    "--book-accent": book.accent,
                    "--book-cover": book.coverColor,
                    "--book-spine": book.spineColor,
                  } as React.CSSProperties
                }
                onClick={() => !disabled && onSelect(book.id)}
                onMouseEnter={() => onHover?.(book.id)}
                onMouseLeave={() => onHover?.(null)}
                onFocus={() => onHover?.(book.id)}
                onBlur={() => onHover?.(null)}
                disabled={disabled}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.bookMenuSpine} aria-hidden />
                <span className={styles.bookMenuCover}>
                  <span className={styles.bookMenuLabel}>{book.coverTitle}</span>
                  <span className={styles.bookMenuSub}>{book.subtitle}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
