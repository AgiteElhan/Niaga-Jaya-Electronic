import React from 'react'
import Container from './ui/Container'
import FooterTop from './FooterTop'
import { Title } from './ui/text'
import Link from 'next/link'
import SocialMedia from './SocialMedia'
import { headerData } from './constants/data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* --- ORNAMEN BULAT (BOKEH) --- */}
      <div className="absolute top-0 right-[-5%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-blue-100/50 rounded-full blur-[100px] -z-10"></div>
      
      {/* 1. Informasi Alamat, Telepon, & Jam Kerja */}
      <FooterTop />

      {/* --- PATTERN WAVE (SVG) --- */}
      {/* Wave ini diletakkan di atas container utama */}
      <div className="w-full rotate-180 leading-[0] opacity-[0.03] absolute top-0 left-0 -z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0052CC"></path>
        </svg>
      </div>

      <Container className="py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Kolom 1: About */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Title className="text-xl font-bold">About Us</Title>
              <p className="text-gray-600 text-sm leading-relaxed">
                Niaga Jaya Electronic adalah pusat perlengkapan elektronik rumah tangga dan kantor terpercaya. Kami berkomitmen menyediakan produk berkualitas dengan harga distributor.
              </p>
            </div>
            <SocialMedia />
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <Title className="text-xl font-bold">Quick Links</Title>
            <ul className="flex flex-col gap-2">
              {headerData?.map((item) => (
                <li key={item?.title}>
                  <Link 
                    href={item?.href} 
                    className="text-gray-600 hover:text-blue-600 text-sm transition-all duration-300 flex items-center hover:translate-x-1"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Customer Service (Opsional/Tambahan agar Grid Seimbang) */}
          <div className="flex flex-col gap-4">
            <Title className="text-xl font-bold">Layanan</Title>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <li>Syarat & Ketentuan</li>
              {/* Di bagian Quick Links atau Layanan */}
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-blue-600 text-sm transition-all duration-300 flex items-center hover:translate-x-1"
                  >
                    Kebijakan Privasi
                  </Link>
                </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-blue-600 text-sm transition-all duration-300 flex items-center hover:translate-x-1"
                >
                  Bantuan & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Contact Us */}
          <div className="flex flex-col gap-4">
            <Title className="text-xl font-bold">Contact Us</Title>
            <div className="text-gray-600 text-sm flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-blue-600">Email:</span> elektronikniagajaya@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-blue-600">Phone:</span> +62 813 1994 6436
              </p>
              <p className="flex items-start">
                <span className="font-semibold text-blue-600">Address:  </span> Niaga Jaya Elektronik Pasar Cikupa, Ps. Cikupa, di Jl. Raya Serang No.KM 15, Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten 15710
              </p>
            </div>
          </div>

        </div>

        {/* Baris Bawah: Copyright */}
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Niaga Jaya Electronic. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer