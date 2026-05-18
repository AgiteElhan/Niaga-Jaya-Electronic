"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, ShoppingCart, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/ProductReviews";
import CheckoutDialog from "@/components/CheckoutDialog";

// 1. GANTI IMPORT-NYA JADI HOOK DAN BUTTON SAJA, GIT:
import { useUser, SignInButton } from "@clerk/nextjs";

interface Product {
  id: number | string;
  nama_produk: string;
  harga_jual: string | number;
  gambar?: string;
  gambar_url?: string;
  stok?: number;
  deskripsi?: string;
  rating?: number;
  reviews?: any[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. GUNAKAN HOOK useUser UNTUK MENGECEK STATUS LOGIN
  const { isSignedIn } = useUser();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const BACKEND_URL = "http://localhost:8000"; 
        const response = await fetch(`${BACKEND_URL}/api/products/${resolvedParams.id}`);
        
        if (!response.ok) {
          throw new Error("Produk tidak ditemukan di server logistik.");
        }
        
        const result = await response.json();
        setProduct(result.data || result); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-2" role="status"></div>
        <p className="text-xs font-bold">Menghubungkan ke database gudang...</p>
      </div>
    );
  }

  if (!product) return <div className="py-20 text-center font-bold text-red-500">Produk Tidak Ditemukan</div>;

  const handleAddToCart = () => {
    if (product.stok !== undefined && Number(product.stok) <= 0) {
      toast.error("Gagal", {
        description: `Maaf, stok ${product.nama_produk} sedang habis.`,
      });
      return;
    }

    toast.success("Berhasil!", {
      description: `${product.nama_produk} telah ditambahkan ke keranjang.`,
    });
  };

  const numericPrice = product.harga_jual ? Number(product.harga_jual) : 0;
  const displayImage = product.gambar_url ? product.gambar_url : "/placeholder.png";

  return (
    <Container>
      <Toaster position="top-center" richColors closeButton />

      <div className="py-10">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-slate-600">Produk</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">
            {product.nama_produk}
          </span>
        </nav>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="bg-slate-50 rounded-[30px] lg:rounded-[40px] overflow-hidden aspect-square relative border border-slate-100 flex items-center justify-center p-6">
             <img 
               src={displayImage} 
               alt={product.nama_produk} 
               className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "/placeholder.png";
               }}
             />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
              {product.nama_produk}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {product.reviews && product.reviews.length > 0 && (
                <>
                  <div className="flex items-center bg-yellow-400/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-yellow-700 font-black text-xs sm:text-sm">
                    <Star size={14} fill="currentColor" className="mr-1 sm:mr-1.5" />
                    {product.rating || "5.0"}
                  </div>
                  <span className="text-slate-400 font-medium">|</span>
                </>
              )}
              
              <button 
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-400 text-xs sm:text-sm font-bold hover:text-blue-600 transition-all"
              >
                {product.reviews && product.reviews.length > 0 
                  ? `${product.reviews.length} Ulasan Pembeli` 
                  : "Belum Ada Ulasan"}
              </button>
              
              <span className="text-slate-400 font-medium">|</span>
              
              <span className={`text-xs sm:text-sm font-bold ${Number(product.stok) > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {Number(product.stok) > 20 ? (
                  "Barang Tersedia"
                ) : Number(product.stok) <= 0 ? (
                  "Stok Habis"
                ) : (
                  `Sisa Stok: ${product.stok} Unit`
                )}
              </span>
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">
                Harga Spesial
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 tracking-tighter">
                Rp {numericPrice.toLocaleString('id-ID')}
              </h2>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8 sm:mb-10 text-base lg:text-lg font-medium">
              {product.deskripsi || "Dapatkan kualitas terbaik dengan penawaran harga eksklusif hanya di Niaga Jaya Electronic."}
            </p>

            {/* 3. LOGIKA SELEKSI MENGGUNAKAN IF-ELSE IF (isSignedIn) */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              
              {isSignedIn ? (
                /* KONDISI USER SUDAH LOGIN */
                <>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={Number(product.stok) === 0}
                    className={`flex-1 h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg transition-all active:scale-95 ${
                      Number(product.stok) === 0
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    }`}
                  >
                    <ShoppingCart className="mr-2" size={18} /> {Number(product.stok) === 0 ? "Stok Habis" : "Keranjang"}
                  </Button>

                  <CheckoutDialog product={product} />
                </>
              ) : (
                /* KONDISI USER BELUM LOGIN */
                <>
                  <SignInButton mode="modal">
                    <Button 
                      disabled={Number(product.stok) === 0}
                      className="flex-1 h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg bg-slate-100 hover:bg-slate-200 text-slate-900 transition-all active:scale-95"
                    >
                      <ShoppingCart className="mr-2" size={18} /> Keranjang
                    </Button>
                  </SignInButton>

                  <SignInButton mode="modal">
                    <Button 
                      disabled={Number(product.stok) === 0}
                      className="flex-1 h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95"
                    >
                      Beli Sekarang
                    </Button>
                  </SignInButton>
                </>
              )}
              
              <Button variant="outline" className="hidden sm:flex h-16 w-16 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50">
                <Plus size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full mb-12 sm:mb-16" />

        <div id="reviews-section">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </Container>
  );
}