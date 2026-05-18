"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Star, ShoppingBag } from "lucide-react";

// Struktur Interface data product agar tidak menggunakan tipe 'any'
interface Product {
  id: number | string;
  name: string;
  price: number;
  images?: string[];
  image?: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  
  // Fungsi dipindahkan ke dalam agar aman membaca properti objek `product`
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Mencegah Link ikut terpicu saat tombol keranjang diklik
    e.preventDefault(); 
    e.stopPropagation();

    toast.success("Berhasil!", {
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <div className="group relative bg-white rounded-[28px] border border-slate-100 p-4 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col justify-between h-full">
      
      <Link href={`/product/${product.id}`} className="block flex-1">
        {/* Kontainer Gambar */}
        <div className="relative aspect-square bg-slate-50 rounded-[22px] overflow-hidden mb-4">
          <Image 
            src={product.images?.[0] || product.image || "/placeholder.png"} 
            alt={product.name} 
            fill 
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
          />
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
            {product.name}
          </h3>
          
          <p className="text-xl font-black text-blue-600">
            Rp {product.price ? product.price.toLocaleString("id-ID") : "0"}
          </p>
        </div>
      </Link>

      {/* Tombol Aksi Tambah Ke Keranjang */}
      <button 
        onClick={handleAddToCart}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        <ShoppingBag size={18} /> + Keranjang
      </button>
    </div>
  );
}