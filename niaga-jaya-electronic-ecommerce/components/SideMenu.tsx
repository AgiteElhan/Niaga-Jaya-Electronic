"use client"

import React, { useState } from 'react'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'
import { headerData } from './constants/data' 
import Logo from './logo' 
import SocialMedia from './SocialMedia'
import { useOutsideClick } from "./hooks" // Sesuaikan path-nya

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      
      {/* Button buka menu */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 hover:bg-gray-100 rounded-md"
      >
        <Menu className="w-6 h-6" />
      </button>

 {isOpen && (
  <div className="fixed inset-0 z-[100] flex">

    {/* overlay */}
    <div 
      className="fixed inset-0 bg-black/60"
      onClick={() => setIsOpen(false)}
    />

    {/* sidebar */}
    <div className="relative bg-white w-72 h-screen flex flex-col p-6">

      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <Logo />
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>

      {/* nav */}
      <nav className="flex flex-col gap-2">
        {headerData?.map((item) => (
          <Link key={item.title} href={item.href}>
            {item.title}
          </Link>
        ))}
      </nav>


    </div>
  </div>
)}



    </div>
  )
}

export default SideMenu