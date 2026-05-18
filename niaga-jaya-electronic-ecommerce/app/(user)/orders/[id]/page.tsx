"use client";

import React, { use, useState } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { 
  ArrowLeft, Package, Truck, MapPin, CreditCard, 
  MessageSquare, ShieldAlert, ShoppingBag, Star, Send, CheckCircle2 
} from "lucide-react";
import { dummyProducts } from "@/components/constants/product";
import toast from "react-hot-toast";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id; // Contoh: "NJ-ORD-10293"

  // ===================================================
  // ===== SINKRONISASI INDEKS DENGAN ORDERS PAGE ======
  // ===================================================
  // 1. Ambil angka ID saja dari string URL
  const orderNumber = parseInt(orderId.replace(/^\D+/g, '')) || 10293;
  
  // 2. Cari selisihnya dari angka basis 10293 untuk mendapatkan nominal indeks (0, 1, 2, dst)
  const calculatedIndex = orderNumber - 10293;
  
  // 3. Ambil data produk yang benar-benar diklik dari dummyProducts
  const productIndex = Math.max(0, calculatedIndex) % (dummyProducts.length || 1);
  const product = dummyProducts[productIndex] || dummyProducts[0];

  // 4. Samakan juga array logika statusnya dari halaman list order sebelumnya
  const statuses = ["Diproses", "Dikirim", "Tiba", "Dibatalkan"];
  const currentStatus = statuses[Math.max(0, calculatedIndex) % statuses.length];
  // ===================================================

  // Simulasi Data Detail Pesanan dengan produk & status yang sudah sinkron
  const orderDetail = {
    id: orderId,
    date: `${14 - (calculatedIndex >= 0 ? calculatedIndex : 0)} Mei 2026`,
    arrivalDate: "14 Mei 2026", 
    status: currentStatus, 
    paymentMethod: "Midtrans (VA Bank Semesta)",
    shippingCourier: "J&T Cargo - Regular",
    receiptNumber: `JN-${992019231 + productIndex}AA`,
    shippingAddress: {
      name: "Felissa Amelia",
      phone: "081234567890",
      city: "Tangerang, Banten",
      fullAddress: "Jl. Raya Merdeka No. 45, Blok C3, Karawaci, Kota Tangerang, 15111"
    }
  };

  // State untuk form ulasan
  const [productRating, setProductRating] = useState(0);
  const [courierRating, setCourierRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  // Fungsi Kirim Review
  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (productRating === 0 || courierRating === 0) {
      return toast.error("Mohon berikan rating produk dan kurir!");
    }
    
    toast.success("Ulasan Anda berhasil dikirim! Terima kasih.");
    setIsReviewed(true);
  };

  // Helper Whatsapp Link
  const openWhatsApp = (type: "seller" | "warranty") => {
    const phoneNumber = "6281319946436"; 
    const text = type === "seller" 
      ? `Halo Admin Niaga Jaya, saya ingin bertanya tentang Nomor Pesanan *${orderDetail.id}*`
      : `Halo Admin Niaga Jaya, saya ingin mengajukan klaim garansi/komplain untuk Nomor Pesanan *${orderDetail.id}* dengan produk *${product.name}*`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tiba": return "bg-green-100 text-green-700 border-green-200";
      case "Dikirim": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Dibatalkan": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
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
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{orderDetail.id}</h1>
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg border ${getStatusColor(orderDetail.status)}`}>
                  {orderDetail.status}
                </span>
              </div>
              <p className="text-slate-400 font-bold text-sm">
                Dibuat pada: {orderDetail.date} {orderDetail.status === "Tiba" && `• Tiba pada: ${orderDetail.arrivalDate}`}
              </p>
            </div>

            {/* Aksi Cepat */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button onClick={() => openWhatsApp("seller")} className="flex-1 md:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <MessageSquare size={16} /> Hubungi Penjual
              </button>
              <button onClick={() => openWhatsApp("warranty")} className="flex-1 md:flex-initial bg-red-50 hover:bg-red-100 text-red-600 px-6 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <ShieldAlert size={16} /> Ajukan Komplain / Garansi
              </button>
            </div>
          </div>

          {/* GRID DETAIL: Lebar otomatis penuh jika tidak ada form ulasan */}
          <div className={`grid grid-cols-1 gap-8 items-start ${
            orderDetail.status === "Tiba" ? "lg:grid-cols-3" : "lg:grid-cols-1"
          }`}>
            
            {/* KIRI & TENGAH (LOGISTIK & ALAMAT) */}
            <div className={`space-y-8 ${
              orderDetail.status === "Tiba" ? "lg:col-span-2" : "lg:col-span-1"
            }`}>
              
              {/* Card Alamat Penerima */}
              <div className="bg-white border border-slate-100 rounded-[36px] p-8 space-y-4">
                <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <MapPin size={18} className="text-blue-600" /> Alamat Pengiriman
                </h3>
                <div className="text-slate-700 space-y-1">
                  <p className="font-black text-base">{orderDetail.shippingAddress.name}</p>
                  <p className="text-sm font-bold text-slate-400">{orderDetail.shippingAddress.phone}</p>
                  <p className="text-sm leading-relaxed mt-2 text-slate-600">{orderDetail.shippingAddress.fullAddress}</p>
                </div>
              </div>

              {/* Card Informasi Pengiriman & Pembayaran */}
              <div className="bg-white border border-slate-100 rounded-[36px] p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-black text-sm text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} className="text-blue-600" /> Info Logistik
                  </h4>
                  <div className="text-sm font-bold text-slate-700">
                    <p>{orderDetail.shippingCourier}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">No. Resi: {orderDetail.receiptNumber}</p>
                  </div>
                </div>
                <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <h4 className="font-black text-sm text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-600" /> Metode Pembayaran
                  </h4>
                  <p className="text-sm font-bold text-slate-700">{orderDetail.paymentMethod}</p>
                </div>
              </div>

              {/* Card Rincian Barang yang Dibeli */}
              <div className="bg-white border border-slate-100 rounded-[36px] p-8 space-y-6">
                <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <Package size={18} className="text-blue-600" /> Rincian Produk
                </h3>
                
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="object-contain w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base line-clamp-2 leading-snug">{product.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-slate-900">Rp {product.price.toLocaleString("id-ID")}</p>
                    <p className="text-xs text-slate-400 font-bold">1x Barang</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Belanja</p>
                    <p className="text-2xl font-black text-blue-600">Rp {product.price.toLocaleString("id-ID")}</p>
                  </div>
                  <Link href={`/product/${product.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all">
                    <ShoppingBag size={16} /> Beli Lagi
                  </Link>
                </div>
              </div>

            </div>

            {/* KANAN: FORM REVIEWS (Hanya dirender & memakan space jika status "Tiba") */}
            {orderDetail.status === "Tiba" && (
              <div className="lg:col-span-1">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-[36px] p-8 shadow-2xl shadow-blue-950/20 sticky top-10">
                  {!isReviewed ? (
                    <form onSubmit={handleSendReview} className="space-y-6">
                      <div>
                        <h3 className="font-black text-xl tracking-tight">Beri Ulasan</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Pesanan Anda telah tiba. Bagikan pengalaman Anda!</p>
                      </div>

                      {/* Rating Barang */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kualitas Produk / Seller</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setProductRating(star)} className="focus:outline-none">
                              <Star size={24} fill={productRating >= star ? "#eab308" : "none"} color={productRating >= star ? "#eab308" : "#475569"} strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rating Kurir */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pelayanan Kurir</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setCourierRating(star)} className="focus:outline-none">
                              <Star size={24} fill={courierRating >= star ? "#eab308" : "none"} color={courierRating >= star ? "#eab308" : "#475569"} strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Input Catatan */}
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

                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10">
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