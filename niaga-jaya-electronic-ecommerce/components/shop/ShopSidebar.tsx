"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const priceRanges = [
  { label: "Di bawah Rp 2jt", id: "p1", min: 0, max: 2000000 },
  { label: "Rp 2jt - Rp 5jt", id: "p2", min: 2000000, max: 5000000 },
  { label: "Rp 5jt - Rp 10jt", id: "p3", min: 5000000, max: 10000000 },
  { label: "Di atas Rp 10jt", id: "p4", min: 10000000, max: 999999999 },
];

interface Kategori {
  id: number;
  nama_kategori: string;
}

interface ShopSidebarProps {
  onCategoryChange: (ids: number[]) => void;
  onPriceChange: (range: { min: number; max: number } | null) => void;
}

const ShopSidebar = ({ onCategoryChange, onPriceChange }: ShopSidebarProps) => {
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [selectedCat, setSelectedCat] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Gagal load kategori:", error);
      }
    };
    fetchCategories();
  }, []);

  const handlePriceClick = (id: string, min: number, max: number) => {
    if (selectedPrice === id) {
      setSelectedPrice(null);
      onPriceChange(null);
    } else {
      setSelectedPrice(id);
      onPriceChange({ min, max });
    }
  };

  return (
    <aside className="space-y-8 pr-2">
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Kategori</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox 
                id={`cat-${cat.id}`} 
                onCheckedChange={(checked) => {
                  const updated = checked 
                    ? [...selectedCat, cat.id] 
                    : selectedCat.filter(i => i !== cat.id);
                  setSelectedCat(updated);
                  onCategoryChange(updated);
                }}
                className="border-slate-300 data-[state=checked]:bg-blue-600" 
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 cursor-pointer">
                {cat.nama_kategori}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Rentang Harga</h3>
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-3 group">
              <Checkbox 
                id={range.id} 
                checked={selectedPrice === range.id}
                onCheckedChange={() => handlePriceClick(range.id, range.min, range.max)}
                className="border-slate-300 data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor={range.id} className="text-sm font-semibold text-slate-600 cursor-pointer">
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