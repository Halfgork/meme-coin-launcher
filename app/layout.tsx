import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../src/components/layout/Header";
import { Footer } from "../src/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🚀 Meme Coin Launcher - Create Viral Coins on Stellar",
  description: "Launch your own meme coins on the Stellar blockchain. Create, share, and go viral! 🎭💎",
  keywords: "meme coin, stellar, soroban, cryptocurrency, blockchain, viral, social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black min-h-screen text-white overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen bg-black">
          <Header />
          <main className="flex-1 bg-black">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </body>
    </html>
  );
}
