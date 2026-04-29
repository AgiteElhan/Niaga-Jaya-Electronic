import { cn } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link 
      href="/" 
      className={cn("flex items-center group hoverEffect", className)}
    >
      {/* Tambahkan text-inherit di sini */}
      <h2 className="text-xl font-bold text-inherit">
        Niaga Jaya
        <span className="text-[var(--color-shop_orange)]">.</span>
      </h2>
    </Link>
  );
};


export default Logo