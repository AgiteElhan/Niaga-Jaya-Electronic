"use client";

import { Search, X } from "lucide-react";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  nama_produk: string;
  harga_jual: string;
  gambar_url: string; 
  kategori?: {
    nama_kategori: string;
  };
}

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Gagal load produk untuk search:", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (search.trim().length > 1) {
      const filtered = allProducts.filter(product =>
        product.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
        product.kategori?.nama_kategori.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search, allProducts]);

  return (
    // UBAH: max-w di mobile dilepas jadi w-full, h-11 dipasang agar teks tidak terpotong vertikal
    <div className="relative w-full lg:max-w-[450px]">
      <div className="relative group">
        <input
          type="text"
          placeholder="Cari produk elektronik..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // UBAH: Tinggi diganti h-11 murni agar placeholder di mobile pas ditengah, py dilepas
          className="w-full h-11 bg-gray-50 border border-gray-100 pl-10 pr-10 rounded-full text-sm 
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

      {/* DROPDOWN HASIL REKOMENDASI PENCARIAN */}
      {results.length > 0 && (
        // UBAH: Menggunakan absolute top-full untuk mobile agar sejajar lurus di bawah input h-11
        <div className="absolute top-full left-1/2 -translate-x-1/2 lg:-left-64 lg:translate-x-0 mt-3 
                        w-[92vw] sm:w-[550px] lg:w-[750px] bg-white border border-gray-100 
                        rounded-[24px] shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          
          <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Hasil Rekomendasi</h3>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
              {results.length} Produk
            </span>
          </div>

          <div className="p-3 max-h-[380px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 bg-white">
            {results.map((product) => (
              <Link 
                key={product.id}
                href={`/product/${product.id}`} 
                onClick={() => {
                  setSearch("");
                  setResults([]);
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-blue-50/40 border border-transparent hover:border-blue-100 transition-all group"
              >
                {/* Preview Gambar Produk */}
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden p-1.5">
                  <img 
                    src={product.gambar_url} 
                    alt={product.nama_produk} 
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.png";
                    }}
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-bold text-blue-500 uppercase mb-0.5">
                    {product.kategori?.nama_kategori || "Elektronik"}
                  </span>
                  <span className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.nama_produk}
                  </span>
                  <span className="text-xs font-black text-gray-900 mt-0.5">
                    Rp {Number(product.harga_jual).toLocaleString('id-ID')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-3 bg-gray-50/80 text-center border-t border-gray-100">
            <Link 
              href="/shop" 
              onClick={() => setSearch("")}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
            >
              Lihat Seluruh Katalog Niaga Jaya
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;