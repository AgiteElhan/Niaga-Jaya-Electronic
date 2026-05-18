// "use client";

// import Link from 'next/link';
// import { Heart } from 'lucide-react';
// import { motion } from 'framer-motion';

// export const FavoriteNav = () => {
//   return (
//     <Link href="/favorites">
//       <motion.div 
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="relative p-2 text-slate-600 hover:text-red-500 transition-colors"
//       >
//         <Heart size={24} />
//         {/* Badge jumlah barang favorit */}
//         <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold border-2 border-white">
//           0
//         </span>
//       </motion.div>
//     </Link>
//   );
// };