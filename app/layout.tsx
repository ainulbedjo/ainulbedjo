import type { Metadata } from "next";
import { Newsreader, Shantell_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body / prose — warm literary serif
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Display / headings — hand-drawn feel
const shantellSans = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Metadata, code, labels — monospace
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AinulBedjo",
  description: "Software engineer & full-time tinkerer — notes from the veranda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${shantellSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
