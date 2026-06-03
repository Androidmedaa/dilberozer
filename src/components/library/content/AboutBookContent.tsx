"use client";

import {
  aboutCertifications,
  aboutCompetitions,
  aboutEducation,
  aboutProfile,
  aboutReferences,
  cvDownload,
} from "@/data/about";
import styles from "../book-content.module.css";

type Props = { side: "left" | "right" };

export function AboutBookContent({ side }: Props) {
  if (side === "left") {
    return (
      <div className={styles.manuscript}>
        <p className={styles.illuminated}>About Me</p>
        {aboutProfile.split("\n\n").map((p) => (
          <p key={p.slice(0, 48)} className={styles.bodyText}>
            {p}
          </p>
        ))}
        <p className={styles.bodyText}>
          <strong>Email:</strong>{" "}
          <a href="mailto:dilberozer.ceng@gmail.com" className={styles.manuscriptLink}>
            dilberozer.ceng@gmail.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.manuscript}>
      <h4 className={styles.sectionLabel}>Education</h4>
      <p className={styles.bodyText}>
        <strong>{aboutEducation.degree}</strong>
        <br />
        {aboutEducation.university} · {aboutEducation.location}
        <br />
        {aboutEducation.period} · CGPA {aboutEducation.cgpa}
      </p>

      <h4 className={styles.sectionLabel}>Certifications</h4>
      <ul className={styles.bulletList}>
        {aboutCertifications.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <h4 className={styles.sectionLabel}>Competitions</h4>
      <ul className={styles.bulletList}>
        {aboutCompetitions.map((c) => (
          <li key={c.title}>
            <strong>{c.title}</strong> — {c.detail}
          </li>
        ))}
      </ul>

      <a href={cvDownload.href} download className={styles.cvBtn}>
        {cvDownload.label}
      </a>

      <h4 className={styles.sectionLabel}>References</h4>
      <ul className={styles.bulletList}>
        {aboutReferences.map((r) => (
          <li key={r.name}>
            {r.name} — {r.company}
            <br />
            {"email" in r && (
              <a href={`mailto:${r.email}`} className={styles.manuscriptLink}>
                {r.email}
              </a>
            )}
            {"phone" in r && <span>{r.phone}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
