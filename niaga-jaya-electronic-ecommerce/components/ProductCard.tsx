import React from 'react';
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: any) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl border border-slate-100 p-3 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
        {/* Kontainer Gambar */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
          <Image
            src={product.image_url || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Info Produk */}
        <div className="mt-4 px-1">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
            {product.category || "Elektronik"}
          </p>
          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug min-h-[40px]">
            {product.name}
          </h3>
          
          <div className="mt-3 flex items-center justify-between">
            <p className="text-base font-bold text-slate-900">
              Rp {product.price ? product.price.toLocaleString('id-ID') : '0'}
            </p>
            {/* Tombol kecil tambahan biar kelihatan interaktif */}
            <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;