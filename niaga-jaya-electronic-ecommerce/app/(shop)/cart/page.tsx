"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import EmptyCart from "@/components/EmptyCart";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBag, CreditCard, Lock } from "lucide-react"; // <-- Tambah ikon Lock
import { Button } from "@/components/ui/button";

// 1. IMPORT HOOK DAN COMPONENT DARI CLERK
import { useUser, SignInButton } from "@clerk/nextjs";

const CartPage = () => {
  const { cart, removeFromCart } = useCartStore();
  
  // 2. AMBIL STATUS LOGIN USER DI CLIENT SIDE
  const { isSignedIn, isLoaded } = useUser();
  
  // State untuk menyimpan ID produk yang dicentang
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
    // Otomatis centang semua saat pertama kali buka keranjang
    if (cart.length > 0) {
      setSelectedItems(cart.map(item => item.id));
    }
  }, [cart]);

  // Tunggu sampai Next.js mounted dan Clerk selesai loading data status user
  if (!mounted || !isLoaded) return null;

  // 3. JIKA USER BELUM LOGIN: TAMPILKAN HALAMAN BLOCKED NYAMAN
  if (!isSignedIn) {
    return (
      <Container>
        <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Lock size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
            Akses Keranjang Terkunci
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
            Untuk melihat barang belanjaan dan melanjutkan transaksi di <span className="font-bold text-blue-600">Niaga Jaya Electronic</span>, Anda harus masuk ke akun Anda terlebih dahulu.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-base font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95">
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

  // Toggle checklist per item
  const toggleCheck = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pilih semua atau hapus semua pilihan
  const toggleAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Hitung total harga hanya untuk yang di-checklist
  const totalPrice = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + Number(item.harga_jual) * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Pilih minimal satu produk untuk checkout!");
      return;
    }
    
    const itemsToBuy = cart.filter(item => selectedItems.includes(item.id));
    const pesan = `Halo Niaga Jaya, saya ingin checkout:\n${itemsToBuy.map(item => `- ${item.nama_produk} (${item.quantity}x)`).join('\n')}\n\n*Total: Rp ${totalPrice.toLocaleString('id-ID')}*`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  return (
    <Container>
      <div className="py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Keranjang Belanja</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* SISI KIRI: DAFTAR ITEM */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header Checklist All */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                checked={selectedItems.length === cart.length && cart.length > 0}
                onChange={toggleAll}
              />
              <span className="text-sm font-bold text-slate-700">Pilih Semua ({cart.length})</span>
            </div>

            {cart.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-4 p-5 border rounded-[24px] transition-all duration-300 ${
                  selectedItems.includes(item.id) ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 bg-white'
                }`}
              >
                {/* Checkbox */}
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                />

                {/* Gambar Produk */}
                <div className="w-24 h-24 bg-white border border-slate-100 rounded-2xl p-2 flex-shrink-0">
                  <img src={item.gambar_url} className="w-full h-full object-contain" alt={item.nama_produk} />
                </div>

                {/* Detail Produk */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{item.nama_produk}</h3>
                  <p className="text-blue-600 font-black text-lg mt-1">
                    Rp {Number(item.harga_jual).toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">
                      Jumlah: {item.quantity}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* SISI KANAN: RINGKASAN BELANJA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-100 rounded-[32px] p-8 shadow-xl shadow-slate-100/50">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Ringkasan Belanja</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Total Produk</span>
                  <span>{selectedItems.length} Barang</span>
                </div>
                <div className="border-t border-slate-50 pt-4 flex justify-between items-end">
                  <span className="text-slate-900 font-bold">Total Harga</span>
                  <span className="text-2xl font-black text-blue-600">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <CreditCard size={20} />
                Checkout ({selectedItems.length})
              </Button>
              
              <p className="text-center text-[11px] text-slate-400 mt-4">
                Pemesanan akan diteruskan langsung ke WhatsApp Niaga Jaya
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;