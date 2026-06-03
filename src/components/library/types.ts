export type BookId = "home" | "projects" | "about" | "internships" | "contact";

export type ShelfBookSize = "medium" | "thick" | "slim" | "small-sealed";

export type BookConfig = {
  id: BookId;
  title: string;
  /** Displayed on front cover (embossed) */
  coverTitle: string;
  subtitle: string;
  size: ShelfBookSize;
  spineColor: string;
  coverColor: string;
  accent: string;
  /** Desk volume vs shelf */
  placement: "desk" | "shelf";
};

export const ALL_BOOKS: BookConfig[] = [
  {
    id: "home",
    title: "Home",
    coverTitle: "Home",
    subtitle: "The Living Chronicle",
    size: "thick",
    spineColor: "#2a1f14",
    coverColor: "#5c4028",
    accent: "#c9a227",
    placement: "desk",
  },
  {
    id: "projects",
    title: "Projects",
    coverTitle: "Projects",
    subtitle: "Tome of Inventions",
    size: "thick",
    spineColor: "#142820",
    coverColor: "#1e4a38",
    accent: "#8fd4a8",
    placement: "shelf",
  },
  {
    id: "about",
    title: "About Me",
    coverTitle: "About Me",
    subtitle: "Chronicles of the Scholar",
    size: "medium",
    spineColor: "#2a1f14",
    coverColor: "#4a3828",
    accent: "#c9a227",
    placement: "shelf",
  },
  {
    id: "internships",
    title: "Internships",
    coverTitle: "Internships",
    subtitle: "Paths of Apprenticeship",
    size: "slim",
    spineColor: "#1a2838",
    coverColor: "#2a3a52",
    accent: "#9cb8d8",
    placement: "shelf",
  },
  {
    id: "contact",
    title: "Contact",
    coverTitle: "Contact",
    subtitle: "Sealed Correspondence",
    size: "small-sealed",
    spineColor: "#3a1822",
    coverColor: "#5c2838",
    accent: "#d4a574",
    placement: "shelf",
  },
];

export type ShelfBookConfig = BookConfig & { placement: "shelf" };

export const SHELF_BOOKS: ShelfBookConfig[] = ALL_BOOKS.filter(
  (b): b is ShelfBookConfig => b.placement === "shelf",
);
