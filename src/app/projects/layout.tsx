import { ReturnToLibrary } from "@/components/library/ReturnToLibrary";
import styles from "../legacy-shell.module.css";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.legacyShell}>
      <ReturnToLibrary />
      {children}
    </div>
  );
}
