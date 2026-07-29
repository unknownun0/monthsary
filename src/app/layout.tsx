import type { Metadata } from "next";
import { Quicksand, Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy 16th Monthsary! ❤️",
  description: "A special invitation for Aira Marie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${dancingScript.variable} ${caveat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
