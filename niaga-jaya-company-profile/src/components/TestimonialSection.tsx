"use client";
import { useState } from "react";

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
  {
    name: "Ahmad Fauzi",
    location: "Tangerang",
    badge: "Good Services",
    rating: 5,
    text: "Harga terjangkau, produk original, pelayanan sangat memuaskan!",
  },
];

const DESKTOP_PER_PAGE = 3;

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

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {getInitials(t.name)}
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">
            {t.name}{" "}
            <span className="text-gray-400 font-normal">({t.badge})</span>
          </p>
          <p className="text-xs text-gray-400">{t.location}</p>
          <StarRating count={t.rating} />
        </div>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{t.text}</p>
    </div>
  );
}

// Wrapper animasi — direction: "left" | "right"
function AnimatedWrapper({
  children,
  animKey,
  direction,
}: {
  children: React.ReactNode;
  animKey: string;
  direction: "left" | "right";
}) {
  return (
    <div
      key={animKey}
      className={`
        animate-slide-in
        ${direction === "right" ? "slide-from-right" : "slide-from-left"}
      `}
    >
      {children}
    </div>
  );
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  // "right" = maju, "left" = mundur
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);

  const totalDesktopPages = Math.ceil(testimonials.length / DESKTOP_PER_PAGE);

  // Helper: trigger animasi ulang
  const trigger = (dir: "left" | "right") => {
    setDirection(dir);
    setAnimKey((k) => k + 1); // key berubah → React unmount & remount → animasi jalan lagi
  };

  // Mobile
  const prevMobile = () => {
    if (activeIndex === 0) return;
    trigger("left");
    setActiveIndex((i) => i - 1);
  };
  const nextMobile = () => {
    if (activeIndex === testimonials.length - 1) return;
    trigger("right");
    setActiveIndex((i) => i + 1);
  };

  // Desktop
  const prevDesktop = () => {
    if (desktopPage === 0) return;
    trigger("left");
    setDesktopPage((p) => p - 1);
  };
  const nextDesktop = () => {
    if (desktopPage === totalDesktopPages - 1) return;
    trigger("right");
    setDesktopPage((p) => p + 1);
  };

  const desktopCards = testimonials.slice(
    desktopPage * DESKTOP_PER_PAGE,
    desktopPage * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE
  );

  return (
    <section id="testimoni" className="bg-[#F8FAFC] py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4" data-aos="fade-up">
        {/* Heading + Arrows */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900">
            Testimoni & Kepuasan Pelanggan
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                prevMobile();
                prevDesktop();
              }}
              disabled={activeIndex === 0 && desktopPage === 0}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#2563EB] hover:text-white transition-all shadow-sm text-lg disabled:opacity-30"
            >
              ‹
            </button>
            <button
              onClick={() => {
                nextMobile();
                nextDesktop();
              }}
              disabled={
                activeIndex === testimonials.length - 1 &&
                desktopPage === totalDesktopPages - 1
              }
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#2563EB] hover:text-white transition-all shadow-sm text-lg disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>

        {/* Mobile: 1 card full */}
        <div className="md:hidden">
          <AnimatedWrapper animKey={`m-${animKey}`} direction={direction}>
            <TestimonialCard t={testimonials[activeIndex]} />
          </AnimatedWrapper>
        </div>

        {/* Desktop: 3 card per halaman */}
        <div className="hidden md:block">
          <AnimatedWrapper animKey={`d-${animKey}`} direction={direction}>
            <div className="grid grid-cols-3 gap-4">
              {desktopCards.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </AnimatedWrapper>
        </div>

        {/* Dots Mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                trigger(i > activeIndex ? "right" : "left");
                setActiveIndex(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-[#2563EB] w-8" : "bg-gray-300 w-2.5"
              }`}
            />
          ))}
        </div>

        {/* Dots Desktop */}
        <div className="hidden md:flex justify-center gap-2 mt-6">
          {Array.from({ length: totalDesktopPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                trigger(i > desktopPage ? "right" : "left");
                setDesktopPage(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                desktopPage === i ? "bg-[#2563EB] w-8" : "bg-gray-300 w-2.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS animasi slide */}
      <style jsx global>{`
        .slide-from-right {
          animation: slideFromRight 0.4s ease-out both;
        }
        .slide-from-left {
          animation: slideFromLeft 0.4s ease-out both;
        }
        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
