import Link from "next/link";
import styles from "./return-link.module.css";

export function ReturnToLibrary() {
  return (
    <Link href="/" className={styles.link}>
      ✦ Return to the Living Library
    </Link>
  );
}
