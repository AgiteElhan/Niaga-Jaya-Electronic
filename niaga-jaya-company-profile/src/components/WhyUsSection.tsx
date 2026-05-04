const reasons = [
  {
    icon: "🏪",
    title: "Ambil Langsung di Toko",
    desc: "Cek barang secara langsung di toko kami, tanjakan kami!",
    action: {
      label: "📍 Toko Maps Kami",
      href: "https://maps.app.goo.gl/668vW93aeYRKN7Yw6",
    },
    color: "bg-[#FFF7ED]",
    iconBg: "bg-[#F97316]",
  },
  {
    icon: "🛵",
    title: "Pengiriman Kurir Toko",
    desc: "Cepat diantar oleh kurir yang sama, dan nikmati produk gratis ongkir oleh teknisi toko kami!",
    action: {
      label: "Cek Ongkir (WhatsApp)",
      href: "https://wa.me/6281585692357?text=Halo%2C%20saya%20ingin%20cek%20ongkir",
    },
    color: "bg-[#EFF6FF]",
    iconBg: "bg-[#2563EB]",
  },
  {
    icon: "🛡️",
    title: "Garansi Terjamin",
    desc: "Garansi Resmi Merk + Jaminan kepuasan pelanggan kami.",
    action: {
      label: "Tanya (WhatsApp)",
      href: "https://wa.me/6281585692357?text=Halo%2C%20saya%20ingin%20tanya%20garansi",
    },
    color: "bg-[#FEFCE8]",
    iconBg: "bg-[#EAB308]",
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-16 overflow-hidden">
      {/* Heading */}
      <div 
        className="text-center mb-12"
        data-aos="fade-up" // Heading muncul dari bawah
      >
        <p className="text-gray-400 text-sm mb-2">
          Layanan Unggulan Niaga Jaya Electronic
        </p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          Kenapa Harus di Toko Kami?
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((r, index) => (
          <div
            key={r.title}
            data-aos="fade-up" // Kartu muncul dari bawah
            data-aos-delay={index * 200} // Muncul bergantian (0ms, 200ms, 400ms)
            className={`${r.color} rounded-3xl p-6 flex flex-col items-center text-center gap-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-2 duration-300`}
          >
            {/* Icon */}
            <div
              className={`w-16 h-16 ${r.iconBg} rounded-2xl flex items-center justify-center text-3xl shadow-md`}
              data-aos="zoom-in" // Efek zoom khusus untuk icon
              data-aos-delay={(index * 200) + 300} // Icon muncul setelah kartu
            >
              {r.icon}
            </div>

            <h3 className="font-bold text-gray-800 text-base">{r.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>

            <a
              href={r.action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-auto ${r.iconBg} text-white text-xs font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity active:scale-95`}
            >
              {r.action.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}