import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2 hover:shadow-lg transition-all group"
      data-aos="fade-up" // Kartu muncul dari bawah
      data-aos-duration="600"
    >
      <div className="relative aspect-square bg-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Gambar diambil dari storage Laravel */}
        <img 
          src={product.gambar_url} 
          alt={product.nama_produk} 
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          data-aos="zoom-in" // Gambar sedikit nge-zoom saat kartu muncul
          data-aos-delay="200"
        />
        
        {/* <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button> */}
      </div>
      
      <div className="mt-2 flex-1">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
          {product.nama_produk}
        </h3>
        <div className="flex items-center gap-1 text-xs text-orange-400 mt-1">
          <span>★ 4.9</span>
          <span className="text-gray-400">(554)</span>
        </div>
        <div className="mt-2">
            <p className="text-[#B91C1C] font-bold text-lg">
              {/* Menggunakan Intl.NumberFormat agar lebih stabil di berbagai browser */}
              Rp {new Intl.NumberFormat('id-ID').format(Number(product.harga_jual))}
            </p>
            
            {product.harga_discount && (
              <p className="text-xs text-gray-400 line-through">
                Rp {new Intl.NumberFormat('id-ID').format(Number(product.harga_discount))}
              </p>
            )}
          </div>
      </div>
    </div>
  );
}