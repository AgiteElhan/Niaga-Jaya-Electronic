'use client'; // <-- WAJIB ditambahkan di paling atas jika pakai Next.js App Router

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// Beri parameter (props) fungsi handler-nya agar dinamis
interface TombolProps {
  handleTambahKeranjang: () => void;
  handleCheckout: () => void;
}

export default function TombolAksiProduk({ handleTambahKeranjang, handleCheckout }: TombolProps) {
  return (
    <div className="flex gap-4">
      {/* 1. JIKA USER SUDAH LOGIN */}
      <SignedIn>
        <button 
          className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition" 
          onClick={handleTambahKeranjang}
        >
          Tambah Keranjang
        </button>
        <button 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition" 
          onClick={handleCheckout}
        >
          Beli Sekarang (Checkout)
        </button>
      </SignedIn>

      {/* 2. JIKA USER BELUM LOGIN */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition">
            Tambah Keranjang
          </button>
        </SignInButton>
        
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition">
            Beli Sekarang
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}