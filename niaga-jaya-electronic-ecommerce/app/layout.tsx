"use client";

import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner';

// IMPORT SCRIPT DARI NEXT.JS UNTUK MIDTRANS SNAP CDN
import Script from "next/script";

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
  description: "Toko Elektronik Terpercaya di Tangerang",
  icons: {
    icon: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey="pk_test_cG9zc2libGUtbW9sZS05LmNsZXJrLmFjY291bnRzLmRldiQ">
      <html lang="en" className="h-full scroll-smooth">
        <body 
          className={cn(
            "min-h-full flex flex-col antialiased font-poppins",
            poppins.variable, 
            figtree.variable
          )}
        >
          <Toaster 
            position="top-center" 
            richColors 
            expand={false}
            closeButton
          />

          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          {/* KUNCI INTEGRASI: INJECT SCRIPT SNAP MIDTRANS CDN */}
          <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="lazyOnload"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}