'use client';
import { useEffect } from 'react'; //
import AOS from 'aos'; //
import 'aos/dist/aos.css'; //
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSlider({ banners }: { banners: any[] }) {
  // Inisialisasi AOS saat komponen dimuat di browser
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div 
      className="max-w-6xl mx-auto px-4 mt-6 relative group" 
      data-aos="fade-up" // Atribut AOS untuk animasi muncul dari bawah
    >
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        navigation={{
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-3xl overflow-hidden shadow-xl"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-gray-200">
              <img 
                src={banner.image_url} 
                alt={banner.nama_banner} 
                className="w-full h-full object-cover" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol Navigasi Custom */}
      <button className="button-prev absolute left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <button className="button-next absolute right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
        <ChevronRight size={24} strokeWidth={3} />
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2563EB !important;
          width: 20px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </div>
  );
}