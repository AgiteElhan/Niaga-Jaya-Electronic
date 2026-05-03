import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialSection from "@/components/TestimonialSection";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

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
      {/* 1. HERO SECTION (Navbar + Hero + Feature Cards) */}
      <HeroSection />

      {/* 2. DYNAMIC HERO SLIDER (dari Admin Laravel) */}
      {banners.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <HeroSlider banners={banners} />
        </section>
      )}

      {/* 3. KENAPA HARUS DI TOKO KAMI */}
      <WhyUsSection />

      {/* 4. TESTIMONI */}
      <TestimonialSection />

      {/* 5. BANNER CICILAN */}
      <section id="produk" className="max-w-6xl mx-auto px-4 pt-4 pb-10">
        <div className="bg-[#2563EB] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-xl">
          <div className="space-y-6 z-10 relative">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
              Menerima Pembayaran cicilan:
            </h2>
            <ul className="space-y-3 text-xl md:text-2xl font-medium opacity-90">
              {["Kredivo", "Home Credit", "SpayLater"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-white rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 md:mt-0 relative z-10">
            <img
              src="/electronic-group.png"
              alt="Electronic Promo"
              className="w-full max-w-[350px] drop-shadow-2xl"
            />
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* 6. GRID PRODUK */}
      <section className="max-w-6xl mx-auto px-4 mt-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Promo Minggu ini</h2>
          <div className="h-[2px] flex-1 bg-gray-200" />
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
            <p className="text-gray-500">
              Belum ada produk. Tambahkan melalui Admin Panel!
            </p>
          </div>
        )}

        <div className="mt-16 flex flex-col items-center gap-4">
          <a
            href={`https://wa.me/${phone}?text=Halo%20Niaga%20Jaya%2C%20saya%20ingin%20melakukan%20pemesanan`}
            target="_blank"
            className="bg-[#2563EB] text-white px-16 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-all w-full md:w-auto shadow-lg active:scale-95 text-center"
          >
            Beli Sekarang
          </a>
          <a
            href={`https://wa.me/${phone}?text=Halo%20Niaga%20Jaya%2C%20bisakah%20saya%20berkonsultasi%3F`}
            target="_blank"
            className="text-blue-600 font-semibold hover:underline"
          >
            Chat WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
