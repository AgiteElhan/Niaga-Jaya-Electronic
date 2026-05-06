import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmptyCart = () => {
  return (
    // min-h-[70vh] memaksa konten mengambil 70% tinggi layar agar Footer terdorong ke bawah
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in duration-500">
      <div className="bg-slate-50 p-12 rounded-full mb-8 shadow-inner">
        <ShoppingBag size={100} className="text-slate-300 stroke-[1]" />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">
        Keranjangmu Kosong
      </h2>
      
      <p className="text-slate-500 mb-10 max-w-sm leading-relaxed text-lg">
        Sepertinya kamu belum memilih elektronik impianmu di Niaga Jaya. 
        Yuk, cek koleksi terbaru kami!
      </p>
      
      <Link href="/">
        <Button size="lg" className="rounded-full px-12 py-7 text-lg font-bold bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all shadow-xl shadow-blue-100">
          Mulai Belanja Sekarang
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;