import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: number;
  nama_produk: string;
  harga_jual: string; // Pastikan ini string/number sesuai API Laravel
  gambar_url: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void; // Tambahan fungsi update qty
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (product) => set((state) => {
        // Cek apakah produk sudah ada di keranjang
        const existingItem = state.cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          };
        }
        
        // Jika produk baru, masukkan ke keranjang
        // Kita petakan manual agar pasti sesuai dengan interface CartItem
        return { 
          cart: [
            ...state.cart, 
            { 
              id: product.id,
              nama_produk: product.nama_produk,
              harga_jual: product.harga_jual,
              gambar_url: product.gambar_url,
              quantity: 1 
            }
          ] 
        };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),

      updateQuantity: (id, qty) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        ),
      })),

      clearCart: () => set({ cart: [] }),
    }),
    { 
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), // Tambahkan ini agar lebih stabil
    }
  )
);