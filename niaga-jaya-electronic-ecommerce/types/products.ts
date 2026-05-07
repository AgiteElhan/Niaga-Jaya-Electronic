// src/types/product.ts
export interface Product {
  id: number;
  kode_produk: string;
  nama_produk: string;
  harga_jual: number;
  harga_discount?: number | null;
  stok: number;
  deskripsi: string | null;
  gambar: string;       // Nama file asli (misal: 1777877072.jpg)
  gambar_url: string;   // URL Lengkap dari transform Laravel (sudah termasuk http://...)
  kategori?: {
    id: number;
    nama_kategori: string;
  };
  merk?: {
    id: number;
    nama_merk: string;
  };
}