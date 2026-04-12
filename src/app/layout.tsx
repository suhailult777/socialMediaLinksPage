import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CyberCursor from "../components/CyberCursor";
import CyberTerminal from "../components/CyberTerminal";
import BootSequence from "../components/BootSequence";
import EasterEgg from "../components/EasterEgg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suhail Idrisi | Software Engineer",
  description: "Cyberpunk interactive portfolio powered by Next.js and Matrix Logic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col m-0 p-0 overflow-x-hidden bg-black text-white" suppressHydrationWarning>
        <CyberCursor />
        <EasterEgg />
        <BootSequence />
        {children}
        <CyberTerminal />
      </body>
    </html>
  );
}
