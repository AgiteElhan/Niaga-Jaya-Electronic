"use client";

import React, { useState, useRef, useEffect } from 'react';
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const calculateDots = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    const { scrollWidth, clientWidth } = slider;
    
    // JUMLAH DOT = (Total Panjang Konten / Lebar Layar)
    // clientWidth adalah lebar area yang terlihat (tempat 4 kartu itu)
    const totalPages = Math.ceil(scrollWidth / clientWidth);
    
    setDotsCount(totalPages);
  };

  useEffect(() => {
    // Beri sedikit jeda agar browser selesai merender layout kartu
    const timer = setTimeout(calculateDots, 500);
    window.addEventListener('resize', calculateDots);
    return () => {
      window.removeEventListener('resize', calculateDots);
      clearTimeout(timer);
    };
  }, [products]);

  const handleScroll = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    const { scrollLeft, clientWidth } = slider;
    
    // INDEX DOT = Posisi Scroll / Lebar Layar
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {products.map((item) => (
          <div 
            key={item.id} 
            // Sesuaikan lebar agar di desktop pas (misal 4 kartu = 25% minus gap)
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