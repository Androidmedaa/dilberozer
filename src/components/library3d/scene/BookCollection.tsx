"use client";

import { SHELF_BOOKS } from "@/components/library/types";
import type { BookId } from "@/components/library/types";
import { PhysicalBook } from "./PhysicalBook";

type BookCollectionProps = {
  onSelect: (id: BookId) => void;
  highlightedBook: BookId | null;
};

export function BookCollection({ onSelect, highlightedBook }: BookCollectionProps) {
  return (
    <group>
      {SHELF_BOOKS.map((book) => (
        <PhysicalBook
          key={book.id}
          book={book}
          onSelect={onSelect}
          selectable={false}
          isMenuHighlighted={highlightedBook === book.id}
        />
      ))}
    </group>
  );
}
