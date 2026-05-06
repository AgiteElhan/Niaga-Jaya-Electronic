"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import EmptyCart from "@/components/EmptyCart"; // IMPORT DI SINI
import CartItem from "@/components/CartItem";
// ... import lainnya

const CartPage = () => {
  // Simulasi keranjang (Ganti jadi [] untuk ngetes EmptyCart)
  const [cartItems, setCartItems] = useState([]); 

  // LOGIKANYA DI SINI:
  // Jika isi keranjang kosong (length === 0), tampilkan komponen EmptyCart
  if (cartItems.length === 0) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  // Jika ada isinya, tampilkan list belanja
  return (
    <Container>
      {/* ... kode list keranjang kamu ... */}
    </Container>
  );
};

export default CartPage;