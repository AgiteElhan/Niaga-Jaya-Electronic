"use client";
import { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Kartika",
    location: "Jakarta",
    badge: "Good Services",
    rating: 5,
    text: "Pelayanan responsif, instalasi gratis dan gratis ongkir.",
  },
  {
    name: "Budi Santoso",
    location: "Tangerang",
    badge: "Fast Delivery",
    rating: 5,
    text: "Barang sampai hari yang sama, kondisi sempurna dan sesuai deskripsi.",
  },
  {
    name: "Siti Rahayu",
    location: "Bekasi",
    badge: "Best Price",
    rating: 5,
    text: "Harga bersaing, garansi resmi, dan toko nya ramah sekali!",
  },
  {
    name: "Deni Kurniawan",
    location: "Jakarta",
    badge: "Good Services",
    rating: 5,
    text: "Cicilan mudah tanpa ribet, teknisi profesional dan tepat waktu.",
  },
  {
    name: "Rina Wulandari",
    location: "Depok",
    badge: "Recommended",
    rating: 5,
    text: "Sudah 3x beli di sini, selalu puas. Recommended banget!",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag to scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  // Inisialisasi AOS khusus jika tidak menggunakan Provider global
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft =
      scrollLeftRef.current - (x - startX.current) * 1.5;
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / testimonials.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, testimonials.length - 1));
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / testimonials.length;
    scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  const scroll = (dir: "left" | "right") => {
    const next =
      dir === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, testimonials.length - 1);
    scrollToIndex(next);
  };

  return (
    <section id="testimoni" className="bg-[#F8FAFC] py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading + Arrows */}
        <div 
          className="flex items-center justify-between mb-10"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            Testimoni & Kepuasan Pelanggan
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all shadow-sm text-lg"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all shadow-sm text-lg"
            >
              ›
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-aos="fade-left" // Muncul meluncur dari kanan ke kiri
              data-aos-delay={i * 150} // Jeda antar kartu
              className="min-w-[280px] md:min-w-[340px] bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-shrink-0 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  data-aos="zoom-in"
                  data-aos-delay={(i * 150) + 300} // Avatar muncul belakangan dengan efek zoom
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    {t.name}{" "}
                    <span className="text-gray-400 font-normal">
                      ({t.badge})
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                  <StarRating count={t.rating} />
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div 
          className="flex justify-center gap-2 mt-6"
          data-aos="fade-up"
          data-aos-offset="0" // Muncul segera tanpa perlu scroll jauh ke bawah indikator
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "bg-[#2563EB] w-8"
                  : "bg-gray-300 w-2.5 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}