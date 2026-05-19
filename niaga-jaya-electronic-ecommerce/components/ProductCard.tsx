"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Star, ShoppingBag } from "lucide-react";
// Import global state store keranjang kamu
import { useCartStore } from "@/store/useCartStore"; 

// GUNAKAN HOOK useUser DAN SIGNINBUTTON UNTUK KOMPONEN CLIENT YANG AMAN
import { useUser, SignInButton } from "@clerk/nextjs";

interface Product {
  id: number | string;
  nama_produk: string;  
  harga_jual: string | number; 
  gambar?: string;      
  gambar_url?: string;  
  stok?: number;        
  deskripsi?: string;   
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Ambil fungsi addToCart dari Zustand store
  const { addToCart } = useCartStore();
  
  // Ambil status login user di client side
  const { isSignedIn } = useUser();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (product.stok !== undefined && Number(product.stok) <= 0) {
      toast.error("Gagal", {
        description: `Maaf, stok ${product.nama_produk} sedang habis.`,
      });
      return;
    }

    // Masukkan objek data produk murni dari database ke dalam global state keranjang
    addToCart({
      id: Number(product.id),
      nama_produk: product.nama_produk,
      harga_jual: Number(product.harga_jual),
      gambar_url: product.gambar_url || "/placeholder.png",
      quantity: 1 // Default penambahan pertama
    });

    toast.success("Berhasil!", {
      description: `${product.nama_produk} telah ditambahkan ke keranjang.`,
    });
  };

  const numericPrice = product.harga_jual ? Number(product.harga_jual) : 0;
  const displayImage = product.gambar_url ? product.gambar_url : "/placeholder.png";

  return (
    <div className="group relative bg-white rounded-[28px] border border-slate-100 p-4 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col justify-between h-full">
      
        <Link href={`/product/${product.id}`} className="block flex-1">        <div className="relative aspect-square bg-slate-50 rounded-[22px] overflow-hidden mb-4">
          {product.gambar_url || product.gambar ? (
            <img 
              src={displayImage} 
              alt={product.nama_produk}
              className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
              Tidak ada gambar
            </div>
          )}
        </div>

        {/* Detail & Informasi Produk */}
        <div className="space-y-1 px-2">
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Niaga Jaya Official
            </span>
          </div>
          
          <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.nama_produk || "Produk Tanpa Nama"}
          </h3>
          
          <p className="text-xl font-black text-blue-600">
            Rp {numericPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </Link>

      {/* PROTEKSI TOMBOL AKSI TAMBAH KE KERANJANG */}
      <div>
        {isSignedIn ? (
          /* JALUR A: USER SUDAH LOGIN -> Tombol menjalankan handleAddToCart secara normal */
          <button 
            onClick={handleAddToCart}
            disabled={Number(product.stok) === 0}
            className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              Number(product.stok) === 0 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingBag size={18} /> 
            {Number(product.stok) === 0 ? "Stok Habis" : "+ Keranjang"}
          </button>
        ) : (
          /* JALUR B: USER BELUM LOGIN -> Tombol dipisah fungsinya, cuma memicu modal Clerk login */
          <SignInButton mode="modal">
            <button 
              onClick={(e) => {
                // Menahan event klik agar card link tidak ikut memicu rute ganti halaman
                e.preventDefault();
                e.stopPropagation();
              }}
              disabled={Number(product.stok) === 0}
              className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                Number(product.stok) === 0 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <ShoppingBag size={18} /> 
              {Number(product.stok) === 0 ? "Stok Habis" : "+ Keranjang"}
            </button>
          </SignInButton>
        )}
      </div>

    </div>
  );
}