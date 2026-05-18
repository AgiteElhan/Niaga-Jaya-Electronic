// @/components/ReviewForm.tsx
"use client";

import React, { useState } from 'react';
import { Star, Send } from "lucide-react";
import { Button } from "./ui/button";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih! Rating: ${rating}, Komentar: ${comment}`);
    // Nanti di sini tempat kamu fetch POST ke API
  };

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-[32px] mb-12 shadow-sm">
      <h3 className="text-xl font-black text-slate-900 mb-2">Tulis Ulasan</h3>
      <p className="text-slate-500 text-sm mb-6">Bagikan pengalamanmu menggunakan produk ini.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Interactive Star Rating */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Rating Kamu</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={32}
                  className="transition-colors duration-200"
                  fill={(hover || rating) >= star ? "#eab308" : "none"}
                  color={(hover || rating) >= star ? "#eab308" : "#cbd5e1"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Komentar</label>
          <textarea
            className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all h-32 resize-none text-slate-600"
            placeholder="Tulis pendapatmu tentang produk ini..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={rating === 0}
          className="w-full md:w-auto h-12 px-8 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold transition-all flex items-center gap-2"
        >
          <Send size={18} /> Kirim Ulasan
        </Button>
      </form>
    </div>
  );
}