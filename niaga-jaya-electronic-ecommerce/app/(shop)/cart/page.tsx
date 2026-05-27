"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import EmptyCart from "@/components/EmptyCart";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBag, Lock, Plus, Minus } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// IMPORT CHECKOUT DIALOG UTAMA
import CheckoutDialog from "@/components/CheckoutDialog";

// IMPORT HOOK DAN COMPONENT DARI CLERK
import { useUser, SignInButton } from "@clerk/nextjs";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const { isSignedIn, isLoaded } = useUser();
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // FIXED HYDRATION: Otomatis centang semua HANYA saat pertama kali halaman dimuat
  useEffect(() => {
    setMounted(true);
    if (cart.length > 0) {
      setSelectedItems(cart.map(item => Number(item.id)));
    }
  }, []); 

  if (!mounted || !isLoaded) return null;

  // JIKA USER BELUM LOGIN: HALAMAN BLOCKED RESPONSIVE
  if (!isSignedIn) {
    return (
      <Container>
        <div className="py-16 sm:py-24 max-w-md mx-auto text-center flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Lock className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
            Akses Keranjang Terkunci
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-medium">
            Untuk melihat barang belanjaan dan melanjutkan transaksi di <span className="font-bold text-blue-600">Niaga Jaya Electronic</span>, Anda harus masuk ke akun Anda terlebih dahulu.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full h-12 sm:h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95">
              Login Sekarang
            </Button>
          </SignInButton>
        </div>
      </Container>
    );
  }

  // JIKA USER SUDAH LOGIN TAPI KERANJANG KOSONG
  if (cart.length === 0) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  const toggleCheck = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => Number(item.id)));
    }
  };

  const handleIncreaseQty = (id: number, currentQty: number, namaProduk: string) => {
    if (currentQty >= 50) {
      return toast.warning("Batas Maksimal", {
        description: `Maaf, pembelian ${namaProduk} dibatasi maksimal 50 unit per transaksi.`,
      });
    }
    if (updateQuantity) {
      updateQuantity(id, currentQty + 1);
    }
  };

  const handleDecreaseQty = (id: number, currentQty: number) => {
    if (currentQty > 1 && updateQuantity) {
      updateQuantity(id, currentQty - 1);
    }
  };

  const totalPrice = cart
    .filter((item) => selectedItems.includes(Number(item.id)))
    .reduce((total, item) => total + Number(item.harga_jual) * item.quantity, 0);

  const itemsToBuy = cart.filter(item => selectedItems.includes(Number(item.id)));
  
  const compiledCartData = {
    nama_produk: itemsToBuy.length > 0 
      ? itemsToBuy.length === 1 
        ? `${itemsToBuy[0].nama_produk}`
        : `${itemsToBuy[0].nama_produk} + ${itemsToBuy.length - 1} Produk Lainnya`
      : "Belanjaan Keranjang",
    harga_jual: totalPrice,
    gambar_url: itemsToBuy.length > 0 ? itemsToBuy[0].gambar_url : "" 
  };

  return (
    <Container>
      <div className="py-6 sm:py-12 px-2 sm:px-0">
        {/* JUDUL HALAMAN */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 border-b border-slate-100 pb-4">
          <ShoppingBag className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">Keranjang Belanja</h1>
        </div>

        {/* STRUKTUR GRID UTAMA: RESPONSIVE DARI 1 KOLOM KE 3 KOLOM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          
          {/* SISI KIRI: DAFTAR ITEM (2 KOLOM DI LAPTOP) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            
            {/* Header Checklist All */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
              <input 
                type="checkbox" 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-blue-600 shrink-0"
                checked={selectedItems.length === cart.length && cart.length > 0}
                onChange={toggleAll}
              />
              <span className="text-xs sm:text-sm font-bold text-slate-700">Pilih Semua ({cart.length})</span>
            </div>

            {/* List Barang Keranjang Belanja */}
            {cart.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-5 border rounded-[20px] sm:rounded-[24px] transition-all duration-300 relative ${
                  selectedItems.includes(Number(item.id)) ? 'border-blue-200 bg-blue-50/20' : 'border-slate-100 bg-white'
                }`}
              >
                {/* Checkbox Penyeleksi */}
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(Number(item.id))}
                  onChange={() => toggleCheck(Number(item.id))}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-blue-600 mt-2 sm:mt-0 shrink-0"
                />

                {/* Container Gambar Produk */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex-shrink-0 flex items-center justify-center">
                  <img src={item.gambar_url} className="max-w-full max-h-full object-contain" alt={item.nama_produk} />
                </div>

                {/* DETAIL INFORMASI & COUNTER (RESPONSIVE FLEX) */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pr-7 sm:pr-0">
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-base truncate max-w-[140px] sm:max-w-[240px] lg:max-w-[280px]">
                      {item.nama_produk}
                    </h3>
                    <p className="text-blue-600 font-black text-sm sm:text-lg">
                      Rp {Number(item.harga_jual).toLocaleString('id-ID')}
                    </p>
                  </div>

                  {/* KONTROL QUANTITY LIVE STYLE SHOPEE */}
                  <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-slate-100 w-fit">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQty(Number(item.id), item.quantity)}
                      disabled={item.quantity <= 1}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                    >
                      <Minus size={12} className="sm:size-[14px]" />
                    </button>
                    <span className="text-xs sm:text-sm font-black w-5 sm:w-6 text-center text-slate-900">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleIncreaseQty(Number(item.id), item.quantity, item.nama_produk)}
                      disabled={item.quantity >= 50} 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg shadow-sm flex items-center justify-center text-slate-600 transition-colors ${
                        item.quantity >= 50 ? "bg-slate-200 cursor-not-allowed text-slate-400" : "bg-white hover:bg-slate-100"
                      }`}
                    >
                      <Plus size={12} className="sm:size-[14px]" />
                    </button>
                  </div>
                </div>

                {/* Tombol Aksi Hapus Sampah (Diposisikan Pojok Kanan Atas di HP) */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute right-2 top-2 sm:static p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all shrink-0"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* SISI KANAN: RINGKASAN BELANJA (STICKY DI DESKTOP, PINDAH BAWAH DI HP) */}
          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <div className="sticky top-20 lg:top-24 bg-white border border-slate-100 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-xl shadow-slate-100/40">
              <h2 className="text-base sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Ringkasan Belanja</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex justify-between text-slate-500 font-medium text-xs sm:text-sm">
                  <span>Total Produk</span>
                  <span>{selectedItems.length} Barang</span>
                </div>
                <div className="border-t border-slate-100 pt-3 sm:pt-4 flex justify-between items-end">
                  <span className="text-slate-900 font-bold text-xs sm:text-sm">Total Harga</span>
                  <span className="text-lg sm:text-2xl font-black text-blue-600 leading-none">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {itemsToBuy.length > 0 ? (
                <CheckoutDialog products={itemsToBuy} isFromCart={true} />
              ) : (
                <Button 
                  disabled
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-400 font-bold text-sm sm:text-lg border border-slate-200"
                >
                  Pilih Produk Dulu...
                </Button>
              )}
              
              <p className="text-center text-[10px] sm:text-[11px] text-slate-400 mt-3 sm:mt-4 leading-normal">
                Pemesanan aman dan terintegrasi via Midtrans Secure Gateway
              </p>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default CartPage;