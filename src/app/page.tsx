import { Suspense } from "react";
import { LibraryExperience } from "@/components/library3d/LibraryExperience";
import styles from "./library-loading.module.css";

function LibraryFallback() {
  return (
    <div className={styles.loading}>
      <p>Opening the library…</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LibraryFallback />}>
      <LibraryExperience />
    </Suspense>
  );
}
