"use client";

import React, { useState } from "react";
import { 
  Plus, Minus, CreditCard, MapPin, Truck, Receipt, 
  ArrowRight, Loader2, User, Phone, Home, Building2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Opsi Dummy Ekspedisi
const SHIPPING_OPTIONS = [
  { id: "jnt", name: "J&T Cargo - Regular", price: 25000, desc: "Estimasi tiba dalam 2-3 hari" },
  { id: "jne", name: "JNE Express - OKE", price: 22000, desc: "Estimasi tiba dalam 3-4 hari" },
  { id: "sicepat", name: "SiCepat REG", price: 24000, desc: "Estimasi tiba dalam 1-2 hari" },
];

interface CheckoutDialogProps {
  product: {
    name: string;
    price: number;
  };
}

export default function CheckoutDialog({ product }: CheckoutDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<"qty" | "form">("qty"); 
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // State Form Alamat yang Bisa Diisi oleh User
  const [addressForm, setAddressForm] = useState({
    name: "Felissa Amelia",
    phone: "081234567890",
    fullAddress: "Jl. Raya Merdeka No. 45, Blok C3, Karawaci",
    city: "Kota Tangerang, Banten, 15111"
  });

  // Hitung Kalkulasi Harga
  const productTotal = product.price * quantity;
  const shippingFee = selectedShipping.price;
  const adminFee = 2500; // Biaya Midtrans Gateway
  const grandTotal = productTotal + shippingFee + adminFee;

  // Handle Perubahan Input Alamat
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Reset modal state saat dibuka/tutup
  const handleModalChange = (open: boolean) => {
    setIsBuyModalOpen(open);
    if (!open) {
      setTimeout(() => {
        setCheckoutStep("qty");
        setQuantity(1);
      }, 300);
    }
  };

  const handleMidtransPayment = () => {
    // Validasi input alamat kosong
    if (!addressForm.name || !addressForm.phone || !addressForm.fullAddress || !addressForm.city) {
      return toast.error("Oops!", { description: "Mohon lengkapi semua data alamat pengiriman Anda." });
    }

    setIsSubmitting(true);
    toast.info("Menghubungkan ke Midtrans...", { description: "Membuka invoice pembayaran aman Anda." });

    // Simulasi loading hit API Midtrans Snap Token
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBuyModalOpen(false);
      toast.success("Pembayaran Berhasil!", {
        description: `Transaksi Rp ${grandTotal.toLocaleString("id-ID")} sukses via Midtrans Secure Gateway.`,
      });
    }, 2500);
  };

  return (
    <Dialog open={isBuyModalOpen} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <Button className="flex-[1.5] h-14 sm:h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base sm:text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-95">
          <CreditCard className="mr-2" size={18} /> Beli Sekarang
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-[95%] sm:max-w-[520px] rounded-[32px] p-5 sm:p-6 border-none overflow-y-auto max-h-[90vh] shadow-2xl scrollbar-none bg-white">
        <DialogHeader className="border-b border-slate-50 pb-4">
          <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-slate-900 text-center">
            {checkoutStep === "qty" ? "Pilih Jumlah Unit" : "Detail Pengisian Checkout"}
          </DialogTitle>
        </DialogHeader>
        
        {/* STEP 1: PEMILIHAN KUANTITAS BARANG */}
        {checkoutStep === "qty" && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex items-center gap-6 bg-slate-50 p-2 rounded-full border border-slate-100">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 text-slate-700 font-bold transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="text-2xl font-black w-10 text-center text-slate-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 text-slate-700 font-bold transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between font-bold text-slate-500 px-2 text-sm sm:text-base">
                <span>Subtotal Produk:</span>
                <span className="text-blue-600 font-black">Rp {productTotal.toLocaleString('id-ID')}</span>
              </div>
              <Button 
                onClick={() => setCheckoutStep("form")} 
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-white text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10"
              >
                Lanjutkan Pengiriman <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: FORM INPUT ALAMAT & EKSPEDISI & MIDTRANS */}
        {checkoutStep === "form" && (
          <div className="space-y-5 pt-2 text-slate-800 relative">
            {/* Loading Overlay Efek Midtrans */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center gap-3 backdrop-blur-sm rounded-xl">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="font-black text-sm text-slate-900 tracking-tight">Menghubungkan ke Midtrans Secure Sandbox...</p>
              </div>
            )}

            {/* Section 1: Form Alamat Penerima (Bisa diisi) */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest">
                <MapPin size={14} className="text-blue-600" /> Informasi Alamat Pengiriman
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" name="name" placeholder="Nama Penerima"
                    value={addressForm.name} onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" name="phone" placeholder="No. WhatsApp"
                    value={addressForm.phone} onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
              </div>
              
              <div className="relative">
                <Home className="absolute left-4 top-4 text-slate-400" size={16} />
                <textarea 
                  name="fullAddress" placeholder="Alamat Lengkap (Nama Jalan, Blok, No Rumah)"
                  value={addressForm.fullAddress} onChange={handleInputChange} rows={2}
                  className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold resize-none"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" name="city" placeholder="Kota, Provinsi, Kode Pos"
                  value={addressForm.city} onChange={handleInputChange}
                  className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                />
              </div>
            </div>

            {/* Section 2: Opsi Kurir / Ongkir */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest">
                <Truck size={14} className="text-blue-600" /> Opsi Ekspedisi Pengiriman
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
                {SHIPPING_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedShipping(option)}
                    className={`flex justify-between items-center p-3 rounded-xl border text-left transition-all ${
                      selectedShipping.id === option.id 
                        ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" 
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900">{option.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{option.desc}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900">Rp {option.price.toLocaleString("id-ID")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Rincian Ringkasan Pembayaran */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                <Receipt size={14} className="text-blue-600" /> Ringkasan Pembayaran
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Total Harga ({quantity} produk)</span>
                  <span className="text-slate-900 font-bold">Rp {productTotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Ongkos Kirim</span>
                  <span className="text-slate-900 font-bold">Rp {shippingFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Jasa Gateway (Midtrans)</span>
                  <span className="text-slate-900 font-bold">Rp {adminFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 border-t border-dashed border-slate-200 pt-2 mt-1">
                  <span>Total Pembayaran</span>
                  <span className="text-blue-600 text-base sm:text-lg">Rp {grandTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Bawah */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCheckoutStep("qty")}
                className="flex-1 h-14 rounded-2xl border border-slate-100 font-bold text-slate-500 hover:bg-slate-50 text-xs sm:text-sm uppercase tracking-wider"
              >
                Kembali
              </Button>
              <Button 
                onClick={handleMidtransPayment} 
                className="flex-[2.5] h-14 rounded-2xl bg-[#132A56] hover:bg-[#1a3870] font-black text-white text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
              >
                <CreditCard size={16} /> Bayar via Midtrans
              </Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}