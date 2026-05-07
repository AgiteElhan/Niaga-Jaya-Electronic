import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product"; // Pastikan path ini sesuai dengan folder types yang kamu buat

interface ProductCardProps {
  product: Product;
}

// Ganti 'any' dengan 'ProductCardProps'
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl border border-slate-100 p-3 hover:shadow-xl transition-all duration-300">
        
        {/* Kontainer Gambar */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
          <Image
            src={product.gambar_url || "/placeholder.png"}
            alt={product.nama_produk}
            fill
            className="object-contain"
            unoptimized // Tambahkan ini sementara untuk tes apakah optimasi Next.js yang bikin masalah
          />
        </div>

        {/* Info Produk */}
        <div className="mt-4 px-1">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
            {/* Menggunakan relasi kategori dari backend */}
            {product.kategori?.nama_kategori || "Elektronik"}
          </p>

          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug min-h-[40px]">
            {product.nama_produk}
          </h3>
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-slate-900">
                {/* Konversi ke Number() karena Decimal dari DB biasanya terbaca String */}
                Rp {product.harga_jual ? Number(product.harga_jual).toLocaleString('id-ID') : '0'}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Stok: {product.stok}</p>
            </div>

            <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="M12 5v14"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;