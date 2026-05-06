import React from 'react'
import Container from '@/components/ui/Container'
import { Title } from '@/components/ui/text'

const PrivacyPolicyPage = () => {
  const lastUpdated = "2 Mei 2026"; // Berdasarkan tanggal saat ini

  return (
    <main className="bg-white min-h-screen">
      <Container className="py-16 max-w-4xl">
        {/* Header Halaman */}
        <div className="text-center mb-12 border-b border-gray-100 pb-8 mb-10">
          <Title className="text-3xl md:text-4xl font-bold text-black mb-4">
            Kebijakan Privasi
          </Title>
          <p className="text-gray-500 text-sm italic">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>
        
        {/* Konten Kebijakan */}
        <div className="flex flex-col gap-10 text-gray-600 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Niaga Jaya Electronic mengumpulkan informasi identitas pribadi saat Anda melakukan pemesanan, 
              mendaftar akun, atau menghubungi layanan pelanggan kami. Informasi ini meliputi nama lengkap, 
              alamat pengiriman, nomor telepon/WhatsApp, dan alamat email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              2. Penggunaan Informasi Anda
            </h2>
            <p>Informasi yang kami kumpulkan dari Anda dapat digunakan untuk:</p>
            <ul className="list-disc ml-6 mt-3 flex flex-col gap-2">
              <li>Memproses transaksi dan mengirimkan pesanan produk elektronik ke alamat Anda.</li>
              <li>Menghubungi Anda terkait status pengiriman atau konfirmasi pesanan.</li>
              <li>Memberikan bantuan teknis atau layanan purna jual untuk produk yang Anda beli.</li>
              <li>Meningkatkan pengalaman berbelanja di platform Niaga Jaya Electronic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              3. Perlindungan Data
            </h2>
            <p>
              Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. 
              Data Anda tidak akan dijual, dipertukarkan, atau diberikan kepada perusahaan lain dengan alasan apa pun, 
              kecuali untuk keperluan pengiriman barang oleh kurir rekanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              4. Kontak Kami
            </h2>
            <p className="mb-4">
              Jika ada pertanyaan mengenai kebijakan privasi ini, Anda dapat menghubungi kami melalui:
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-2 shadow-sm">
              <p><span className="font-semibold text-blue-600">Email:</span> elektronikniagajaya@gmail.com</p>
              <p><span className="font-semibold text-blue-600">WhatsApp:</span> +62 813 1994 6436</p>
              <p><span className="font-semibold text-blue-600">Alamat:</span> Jl. Raya Global No. 123, Tangerang</p>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-2xl">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Dengan terus menggunakan situs Niaga Jaya Electronic, Anda dianggap telah menyetujui 
              Kebijakan Privasi ini.
            </p>
          </section>

        </div>
      </Container>
    </main>
  )
}

export default PrivacyPolicyPage