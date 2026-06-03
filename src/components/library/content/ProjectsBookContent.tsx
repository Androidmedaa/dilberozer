"use client";

import Link from "next/link";
import Image from "next/image";
import { aiFocusAreas, aiPageIntro } from "@/data/artificial-intelligence";
import { getProjectsByGallery } from "@/data/projects";
import styles from "../book-content.module.css";

type Props = { side: "left" | "right" };

export function ProjectsBookContent({ side }: Props) {
  const projects = getProjectsByGallery("work");

  if (side === "left") {
    return (
      <div className={styles.manuscript}>
        <p className={styles.illuminated}>Projects</p>
        <p className={styles.bodyText}>{aiPageIntro}</p>
        <h4 className={styles.sectionLabel}>Focus Areas</h4>
        <ul className={styles.bulletList}>
          {aiFocusAreas.map((a) => (
            <li key={a.title}>
              <strong>{a.title}</strong> — {a.description}
            </li>
          ))}
        </ul>
        <Link href="/artificial-intelligence" className={styles.manuscriptLink}>
          Deeper AI expertise scroll →
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.manuscript}>
      <h4 className={styles.sectionLabel}>Project Gallery</h4>
      <ul className={styles.projectGrid}>
        {projects.map((p) => (
          <li key={p.slug} className={styles.projectTile}>
            <Link href={`/projects/${p.slug}`} className={styles.projectTileLink}>
              <div className={styles.projectThumb}>
                <Image src={p.coverImage} alt={p.title} fill sizes="120px" />
              </div>
              <span className={styles.projectTileTitle}>{p.title}</span>
              <span className={styles.miniMeta}>{p.year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
