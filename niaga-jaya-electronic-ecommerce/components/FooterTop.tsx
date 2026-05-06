import React from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { Title } from './ui/text'

const FooterTop = () => {
  const contactInfo = [
    {   
      icon: <MapPin className="text-blue-600 size-5 sm:size-6" />,
      title: "Kunjungi Kami",
      detail: "Ps. Cikupa, Jl. Raya Serang No.KM 15, Cikupa, Kabupaten Tangerang, Banten 15710",
      link: "https://share.google/LSOEgEFshjmv1xIhw", // Link Maps yang kamu berikan
    },
    {
      icon: <Phone className="text-blue-600 size-5 sm:size-6" />,
      title: "Hubungi Kami ",
      detail: "0813-1994-6436",
    },
    {
      icon: <Clock className="text-blue-600 size-5 sm:size-6" />,
      title: "Jam",
      detail: "Senin-Minggu : 09:00 - 21:00",
    },
    {
      icon: <Mail className="text-blue-600 size-5 sm:size-6" />,
      title: "Email Kami",
      detail: "elektronikniagajaya@gmail.com",
    },
  ]

  return (
    <div className="bg-white border-t border-b border-gray-200 py-8 px-4 sm:px-6 md:px-12">
      {/* 
         grid-cols-2: Membuat 2 kolom di layar paling kecil (HP)
         md:grid-cols-4: Kembali jadi 4 kolom di layar tablet ke atas
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {contactInfo.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-2 group"
          >
            {/* Ukuran box ikon disesuaikan agar pas di 2 kolom */}
            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg shrink-0 group-hover:bg-blue-100 transition-colors">
              {item.icon}
            </div>

            <div className="flex flex-col gap-0.5 overflow-hidden">
              <Title className="text-sm sm:text-base font-bold text-gray-800 truncate">
                {item.title}
              </Title>
              <p className="text-gray-600 text-[10px] sm:text-sm leading-tight break-words sm:break-normal">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FooterTop