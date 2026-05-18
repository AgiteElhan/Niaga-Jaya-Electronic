"use client";

import React, { useState } from 'react';
import { Star, Send } from "lucide-react";
import { Button } from "./ui/button";

interface AddReviewFormProps {
  productId?: string; // Untuk tahu produk mana yang sedang diulas
  onSuccess?: () => void; // Fungsi opsional jika mau menutup modal/pindah halaman setelah sukses kirim
}

export default function AddReviewForm({ productId, onSuccess }: AddReviewFormProps) {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return alert("Pilih rating terlebih dahulu!");

    // Di sini nanti tempat kamu melakukan Axios / Fetch POST ke API Laravel Niaga Jaya
    console.log("Mengirim data ke backend:", {
      productId,
      rating: userRating,
      comment: comment
    });

    // Simulasi Berhasil Kirim API
    alert("Terima kasih! Ulasan Anda berhasil dikirim.");
    
    // Reset form
    setComment("");
    setUserRating(0);

    // Jalankan fungsi callback sukses jika ada (misal buat nutup modal)
    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 w-full max-w-3xl mx-auto font-sans">
      <h4 className="text-2xl font-black mb-2 tracking-tight">Berikan Ulasan Anda</h4>
      <p className="text-slate-400 mb-8 font-medium">Bagikan pengalamanmu menggunakan produk ini setelah pembelian selesai.</p>
      
      <form onSubmit={handleSubmitReview} className="space-y-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Skor Produk</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setUserRating(star)}
                className="focus:outline-none"
              >
                <Star 
                  size={36} 
                  fill={(hover || userRating) >= star ? "#eab308" : "none"} 
                  color={(hover || userRating) >= star ? "#eab308" : "#334155"}
                  strokeWidth={2.5}
                  className="transition-transform active:scale-90"
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bagaimana kualitas produk secara keseluruhan? Tulis di sini..."
          className="w-full bg-slate-800 border-none rounded-[24px] p-6 text-white focus:ring-4 focus:ring-blue-600/30 outline-none h-32 resize-none placeholder:text-slate-600 font-medium"
          required
        />

        <Button 
          disabled={userRating === 0} 
          className="bg-blue-600 hover:bg-blue-500 text-white font-black w-full md:w-auto px-12 h-16 rounded-[24px] transition-all text-lg"
        >
          Kirim Ulasan <Send size={20} className="ml-3" />
        </Button>
      </form>
    </div>
  );
}