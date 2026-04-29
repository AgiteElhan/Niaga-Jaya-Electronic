import { ShoppingBag } from 'lucide-react'
import React from 'react'
import Link from 'next/link' // Gunakan Link dari next/link, bukan lucide

const CartIcon = () => {
  return (
    <Link href='/cart' className='group relative inline-block p-2'>
        {/* Ikon Tas Belanja */}
        <ShoppingBag className='w-6 h-6 group-hover:text-[var(--color-shop_primary_blue)] transition-colors duration-300' />
        
        {/* Badge Jumlah Barang (Counter) */}
        <span className='absolute top-0 right-0 bg-[var(--color-shop_primary_blue)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
            0
        </span>
    </Link>
  )
}

export default CartIcon