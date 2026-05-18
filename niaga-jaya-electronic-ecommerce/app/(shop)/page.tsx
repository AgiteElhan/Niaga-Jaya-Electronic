// import React from "react";
// import Container from "@/components/ui/Container";
// import HomeBanner from "@/components/HomeBanner";
// import CategoryList from "@/components/CategoryList";
// import ProductGrid from "@/components/ProductGrid";
// import PaymentBanner from "@/components/PaymentBanner";
// import Link from 'next/link';

// // 1. Fungsi untuk mengambil data dari API Route Next.js
// async function getProducts() {
//   // Kita panggil endpoint internal yang ada di app/api/products/route.ts
//   const res = await fetch("http://localhost:3000/api/products", {
//     cache: "no-store", // Agar data stok/harga selalu fresh dari database Niaga Jaya
//   });

//   if (!res.ok) {
//     // Jika gagal, kita bisa kembalikan array kosong agar halaman tidak crash
//     console.error("Gagal mengambil data produk");
//     return [];
//   }

//   return res.json();
// }

// // 2. Ubah Komponen menjadi async
// const ShopPage = async () => {
//   // Panggil fungsi fetch data
//   const products = await getProducts();

//   return (
//     <Container>
//       <div className="flex flex-col gap-10 pb-20 pt-4">
        
//         {/* Banner Promo Utama */}
//         <HomeBanner />
        
//         {/* Navigasi Kategori */}
//         <section>
//           <CategoryList />
//         </section>

//         {/* List Produk Terbaru */}
//         <section id="product-list" className="flex flex-col gap-6 scroll-mt-24"> 
//           <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//             <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
//               Produk Terbaru
//             </h2>
//             <Link 
//               href="/shop" 
//               className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center"
//             >
//               Lihat Semua →
//             </Link>
//           </div>
          
//           {/* 3. Masukkan data 'products' dari API ke ProductGrid */}
//           <ProductGrid products={products} />
//         </section>

//         {/* Banner Pembayaran Cicilan */}
//         <PaymentBanner />

//       </div>
//     </Container>
//   );
// };

// export default ShopPage;

import React from "react";
import Container from "@/components/ui/Container";
import HomeBanner from "@/components/HomeBanner";
import CategoryList from "@/components/CategoryList";
import ProductGrid from "@/components/ProductGrid";
import PaymentBanner from "@/components/PaymentBanner";
import Link from 'next/link';

// IMPORT DATA DUMMY DARI FILE CONSTANTS
import { dummyProducts } from "@/components/constants/product";

const ShopPage = () => {
  // Langsung gunakan data dummy, tidak perlu fetch API yang bikin error
  const products = dummyProducts;

  return (
    <Container>
      <div className="flex flex-col gap-10 pb-20 pt-4">
        
        {/* Banner Promo Utama */}
        <HomeBanner />
        
        {/* Navigasi Kategori */}
        <section>
          <CategoryList />
        </section>

        {/* List Produk Terbaru */}
        <section id="product-list" className="flex flex-col gap-6 scroll-mt-24"> 
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Produk Terbaru
            </h2>
            <Link 
              href="/shop" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center"
            >
              Lihat Semua →
            </Link>
          </div>
          
          {/* Kirim data dummy ke ProductGrid */}
          <ProductGrid products={products} />
        </section>

        {/* Banner Pembayaran Cicilan */}
        <PaymentBanner />

      </div>
    </Container>
  );
};

export default ShopPage;