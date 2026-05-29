"use client";

import React, { use, useState, useEffect } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { 
  ArrowLeft, Package, Truck, MapPin, CreditCard, 
  MessageSquare, ShieldAlert, ShoppingBag, Star, Send, CheckCircle2, Lock 
} from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// Interface disesuaikan 100% dengan hasil map query Laravel dari DB lokal lu
// Tambahkan interface baru ini khusus untuk daftar barang
interface OrderItem {
  product_id: number | string;
  nama_produk: string;
  gambar_url?: string;
  harga_jual: number;
  jumlah: number;
  kategori_produk?: string;
}

// Ubah interface OrderDetail kamu menjadi seperti ini
interface OrderDetail {
  id: number | string;
  order_id: string; 
  status_pesanan: string; 
  created_at: string;
  arrival_date?: string;
  metode_pembayaran: string;
  status_pembayaran: string; // Pastikan ini ada
  kurir_pengiriman: string; 
  nomor_resi: string;
  nama_penerima: string; 
  nomor_telepon: string; 
  alamat_lengkap: string; 
  total_bayar: number; // Tambahkan ini untuk total keseluruhan

  // Hapus variabel produk yang satuan (seperti nama_produk, product_id)
  // GANTI DENGAN INI:
  items: OrderItem[]; 
}

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const orderIdFromUrl = resolvedParams.id; // Mengambil kode NJE-xxxx dari URL

  const { isSignedIn, isLoaded, user } = useUser();
  
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // State untuk form ulasan
  const [productRating, setProductRating] = useState(0);
  const [courierRating, setCourierRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // FETCH DETAIL TRANSAKSI BERDASARKAN ID ORDER & CLERK_ID
  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const BACKEND_URL = "http://localhost:8000"; 
        
        const response = await fetch(`${BACKEND_URL}/api/orders/${orderIdFromUrl}?clerk_id=${user.id}`);
        
        if (response.ok) {
          const result = await response.json();
          console.log("Data dari API Laravel:", result); // Tambahkan ini!
          setOrder(result.data || result); 
        } else {
          throw new Error("Pesanan tidak ditemukan atau hak akses ditolak.");
        }
      } catch (error) {
        console.error("Error fetching order detail:", error);
      } finally {
        setLoading(false);
      }
    };

  if (isLoaded && isSignedIn) {
    fetchOrderDetail();
  } else if (isLoaded && !isSignedIn) {
    setLoading(false);
  }
}, [isLoaded, isSignedIn, user?.id, orderIdFromUrl]);

  // Fungsi Kirim Review Ke Backend Laravel
  const handleSendReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productRating === 0 || courierRating === 0) {
      return toast.error("Mohon berikan rating produk dan kurir!");
    }
    
    try {
      const BACKEND_URL = "http://localhost:8000";
      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_id: user?.id,
          product_id: order?.product_id,
          order_id: order?.id,
          rating_produk: productRating,
          rating_kurir: courierRating,
          komentar: reviewComment
        })
      });

      if (response.ok) {
        toast.success("Ulasan Anda berhasil dikirim! Terima kasih.");
        setIsReviewed(true);
      } else {
        toast.error("Gagal mengirim ulasan.");
      }
    } catch (error) {
      console.error("Error sending review:", error);
    }
  };

  const openWhatsApp = (type: "seller" | "warranty") => {
    if (!order) return;
    const phoneNumber = "6281319946436"; 
    const text = type === "seller" 
      ? `Halo Admin Niaga Jaya, saya ingin bertanya tentang Nomor Pesanan *${order.order_id}*`
      : `Halo Admin Niaga Jaya, saya ingin mengajukan klaim garansi/komplain untuk Nomor Pesanan *${order.order_id}* dengan produk *${order.nama_produk}*`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "tiba": case "selesai": case "success": case "settlement": 
        return "bg-green-100 text-green-700 border-green-200";
      case "dikirim": 
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "dibatalkan": case "expire": case "cancel": 
        return "bg-red-100 text-red-700 border-red-200";
      default: 
        return "bg-amber-100 text-amber-700 border-amber-200"; // Menunggu / Pending
    }
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
            Detail Pesanan Terkunci
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
            Untuk melihat detail pelacakan logistik log ini, silakan masuk ke akun Anda terlebih dahulu.
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
        <p className="text-sm font-bold text-slate-700">Menghubungkan ke server logistik...</p>
      </div>
    );
  }

  if (!order) return <div className="py-20 text-center font-bold text-red-500">Detail Pesanan Tidak Ditemukan</div>;

  const isOrderArrived = order.status_pesanan?.toLowerCase() === "tiba" || order.status_pesanan?.toLowerCase() === "selesai";

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Top Navigation */}
          <Link href="/orders" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Pesanan Saya
          </Link>

          {/* MAIN CARD: INFORMASI UTAMA */}
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-10 shadow-xl shadow-slate-100 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">No. Pesanan</span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{order.order_id}</h1>
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg border ${getStatusColor(order.status_pesanan)}`}>
                  {order.status_pesanan === 'settlement' || order.status_pesanan === 'success' ? 'Berhasil' : order.status_pesanan}
                </span>
              </div>
              <p className="text-slate-400 font-bold text-xs sm:text-sm">
                Dibuat pada: {order.created_at ? new Date(order.created_at).toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' }) : '-'} {isOrderArrived && order.arrival_date && `• Tiba pada: ${order.arrival_date}`}
              </p>
            </div>

            {/* Aksi Cepat */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button onClick={() => openWhatsApp("seller")} className="flex-1 md:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <MessageSquare size={16} /> Hubungi Penjual
              </button>
              <button onClick={() => openWhatsApp("warranty")} className="flex-1 md:flex-initial bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <ShieldAlert size={16} /> Komplain / Garansi
              </button>
            </div>
          </div>

          {/* GRID DETAIL */}
          <div className={`grid grid-cols-1 gap-8 items-start ${
            isOrderArrived ? "lg:grid-cols-3" : "lg:grid-cols-1"
          }`}>
            
            {/* KIRI: LOGISTIK & ALAMAT */}
            <div className={`space-y-8 ${
              isOrderArrived ? "lg:col-span-2" : "lg:col-span-1"
            }`}>
              
              {/* Card Alamat Penerima Riil */}
              <div className="bg-white border border-slate-100 rounded-[36px] p-6 sm:p-8 space-y-4">
                <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <MapPin size={18} className="text-blue-600" /> Alamat Pengiriman
                </h3>
                <div className="text-slate-700 space-y-1">
                  <p className="font-black text-base">{order.nama_penerima}</p>
                  <p className="text-sm font-bold text-slate-400">{order.nomor_telepon}</p>
                  <p className="text-sm leading-relaxed mt-2 text-slate-600">{order.alamat_lengkap}</p>
                </div>
              </div>

              {/* Card Informasi Pengiriman & Pembayaran Riil */}
              <div className="bg-white border border-slate-100 rounded-[36px] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-black text-sm text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} className="text-blue-600" /> Info Logistik
                  </h4>
                  <div className="text-sm font-bold text-slate-700">
                    <p>{order.kurir_pengiriman || "Regular Delivery"}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      No. Resi: {order.nomor_resi || "Menunggu konfirmasi kurir admin"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <h4 className="font-black text-sm text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-600" /> Metode Pembayaran
                  </h4>
                  <p className="text-sm font-bold text-slate-700">{order.metode_pembayaran}</p>
                </div>
              </div>

              {/* Card Rincian Produk */}
{/* Ganti blok Card Rincian Produk (mulai dari <h3> sampai penutup <div>-nya) dengan ini: */}
{/* GANTI BLOK RINCIAN PRODUK DENGAN INI */}
<div className="bg-white border border-slate-100 rounded-[36px] p-6 sm:p-8 space-y-6">
  <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
    <Package size={18} className="text-blue-600" /> Rincian Produk
  </h3>

  <div className="space-y-4">
    {/* Looping semua item yang ada di dalam array 'items' */}
    {Array.isArray(order.items) && order.items.length > 0 ? (
      order.items.map((item, index) => (
        <div key={index} className="flex items-center gap-5 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 p-2.5 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
             <img 
               src={`http://localhost:8000/storage/products/${item.gambar}`} 
               alt={item.nama_produk} 
               className="object-contain w-full h-full" 
             />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 text-sm">{item.nama_produk}</h4>
          </div>
          <div className="text-right text-sm font-black">
            Rp {Number(item.harga_satuan || 0).toLocaleString("id-ID")}
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-slate-400">Produk tidak ditemukan.</p>
    )}
  </div>

  <div className="border-t pt-4 text-right">
    <p className="text-xs text-slate-400 uppercase font-black">Total</p>
    <p className="text-xl font-black text-blue-600">
      Rp {Number(order.total_harga || 0).toLocaleString("id-ID")}
    </p>
  </div>
</div>

            </div>

            {/* KANAN: FORM REVIEWS ASLI (AKTIF JIKA STATUSNYA TIBA/SELESAI) */}
            {isOrderArrived && (
              <div className="lg:col-span-1">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-[36px] p-6 sm:p-8 shadow-2xl sticky top-10">
                  {!isReviewed ? (
                    <form onSubmit={handleSendReview} className="space-y-6">
                      <div>
                        <h3 className="font-black text-xl tracking-tight">Beri Ulasan</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Pesanan Anda telah tiba. Bagikan pengalaman Anda!</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kualitas Produk</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setProductRating(star)} className="focus:outline-none">
                              <Star size={24} fill={productRating >= star ? '#eab308' : 'none'} color={productRating >= star ? "#eab308" : "#475569"} strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pelayanan Kurir</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setCourierRating(star)} className="focus:outline-none">
                              <Star size={24} fill={courierRating >= star ? '#eab308' : 'none'} color={courierRating >= star ? "#eab308" : "#475569"} strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Komentar</label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Tulis ulasan produk dan kurir disini..."
                          className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 text-sm resize-none placeholder:text-slate-600"
                          required
                        />
                      </div>

                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                        Kirim Ulasan <Send size={14} />
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={36} />
                      </div>
                      <div>
                        <h4 className="font-black text-lg">Ulasan Terkirim</h4>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Terima kasih telah memberikan penilaian di Niaga Jaya Official!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </Container>
    </div>
  );
}