"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const FavoriteButton = ({ productName }: { productName: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Biar gak lari ke halaman detail pas dipencet
    const newState = !isFavorite;
    setIsFavorite(newState);

    if (newState) {
      toast.success(`${productName} ditambah ke wishlist!`);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={handleToggle}
      className={`p-2 rounded-full shadow-md ${
        isFavorite ? "bg-red-500 text-white" : "bg-white text-slate-400"
      }`}
    >
      <Heart size={20} fill={isFavorite ? "white" : "none"} />
    </motion.button>
  );
};