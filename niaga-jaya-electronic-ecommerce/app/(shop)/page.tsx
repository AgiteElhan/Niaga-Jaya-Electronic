import React from "react";
import Container from "@/components/ui/Container";
import HomeBanner from "@/components/HomeBanner";
import CategoryList from "@/components/CategoryList";
import ProductGrid from "@/components/ProductGrid";
import PaymentBanner from "@/components/PaymentBanner";

// 1. Data Dummy Lokal
const dummyProducts = [
  {
    id: 1,
    name: "Mesin Cuci LG TurboWash 12kg",
    category: "MESIN CUCI",
    price: 4500000,
    image_url: "/products/mesin-cuci.png",
  },
  {
    id: 2,
    name: "Kulkas Samsung Side by Side 500L",
    category: "KULKAS",
    price: 8200000,
    image_url: "/products/kulkas.png",
  },
  {
    id: 3,
    name: "Smart TV Sony Bravia 4K 55 Inch",
    category: "TELEVISI",
    price: 12500000,
    image_url: "/products/tv.png",
  },
  {
    id: 4,
    name: "AC Sharp 1/2 PK Sayonara Panas",
    category: "AC",
    price: 3450000,
    image_url: "/products/ac.png",
  },
  {
    id: 5,
    name: "Microwave Panasonic Digital",
    category: "ELEKTRONIK",
    price: 1850000,
    image_url: "/products/microwave.png",
  },
  {
    id: 6,
    name: "Dispenser Modena Bottom Loading",
    category: "ELEKTRONIK",
    price: 2700000,
    image_url: "/products/dispenser.png",
  },


];

// 2. Komponen Utama ShopPage
const ShopPage = () => {
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
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Lihat Semua →
            </button>
          </div>
          <ProductGrid products={dummyProducts} />
        </section>

        {/* Banner Pembayaran Cicilan */}
        <PaymentBanner />

      </div>
    </Container>
  );
};

export default ShopPage;