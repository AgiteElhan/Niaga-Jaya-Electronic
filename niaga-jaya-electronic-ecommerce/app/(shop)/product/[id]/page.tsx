"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Star, ShoppingCart, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useUser, SignInButton } from "@clerk/nextjs";

// Komponen & Store
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/ProductReviews";
import CheckoutDialog from "@/components/CheckoutDialog";
import { useCartStore } from "@/store/useCartStore";

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
  const { isSignedIn } = useUser();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${resolvedParams.id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan.");
        const json = await res.json();
        setProduct(json.data || json);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [resolvedParams.id]);

  // Loading State
  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-2" />
        <p className="text-xs font-bold">Menghubungkan ke database gudang...</p>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return <div className="py-20 text-center font-bold text-red-500">Produk Tidak Ditemukan</div>;
  }

  // Helper Variables
  const isOutOfStock = Number(product.stok) <= 0;
  const price = Number(product.harga_jual || 0);
  const displayImage = product.gambar_url || "/placeholder.png";

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Gagal", { description: `Stok ${product.nama_produk} sedang habis.` });
      return;
    }
    addToCart({
      id: Number(product.id),
      nama_produk: product.nama_produk,
      harga_jual: price,
      gambar_url: displayImage,
      quantity: 1,
    });
    toast.success("Berhasil!", { description: `${product.nama_produk} masuk ke keranjang.` });
  };

  return (
    <Container>
      <Toaster position="top-center" richColors closeButton />

      <div className="py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-slate-600">Produk</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-bold truncate">{product.nama_produk}</span>
        </nav>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gambar Produk */}
          <div className="bg-slate-50 rounded-[40px] aspect-square flex items-center justify-center p-6 border border-slate-100">
            <img 
              src={displayImage} 
              alt={product.nama_produk} 
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info Produk */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{product.nama_produk}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className={`text-sm font-bold ${isOutOfStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                {isOutOfStock ? "Stok Habis" : `Sisa Stok: ${product.stok} unit`}
              </span>
            </div>

            <h2 className="text-4xl font-black text-blue-600 mb-8">
              Rp {price.toLocaleString('id-ID')}
            </h2>

            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              {product.deskripsi || "Dapatkan kualitas terbaik dengan penawaran harga eksklusif."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isSignedIn ? (
                <>
                  <Button onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 h-16 rounded-2xl font-black text-lg bg-slate-100 hover:bg-slate-200 text-slate-900">
                    <ShoppingCart className="mr-2" size={18} /> {isOutOfStock ? "Stok Habis" : "Keranjang"}
                  </Button>
                  <CheckoutDialog products={[{ id: product.id, nama_produk: product.nama_produk, harga_jual: price, gambar_url: displayImage, quantity: 1 }]} />
                </>
              ) : (
                <>
                  <SignInButton mode="modal"><Button className="flex-1 h-16 rounded-2xl font-black text-lg bg-slate-100 text-slate-900">Keranjang</Button></SignInButton>
                  <SignInButton mode="modal"><Button className="flex-1 h-16 rounded-2xl font-black text-lg bg-blue-600 text-white">Beli Sekarang</Button></SignInButton>
                </>
              )}
              <Button variant="outline" className="hidden sm:flex h-16 w-16 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50">
                <Plus size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div id="reviews-section">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </Container>
  );
}