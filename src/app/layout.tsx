import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./library-theme.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontVariables = `${cinzel.variable} ${garamond.variable} ${sourceSans.variable}`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dilber Özer — Living Knowledge Library",
    template: "%s | Dilber Özer",
  },
  description:
    "An immersive magical library portfolio — explore Dilber Özer's AI engineering journey through enchanted books.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dilber Özer — Living Library",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
