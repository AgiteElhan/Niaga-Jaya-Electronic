"use client"
import { headerData } from '../constants/data'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation' // Tambahkan import ini

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {headerData?.map((item) => {
        // Cek apakah link ini adalah halaman yang sedang aktif
        const isActive = pathname === item?.href;

        return (
          <Link 
            key={item?.title} 
            href={item?.href} 
            className={cn(
              "text-sm font-normal hoverEffect relative group py-1",
              isActive && "text-[var(--color-shop_primary_blue)]" // Teks jadi biru jika aktif
            )}
          >
            {item?.title}
            
            {/* Garis Bawah: muncul saat hover ATAU saat link aktif */}
            <span className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-[var(--color-shop_primary_blue)] transition-all duration-300 group-hover:w-full",
              isActive ? "w-full" : "w-0"
            )} />
          </Link>
        );
      })}
    </nav>
  )
}

export default HeaderMenu