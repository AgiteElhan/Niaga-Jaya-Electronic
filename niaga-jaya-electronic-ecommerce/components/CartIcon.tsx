"use client";

import { ShoppingBag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

// 1. IMPORT HOOK CLERK UNTUK MENGECEK STATUS LOGOUT/LOGIN
import { useUser } from '@clerk/nextjs';

const CartIcon = () => {
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  // 2. AMBIL STATUS SIGN-IN DARI CLERK
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. LOGIKA DINAMIS: Jika user belum login, paksa total item jadi 0
  const totalItems = isSignedIn && isLoaded
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  // Mencegah Hydration Error
  if (!mounted || !isLoaded) {
    return (
      <Link href='/cart' className='group relative inline-block p-2'>
        <ShoppingBag className='w-6 h-6 group-hover:text-blue-600 transition-colors duration-300' />
      </Link>
    );
  }

  return (
    <Link href='/cart' className='group relative inline-block p-2'>
        {/* Ikon Tas Belanja */}
        <ShoppingBag className='w-6 h-6 group-hover:text-blue-600 transition-colors duration-300' />
        
        {/* Badge: Cuma muncul kalau totalItems lebih besar dari 0 */}
        {totalItems > 0 && (
          <span className='absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-300'>
              {totalItems}
          </span>
        )}
    </Link>
  );
};

export default CartIcon;