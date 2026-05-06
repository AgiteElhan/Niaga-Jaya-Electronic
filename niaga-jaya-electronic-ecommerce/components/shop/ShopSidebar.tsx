"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = ["Mesin Cuci", "Kulkas", "TV", "AC", "Microwave"];
const priceRanges = [
  { label: "Di bawah Rp 2jt", id: "p1" },
  { label: "Rp 2jt - Rp 5jt", id: "p2" },
  { label: "Rp 5jt - Rp 10jt", id: "p3" },
  { label: "Di atas Rp 10jt", id: "p4" },
];

const ShopSidebar = () => {
  return (
    <aside className="space-y-8 pr-2">
      {/* Kategori */}
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Kategori</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox id={cat} className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <Label htmlFor={cat} className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Harga (Sekarang pakai Checkbox) */}
      <div className="pt-8 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Rentang Harga</h3>
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox id={range.id} className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <Label htmlFor={range.id} className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;