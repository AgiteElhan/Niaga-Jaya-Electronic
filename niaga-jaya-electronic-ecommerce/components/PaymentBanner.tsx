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
      {/* Container Utama dengan Border Gradasi */}
      <div className="flex flex-col md:flex-row bg-white rounded-[32px] md:rounded-[50px] overflow-hidden shadow-2xl border border-slate-100 relative">
        
        {/* --- DEKORASI PATTERN --- */}
        {/* Lingkaran Oren di Pojok */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl z-0"></div>

        {/* Sisi Kiri: Info & Button dengan Aksen Biru-Oren */}
        <div className="w-full md:w-[65%] bg-[#0052CC] p-8 md:p-14 md:rounded-r-[100px] flex flex-col justify-center z-10 relative overflow-hidden">
          
          {/* Pola Wave Halus di Background Biru */}
          <svg className="absolute bottom-0 left-0 opacity-10 w-full" viewBox="0 0 1440 320">
            <path fill="#ffffff" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,202.7C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

          <div className="relative z-20">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-orange-900/20">
              Promo Cicilan Ringan
            </div>

            <h2 className="text-white text-2xl md:text-4xl font-black mb-6 leading-tight">
              Nikmati Kemudahan <br /> 
              <span className="text-orange-300">Cicilan Tanpa Ribet</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {paymentMethods.map((item) => (
                <div key={item} className="flex items-center text-white/95 text-lg font-semibold group">
                  <CheckCircle2 className="text-orange-400 mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  {item}
                </div>
              ))}

            </div>

            <Button 
              onClick={handleScrollToProducts}
              className="w-fit bg-orange-500 text-white font-black rounded-2xl px-10 py-7 text-lg 
                         hover:bg-orange-600 hover:scale-105 transition-all duration-300 
                         active:scale-95 shadow-[0_10px_20px_rgba(249,115,22,0.3)] group border-none"
            >
              <ShoppingCart className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Mulai Belanja Sekarang
            </Button>
          </div>
        </div>

        {/* Sisi Kanan: Visual Produk dengan Latar Belakang Bersih */}
        <div className="w-full md:w-[35%] h-[280px] md:h-auto bg-white relative p-10 flex items-center justify-center">
          {/* Dekorasi Bulat Oren di Belakang Gambar */}
          <div className="absolute w-40 h-40 bg-orange-100 rounded-full -bottom-10 -right-10 opacity-50"></div>
          <div className="absolute w-20 h-20 border-4 border-blue-100 rounded-full top-10 right-10 opacity-50"></div>
          
        </div>

      </div>
    </section>
  );
};

export default PaymentBanner;