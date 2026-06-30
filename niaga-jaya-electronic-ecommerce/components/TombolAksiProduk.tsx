'use client';

import { useUser, SignInButton } from "@clerk/nextjs";

interface TombolProps {
  handleTambahKeranjang: () => void;
  handleCheckout: () => void;
}

export default function TombolAksiProduk({
  handleTambahKeranjang,
  handleCheckout,
}: TombolProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="flex gap-4">
      {isSignedIn ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}