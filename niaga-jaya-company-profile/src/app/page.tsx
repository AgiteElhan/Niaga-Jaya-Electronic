import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialSection from "@/components/TestimonialSection";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import ScrollHandler from "@/components/ScrollHandler";
import { Suspense } from "react";


// Fetch banners dari Laravel
async function getBanners() {
  try {
    const res = await fetch("http://localhost:8000/api/banners", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Fetch produk dari Laravel
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:8000/api/products", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const [banners, products] = await Promise.all([getBanners(), getProducts()]);
  const phone = "6281585692357";

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      
      {/* 1. HERO SECTION (Navbar + Hero + Feature Cards) */}
      <HeroSection />

      {/* 2. Banner cicilan */}
      <section id="cicilan" className="max-w-6xl mx-auto px-4 pt-6 pb-6">
        <div
          className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row items-stretch border border-gray-100 min-h-[200px] md:h-[280px]"
          data-aos="fade-up"
        >
          {/* Sisi Kiri: Biru (Lebih Ramping) */}
          <div className="bg-[#2563EB] text-white p-6 md:p-10 md:w-[55%] rounded-r-[3rem] md:rounded-r-[6rem] z-10 relative flex flex-col justify-center shadow-[8px_0_20px_rgba(0,0,0,0.1)]">
            <div className="space-y-4">
              <h2 className="text-xl md:text-3xl font-extrabold leading-tight">
                Menerima Pembayaran cicilan:
              </h2>
              <ul className="flex flex-wrap md:flex-col gap-x-6 gap-y-2">
                {["Kredivo", "Home Credit", "SpayLater"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base md:text-xl font-medium opacity-90"
                  >
                    <div className="h-1.5 w-1.5 bg-white rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sisi Kanan: Putih (Tempat Produk) */}
          <div className="bg-white flex-1 flex items-center justify-center p-4 md:pr-10 relative">
            <img
              src="/banner_cicilan.png"
              alt="Koleksi Elektronik Niaga Jaya"
              className="w-full max-w-[280px] md:max-w-[400px] object-contain drop-shadow-xl transform md:-translate-x-8 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 3. KENAPA HARUS DI TOKO KAMI */}
      <WhyUsSection />

      {/* 4. TESTIMONI */}
      <TestimonialSection />

      {/* 5. BANNER PROMO */}
      {banners.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <HeroSlider banners={banners} />
        </section>
      )}

      {/* 6. GRID PRODUK */}
      <section id="produk" className="max-w-6xl mx-auto px-4 mt-4 pb-16">
        {/* Heading dengan Garis Dekoratif */}
        <div className="flex items-center gap-4 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Produk Terlaris
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 100} // Efek muncul bergantian
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Button Lihat Semua Produk */}
            <div className="mt-12 flex justify-center" data-aos="fade-up">
              <a href="http://localhost:3000/" target="_blank"
                className="group flex items-center gap-2 bg-white border-2 border-[#2563EB] text-[#2563EB] px-8 py-3 rounded-full font-bold hover:bg-[#2563EB] hover:text-white transition-all active:scale-95 shadow-md">
                Lihat Semua Produk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-gray-500 font-medium">
              Belum ada produk tersedia.
            </p>
          </div>
        )}

        {/* WhatsApp CTA Section */}
        <div
          className="mt-20 bg-[#F8FAFC] rounded-[2.5rem] p-8 md:p-12 text-center shadow-inner border border-gray-100"
          data-aos="zoom-in"
        >
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            Siap Memiliki Elektronik Impian?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Konsultasikan kebutuhan rumah tangga Anda dengan tim teknisi ahli
            kami secara gratis via WhatsApp.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href="http://localhost:3000/"
              target="_blank"
              className="bg-[#2563EB] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all w-full md:w-auto shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>🛒</span> Beli Sekarang
            </a>
            <a
              href={`https://wa.me/${phone}?text=Halo%20Niaga%20Jaya%2C%20bisakah%20saya%20berkonsultasi%3F`}
              target="_blank"
              className="text-[#2563EB] font-bold hover:underline flex items-center gap-2"
            >
              <span>💬</span> Chat Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
