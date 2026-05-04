import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AosProvider } from "@/components/AosProvider"; // Import Provider baru

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fontPoppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <AosProvider> {/* Bungkus di sini agar AOS aktif */}
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AosProvider>
      </body>
    </html>
  );
}