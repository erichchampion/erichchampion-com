import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Erich Champion",
    template: "%s | Erich Champion",
  },
  description:
    "Senior Engineering Manager | Platform & Product Engineering | AI/ML Integration | 0→1 Launches | Adobe Alum",
  keywords: ["engineering manager", "platform engineering", "AI/ML", "iOS apps", "technical writing"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Erich Champion",
  },
  other: {
    "dns-prefetch": "https://api.github.com",
    "preconnect": "https://fonts.gstatic.com",
    "me": "https://sifa.id/p/erichchampion.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
