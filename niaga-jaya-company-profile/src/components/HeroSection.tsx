"use client";

const features = [
  {
    icon: "🔧",
    title: "Instalasi Produk Gratis Non Biaya!",
    desc: "Teknisi kami siap membantu instalasi di rumah Anda tanpa biaya tambahan.",
  },
  {
    icon: "🚚",
    title: "Pengiriman Cepat di Hari yang Sama",
    desc: "Pesan sebelum jam 12 siang, barang sampai hari itu juga.",
  },
  {
    icon: "💳",
    title: "Tersedia Pembayaran Cicilan Bunga Rendah!",
    desc: "Nikmati cicilan ringan dengan bunga rendah bersama mitra kami.",
  },
];

export default function HeroSection() {
  const phone = "6281585692357";

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#EEF2FF] to-[#F0F9FF] pt-10 pb-0"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12">
          {/* Left: Text */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Elektronik Original &{" "}
              <span className="text-[#2563EB]">Bergaransi</span> untuk Hunian
              Nyaman
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Niaga Jaya Elektronik — Pilihan Terbaik Anda Untuk kepercayaan
              Semua Keluarga
            </p>
            <a
              href={`https://wa.me/${phone}?text=Halo%20Niaga%20Jaya%2C%20saya%20ingin%20melakukan%20pemesanan`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              Beli Sekarang
            </a>
          </div>

        {/* Right: Product Image — 2 gambar overlap */}
          <div className="md:w-1/2 flex justify-center">

            <div className="relative w-[380px] h-[320px]">
              {/* Gambar TV — di belakang, posisi kiri bawah */}
              <img
                src="/assets/tv.webp"
                alt="Televisi"
                className="absolute bottom-0 left-0 w-[260px] drop-shadow-xl z-10"
              />

              {/* Gambar Setrika — di depan, posisi kanan atas, sedikit miring */}
              <img
                src="/assets/setrika.webp"
                alt="Setrika"
                className="absolute bottom-0 left-50 w-[200px] drop-shadow-xl z-20 "
              />
            </div>

          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-lg flex-shrink-0 shadow">
                {f.icon}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm leading-snug">
                  {f.title}
                </p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
