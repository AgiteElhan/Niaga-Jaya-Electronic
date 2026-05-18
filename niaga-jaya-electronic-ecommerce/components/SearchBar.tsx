// "use client";

// import { Search, X, ShoppingBag } from "lucide-react";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// // Interface disesuaikan dengan output ProductController Anda
// interface Product {
//   id: number;
//   nama_produk: string;
//   harga_jual: string;
//   gambar_url: string; // Menggunakan gambar_url hasil transform asset()
//   kategori?: {
//     nama_kategori: string;
//   };
// }

// const SearchBar = () => {
//   const [search, setSearch] = useState("");
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [results, setResults] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/products");
//         const data = await response.json();
//         setAllProducts(data);
//       } catch (error) {
//         console.error("Gagal load produk untuk search:", error);
//       }
//     };
//     fetchAllProducts();
//   }, []);

//   useEffect(() => {
//     if (search.trim().length > 1) {
//       const filtered = allProducts.filter(product =>
//         product.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
//         product.kategori?.nama_kategori.toLowerCase().includes(search.toLowerCase())
//       );
//       setResults(filtered);
//     } else {
//       setResults([]);
//     }
//   }, [search, allProducts]);

//   return (
//     <div className="relative w-full max-w-[200px] md:max-w-[300px]">
//       <div className="relative group">
//         <input
//           type="text"
//           placeholder="Cari produk elektronik..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full bg-gray-50 border border-gray-100 py-2.5 pl-10 pr-10 rounded-full text-sm 
//                      focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
//         />
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        
//         {search && (
//           <button 
//             onClick={() => setSearch("")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-3.5 h-3.5 text-gray-400" />
//           </button>
//         )}
//       </div>

//       {results.length > 0 && (
//         <div className="fixed md:absolute top-[70px] md:top-full left-0 md:-left-64 lg:-left-96 mt-4 
//                         w-[95vw] md:w-[600px] lg:w-[800px] bg-white border border-gray-100 
//                         rounded-[24px] shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          
//           <div className="flex items-center justify-between p-5 border-b border-gray-50 bg-gray-50/50">
//             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[2px]">Hasil Rekomendasi</h3>
//             <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
//               {results.length} Produk Ditemukan
//             </span>
//           </div>

//           <div className="p-4 max-h-[450px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
//             {results.map((product) => (
//               <Link 
//                 key={product.id}
//                 href={`/product/${product.id}`} 
                
//                 // Sangat Penting: Tutup dropdown search setelah barang diklik
//                 onClick={() => {
//                   setSearch("");
//                   setResults([]);
//                 }}
//                 className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
//               >
//                 {/* Preview Gambar Produk */}
//                 <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden p-2">
//                   <Image 
//                     src={product.gambar_url} 
//                     alt={product.nama_produk} 
//                     width={64} 
//                     height={64} 
//                     className="object-contain w-full h-full"
//                     unoptimized 
//                   />
//                 </div>

//                 <div className="flex flex-col min-w-0">
//                   <span className="text-[10px] font-bold text-blue-500 uppercase mb-0.5">
//                     {product.kategori?.nama_kategori || "Elektronik"}
//                   </span>
//                   <span className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
//                     {product.nama_produk}
//                   </span>
//                   <span className="text-sm font-black text-gray-900 mt-1">
//                     Rp {Number(product.harga_jual).toLocaleString('id-ID')}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="p-4 bg-gray-50/80 text-center border-t border-gray-100">
//             <Link 
//               href="/shop" 
//               onClick={() => setSearch("")}
//               className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
//             >
//               Lihat Seluruh Katalog Produk Niaga Jaya
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { dummyProducts } from "@/components/constants/product"; // Mengambil data lokal

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // GUNAKAN VERSI LOKAL (DUMMY DATA)
  useEffect(() => {
    // Kita langsung ambil dari dummyProducts, tidak perlu fetch API lagi
    setAllProducts(dummyProducts || []);
  }, []);

  // Logika pencarian lokal
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, allProducts]);

  return (
    <div className="relative w-full max-w-md group">
      <div className="relative flex items-center w-full h-12 rounded-2xl bg-slate-100 border border-transparent focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
        <div className="pl-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Cari produk elektronik..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full px-4 bg-transparent border-none outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Hasil Pencarian (Dropdown) */}
      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none transition-colors"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl p-2 shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 line-clamp-1">{product.name}</p>
                <p className="text-xs font-bold text-blue-600">Rp {product.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;