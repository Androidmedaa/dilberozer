"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import styles from "../book-content.module.css";
import formStyles from "../contact-form.module.css";

type Props = { side: "left" | "right" };

export function ContactBookContent({ side }: Props) {
  if (side === "left") {
    return (
      <div className={styles.manuscript}>
        <p className={styles.illuminated}>✦ Sealed Correspondence ✦</p>
        <h3 className={styles.chapterTitle}>Contact</h3>
        <p className={styles.bodyText}>
          Send a message through the enchanted form. Your words travel directly to my
          inbox.
        </p>
        <p className={styles.bodyText}>
          <strong>Email:</strong>{" "}
          <a href="mailto:dilberozer.ceng@gmail.com" className={styles.manuscriptLink}>
            dilberozer.ceng@gmail.com
          </a>
        </p>
        <SocialLinks className={styles.socialRow} />
        <p className={styles.footnote}>{siteConfig.name} — {siteConfig.role}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.manuscript} ${formStyles.formWrap}`}>
      <ContactForm />
    </div>
  );
}
