import { AboutContent } from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dilber Özer — Computer Engineering student, Computer Engineer. Education, certifications, and competitions.",
};

export default function AboutPage() {
  return <AboutContent />;
}
