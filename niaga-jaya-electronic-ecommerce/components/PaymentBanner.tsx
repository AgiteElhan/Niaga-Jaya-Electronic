"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';

const PaymentBanner: React.FC = () => {
  
  const handleScrollToProducts = () => {
    const productSection = document.getElementById('product-list');
    productSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const paymentMethods = ["Kredivo", "Home Credit", "SpayLater", "Akulaku"];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 mb-16 mt-8">
      {/* Container Utama: Menggunakan flex-col-reverse agar info teks di bawah gambar di Mobile (opsional) */}
      {/* Atau tetap flex-col jika ingin teks di atas. Di sini saya pakai flex-col agar teks tetap utama. */}
      <div className="flex flex-col md:flex-row bg-white rounded-[32px] md:rounded-[50px] overflow-hidden shadow-2xl border border-slate-100 relative">
        
        {/* --- DEKORASI PATTERN --- */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl z-0"></div>

        {/* Sisi Kiri (Konten Utama) */}
        {/* Penyesuaian: padding di mobile p-6, di desktop p-14. Rounded-r dihilangkan saat mobile */}
        <div className="w-full md:w-[65%] bg-[#0052CC] p-6 sm:p-10 md:p-14 md:rounded-r-[100px] flex flex-col justify-center z-10 relative overflow-hidden">
          
          {/* Pola Wave: Dibuat hidden di mobile agar tidak mengganggu keterbacaan teks kecil */}
          <svg className="absolute bottom-0 left-0 opacity-10 w-full hidden sm:block" viewBox="0 0 1440 320">
            <path fill="#ffffff" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,202.7C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

          <div className="relative z-20 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
              Promo Cicilan Ringan
            </div>

            <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-tight">
              Nikmati Kemudahan <br /> 
              <span className="text-orange-300">Cicilan Tanpa Ribet</span>
            </h2>
            
            {/* Grid Payment: Grid 2 kolom tetap dari mobile agar ringkas */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 w-full max-w-sm md:max-w-none">
              {paymentMethods.map((item) => (
                <div key={item} className="flex items-center text-white/95 text-sm sm:text-lg font-semibold group justify-start">
                  <CheckCircle2 className="text-orange-400 mr-2 sm:mr-3 h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            {/* Tombol: w-full di mobile agar mudah diklik jempol */}
            <Button 
              onClick={handleScrollToProducts}
              className="w-full sm:w-fit bg-orange-500 text-white font-black rounded-xl sm:rounded-2xl px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg 
                         hover:bg-orange-600 hover:scale-105 transition-all duration-300 
                         active:scale-95 shadow-xl group border-none"
            >
              <ShoppingCart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
              Mulai Belanja
            </Button>
          </div>
        </div>

        {/* Sisi Kanan (Visual) */}
        {/* Penyesuaian: Tinggi dikurangi di mobile agar tidak terlalu memakan layar */}
        <div className="w-full md:w-[35%] h-[180px] sm:h-[250px] md:h-auto bg-white relative p-6 flex items-center justify-center order-first md:order-last">
          {/* Dekorasi tetap ada tapi disesuaikan ukurannya */}
          <div className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-orange-100 rounded-full -bottom-5 -right-5 opacity-50"></div>
          <div className="absolute w-12 h-12 sm:w-20 sm:h-20 border-4 border-blue-100 rounded-full top-5 right-5 opacity-50"></div>
          
          {/* Placeholder untuk Image kamu nantinya */}
          <div className="relative w-full h-full flex items-center justify-center text-slate-200 italic text-sm">
             [Image Produk]
          </div>
        </div>

      </div>
    </section>
  );
};

export default PaymentBanner;