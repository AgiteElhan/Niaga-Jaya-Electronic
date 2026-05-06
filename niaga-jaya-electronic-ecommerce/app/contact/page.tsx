import React from 'react'
import Container from '@/components/ui/Container'
import { Title } from '@/components/ui/text'
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react'

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-gray-50 border-b py-16 mb-12">
        <Container>
          <Title className="text-4xl font-bold mb-4">Contact Us</Title>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Punya pertanyaan mengenai spesifikasi produk atau ketersediaan stok distributor? 
            Tim Niaga Jaya Electronic siap membantu Anda melalui formulir di bawah ini atau kanal komunikasi resmi kami.
          </p>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Kunjungi Kami</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ps. Cikupa, Jl. Raya Serang No.KM 15, Cikupa, <br />
                  Kabupaten Tangerang, Banten 15710
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Hubungi Kami</h3>
                <p className="text-sm text-gray-600">0813-1994-6436</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Kami</h3>
                <p className="text-sm text-gray-600">elektronikniagajaya@gmail.com</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-100 shadow-sm mt-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3313361405!2d106.4996!3d-6.2201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMTIuNCJTIDEwNiwzMCcwMC4wIkU!5e0!3m2!1sid!2sid!4v1714640000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Kolom Kanan: Contact Form */}
          <div className="lg:col-span-2 bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Kirim Pesan</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Nomor WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="0812..."
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Subjek</label>
                <select className="p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option>Tanya Stok Produk</option>
                  <option>Klaim Garansi</option>
                  <option>Kerjasama Distributor</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Pesan Anda</label>
                <textarea 
                  rows={5}
                  placeholder="Tuliskan pesan Anda secara detail..."
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>

        </div>
      </Container>
    </main>
  )
}

export default ContactPage