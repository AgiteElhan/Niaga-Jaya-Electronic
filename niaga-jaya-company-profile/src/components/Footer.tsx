import React from 'react'

export default function Footer() {
  // Link Google Maps Toko Niaga Jaya
  const gmapsUrl = "https://maps.app.goo.gl/668vW93aeYRKN7Yw6?g_st=ac";

  return (
    <footer className="bg-white pt-10 pb-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Card Lokasi (CTA Section) */}
        <div className="bg-[#2563EB] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-lg mb-16 text-white relative overflow-hidden">
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="md:w-1/2 mb-8 md:mb-0 z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kunjungi Toko Fisik Kami</h2>
            <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-sm">
              Ps. Cikupa, di Jl. Raya Serang No.KM 15, Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten 15710
            </p>
          </div>
          
          <div className="md:w-1/3 w-full flex flex-col items-center z-10">
            {/* Gambar Map yang bisa di-klik */}
            <a 
              href={gmapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative bg-white rounded-2xl overflow-hidden w-full h-36 md:h-44 mb-4 shadow-xl group cursor-pointer border-2 border-white/20"
            >
               {/* Gunakan gambar screenshot maps toko anda di folder public */}
               <img 
                src="/maps.png" 
                alt="Lokasi Niaga Jaya di Google Maps" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               />
               {/* Overlay saat hover */}
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    Buka di Maps
                  </span>
               </div>
            </a>

            <a 
              href={gmapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#F97316] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg text-sm md:text-base"
            >
              📍 Cek Maps
            </a>
          </div>
        </div>

        {/* Link Footer Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-4">
          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-800">Hubungi Kami</h3>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="hover:text-blue-600 cursor-pointer flex items-center gap-2">
                📞 +62 812-xxxx-xxxx
              </li>
              <li className="hover:text-blue-600 cursor-pointer flex items-center gap-2">
                ✉️ support@niagajaya.com
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-800">Lokasi Toko</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pasar Cikupa, Tangerang.<br/>
              Buka Setiap Hari: 08.00 - 20.00 WIB
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-800">Layanan Pelanggan</h3>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Cara Pembelian</li>
              <li className="hover:text-blue-600 cursor-pointer">Ketentuan Garansi</li>
              <li className="hover:text-blue-600 cursor-pointer">Pertanyaan Umum (FAQ)</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © 2026 Niaga Jaya Electronic. All rights reserved.
        </div>
      </div>
    </footer>
  )
}