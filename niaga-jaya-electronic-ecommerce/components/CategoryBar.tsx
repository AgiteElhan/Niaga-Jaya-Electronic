import React from 'react';
import { 
  LayoutGrid, 
  WashingMachine, 
  Refrigerator, 
  Tv, 
  Wind, 
  Smartphone, 
  Speaker
} from 'lucide-react';

const categories = [
  { label: 'Semua', icon: LayoutGrid },
  { label: 'Mesin Cuci', icon: WashingMachine },
  { label: 'Kulkas', icon: Refrigerator },
  { label: 'Televisi', icon: Tv },
  { label: 'AC', icon: Wind },
  { label: 'Speaker', icon: Speaker },
];

const CategoryBar = () => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-6 scrollbar-hide">
      {categories.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 whitespace-nowrap shadow-sm"
          >
            <Icon 
              size={18} 
              className="text-slate-500 group-hover:text-blue-600 transition-colors" 
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBar;