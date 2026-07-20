"use client";

import { PortfolioImage } from "@/components/ui/PortfolioImage";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import styles from "./project-card.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.42, 0, 0.58, 1],
      }}
      className={styles.card}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.imageWrap} ${project.coverFit === "contain" ? styles.imageWrapContain : ""}`}
          >
            <PortfolioImage
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 540px) 100vw, (max-width: 768px) 50vw, 40vw"
              priority={index < 2}
              className={`${styles.image} ${project.coverFit === "contain" ? styles.imageContain : ""}`}
              style={{
                objectFit: project.coverFit ?? "cover",
                objectPosition: project.coverObjectPosition ?? "center",
              }}
            />
            <span className={styles.overlay} aria-hidden="true" />
            <div className={styles.detailsWrap}>
              <div className={styles.details}>
                <div className={styles.detailsInner}>
                  <div className={styles.date}>{project.year}</div>
                  <h2 className={styles.title}>{project.title}</h2>
                  <p className={styles.category}>{project.category}</p>
                  <p className={styles.cta}>View Case Study</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
