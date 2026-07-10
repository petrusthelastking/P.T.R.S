import type { Metadata } from "next";
import { Big_Shoulders, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "P.T.R.S | Blockchain Developer & Researcher",
  description: "Portofolio profesional P.T.R.S - Blockchain Developer & Researcher. Ahli dalam merancang smart contracts, protokol kriptografi, enterprise distributed systems, dan dashboard dApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${bigShoulders.variable} ${plusJakartaSans.variable} font-sans min-h-screen bg-sand antialiased text-[#1a1a1a]`}>
        {children}
      </body>
    </html>
  );
}
