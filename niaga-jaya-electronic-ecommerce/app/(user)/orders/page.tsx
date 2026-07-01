"use client";

import React, { useState, useEffect } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ChevronRight, Clock, Image as ImageIcon, Lock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";

interface Order {
  id: number | string;
  order_id: string; 
  status_pesanan: string; 
  metode_pembayaran: string;
  total_harga: number | string;
  created_at: string;
  nama_produk: string;
  gambar_url?: string;
  items?: any[]; 
  jumlah_item: number; 
}

export default function OrdersPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // FETCH DATA RIWAYAT BERDASARKAN USER CLERK ID
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;        
        const response = await fetch(`${BACKEND_URL}/api/orders?clerk_id=${user.id}`);
        
        if (response.ok) {
          const result = await response.json();
          // Antisipasi jika data terbungkus array langsung atau di dalam objek .data
          setOrders(Array.isArray(result) ? result : result.data || []); 
        }
      } catch (error) {
        console.error("Gagal sinkronisasi riwayat pesanan dari MySQL:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchUserOrders();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user?.id]);

  // Helper warna badge mengikuti status database lokal lu ('menunggu', 'berhasil', 'gagal')
 // Helper warna badge
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "berhasil": case "success": case "settlement": 
        return "bg-green-50 text-green-700 border-green-200";
      case "gagal": case "deny": case "expire": case "dibatalkan": case "batal": case "cancel": 
        return "bg-red-50 text-red-700 border-red-200";
      default: 
        return "bg-amber-50 text-amber-700 border-amber-200"; // Menunggu / Pending
    }
  };

  // Helper teks badge agar lebih rapi (terjemahan otomatis)
  const getStatusText = (status: string) => {
    const s = status?.toLowerCase();
    if (["berhasil", "success", "settlement"].includes(s)) return "Berhasil";
    if (["dibatalkan", "batal", "cancel"].includes(s)) return "Dibatalkan";
    if (["gagal", "deny", "expire"].includes(s)) return "Gagal";
    return status; // Menunggu / Pending
  };

  if (!mounted || !isLoaded) return null;

  // JIKA USER BELUM LOGIN
  if (!isSignedIn) {
    return (
      <Container>
        <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Lock size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
            Riwayat Pesanan Terkunci
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
            Pour melacak pengiriman barang dan melihat riwayat belanja Anda di <span className="font-bold text-blue-600">Niaga Jaya Electronic</span>, silakan masuk ke akun Anda terlebih dahulu.
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

  // LOADING STATE
  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500 flex flex-col items-center justify-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-3" role="status"></div>
        <p className="text-sm font-bold text-slate-700">Mencari log riwayat transaksi Anda...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-[85vh]">
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-10 border-b border-slate-200/60 tyranny pb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="text-blue-600 w-8 h-8" /> Pesanan Saya
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Hai <span className="text-blue-600 font-bold">{user?.fullName || "Pelanggan"}</span>, berikut log status transaksi aman belanja Anda.
            </p>
          </div>

          {/* List Pesanan Riil */}
          <div className="space-y-4">
            {orders.map((order) => (
              <Link 
                key={order.id} 
                href={`/orders/${order.order_id}`}
                className="group block bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 border-l-4 border-l-blue-600"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  
                  {/* Info Produk & ID */}
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                      {order.gambar_url ? (
                        <img 
                          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/products/${order.gambar_url}`}
                          alt={order.nama_produk} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <ImageIcon size={24} className="text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-sm sm:text-base text-slate-900 tracking-tight truncate">
                          {order.order_id}
                        </h3>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusStyle(order.status_pesanan)}`}>
                          {getStatusText(order.status_pesanan)}
                        </span>
                      </div>
                      
                      {/* LOGIKA MENAMPILKAN NAMA PRODUK */}
                      <p className="text-slate-700 text-xs sm:text-sm font-bold truncate pr-4">
                        {order.nama_produk}
                        {order.jumlah_item > 1 && (
                          <span className="text-blue-600 font-medium ml-1">
                            + {order.jumlah_item - 1} barang lainnya
                          </span>
                        )}
                      </p>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <Clock size={11} className="text-slate-300" />
                        <span>
                          {order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Harga & Detail Trigger */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <div className="sm:text-right">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Total Pembayaran</p>
                      <p className="text-lg sm:text-xl font-black text-blue-600 tracking-tight">
                        Rp {Number(order.total_harga).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm shrink-0">
                      <ChevronRight size={18} />
                    </div>
                  </div>

                </div>
              </Link>
            ))}

            {/* Empty State */}
            {orders.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 px-4">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                  Anda Belum Memiliki Riwayat Transaksi
                </p>
                <Link href="/" className="mt-3 inline-block text-blue-600 font-bold text-xs hover:underline underline-offset-4">
                  Mulai Jelajahi Produk Sekarang →
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}