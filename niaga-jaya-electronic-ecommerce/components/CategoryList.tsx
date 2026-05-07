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
  { label: 'Semua Produk', icon: LayoutGrid, color: 'bg-gray-100', text: 'text-gray-600', slug: 'all' },
  { label: 'Mesin Cuci', icon: WashingMachine, color: 'bg-blue-50', text: 'text-blue-600', slug: 'washing-machine' },
  { label: 'Kulkas', icon: Refrigerator, color: 'bg-cyan-50', text: 'text-cyan-600', slug: 'fridge' },
  { label: 'Televisi', icon: Tv, color: 'bg-indigo-50', text: 'text-indigo-600', slug: 'tv' },
  { label: 'AC', icon: Wind, color: 'bg-sky-50', text: 'text-sky-600', slug: 'ac' },
  { label: 'Gadget', icon: Smartphone, color: 'bg-purple-50', text: 'text-purple-600', slug: 'gadget' },
];

const CategoryList = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Kategori Pilihan</h2>
        <Link href="/shop" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
          Lihat Semua <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.label} 
              href={`/category/${item.slug}`}
              className="group flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className={`p-4 rounded-full ${item.color} ${item.text} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <span className="mt-4 text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryList;