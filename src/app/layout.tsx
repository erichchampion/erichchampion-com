import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
