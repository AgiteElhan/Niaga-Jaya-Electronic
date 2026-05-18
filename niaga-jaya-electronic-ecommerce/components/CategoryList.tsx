import React from 'react';
import { 
  LayoutGrid, 
  WashingMachine, 
  Refrigerator, 
  Tv, 
  Wind, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { label: 'Semua Produk', icon: LayoutGrid, color: 'bg-gray-100', text: 'text-gray-600' },
  { label: 'Mesin Cuci', icon: WashingMachine, color: 'bg-blue-50', text: 'text-blue-600' },
  { label: 'Kulkas', icon: Refrigerator, color: 'bg-cyan-50', text: 'text-cyan-600' },
  { label: 'Televisi', icon: Tv, color: 'bg-indigo-50', text: 'text-indigo-600' },
  { label: 'AC', icon: Wind, color: 'bg-sky-50', text: 'text-sky-600' },
  { label: 'Gadget', icon: Smartphone, color: 'bg-purple-50', text: 'text-purple-600' },
];

const CategoryList = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Kategori Pilihan</h2>
        {/* Tombol Lihat Semua tetap dibiarkan aktif agar user bisa menuju ke halaman shop */}
        <Link href="/shop" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
          Lihat Semua <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            // 1. UBAH: Tag <Link> diganti menjadi <div> murni agar tidak meredirect halaman
            // 2. UBAH: Efek hover interaktif dibersihkan agar kursor default (bukan tangan penunjuk)
            <div 
              key={item.label} 
              className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white select-none cursor-default shadow-sm"
            >
              {/* Box Ikon Kategori */}
              <div className={`p-4 rounded-full ${item.color} ${item.text}`}>
                <Icon size={32} strokeWidth={1.5} />
              </div>
              
              {/* Teks Label Kategori */}
              <span className="mt-4 text-sm font-semibold text-slate-700">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryList;