"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { BookId } from "@/components/library/types";

export type SwapPhase = "overview" | "closing" | "moving" | "opening" | "reading";

export type SwapAnimState = {
  phase: SwapPhase;
  current: BookId | null;
  pending: BookId | null;
  t: number;
  eased: number;
};

const defaultState: SwapAnimState = {
  phase: "overview",
  current: null,
  pending: null,
  t: 0,
  eased: 0,
};

export const SwapStateRefContext = createContext<React.MutableRefObject<SwapAnimState>>({
  current: defaultState,
});

export function useBookSwapRef() {
  return useContext(SwapStateRefContext);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

type BookSwapControllerProps = {
  focusedBook: BookId | null;
  onReadingReady?: () => void;
  onOverviewReady?: () => void;
  children: React.ReactNode;
};

export function BookSwapController({
  focusedBook,
  onReadingReady,
  onOverviewReady,
  children,
}: BookSwapControllerProps) {
  const state = useRef<SwapAnimState>({ ...defaultState });
  const prevFocus = useRef<BookId | null>(null);
  const readingFired = useRef(false);
  const overviewFired = useRef(true);

  useEffect(() => {
    const s = state.current;
    const prev = prevFocus.current;
    prevFocus.current = focusedBook;
    readingFired.current = false;
    overviewFired.current = false;

    if (focusedBook === null) {
      if (prev !== null) {
        s.pending = null;
        s.current = prev;
        s.phase = "closing";
        s.t = 0;
        s.eased = 0;
      } else {
        Object.assign(s, defaultState);
      }
      return;
    }

    if (prev === null) {
      s.current = focusedBook;
      s.pending = null;
      s.phase = "moving";
      s.t = 0;
      s.eased = 0;
      return;
    }

    if (prev !== focusedBook) {
      s.pending = focusedBook;
      s.current = prev;
      s.phase = "closing";
      s.t = 0;
      s.eased = 0;
    }
  }, [focusedBook]);

  useFrame((_, delta) => {
    const s = state.current;
    const speed = 1.65;

    if (s.phase === "overview") {
      s.t = 0;
      s.eased = 0;
      if (!overviewFired.current) {
        overviewFired.current = true;
        onOverviewReady?.();
      }
      return;
    }

    s.t = Math.min(1, s.t + delta * speed);
    s.eased = easeInOutCubic(s.t);

    if (s.t < 1) return;

    s.t = 0;
    s.eased = 0;

    if (s.phase === "closing") {
      if (s.pending) {
        s.current = s.pending;
        s.pending = null;
        s.phase = "moving";
      } else {
        s.current = null;
        s.phase = "overview";
      }
      return;
    }

    if (s.phase === "moving") {
      s.phase = "opening";
      return;
    }

    if (s.phase === "opening") {
      s.phase = "reading";
      if (!readingFired.current) {
        readingFired.current = true;
        onReadingReady?.();
      }
    }
  });

  return (
    <SwapStateRefContext.Provider value={state}>{children}</SwapStateRefContext.Provider>
  );
}
