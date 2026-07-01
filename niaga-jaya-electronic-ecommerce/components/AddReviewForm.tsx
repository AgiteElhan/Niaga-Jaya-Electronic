"use client";

import React, { useState } from 'react';
import { Star, Send } from "lucide-react";
import { Button } from "./ui/button";

interface AddReviewFormProps {
  order: any;             // Menerima objek order dari page.tsx
  productId?: string;     // ID produk yang diulas
  onSuccess?: () => void;
}

export default function AddReviewForm({ order, productId, onSuccess }: AddReviewFormProps) {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return alert("Pilih rating terlebih dahulu!");

    setIsSubmitting(true);

    try {
      const response = await  fetch(
       '${process.env.NEXT_PUBLIC_API_URL}/reviews', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          pesanan_id: order.id,         // Data dari prop order
          produk_id: productId,         // Data dari prop productId
          nama_pembeli: order.nama_pembeli || "Pelanggan", // Dinamis dari data order
          rating: userRating,
          komentar: comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Terima kasih! Ulasan Anda berhasil dikirim.");
        setComment("");
        setUserRating(0);
        if (onSuccess) onSuccess();
      } else {
        // Menampilkan error spesifik dari Laravel (misal: validasi gagal)
        console.error("Server Error:", data);
        alert("Gagal: " + (data.message || JSON.stringify(data.errors || "Terjadi kesalahan")));
      }
    } catch (error) {
      console.error("Error Detail:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 w-full max-w-3xl mx-auto font-sans">
      <h4 className="text-2xl font-black mb-2 tracking-tight">Berikan Ulasan Anda</h4>
      <p className="text-slate-400 mb-8 font-medium">Bagikan pengalamanmu menggunakan produk ini.</p>
      
      <form onSubmit={handleSubmitReview} className="space-y-8">
        {/* Rating Area */}
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
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Area */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis ulasan Anda di sini..."
          className="w-full bg-slate-800 border-none rounded-[24px] p-6 text-white focus:ring-4 focus:ring-blue-600/30 outline-none h-32 resize-none"
          required
        />

        <Button 
          type="submit"
          disabled={userRating === 0 || isSubmitting} 
          className="bg-blue-600 hover:bg-blue-500 w-full md:w-auto px-12 h-16 rounded-[24px]"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Ulasan"} <Send size={20} className="ml-3" />
        </Button>
      </form>
    </div>
  );
}