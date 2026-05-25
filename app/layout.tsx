import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ProjectPreview from "@/public/backgroundPreviews/AnimeBackgroundPreview.png";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://guanfolio.vercel.app/"),
  title: {
    default: "Ethan Guan — OS-style Personal Portfolio",
    template: "%s | Ethan Guan",
  },
  description:
    "Portfolio of Ethan Guan — Grade 11 student at St. Theresa of Lisieux in Richmond Hill, Ontario. Projects, resume, and contact.",
  keywords: [
    "Ethan Guan",
    "personal portfolio",
    "Grade 11",
    "Saint Theresa of Lisieux",
    "Richmond Hill",
    "Ontario",
    "student projects",
    "React",
    "developer",
  ],
  authors: [{ name: "Ethan Guan", url: "https://guanfolio.vercel.app/" }],
  creator: "Ethan Guan",
  applicationName: "Ethan Guan — Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Ethan Guan — OS-style Personal Portfolio",
    description:
      "Portfolio of Ethan Guan — Grade 11 student at St. Theresa of Lisieux in Richmond Hill, Ontario. Browse projects, resume, and contact information.",
    url: "https://guanfolio.vercel.app/",
    siteName: "Ethan Guan",
    images: [
      {
        url: ProjectPreview.src,
        width: 1200,
        height: 630,
        alt: "Ethan Guan — portfolio preview",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Guan — OS-style Personal Portfolio",
    description:
      "Portfolio of Ethan Guan — Grade 11 student at St. Theresa of Lisieux in Richmond Hill, Ontario.",
    images: [ProjectPreview.src],
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Forces the browser to apply the font the millisecond it downloads
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
