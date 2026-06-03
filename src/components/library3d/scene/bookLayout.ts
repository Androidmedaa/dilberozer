import type { BookId } from "@/components/library/types";

export type BookDimensions = {
  width: number;
  height: number;
  thickness: number;
  baseYaw: number;
};

export const BOOK_DIMENSIONS = {
  medium: { width: 0.68, height: 0.86, thickness: 0.14, baseYaw: -1.32 },
  thick: { width: 0.76, height: 0.94, thickness: 0.19, baseYaw: -1.32 },
  slim: { width: 0.62, height: 0.8, thickness: 0.11, baseYaw: -1.28 },
  "small-sealed": { width: 0.6, height: 0.76, thickness: 0.1, baseYaw: -1.28 },
} as const satisfies Record<string, BookDimensions>;

export const FOCUS_TRANSFORM = {
  position: [0, 1.28, 0.52] as [number, number, number],
  rotation: [-0.38, 0, 0] as [number, number, number],
  scale: 2.75,
};

/** Right-wall shelf — covers face toward desk / camera */
const SHELF_X = 2.28;
const SHELF_Y = 1.02;
const SHELF_Z = -2.35;
const FACE_YAW = -1.32;

export const BOOK_REST: Record<
  BookId,
  { position: [number, number, number]; rotation?: [number, number, number] }
> = {
  home: { position: [0, 0.838, 0.38], rotation: [0.2, 0, 0] },
  projects: {
    position: [SHELF_X, SHELF_Y + 0.48, SHELF_Z - 0.52],
    rotation: [0, FACE_YAW, 0],
  },
  about: {
    position: [SHELF_X, SHELF_Y + 0.5, SHELF_Z - 0.12],
    rotation: [0, FACE_YAW, 0],
  },
  internships: {
    position: [SHELF_X, SHELF_Y + 0.46, SHELF_Z + 0.28],
    rotation: [0, FACE_YAW, 0],
  },
  contact: {
    position: [SHELF_X, SHELF_Y + 0.44, SHELF_Z + 0.68],
    rotation: [0, FACE_YAW, 0],
  },
};
