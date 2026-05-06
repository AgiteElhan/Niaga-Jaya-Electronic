import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: any;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex gap-4 md:gap-6 p-4 md:p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
      {/* Image Container */}
      <div className="relative w-20 h-20 md:w-32 md:h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      {/* Info Details */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-slate-800 text-base md:text-lg line-clamp-1">{item.name}</h3>
          <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
            <Trash2 size={18} />
          </button>
        </div>
        
        <p className="text-blue-600 font-bold text-lg md:text-xl mt-1">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center border border-slate-200 rounded-full p-1 bg-slate-50/50">
            <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-white shadow-sm">
              <Minus size={14} />
            </Button>
            <span className="w-8 md:w-10 text-center font-bold text-slate-800 text-sm md:text-base">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full text-blue-600 hover:bg-white shadow-sm">
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;