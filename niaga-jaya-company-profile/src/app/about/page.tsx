import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Niaga Jaya Electronic",
  description:
    "Kenali lebih jauh tentang Niaga Jaya Electronic, toko elektronik terpercaya di Tangerang.",
};

const stats = [
  { number: "10+", label: "Tahun Pengalaman" },
  { number: "500+", label: "Produk Tersedia" },
  { number: "2K+", label: "Pelanggan Puas" },
  { number: "100%", label: "Bergaransi Resmi" },
];

const values = [
  {
    icon: "🤝",
    title: "Kepercayaan",
    desc: "Kami membangun hubungan jangka panjang dengan pelanggan berdasarkan kejujuran dan transparansi dalam setiap transaksi.",
  },
  {
    icon: "⭐",
    title: "Kualitas",
    desc: "Semua produk yang kami jual adalah barang original bergaransi resmi dari brand ternama, bukan KW atau tiruan.",
  },
  {
    icon: "🚀",
    title: "Pelayanan Cepat",
    desc: "Dari pembelian hingga instalasi, kami pastikan prosesnya cepat, mudah, dan tidak mempersulit pelanggan.",
  },
  {
    icon: "💰",
    title: "Harga Bersaing",
    desc: "Kami menawarkan harga terbaik di kelasnya dengan berbagai pilihan cicilan bunga rendah yang terjangkau.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "Awal Berdiri",
    desc: "Niaga Jaya Electronic pertama kali dibuka sebagai toko kecil di Pasar Cikupa, Tangerang.",
  },
  {
    year: "2017",
    title: "Ekspansi Produk",
    desc: "Memperluas jenis produk dari hanya elektronik rumah tangga menjadi mencakup aksesoris dan gadget.",
  },
  {
    year: "2020",
    title: "Layanan Pengiriman",
    desc: "Mulai membuka layanan pengiriman kurir toko ke seluruh wilayah Tangerang dan sekitarnya.",
  },
  {
    year: "2023",
    title: "Platform Digital",
    desc: "Meluncurkan platform E-Commerce untuk mempermudah pelanggan berbelanja secara online.",
  },
];

export default function AboutPage() {
  const phone = "6281585692357";
  const gmapsUrl = "https://maps.app.goo.gl/668vW93aeYRKN7Yw6";

  return (
    <main className="min-h-screen bg-white">
      {/* ── 1. HERO ABOUT ── */}
      <section className="bg-gradient-to-br from-[#EEF2FF] to-[#F0F9FF] py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Tentang Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Toko Elektronik Terpercaya <br className="hidden md:block" />
            <span className="text-[#2563EB]">di Tangerang</span> Sejak 2014
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Niaga Jaya Electronic hadir untuk memenuhi kebutuhan elektronik
            rumah tangga Anda dengan produk original bergaransi, harga bersaing,
            dan pelayanan yang ramah.
          </p>
        </div>
      </section>

      {/* ── 2. STORY ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Gambar toko */}
          <div className="md:w-1/2 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#EEF2FF] h-72 md:h-96">
              <img
                src="/assets/toko.webp"
                alt="Toko Niaga Jaya Electronic"
                className="w-full h-full object-cover"
                
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs text-gray-400 font-medium">
                  Berdiri sejak
                </p>
                <p className="text-2xl font-extrabold text-[#2563EB]">2014</p>
              </div>
            </div>
          </div>

          {/* Teks cerita */}
          <div className="md:w-1/2 space-y-5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Cerita di Balik <span className="text-[#2563EB]">Niaga Jaya</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Berawal dari toko kecil di Pasar Cikupa, Tangerang, Niaga Jaya
              Electronic didirikan dengan satu misi sederhana — membantu
              masyarakat mendapatkan produk elektronik berkualitas dengan harga
              yang adil.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Selama lebih dari 10 tahun, kami telah melayani ribuan pelanggan
              dari berbagai wilayah Tangerang dan sekitarnya. Kepercayaan
              pelanggan adalah aset terbesar kami yang terus kami jaga setiap
              harinya.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Kini kami hadir secara digital agar semakin banyak keluarga
              Indonesia bisa menikmati kemudahan berbelanja elektronik original
              dengan layanan instalasi gratis dan pengiriman cepat.
            </p>
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              📍 Kunjungi Toko Kami
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section className="bg-[#2563EB] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl md:text-5xl font-extrabold">
                  {s.number}
                </p>
                <p className="text-sm md:text-base opacity-80 mt-2 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VISI & MISI ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Visi & Misi Kami
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Landasan kami dalam melayani setiap pelanggan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi */}
          <div className="bg-[#EEF2FF] rounded-3xl p-8 border border-blue-100">
            <div className="w-12 h-12 bg-[#2563EB] rounded-2xl flex items-center justify-center text-2xl mb-5 shadow">
              🎯
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Visi</h3>
            <p className="text-gray-500 leading-relaxed">
              Menjadi toko elektronik terpercaya dan terlengkap di wilayah
              Tangerang yang dikenal karena kualitas produk, kejujuran harga,
              dan pelayanan purna jual yang memuaskan.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-[#FFF7ED] rounded-3xl p-8 border border-orange-100">
            <div className="w-12 h-12 bg-[#F97316] rounded-2xl flex items-center justify-center text-2xl mb-5 shadow">
              📋
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Misi</h3>
            <ul className="text-gray-500 leading-relaxed space-y-2">
              {[
                "Menyediakan produk elektronik original bergaransi resmi",
                "Memberikan harga terbaik dengan pilihan cicilan ringan",
                "Melayani dengan cepat, ramah, dan profesional",
                "Menghadirkan layanan instalasi gratis ke rumah pelanggan",
                "Terus berinovasi melalui platform digital yang mudah diakses",
              ].map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="text-[#F97316] mt-1 flex-shrink-0">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. NILAI PERUSAHAAN ── */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Nilai yang Kami Pegang
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Prinsip yang kami terapkan setiap hari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-extrabold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MILESTONE / PERJALANAN ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Perjalanan Kami
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Dari toko kecil hingga platform digital
          </p>
        </div>

        <div className="relative">
          {/* Garis tengah (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Konten */}
                <div className="md:w-[45%] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="inline-block bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {m.year}
                  </span>
                  <h3 className="font-extrabold text-gray-800 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                {/* Titik tengah */}
                <div className="hidden md:flex w-[10%] justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#2563EB] border-4 border-white shadow-md z-10" />
                </div>

                {/* Spacer sisi lain */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="bg-[#2563EB] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            Siap Berbelanja Bersama Kami?
          </h2>
          <p className="opacity-80 mb-8 text-base md:text-lg max-w-xl mx-auto">
            Temukan produk elektronik terbaik untuk hunian Anda. Hubungi kami
            sekarang atau kunjungi toko kami langsung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${phone}?text=Halo%20Niaga%20Jaya%2C%20saya%20ingin%20bertanya%20tentang%20produk`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#2563EB] font-bold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-all shadow-lg active:scale-95"
            >
              💬 Chat WhatsApp
            </a>
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F97316] text-white font-bold px-8 py-3.5 rounded-full hover:bg-orange-600 transition-all shadow-lg active:scale-95"
            >
              📍 Kunjungi Toko
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
