"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, ShoppingCart, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";

import { dummyProducts } from "@/components/constants/product"; 
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/ProductReviews";
import CheckoutDialog from "@/components/CheckoutDialog"; // Import komponen baru

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = dummyProducts.find((p) => p.id === Number(resolvedParams.id));

  if (!product) return <div className="py-20 text-center font-bold">Produk Tidak Ditemukan</div>;

  const handleAddToCart = () => {
    toast.success("Berhasil!", {
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <Container>
      <Toaster position="top-center" richColors closeButton />

      <div className="py-10">
        {/* 1. BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-slate-600">Produk</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2. MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="bg-slate-50 rounded-[30px] lg:rounded-[40px] overflow-hidden aspect-square relative border border-slate-100">
             <Image 
               src={product.images?.[0] || product.image} 
               alt={product.name} 
               fill 
               className="object-contain p-6 lg:p-8 hover:scale-105 transition-transform duration-500"
             />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
               <div className="flex items-center bg-yellow-400/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-yellow-700 font-black text-xs sm:text-sm">
                 <Star size={14} fill="currentColor" className="mr-1 sm:mr-1.5" />
                 {product.rating}
               </div>
               <span className="text-slate-400 font-medium">|</span>
               <button 
                 onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                 className="text-slate-400 text-xs sm:text-sm font-bold hover:text-blue-600 transition-all"
               >
                 {product.reviews ? product.reviews.length : 0} Ulasan Pembeli
               </button>
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">
                Harga Spesial
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 tracking-tighter">
                Rp {product.price.toLocaleString('id-ID')}
              </h2>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8 sm:mb-10 text-base lg:text-lg font-medium">
              {product.description || "Dapatkan kualitas terbaik dengan penawaran harga eksklusif hanya di Niaga Jaya Electronic."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-14 sm:h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-base sm:text-lg transition-all active:scale-95"
              >
                <ShoppingCart className="mr-2" size={18} /> Keranjang
              </Button>

              {/* Pemanggilan Komponen Modal Checkout Baru */}
              <CheckoutDialog product={product} />
              
              <Button variant="outline" className="hidden sm:flex h-16 w-16 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50">
                <Plus size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full mb-12 sm:mb-16" />

        <div id="reviews-section">
          <ProductReviews reviews={product.reviews || []} />
        </div>
      </div>
    </Container>
  );
}