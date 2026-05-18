"use client";

import React, { useState, useRef, useEffect } from 'react';
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any; // Mengubah ke 'any' untuk mengantisipasi data objek atau array dari API
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Validasi Ekstra: Pastikan kita selalu mengekstrak array dari data API
  // Jika API mengembalikan { data: [...] } atau { products: [...] }, kita amankan di sini
  const actualProducts = Array.isArray(products) 
    ? products 
    : products?.data || products?.products || [];

  const calculateDots = () => {
    const slider = scrollRef.current;
    if (!slider || actualProducts.length === 0) return;

    const { scrollWidth, clientWidth } = slider;
    const totalPages = Math.ceil(scrollWidth / clientWidth);
    
    setDotsCount(totalPages);
  };

  useEffect(() => {
    // Jalankan kalkulasi dots saat komponen selesai render atau data berubah
    const timer = setTimeout(calculateDots, 500);
    window.addEventListener('resize', calculateDots);
    return () => {
      window.removeEventListener('resize', calculateDots);
      clearTimeout(timer);
    };
  }, [products, actualProducts]); // Menambahkan actualProducts ke dependency array

  const handleScroll = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    const { scrollLeft, clientWidth } = slider;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  // 2. Tampilan Fallback jika data benar-benar kosong setelah dicek
  if (actualProducts.length === 0) {
    return (
      <div className="w-full text-center py-12 border border-dashed border-slate-200 rounded-[28px] text-slate-400 font-medium">
        Tidak ada produk terbaru yang tersedia.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {/* 3. Gunakan 'actualProducts' yang sudah tervalidasi berbentuk array */}
        {actualProducts.map((item: any) => (
          <div 
            key={item.id} 
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[calc(25%-18px)] snap-start"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {/* Pagination Dots yang Sinkron */}
      {dotsCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {[...Array(dotsCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const slider = scrollRef.current;
                if (slider) {
                  slider.scrollTo({ 
                    left: i * slider.clientWidth, 
                    behavior: 'smooth' 
                  });
                }
              }}
              className={`transition-all duration-500 rounded-full ${
                activeIndex === i 
                  ? "w-8 h-2 bg-blue-600 shadow-md" 
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;