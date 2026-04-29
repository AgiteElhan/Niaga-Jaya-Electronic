import { Heart } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const FavoriteButton = () => {
  return (
    <Link href='/wishlist' className='group relative inline-block p-2'>
        {/* Ikon Hati */}
        <Heart className='w-6 h-6 group-hover:text-red-500 transition-colors duration-300' />
        
        {/* Badge Jumlah Favorit */}
        <span className='absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
            0
        </span>
    </Link>
  )
}

export default FavoriteButton