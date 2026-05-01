'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider({ banners }: { banners: any[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-3xl overflow-hidden shadow-xl h-[200px] md:h-[450px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img 
                src={banner.image_url} 
                alt={banner.nama_banner} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
              {/* Overlay Tipis agar teks banner lebih kontras */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}