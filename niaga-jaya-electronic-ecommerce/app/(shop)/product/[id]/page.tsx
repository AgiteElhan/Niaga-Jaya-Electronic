"use client";

import React, { useState, use, useEffect } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ShoppingCart, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  ChevronRight,
  Heart
} from "lucide-react";
import Link from "next/link";
import { dummyProducts } from "@/components/constants/product";
import ProductGrid from "@/components/ProductGrid";

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // 1. Unwrap params dengan 'use'
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 2. Cari produk dengan konversi tipe data (ID seringkali number di data tapi string di URL)
  const product = dummyProducts.find((p) => String(p.id) === id);
  
  // 3. Inisialisasi state mainImage dengan benar
  const [mainImage, setMainImage] = useState("");

  // Update mainImage jika produk ditemukan atau berubah
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // 4. Handle jika produk tidak ditemukan
  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-8 rounded-full mb-6">
             <ShoppingCart size={48} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold italic text-slate-800">
            Aduh! Produk Niaga Jaya tidak ditemukan.
          </h2>
          <p className="text-slate-500 mt-2">Mungkin produk sudah tidak tersedia atau link salah.</p>
          <Link href="/shop">
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Kembali Belanja
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link href="/shop" className="hover:text-blue-600 transition-colors uppercase">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-slate-800 font-medium truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sisi Kiri: Galeri */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm group">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-10 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:text-red-500 transition-colors z-10">
                <Heart size={20} />
              </button>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`relative w-24 h-24 flex-shrink-0 border-2 rounded-2xl overflow-hidden bg-white p-2 cursor-pointer shadow-sm transition-all ${
                    mainImage === img ? "border-blue-600 scale-105" : "border-slate-100 hover:border-blue-300"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumb ${i}`} width={100} height={100} className="object-contain w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Sisi Kanan: Detail */}
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-bold text-sm">
                <Star size={16} fill="currentColor" className="mr-1" />
                {product.rating}
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 text-sm underline cursor-pointer font-medium hover:text-blue-600">
                {product.reviews} Ulasan
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md ml-auto">
                Stok: {product.stock} Tersedia
              </span>
            </div>

            {/* Price Card */}
            <div className="bg-slate-50 p-6 rounded-[24px] mb-8 border border-slate-100">
              <p className="text-sm text-slate-500 mb-1 font-medium">Harga Spesial</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-black text-blue-600 tracking-tight">
                  Rp {product.price.toLocaleString('id-ID')}
                </h2>
              </div>
              <div className="mt-4 flex items-center gap-2 text-slate-600 text-sm font-medium">
                <CreditCard size={18} className="text-blue-600" />
                <span>
                  Cicilan mulai dari <span className="font-bold text-slate-900">
                    Rp {Math.floor(product.price / 12).toLocaleString('id-ID')}
                  </span>/bln
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">
                Deskripsi Produk
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button size="lg" className="flex-[2] h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg shadow-lg shadow-blue-100">
                <ShoppingCart className="mr-2 h-5 w-5" /> Tambah ke Keranjang
              </Button>
              <Button variant="outline" size="lg" className="flex-1 h-14 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 font-bold text-lg text-slate-700">
                Beli Sekarang
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 group">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700">Garansi Resmi</span>
                  <span className="text-[10px] text-slate-400 font-normal">2 Tahun Service & Sparepart</span>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Truck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700">Pengiriman Aman</span>
                  <span className="text-[10px] text-slate-400 font-normal">Gratis Ongkir Jabodetabek</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;