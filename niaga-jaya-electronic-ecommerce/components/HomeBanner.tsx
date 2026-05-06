import React from 'react'
import { Title } from './ui/text'
import { Button } from './ui/button'
import Kipas from "@/images/products/electronic-groups.png"

const HomeBanner = () => {
  return (
    <div className="relative overflow-hidden bg-[#0052CC] bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 rounded-2xl md:rounded-[40px] px-5 py-6 md:px-16 md:py-14 flex flex-row items-center justify-between min-h-[200px] md:min-h-[360px] shadow-2xl border border-white/10">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }}
      ></div>

      {/* Glow Ornaments */}
      <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/10 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]"></div>

      {/* --- CONTENT AREA (RATA KIRI & RESPONSIVE) --- */}
      <div className="flex-1 flex flex-col gap-2 md:gap-6 z-20 text-left items-start pr-2">
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[9px] md:text-xs font-bold text-white uppercase tracking-widest">Pilihan Keluarga</span>
        </div>

        <Title className="text-white text-xl md:text-5xl font-extrabold leading-[1.15] tracking-tight drop-shadow-md">
          Elektronik Terbaik <br />
          <span className="text-blue-200">Untuk Rumah Anda</span>
        </Title>
        
        <p className="text-blue-50/90 text-[10px] md:text-lg max-w-[170px] md:max-w-md leading-relaxed font-medium">
          Produk pilihan berkualitas tinggi dari Niaga Jaya Electronic.
        </p>

        <div className="mt-2 md:mt-4">
          <Button 
            className="bg-white text-[#0052CC] hover:bg-blue-50 border-none shadow-lg font-bold h-8 md:h-14 px-5 md:px-10 rounded-xl md:rounded-2xl text-[10px] md:text-base transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Lihat Koleksi
          </Button>
        </div>
      </div>


<div className="relative z-10 flex justify-center items-center w-[45%] md:w-[40%] h-full pr-4 md:pr-0">
  
  {/* Glow di belakang tetap di tengah kontainer gambar */}
  <div className="absolute w-28 h-28 md:w-80 md:h-80 bg-white/20 rounded-full blur-[40px] md:blur-[100px]"></div>
  
  <div className="relative w-full h-28 md:h-80 flex justify-center items-center">
    <img 
      src={typeof Kipas === 'string' ? Kipas : Kipas.src} 
      alt="Niaga Jaya Collection"
      /* 
         - scale-[1.6] diturunkan sedikit dari 1.7 agar tidak menabrak batas.
         - translate-x-[-10px] (opsional) untuk sedikit menggeser gambar ke arah kiri (menjauhi pinggir kanan).
      */
      className="object-contain max-h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transform scale-[1.5] md:scale-[1.6] transition-all duration-500"
    />
  </div>
</div>

    </div>
  )
}

export default HomeBanner