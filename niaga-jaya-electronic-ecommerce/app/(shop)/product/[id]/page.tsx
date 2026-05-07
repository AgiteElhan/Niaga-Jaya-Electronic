"use client";

import React, { useState, use, useEffect } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ShoppingCart, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  ChevronRight,
  Minus,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // 1. Unwrap params untuk mendapatkan ID produk dari URL
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 2. State Management
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("/placeholder.png");
  
  // State untuk Modal Quantity dan Aksi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modalAction, setModalAction] = useState<"cart" | "buy">("cart");

  // 3. Hook Zustand
  const addToCart = useCartStore((state) => state.addToCart);

  // 4. Fetch data dari API Laravel
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        
        const data = await res.json();
        setProduct(data);
        
        if (data.gambar_url) {
          setMainImage(data.gambar_url);
        }
      } catch (err) {
        console.error("Gagal load detail produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 5. Handlers
  const openModal = (action: "cart" | "buy") => {
    setQuantity(1);
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === "cart") {
      // Tambah ke keranjang sesuai jumlah yang dipilih
      if (product) {
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
        toast.success(`${quantity} ${product.nama_produk} berhasil ditambah ke keranjang!`);
      }
    } else {
      // Jalankan checkout WhatsApp
      confirmCheckout();
    }
    setIsModalOpen(false);
  };

  const updateQuantity = (val: number) => {
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= (product?.stok || 1)) {
      setQuantity(newQty);
    }
  };

  const confirmCheckout = () => {
    const pesan = `Halo Niaga Jaya, saya ingin memesan produk:\n\n*${product.nama_produk}*\nJumlah: ${quantity} unit\nTotal: Rp ${(Number(product.harga_jual) * quantity).toLocaleString('id-ID')}`;
    const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(pesan)}`;
    window.open(whatsappUrl, "_blank");
  };

  // 6. Render Logic (Loading & Error)
  if (loading) {
    return (
      <Container>
        <div className="py-40 text-center flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Memuat info produk Niaga Jaya...</p>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-slate-800">Produk tidak ditemukan</h2>
          <Link href="/shop" className="mt-4 text-blue-600 font-bold"> Kembali ke Katalog</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link href="/shop" className="hover:text-blue-600 transition-colors">
            {product.kategori?.nama_kategori || "Katalog"}
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-slate-800 font-medium truncate">{product.nama_produk}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sisi Kiri: Gambar */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-[32px] bg-white border border-slate-100 overflow-hidden group p-8">
              <img
                src={mainImage} 
                alt={product.nama_produk}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.png"}}
              />
            </div>
          </div>

          {/* Sisi Kanan: Detail */}
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2">
              {product.kategori?.nama_kategori}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
              {product.nama_produk}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-bold text-sm">
                <Star size={16} fill="currentColor" className="mr-1" /> 4.9 
              </div>
              <span className="text-slate-300">|</span>
              
              {/* LOGIKA STOK BARU */}
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                product.stok > 10 
                  ? 'bg-green-100 text-green-700' 
                  : product.stok > 0 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-red-100 text-red-700'
              }`}>
                {product.stok > 10 
                  ? 'Stok Banyak' 
                  : product.stok > 0 
                    ? 'Stok Sedikit' 
                    : 'Stok Habis'}
              </span>
            </div>

            <div className="bg-slate-50 p-6 rounded-[24px] mb-8 border border-slate-100">
              <p className="text-sm text-slate-500 mb-1 font-medium">Harga Terbaik</p>
              <h2 className="text-4xl font-black text-blue-600 tracking-tight">
                Rp {Number(product.harga_jual).toLocaleString('id-ID')}
              </h2>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2 uppercase text-xs tracking-widest">Deskripsi Produk</h3>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                {product.deskripsi || "Belum ada deskripsi untuk produk ini."}
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button 
                disabled={product.stok === 0}
                onClick={() => openModal("cart")}
                size="lg" 
                className="flex-[2] h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Tambah Keranjang
              </Button>
              
              <Button 
                disabled={product.stok === 0}
                variant="outline" 
                onClick={() => openModal("buy")}
                size="lg" 
                className="flex-1 h-14 rounded-2xl border-2 border-slate-200 font-bold text-lg text-slate-700"
              >
                Beli Sekarang
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3"><ShieldCheck className="text-blue-600" /> <span className="text-xs font-bold">Garansi Resmi</span></div>
                <div className="flex items-center gap-3"><Truck className="text-green-600" /> <span className="text-xs font-bold">Free Ongkir</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL POP-UP QUANTITY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Tentukan Jumlah</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-slate-400" /></button>
              </div>

              <div className="flex items-center justify-center gap-8 mb-8">
                <button 
                  onClick={() => updateQuantity(-1)} 
                  className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="text-4xl font-black w-12">{quantity}</span>
                <button 
                  onClick={() => updateQuantity(1)} 
                  className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="border-t pt-6 mb-8">
                <p className="text-slate-500 mb-1">{modalAction === "cart" ? "Total ke Keranjang" : "Total Bayar"}</p>
                <p className="text-3xl font-black text-blue-600">Rp {(Number(product.harga_jual) * quantity).toLocaleString('id-ID')}</p>
              </div>

              <Button onClick={handleConfirmAction} className="w-full h-14 rounded-2xl bg-blue-600 text-lg font-bold shadow-lg shadow-blue-100">
                {modalAction === "cart" ? "Konfirmasi Keranjang" : "Lanjutkan Pemesanan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetailPage;