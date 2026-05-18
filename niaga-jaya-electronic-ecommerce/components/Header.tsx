"use client";

import React from 'react';
import Container from './ui/Container';
import Logo from './logo';
import HeaderMenu from './ui/HeaderMenu';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import MobileMenu from './MobileMenu'; 
import SignIn from './SignIn';
import { Package } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b py-3 md:py-4 bg-white sticky top-0 z-50 shadow-sm">
      <Container className="flex flex-col gap-3 lg:gap-0">
        
        {/* BARIS UTAMA (Tampil di semua device) */}
        <div className="flex items-center justify-between w-full h-full gap-2">
          
          {/* KIRI: Menu Mobile & Logo */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <MobileMenu />
            <Logo />
          </div>

          {/* TENGAH (DESKTOP ONLY): Menu Navigasi Utama */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <HeaderMenu />
          </div>

          {/* TENGAH (DESKTOP ONLY): SearchBar menyatu di baris utama saat layar lebar */}
          <div className="hidden lg:block w-full max-w-md mx-4">
            <SearchBar />
          </div>

          {/* KANAN (ALL DEVICES): Kumpulan Ikon Aksi & Login */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            
            {/* Ikon Tracking Pesanan */}
            <Link 
              href="/orders" 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group relative"
            >
              <Package size={22} className="text-slate-700 group-hover:text-blue-600 md:w-6 md:h-6" />
              {/* Tooltip Desktop */}
              <span className="hidden md:block absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Pesanan Saya
              </span>
            </Link>

            {/* Ikon Keranjang */}
            <CartIcon />
            
            {/* Tombol Sign In / Profile */}
            <SignIn /> 
          </div>
        </div>

        {/* BARIS KEDUA (MOBILE & TABLET ONLY): SearchBar otomatis turun dan memanjang penuh */}
        <div className="block lg:hidden w-full px-1 pt-1">
          <SearchBar />
        </div>

      </Container>
    </header>
  );
};

export default Header;