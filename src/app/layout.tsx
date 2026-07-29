import type { Metadata } from 'next';
import { Caveat, Dancing_Script, Allura, Poppins, Inter } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Our Story - 16 Months of Love',
  description: 'A digital scrapbook celebrating 16 wonderful months together.',
  openGraph: {
    title: 'Our Story - 16 Months of Love',
    description: 'A digital scrapbook celebrating 16 wonderful months of Earl & Aira.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${dancingScript.variable} ${allura.variable} ${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
