"use client"

import { Search, X, ShoppingBag } from "lucide-react"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyProducts } from "./constants/product" // Pastikan path ini sesuai struktur folder kamu

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<typeof dummyProducts>([]);

  useEffect(() => {
    // Pencarian dimulai jika karakter lebih dari 1
    if (search.trim().length > 1) {
      const filtered = dummyProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div className="relative w-full max-w-[200px] md:max-w-[300px]">
      <div className="relative group">
        <input
          type="text"
          placeholder="Cari produk elektronik..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 border border-gray-100 py-2.5 pl-10 pr-10 rounded-full text-sm 
                     focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown Hasil Pencarian */}
      {results.length > 0 && (
        <div className="fixed md:absolute top-[70px] md:top-full left-0 md:-left-64 lg:-left-96 mt-4 
                        w-[95vw] md:w-[600px] lg:w-[800px] bg-white border border-gray-100 
                        rounded-[24px] shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          
          <div className="flex items-center justify-between p-5 border-b border-gray-50 bg-gray-50/50">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[2px]">Hasil Rekomendasi</h3>
            <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
              {results.length} Produk Ditemukan
            </span>
          </div>

          <div className="p-4 max-h-[450px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((product) => (
              <Link 
                key={product.id}
                // Menghubungkan ke page detail berdasarkan id produk
                href={`/product/${product.id}`}
                onClick={() => setSearch("")}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
              >
                {/* Preview Gambar Produk */}
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden p-2">
                  {product.images && product.images[0] ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name} 
                      width={64} 
                      height={64} 
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <ShoppingBag className="w-6 h-6 text-gray-200" />
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-blue-500 uppercase mb-0.5">{product.category}</span>
                  <span className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </span>
                  <span className="text-sm font-black text-gray-900 mt-1">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-4 bg-gray-50/80 text-center border-t border-gray-100">
            <Link 
              href="/shop" 
              onClick={() => setSearch("")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
            >
              Lihat Seluruh Katalog Produk Niaga Jaya
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar