"use client";

import React, { useState, useMemo } from 'react';
import { Star, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Review } from "@/types/review"; // Sesuaikan path type kamu

// Data Constant Awal (Nanti bisa diganti lewat props/API jika perlu)
const DUMMY_REVIEWS: Review[] = [
  {
    id: "1",
    userName: "Budi Santoso",
    rating: 5,
    comment: "Barangnya original, pengiriman cepat sekali ke Jakarta. Recommended!",
    date: "12 Mei 2026",
  },
  {
    id: "2",
    userName: "Siti Aminah",
    rating: 4,
    comment: "Kualitas bagus, tapi box sedikit penyok saat sampai. Tapi isinya aman.",
    date: "10 Mei 2026",
  },
];

export default function ProductReviews() {
  const [reviews] = useState<Review[]>(DUMMY_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<number | "all">("all");

  // Hitung Statistik Bintang
  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : "0";
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
    });
    return { avg, total, counts: [...counts].reverse() };
  }, [reviews]);

  // Logika Filter
  const filteredReviews = reviews.filter(r => 
    selectedFilter === "all" ? true : r.rating === selectedFilter
  );

  return (
    <div id="reviews" className="mt-8 border-t border-slate-100 pt-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* KOLOM KIRI: RATING STATS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-28">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Rating Pembeli</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="text-6xl font-black text-blue-600 tracking-tighter">{stats.avg}</div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.round(Number(stats.avg)) ? "currentColor" : "none"} strokeWidth={2.5} />
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-400">{stats.total} Ulasan Terverifikasi</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {stats.counts.map((count, index) => {
                const starNum = 5 - index;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                const isSelected = selectedFilter === starNum;

                return (
                  <button 
                    key={starNum}
                    onClick={() => setSelectedFilter(isSelected ? "all" : starNum)}
                    className={`w-full flex items-center gap-3 group transition-all p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-1 w-12 shrink-0">
                      <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>{starNum}</span>
                      <Star size={12} fill={isSelected ? "white" : "#eab308"} color={isSelected ? "white" : "#eab308"} />
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${isSelected ? 'bg-white/40' : 'bg-blue-600'}`} style={{ width: `${percentage}%` }} />
                    </div>
                    <span className={`text-xs font-bold w-8 ${isSelected ? 'text-white' : 'text-slate-400'}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            <Button variant="outline" onClick={() => setSelectedFilter("all")} className="w-full rounded-2xl border-slate-200 text-slate-600 font-bold">
              <Filter size={14} className="mr-2" /> Reset Filter
            </Button>
          </div>
        </div>

        {/* KOLOM KANAN: LIST REVIEW USER */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-center px-2">
             <h4 className="font-black text-slate-900 text-2xl tracking-tight">
               {selectedFilter === "all" ? "Semua Ulasan" : `Ulasan Bintang ${selectedFilter}`}
             </h4>
             <span className="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
               {filteredReviews.length} Ulasan
             </span>
          </div>

          <div className="grid gap-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((rev) => (
                <div key={rev.id} className="p-8 rounded-[36px] border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[20px] bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xl shadow-inner">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-slate-800 text-lg leading-none">{rev.userName}</p>
                          <CheckCircle2 size={16} className="text-blue-500" />
                        </div>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-tighter">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 bg-yellow-50 px-3 py-1.5 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} strokeWidth={2.5} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-[15px] leading-relaxed font-medium pl-3 border-l-4 border-blue-50 italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-100">
                <p className="text-slate-400 font-black italic">Belum ada ulasan untuk filter ini.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}