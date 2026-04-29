// components/Header.tsx
import React from 'react'
import Container from './ui/Container'
import Logo from './logo'
import HeaderMenu from './ui/HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import MobileMenu from './MobileMenu' 
import SignIn from './SignIn' // Cukup panggil komponen ini
import { currentUser } from '@clerk/nextjs/server'

const Header = async () => {
  const user = await currentUser(); // Tetap bisa ambil data user di sini kalau butuh

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
            <FavoriteButton />
            <CartIcon />
            {/* Login diproses di dalam komponen ini */}
            <SignIn /> 
          </div>
        </div>

      </Container>
    </header>
  );
};

export default Header;