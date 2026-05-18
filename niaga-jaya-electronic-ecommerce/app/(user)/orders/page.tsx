"use client";

import React, { useState, useEffect } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ChevronRight, Clock, Image as ImageIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. IMPORT HOOK CLERK UNTUK MENGAMBIL DATA USER LOGIN
import { useUser, SignInButton } from "@clerk/nextjs";

// Buat interface Order agar sesuai dengan relasi database transaksi kamu
interface Order {
  id: number | string;
  order_id: string; // ID Transaksi unik dari backend/Midtrans
  status_pesanan: string; // Diproses, Dikirim, Tiba, Dibatalkan
  metode_pembayaran: string;
  total_harga: number | string;
  created_at: string;
  // Relasi detail produk yang dibeli
  nama_produk: string;
  gambar_url?: string;
}

export default function OrdersPage() {
  // Ambil data user yang sedang aktif login dari Clerk
  const { isSignedIn, isLoaded, user } = useUser();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. FETCH DATA RIWAYAT TRANSAKSI DARI BACKEND LARAVEL BERDASARKAN CLERK_ID
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const BACKEND_URL = "http://localhost:8000"; 
        
        // Tembak API Laravel dengan mengirimkan clerk_id sebagai query parameter
        const response = await fetch(`${BACKEND_URL}/api/orders?clerk_id=${user.id}`);
        
        if (response.ok) {
          const result = await response.json();
          setOrders(result.data || result); // Sesuaikan dengan struktur JSON backend lu
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

  // Fungsi helper untuk warna badge status transaksi
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "tiba": case "selesai": return "bg-green-100 text-green-700";
      case "dikirim": return "bg-blue-100 text-blue-700";
      case "dibatalkan": return "bg-red-100 text-red-700";
      default: return "bg-amber-100 text-amber-700"; // Diproses / Pending
    }
  };

  // Tunggu sampai Next.js selesai mounted dan Clerk memuat status login
  if (!mounted || !isLoaded) return null;

  // 3. JIKA USER BELUM LOGIN: TAMPILKAN BLOCKED SCREEN
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
            Untuk melacak pengiriman barang dan melihat riwayat belanja Anda di <span className="font-bold text-blue-600">Niaga Jaya Electronic</span>, silakan masuk ke akun Anda terlebih dahulu.
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

  // 4. LOADING STATE SAAT MENUNGGU DATA DARI MYSQL BACKEND
  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-2" role="status"></div>
        <p className="text-xs font-bold">Mencari riwayat pesanan Anda di database...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[80vh]">
      <Container className="py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-50 pb-8">
            <div>
              <h1 className="text-4xl font-black text-slate-900">Pesanan Saya</h1>
              <p className="text-slate-500 mt-2 font-medium">Hai <span className="text-blue-600 font-bold">{user?.fullName || "Pelanggan"}</span>, berikut log transaksi belanja Anda.</p>
            </div>
          </div>

          {/* List Pesanan Riil */}
          <div className="grid gap-6">
            {orders.map((order) => (
              <Link 
                key={order.id} 
                href={`/orders/${order.order_id}`}
                className="group bg-white border border-slate-100 rounded-[40px] p-8 hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  
                  {/* Bagian Kiri: Info Produk & ID */}
                  <div className="flex items-center gap-8">
                    {/* Foto Produk */}
                    <div className="w-24 h-24 bg-slate-50 rounded-[30px] border border-slate-100 p-4 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group-hover:border-blue-100 transition-colors">
                      {order.gambar_url ? (
                        <img 
                          src={order.gambar_url} 
                          alt={order.nama_produk} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <ImageIcon size={32} className="text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-black text-xl text-slate-900 tracking-tight">{order.order_id}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg ${getStatusStyle(order.status_pesanan)}`}>
                          {order.status_pesanan}
                        </span>
                      </div>
                      <p className="text-slate-500 text-base font-bold line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {order.nama_produk}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-300" />
                          <span>{order.created_at}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bagian Kanan: Harga & Aksi */}
                  <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-t-0 pt-6 lg:pt-0 border-slate-50">
                    <div className="text-left lg:text-right">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Total Pembayaran</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">
                        Rp {Number(order.total_harga).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={24} />
                    </div>
                  </div>

                </div>
              </Link>
            ))}

            {/* Empty State jika user sudah login tapi belum pernah belanja sama sekali */}
            {orders.length === 0 && (
              <div className="text-center py-16 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 px-4">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                  Anda Belum Memiliki Riwayat Pesanan
                </p>
                <Link href="/shop" className="mt-4 inline-block text-blue-600 font-bold text-sm underline underline-offset-4">
                  Mulai Belanja Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}