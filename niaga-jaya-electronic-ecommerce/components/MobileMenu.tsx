"use client"

import React, { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'
import { headerData } from './constants/data'
import SocialMedia from './SocialMedia'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scrolling pada body saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Tombol Hamburger */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 
          PENGGUNAAN PORTAL MANUAL (Opsional) atau Z-INDEX TINGGI
          Kita gunakan fixed inset-0 dengan z-index yang lebih tinggi dari header (z-50)
      */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex">
          {/* Background Gelap (Overlay) - Menggunakan z-index tinggi agar menutupi header */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Konten Sidebar - Pastikan bg-white SOLID dan opacity-100 */}
          <div className="relative bg-white opacity-100 w-72 h-full p-6 shadow-2xl flex flex-col gap-8 animate-in slide-in-from-left duration-300 z-[1000]">
            
            {/* Header Sidebar */}
            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-bold text-xl text-blue-600">Niaga Jaya</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigasi Links */}
            <nav className="flex flex-col gap-5">
              {headerData?.map((item) => (
                <Link 
                  key={item.title} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors py-2"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Bagian Bawah */}
            <div className="mt-auto flex flex-col gap-4 border-t pt-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Hubungi Kami
              </p>
              
              <SocialMedia />

              <p className="text-[10px] text-gray-400 mt-2">
                © 2026 Niaga Jaya Electronic
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideMenu