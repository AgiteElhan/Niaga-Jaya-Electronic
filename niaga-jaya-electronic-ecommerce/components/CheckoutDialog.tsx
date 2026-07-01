"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image"; // Gunakan Next Image untuk performa

import { 
  MapPin, Truck, Receipt, Loader2, 
  User, Phone, Home, Building2, Check, ArrowLeft, CreditCard, ChevronDown, ChevronRight
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
import { useRouter } from "next/navigation";

const SHIPPING_OPTIONS = [
  { id: "jnt", name: "J&T Cargo - Regular", price: 25000, desc: "Estimasi tiba dalam 2-3 hari" },
  { id: "jne", name: "JNE Express - OKE", price: 22000, desc: "Estimasi tiba dalam 3-4 hari" },
  { id: "sicepat", name: "SiCepat REG", price: 24000, desc: "Estimasi tiba dalam 1-2 hari" },
];

// UPDATED STRUCTURE: Categorized Payment Options with actual logo URLs from your image
const PAYMENT_CATEGORIES = [
  {
    category: "QRIS",
    options: [
      { id: "qris", name: "QRIS", logo: "/payment/qris.jpeg" },
    ]
  },
  {
    category: "Virtual account",
    options: [
      { id: "bca_va", name: "BCA VA", logo: "/payment/bca.jpeg" },
      { id: "bni_va", name: "BNI VA", logo: "/payment/bni.jpeg" },
      { id: "bri_va", name: "BRI VA", logo: "/payment/bri.jpeg" },
      { id: "mandiri_va", name: "Mandiri VA", logo: "/payment/mandiri.jpeg" },
      { id: "permata_va", name: "Permata VA", logo: "/payment/permata.jpeg" },
      { id: "cimb_va", name: "CIMB VA", logo: "/payment/cimbniaga.jpeg" },
      { id: "bsi_va", name: "BSI VA", logo: "/payment/bsi.jpeg" },
    ]
  },
  // {
  //   category: "Card Payment",
  //   options: [
  //     { id: "credit_card_visa", name: "Visa", logo: "/payment/visa.jpeg" },
  //     { id: "credit_card_mastercard", name: "Mastercard", logo: "/payment/Mastercard.jpeg" },
  //     // { id: "credit_card_jcb", name: "JCB", logo: "" },
  //     // { id: "credit_card_amex", name: "Amex", logo: "" },
  //   ]
  // },
];

interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  fullAddress: string;
  city: string;
  isDefault: boolean;
}

interface CheckoutItem {
  id: number | string;
  nama_produk: string;
  harga_jual: string | number;
  gambar_url?: string;
  quantity: number;
}

interface CheckoutDialogProps {
  products: CheckoutItem[]; 
  isFromCart?: boolean;
}

export default function CheckoutDialog({ products = [], isFromCart = false }: CheckoutDialogProps) {
  const { user } = useUser();
  const { removeFromCart } = useCartStore();
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  
  // State holds the full option object, initialized to the first available option
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_CATEGORIES[0].options[0]);
  
  // State to track expanded categories for the accordion-style list
  const [openCategories, setOpenCategories] = useState<string[]>([PAYMENT_CATEGORIES[0].category, PAYMENT_CATEGORIES[1].category]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [addressView, setAddressView] = useState<"list" | "add">("list");

  const [newAddressForm, setNewAddressForm] = useState({
    name: "", phone: "", fullAddress: "", city: "", isDefault: false,
  });

  useEffect(() => {
    if (isBuyModalOpen) {
      const saved = localStorage.getItem("niaga_jaya_multi_addresses");
      if (saved) {
        try {
          const parsedAddresses: SavedAddress[] = JSON.parse(saved);
          setAddresses(parsedAddresses);
          
          const defaultAddr = parsedAddresses.find(a => a.isDefault);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
          } else if (parsedAddresses.length > 0) {
            setSelectedAddressId(parsedAddresses[0].id);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const initialAddress: SavedAddress = {
          id: "addr-default-1",
          name: "Agit elhandinnata",
          phone: "081234567857",
          fullAddress: "Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08",
          city: "Pasar Kemis, Kabupaten Tangerang, Banten",
          isDefault: true
        };
        setAddresses([initialAddress]);
        setSelectedAddressId(initialAddress.id);
        localStorage.setItem("niaga_jaya_multi_addresses", JSON.stringify([initialAddress]));
      }
    }
  }, [isBuyModalOpen]);

  const productsSubtotal = products.reduce((total, item) => {
    return total + (Number(item.harga_jual) * item.quantity);
  }, 0);

  const shippingFee = selectedShipping.price;
  const adminFee = 2500; 
  const grandTotal = productsSubtotal + shippingFee + adminFee;

  const handleNewAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.name || !newAddressForm.phone || !newAddressForm.fullAddress || !newAddressForm.city) {
      return toast.error("Oops!", { description: "Lengkapi semua field alamat baru." });
    }

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      ...newAddressForm
    };

    let updatedAddresses = [...addresses];
    if (newAddressForm.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }

    updatedAddresses.push(newAddr);
    setAddresses(updatedAddresses);
    setSelectedAddressId(newAddr.id);
    localStorage.setItem("niaga_jaya_multi_addresses", JSON.stringify(updatedAddresses));
    
    setNewAddressForm({ name: "", phone: "", fullAddress: "", city: "", isDefault: false });
    setAddressView("list");
    toast.success("Berhasil", { description: "Alamat baru berhasil ditambahkan." });
  };

  const handleModalChange = (open: boolean) => {
    setIsBuyModalOpen(open);
    if (!open) {
      setTimeout(() => {
        setAddressView("list");
      }, 300);
    }
  };

  const handleMidtransPayment = async () => {
    if (!selectedAddressId) {
      return toast.error("Oops!", { description: "Pilih salah satu alamat pengiriman terlebih dahulu." });
    }

    const currentAddress = addresses.find(a => a.id === selectedAddressId);
    if (!currentAddress) return;

    const generatedOrderId = `NJE-${Date.now()}`;

    try {
      setIsSubmitting(true);
      toast.info("Memproses Pesanan...");

      const laravelResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,{
      method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          order_id: generatedOrderId,
          customer_name: currentAddress.name,
          customer_phone: currentAddress.phone,
          clerk_id: user?.id, 
          shipping_address: `${currentAddress.fullAddress}, ${currentAddress.city}`, 
          shipping_method: selectedShipping.name,
          grand_total: grandTotal,
          payment_type: selectedPayment.id,
          items: products,
        }),
      });

      const laravelData = await laravelResponse.json();

      if (!laravelResponse.ok) {
        throw new Error(laravelData.error || "Gagal mencatatkan pesanan ke database server Laravel.");
      }
      
      setIsBuyModalOpen(false); 

      if (isFromCart) {
        products.forEach((product) => {
          removeFromCart(Number(product.id)); 
        });
      }

      setIsSubmitting(false);

      localStorage.setItem("payment_data", JSON.stringify(laravelData.payment_data));
      router.push(`/payment/${generatedOrderId}`);

    } catch (error: any) {
      setIsSubmitting(false);
      console.error(error);
      toast.error("Gagal Mengamankan Pesanan", {
        description: error.message || "Kesalahan jaringan internal backend.",
      });
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <Dialog open={isBuyModalOpen} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <button 
          type="button" 
          style={{ pointerEvents: 'auto', zIndex: 9999 }}
          className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl cursor-pointer"
        >
          Checkout Sekarang
        </button>
      </DialogTrigger>
      
      <DialogContent className="w-[95%] sm:max-w-[550px] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border-none overflow-y-auto max-h-[92vh] sm:max-h-[90vh] shadow-2xl scrollbar-none bg-slate-50">
        <DialogHeader className="border-b border-slate-200 pb-3 sm:pb-4">
          <DialogTitle className="text-base sm:text-xl font-black tracking-tight text-slate-900 text-center">
            {addressView === "list" ? "Detail Pengisian Checkout" : "Tambah Alamat Baru"}
          </DialogTitle>
        </DialogHeader>
        
        {addressView === "list" && (
          <div className="space-y-4 sm:space-y-5 pt-2 text-slate-800 relative">
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center gap-3 backdrop-blur-sm rounded-xl">
                <Loader2 className="animate-spin text-blue-600" size={32} />
                <p className="font-black text-xs sm:text-sm text-slate-900 tracking-tight text-center px-4">Menghubungkan Aman ke Gateway Server...</p>
              </div>
            )}

           <div className="space-y-1.5">
              <div className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest px-0.5">
                Rincian Barang Belanjaan ({products.length})
              </div>
              
              <div className="space-y-2 max-h-[120px] sm:max-h-[160px] overflow-y-auto pr-1 border border-slate-100 p-2 rounded-xl sm:rounded-2xl bg-white scrollbar-thin">
                {products.length > 0 ? (
                  products.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 p-2 sm:p-3 rounded-xl flex items-center gap-2.5 sm:gap-3.5 shadow-sm">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 bg-slate-50 border border-slate-100 rounded-lg p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.gambar_url || "/placeholder.png"} 
                          alt={item.nama_produk} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate leading-snug">{item.nama_produk}</p>
                        <div className="flex items-center justify-between mt-0.5 sm:mt-1">
                          <p className="text-[11px] sm:text-xs text-blue-600 font-black">
                            Rp {Number(item.harga_jual).toLocaleString("id-ID")}
                          </p>
                          <span className="text-[10px] sm:text-xs text-slate-400 font-black bg-slate-100 px-1.5 py-0.5 rounded">
                            {item.quantity}x
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">Tidak ada detail produk.</p>
                )}
              </div>
            </div>

            {/* SEKSI ALAMAT PENERIMA (Sama seperti sebelumnya) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-black uppercase tracking-widest px-0.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin size={12} className="text-blue-600" /> Alamat Pengiriman Anda
                </span>
                <button 
                  type="button"
                  onClick={() => setAddressView("add")}
                  className="text-blue-600 hover:underline font-black text-[10px] sm:text-[11px]"
                >
                  + Tambah Alamat
                </button>
              </div>

              <div className="space-y-2 max-h-[110px] sm:max-h-[130px] overflow-y-auto pr-1 scrollbar-thin">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left cursor-pointer transition-all relative ${
                      selectedAddressId === addr.id 
                        ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-600 shadow-sm" 
                        : "border-slate-100 bg-white hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-slate-900 text-xs sm:text-sm">{addr.name}</span>
                          <span className="text-slate-400 font-bold text-[10px] sm:text-xs">({addr.phone})</span>
                          {addr.isDefault && (
                            <span className="bg-blue-600 text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider">Default</span>
                          )}
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed truncate max-w-[220px] sm:max-w-none">{addr.fullAddress}</p>
                        <p className="text-slate-500 font-bold text-[10px] sm:text-xs">{addr.city}</p>
                      </div>
                      {selectedAddressId === addr.id && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEKSI EKSPEDISI KURIR (Sama seperti sebelumnya) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest px-0.5">
                <Truck size={12} className="text-blue-600" /> Opsi Ekspedisi Pengiriman
              </div>
              <div className="grid grid-cols-1 gap-1.5 max-h-[95px] sm:max-h-[105px] overflow-y-auto pr-1 scrollbar-thin">
                {SHIPPING_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedShipping(option)}
                    className={`flex justify-between items-center p-2.5 rounded-xl border text-left transition-all ${
                      selectedShipping.id === option.id 
                        ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600 shadow-sm" 
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate">{option.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{option.desc}</p>
                    </div>
                    <span className="text-xs font-black text-slate-900 shrink-0 ml-2">Rp {option.price.toLocaleString("id-ID")}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase tracking-widest">
                <CreditCard size={14} className="text-blue-600" /> Metode Pembayaran
              </div>

              <div className="space-y-4 mt-2">
                {PAYMENT_CATEGORIES.map((category) => (
                  <div key={category.category} className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.category)}
                      className="flex items-center justify-between w-full p-2 rounded-lg text-left text-[10px] sm:text-xs font-bold text-slate-500 hover:bg-slate-50 uppercase ml-1 border-b border-dashed border-slate-100 pb-2 mb-2"
                    >
                      <span>{category.category}</span>
                      {openCategories.includes(category.category) ? (
                        <ChevronDown size={14} className="text-slate-400" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-400" />
                      )}
                    </button>

                    {/* Content Panel (Accordion-style collapsible list of options with logos) */}
                    {openCategories.includes(category.category) && (
                      <div className="grid grid-cols-1 gap-2 border-t border-dashed border-slate-100 pt-2">
                        {category.options.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedPayment(option)}
                            className={`
                              flex items-center justify-between w-full p-3 rounded-xl border transition-all text-left
                              ${
                                selectedPayment.id === option.id
                                  ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {/* Realistic Logo Rendering with specific aspect ratio based on the type */}
                              <div className="relative shrink-0 flex items-center justify-center p-0.5 border border-slate-100 rounded bg-white" style={{ width: '60px', height: '35px' }}>
                                <Image 
                                  src={option.logo} 
                                  alt={option.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-xs sm:text-sm font-bold text-slate-700">
                                  {option.name}
                                </span>
                              </div>
                            </div>

                            {/* TikTok-style selection check indicator */}
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedPayment.id === option.id 
                                ? "bg-blue-600 border-blue-600" 
                                : "border-slate-300 bg-white"
                            }`}>
                              {selectedPayment.id === option.id && <Check size={10} className="text-white" strokeWidth={4} />}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

             <div className="space-y-1.5 pt-2.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                <Receipt size={12} className="text-blue-600" /> Ringkasan Pembayaran
              </div>
              <div className="space-y-1.5 text-[11px] sm:text-xs font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal Belanja Barang</span>
                  <span className="text-slate-900 font-bold">Rp {productsSubtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Ongkos Kirim</span>
                  <span className="text-slate-900 font-bold">Rp {shippingFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Jasa Sistem</span>
                  <span className="text-slate-900 font-bold">Rp {adminFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-base font-black text-slate-900 border-t border-dashed border-slate-200 pt-2 mt-2">
                  <span>Total Pembayaran</span>
                  <span className="text-blue-600 text-sm sm:text-lg">Rp {grandTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* TOMBOL AKSI UTAMA (Sama seperti sebelumnya) */}
            <div className="flex gap-2.5 pt-1.5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsBuyModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 h-11 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-200 bg-white font-bold text-slate-500 hover:bg-slate-50 text-xs uppercase tracking-wider shadow-sm"
              >
                Batal
              </Button>
              <Button 
                type="button"
                onClick={handleMidtransPayment} 
                disabled={isSubmitting}
                className="flex-[2.5] h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-[#132A56] hover:bg-[#1a3870] font-black text-white text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Memproses DB...
                  </>
                ) : (
                  <>
                    <CreditCard size={14} /> Buat Pesanan
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {addressView === "add" && (
          <form onSubmit={handleSaveNewAddress} className="space-y-3.5 pt-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size={14}" />
                  <input 
                    type="text" name="name" placeholder="Nama Penerima" required
                    value={newAddressForm.name} onChange={handleNewAddressInputChange}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size={14}" />
                  <input 
                    type="text" name="phone" placeholder="No. WhatsApp" required
                    value={newAddressForm.phone} onChange={handleNewAddressInputChange}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
              
              <div className="relative">
                <Home className="absolute left-3.5 top-3 text-slate-400 size={14}" />
                <textarea 
                  name="fullAddress" placeholder="Alamat Lengkap (Nama Jalan, Blok, No Rumah)" required
                  value={newAddressForm.fullAddress} onChange={handleNewAddressInputChange} rows={3}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size={14}" />
                <input 
                  type="text" name="city" placeholder="Kota, Provinsi, Kode Pos" required
                  value={newAddressForm.city} onChange={handleNewAddressInputChange}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-100 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <label className="flex items-center gap-2 pt-0.5 px-0.5 text-[11px] text-slate-500 font-bold cursor-pointer select-none">
                <input 
                  type="checkbox"
                  name="isDefault"
                  checked={newAddressForm.isDefault}
                  onChange={(e) => setNewAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="w-3.5 h-3.5 accent-blue-600 rounded cursor-pointer"
                />
                <span>Atur sebagai Alamat Utama (Default)</span>
              </label>
            </div>

            <div className="flex gap-2.5 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAddressView("list")}
                className="flex-1 h-11 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-100 font-bold text-slate-500 hover:bg-slate-50 text-xs uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <ArrowLeft size={12} /> Batal
              </Button>
              <Button type="submit" className="flex-[2] h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md">
                Simpan Alamat
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}