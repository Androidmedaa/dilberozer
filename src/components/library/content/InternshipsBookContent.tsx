"use client";

import Link from "next/link";
import { internshipExperiences, internshipsPageIntro } from "@/data/internships";
import styles from "../book-content.module.css";

type Props = { side: "left" | "right" };

export function InternshipsBookContent({ side }: Props) {
  if (side === "left") {
    return (
      <div className={styles.manuscript}>
        <p className={styles.illuminated}>Internships</p>
        <p className={styles.bodyText}>{internshipsPageIntro}</p>
        <Link href="/internships" className={styles.manuscriptLink}>
          Full chronicles with galleries →
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.manuscript}>
      <h4 className={styles.sectionLabel}>Experience</h4>
      <ul className={styles.bulletList}>
        {internshipExperiences.map((i) => (
          <li key={i.id}>
            <strong>{i.company}</strong>
            <span className={styles.miniMeta}> — {i.role}</span>
            <br />
            <span className={styles.miniMeta}>{i.period}</span>
            {i.highlights[0] && (
              <p className={styles.bodyText} style={{ marginTop: "0.35rem" }}>
                {i.highlights[0]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
