import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideMenu from "@/components/MobileMenu"; 
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Niaga Jaya Electronic",
  description: "Solusi Elektronik Terpercaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className="h-full">
      <body 
        className={cn(
          "min-h-full flex flex-col antialiased font-poppins", // Tambahkan font-poppins di sini
          poppins.variable, 
          figtree.variable
        )}
      >
        <Header />

        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}