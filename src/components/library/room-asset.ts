/**
 * Room background dimensions — update when replacing public/library/room.jpg
 * Portrait (current): 736×1313 — full image shown with letterboxing on wide screens
 * Landscape (recommended): e.g. 1920×1080 — set width/height and use object-fit cover in CSS
 */
export const ROOM_IMAGE = {
  src: "/library/room.jpg",
  width: 736,
  height: 1313,
} as const;
