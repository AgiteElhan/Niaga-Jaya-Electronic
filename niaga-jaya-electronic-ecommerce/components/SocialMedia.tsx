import React from 'react'
import Image from 'next/image'

const socialLinks = [
  {
    title: "Tokopedia",
    href: "https://tokopedia.com", // Ganti link toko Niaga Jaya
    src: "/Icons/Tokopedia.svg",
  },
  {
    title: "Shopee",
    href: "https://shopee.co.id", // Ganti link toko Niaga Jaya
    src: "/Icons/Shopee.svg",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/6281319946436", // Ganti nomor WA Niaga Jaya
    src: "/Icons/Whatsapp.svg",
  },
]

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((item) => (
        <a 
          key={item.title} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          // Efek Hover: Membesar (scale), transisi halus, dan sedikit lebih terang
          className="transition-all duration-300 hover:scale-125 hover:brightness-110 active:scale-90"
        >
          <Image 
            src={item.src} 
            alt={item.title} 
            width={30} 
            height={30} 
            className="object-contain"
          />
        </a>
      ))}
    </div>
  )
}

export default SocialMedia