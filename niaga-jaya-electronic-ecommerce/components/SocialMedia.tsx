import React from 'react'
import Image from 'next/image'

const socialLinks = [
  {
    title: "Gmail",
    href: "mailto:elektronikniagajaya@gmail.com",
    src: "/Icons/Gmail.svg",
  },
  {
    title: "Shopee",
    href: "https://shopee.co.id",
    src: "/Icons/Shopee.svg",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/6281319946436",
    src: "/Icons/Whatsapp.svg",
  },
]

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((item) => (
        <a 
          key={item.title} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          /* 
            w-10 h-10: Membuat ukuran container sama (kotak)
            border: Menambahkan garis pinggir
            rounded-full: Membuat garis pinggir menjadi bulat sempurna
            flex items-center justify-center: Memastikan ikon tepat di tengah bulatannya
          */
          className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:bg-blue-50 active:scale-90"
        >
          <Image 
            src={item.src} 
            alt={item.title} 
            width={20} 
            height={20} 
            className="object-contain"
          />
        </a>
      ))}
    </div>
  )
}

export default SocialMedia