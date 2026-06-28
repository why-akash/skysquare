import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skysquare — We Build Digital Products That Grow Businesses",
  description:
    "Premium software development agency specializing in custom web apps, mobile apps, SaaS products, UI/UX design, and backend systems.",
  keywords: "software development agency, web development, mobile apps, SaaS, UI/UX design",
  openGraph: {
    title: "Skysquare",
    description: "Premium software development agency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
