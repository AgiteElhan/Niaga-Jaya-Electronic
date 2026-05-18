// components/Header.tsx
import React from 'react'
import Container from './ui/Container'
import Logo from './logo'
import HeaderMenu from './ui/HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
// import { FavoriteNav } from './FavoriteNav'
import MobileMenu from './MobileMenu' 
import SignIn from './SignIn'
import { Package } from 'lucide-react' // Tambahkan ini
import Link from 'next/link' // Tambahkan ini

const Header = async () => {
  return (
    <header className="border-b py-4 bg-white sticky top-0 z-50">
      <Container className="flex items-center justify-between h-full gap-2 md:gap-4">
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <MobileMenu />
          <Logo />
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <HeaderMenu />
        </div>

        <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
          <SearchBar />
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* IKON TRACKING BARU */}
            <Link 
              href="/orders" 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group relative"
            >
              <Package size={24} className="text-slate-700 group-hover:text-blue-600" />
              {/* Tooltip sederhana */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Pesanan Saya
              </span>
            </Link>

            {/* <FavoriteNav /> */}
            <CartIcon />
            <SignIn /> 
          </div>
        </div>

      </Container>
    </header>
  );
};

export default Header;