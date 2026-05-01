export interface Product {
  id: number;
  kode_produk: string;
  nama_produk: string;
  harga_jual: number;
  harga_discount?: number;
  stok: number;
  deskripsi: string;
  gambar_url: string; // URL lengkap dari asset() Laravel
  kategori?: { nama_kategori: string };
  merk?: { nama_merk: string };
}