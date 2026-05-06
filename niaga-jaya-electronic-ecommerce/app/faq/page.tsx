import React from 'react'
import Container from '@/components/ui/Container'
import { Title } from '@/components/ui/text'

const faqData = [
  {
    question: "Apakah produk di Niaga Jaya Electronic bergaransi?",
    answer: "Ya, semua produk elektronik yang kami jual adalah produk original dan memiliki garansi resmi dari produsen maupun garansi toko kami."
  },
  {
    question: "Bagaimana cara memesan produk di website ini?",
    answer: "Anda dapat memilih produk yang diinginkan, memasukkannya ke keranjang, dan melakukan checkout. Setelah itu, tim kami akan mengonfirmasi pesanan Anda melalui WhatsApp atau Email."
  },
  {
    question: "Berapa lama estimasi pengiriman?",
    answer: "Untuk wilayah Tangerang dan sekitarnya, pengiriman biasanya memakan waktu 1-2 hari kerja. Untuk luar kota, estimasi tergantung pada jasa kurir yang dipilih (biasanya 3-5 hari)."
  },
  {
    question: "Apakah bisa melakukan pembayaran di tempat (COD)?",
    answer: "Saat ini kami melayani pembayaran via transfer bank dan beberapa e-wallet. Untuk layanan COD, silakan hubungi admin WhatsApp kami terlebih dahulu untuk pengecekan area."
  },
  {
    question: "Bagaimana jika barang yang diterima rusak?",
    answer: "Segera hubungi layanan pelanggan kami dalam waktu maksimal 1x24 jam setelah barang diterima dengan melampirkan video unboxing untuk proses klaim garansi atau penggantian unit."
  }
];

const FAQPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <Container className="py-16 max-w-3xl">
        <div className="text-center mb-12">
          <Title className="text-3xl md:text-4xl font-bold mb-4">FAQ</Title>
          <p className="text-gray-500">Pertanyaan yang sering diajukan oleh pelanggan kami.</p>
        </div>

        <div className="flex flex-col gap-6">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-600 rounded-[32px] text-center text-white">
          <h2 className="text-xl font-bold mb-2">Masih punya pertanyaan lain?</h2>
          <p className="mb-6 opacity-90">Tim kami siap membantu Anda kapan saja.</p>
          <a 
            href="https://wa.me/6281319946436" 
            target="_blank" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </Container>
    </main>
  )
}

export default FAQPage