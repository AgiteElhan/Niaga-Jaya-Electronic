"use client";

import React from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ChevronRight, Clock, Image as ImageIcon } from "lucide-react";
import { dummyProducts } from "@/components/constants/product"; 

export default function OrdersPage() {
  // Ambil data dummy dan buat simulasi data order dengan aman
  const simulatedOrders = (dummyProducts || []).slice(0, 4).map((product: any, index: number) => {
    const statuses = ["Diproses", "Dikirim", "Tiba", "Dibatalkan"];
    return {
      orderId: `NJ-ORD-${10293 + index}`,
      date: `${14 - index} Mei 2026`,
      status: statuses[index % statuses.length],
      paymentMethod: "Midtrans (VA Bank)",
      totalAmount: product.price,
      productName: product.name,
      // Fix: Disesuaikan dari product.image menjadi product.images?.[0] sesuai file ts
      productImage: product.images?.[0] || null, 
    };
  });

  // Fungsi helper untuk warna badge status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Tiba": return "bg-green-100 text-green-700";
      case "Dikirim": return "bg-blue-100 text-blue-700";
      case "Dibatalkan": return "bg-red-100 text-red-700";
      default: return "bg-amber-100 text-amber-700"; // Diproses
    }
  };

  return (
    <div className="bg-white min-h-[80vh]">
      {/* Container utama menggunakan max-w-7xl agar sejajar dengan Navbar */}
      <Container className="py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-50 pb-8">
            <div>
              <h1 className="text-4xl font-black text-slate-900">Pesanan Saya</h1>
              <p className="text-slate-500 mt-2 font-medium">Lacak dan kelola riwayat belanja Anda di Niaga Jaya.</p>
            </div>
          </div>

          {/* List Pesanan */}
          <div className="grid gap-6">
            {simulatedOrders.map((order) => (
              <Link 
                key={order.orderId} 
                href={`/orders/${order.orderId}`}
                className="group bg-white border border-slate-100 rounded-[40px] p-8 hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  
                  {/* Bagian Kiri: Info Produk & ID */}
                  <div className="flex items-center gap-8">
                    {/* Foto Produk */}
                    <div className="w-24 h-24 bg-slate-50 rounded-[30px] border border-slate-100 p-4 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group-hover:border-blue-100 transition-colors">
                      {order.productImage ? (
                        <img 
                          src={order.productImage} 
                          alt={order.productName} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <ImageIcon size={32} className="text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-black text-xl text-slate-900 tracking-tight">{order.orderId}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-base font-bold line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {order.productName}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-300" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bagian Kanan: Harga & Aksi */}
                  <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-t-0 pt-6 lg:pt-0 border-slate-50">
                    <div className="text-left lg:text-right">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Total Pembayaran</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">
                        Rp {order.totalAmount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={24} />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}