"use client" // Wajib karena kita menggunakan state dan event click

import React, { useState } from 'react'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'
import { headerData } from './constants/data' // Pastikan path ini benar
import SocialMedia from './SocialMedia'
const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Tombol Hamburger untuk membuka menu */}
      <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Background Gelap (Overlay) */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Konten Sidebar */}
          <div className="relative bg-white w-72 h-full p-6 shadow-2xl flex flex-col gap-8 animate-in slide-in-from-left duration-300">
            {/* Header Sidebar */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl text-[var(--color-shop_primary_blue)]">Niaga Jaya</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

          {/* ... Bagian Navigasi Links ... */}
          <nav className="flex flex-col gap-5">
            {headerData?.map((item) => (
              <Link 
                key={item.title} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-[var(--color-shop_primary_blue)] transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Bagian Social Media di bawah Header Data */}
          <div className="mt-auto flex flex-col gap-4 border-t pt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Hubungi Kami
            </p>
            
            {/* Komponen Social Media dengan Hover yang sudah diupdate */}
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