import React from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/ui/Container";

const EmptyCart = () => {
  return (
    <Container className="py-12 min-h-[70vh]">
      {/* Tombol Back & Judul Halaman - Disamakan dengan Wishlist */}
      <div className="flex flex-col gap-2 mb-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Kembali Belanja
        </Link>
        <h1 className="text-4xl font-black text-slate-900 ">
          Keranjang 🛒
        </h1>
      </div>

      {/* Kontainer Empty State dengan Border Dotted */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[50px] py-24 px-6 text-center bg-white">
        <div className="bg-slate-50 p-10 rounded-full mb-8">
          <ShoppingBag size={80} className="text-slate-200 stroke-[1.5]" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
          Keranjangmu masih sepi...
        </h2>
        
        <p className="text-slate-500 mb-10 max-w-sm leading-relaxed font-medium">
          Sepertinya kamu belum memilih produk impian. 
          Ayo jelajahi katalog Niaga Jaya sekarang!
        </p>
        
        <Link href="/">
          <Button 
            size="lg" 
            className="rounded-2xl px-10 py-6 text-sm font-black bg-blue-600 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 uppercase tracking-wider"
          >
            Mulai Belanja Sekarang
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default EmptyCart;