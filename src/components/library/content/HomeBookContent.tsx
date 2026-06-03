"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getProjectsByGallery } from "@/data/projects";
import styles from "../book-content.module.css";

type Props = { side: "left" | "right" };

export function HomeBookContent({ side }: Props) {
  const featured = getProjectsByGallery("work").slice(0, 3);

  if (side === "left") {
    return (
      <div className={styles.manuscript}>
        <p className={styles.illuminated}>✦ Welcome, Traveler ✦</p>
        <h3 className={styles.chapterTitle}>{siteConfig.name}</h3>
        <p className={styles.lead}>{siteConfig.role}</p>
        <p className={styles.bodyText}>{siteConfig.location}</p>
        <p className={styles.bodyText}>{siteConfig.education}</p>
        <p className={styles.bodyText}>{siteConfig.experience}</p>
        {siteConfig.bio && <p className={styles.bodyText}>{siteConfig.bio}</p>}
        <div className={styles.avatarBlock}>
          <div className={styles.avatarFrame}>
            <Image
              src={siteConfig.profileImage}
              alt="Dilber Özer"
              width={120}
              height={120}
              className={styles.avatarImg}
            />
          </div>
          <p className={styles.avatarSpeech}>
            Merhaba, ben Dilber&apos;in yapay zeka temsilcisiyim. Kütüphanemi keşfetmeye
            hoş geldiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.manuscript}>
      <h4 className={styles.sectionLabel}>Featured Works</h4>
      <ul className={styles.miniList}>
        {featured.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className={styles.manuscriptLink}>
              {p.title}
            </Link>
            <span className={styles.miniMeta}>{p.year}</span>
          </li>
        ))}
      </ul>
      <h4 className={styles.sectionLabel}>Explore the shelves</h4>
      <p className={styles.bodyText}>
        Three enchanted volumes await: your chronicle of the scholar, the tome of AI
        inventions, and sealed correspondence for contact.
      </p>
      <SocialLinks className={styles.socialRow} />
      <p className={styles.footnote}>
        Hover a shelf book — golden dust will guide you. Click to open and read.
      </p>
    </div>
  );
}
