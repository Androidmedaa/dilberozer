import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4, Work_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  display: "swap",
});

/** Stable class string — avoids Turbopack dev hydration drift on <html>. */
const fontVariables = `${sourceSans.variable} ${sourceSerif.variable} ${workSans.variable}`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dilber Özer — Artificial Intelligence Portfolio",
    template: "%s | Dilber Özer",
  },
  description:
    "AI engineering portfolio — internships, research projects, speech/LLM systems, and production-focused case studies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dilber Özer Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariables}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
