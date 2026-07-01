"use client";

import React, { use, useState, useEffect } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import { 
  ArrowLeft, Package, Truck, MapPin, CreditCard, 
  MessageSquare, ShieldAlert, CheckCircle2, Lock, Star, Send, Check
} from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ShippingWizard from "@/components/ShippingWizard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface OrderItem {
    id?: number | string;
  product_id: number | string;
  nama_produk: string;
  gambar_url?: string;
  gambar?: string; 
  harga_jual: number;
  harga_satuan?: number; 
  jumlah: number;
  kategori_produk?: string;
}

interface OrderDetail {
  id: number | string;
  order_id: string; 
  status_pesanan: string; 
  created_at: string;
  arrival_date?: string;
  metode_pembayaran: string;
  status_pembayaran: string; 
  status_pengiriman?: string; 
  kurir_pengiriman: string; 
  nomor_resi: string;
  nama_penerima: string; 
  nomor_telepon: string; 
  alamat_lengkap: string; 
  total_bayar: number; 
  total_harga?: number;
  items: OrderItem[]; 
  is_reviewed?: boolean;
  payment_response?: any;
}

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const orderIdFromUrl = resolvedParams.id; 

  const router = useRouter();

  const { isSignedIn, isLoaded, user } = useUser();
  
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // State untuk form ulasan
  const [productRating, setProductRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State Aksi Transaksi
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // =========================================================
  // LOAD SCRIPT MIDTRANS SAAT HALAMAN DIBUKA
  // =========================================================
  useEffect(() => {
    setMounted(true);
    
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // FETCH DETAIL TRANSAKSI
  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;
        const response = await fetch(`${BACKEND_URL}/api/orders/${orderIdFromUrl}?clerk_id=${user.id}`);
        
        if (response.ok) {
          const result = await response.json();
          const orderData = result.data || result;
          setOrder(orderData); 
          
          if (orderData.is_reviewed) {
            setIsReviewed(true);
          }
        }
      } catch (error) {
        console.error("Error fetching order detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchOrderDetail();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user?.id, orderIdFromUrl]);

  const handleCancelOrder = async () => {
    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${order?.id}/cancel`,
      {
        method: "POST",
      }
    );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Pesanan berhasil dibatalkan");
      router.refresh();

    } catch (error: any) {
      toast.error(error.message || "Gagal membatalkan pesanan");
    }
  };

  const handlePayNow = async () => {
    if (!order) return;
    setIsPaying(true);

    try {
      const response = await fetch("/api/repay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.order_id,
          grandTotal: order.total_bayar || order.total_harga
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengambil token pembayaran.");
      }

      const snapWindow = window as any;
      if (snapWindow.snap) {
        snapWindow.snap.pay(data.token, {
          onSuccess: function () {
            toast.success("Pembayaran Berhasil!");
            setOrder(prev => prev ? { ...prev, status_pembayaran: "success", status_pesanan: "success" } : prev);
          },
          onPending: function () {
            toast("Menunggu Anda menyelesaikan pembayaran...");
          },
          onError: function () {
            toast.error("Pembayaran Gagal / Ditolak.");
          },
          onClose: function () {
            toast("Popup ditutup. Anda masih bisa membayar nanti.");
          }
        });
      } else {
        toast.error("Sistem Midtrans belum siap, silakan refresh halaman.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPaying(false);
    }
  };

  // FUNGSI PESANAN DITERIMA
  const handleTerimaPesananClick = () => {
    setShowConfirmModal(true);
  };

  const processTerimaPesanan = async () => {
    setShowConfirmModal(false); 
    setIsUpdatingStatus(true);  

    try {
      const BACKEND_URL = "https://niagajayaelectronic-admin.se2.web.id";
      const response = await fetch(`${BACKEND_URL}/api/orders/${order?.id}/receive`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ clerk_id: user?.id })
      });

      if (response.ok) {
        toast.success("Pesanan berhasil diselesaikan!");
        setOrder(prev => prev ? { ...prev, status_pengiriman: "selesai", status_pesanan: "selesai" } : prev);
      } else {
        toast.error("Gagal mengupdate status pesanan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // FUNGSI KIRIM REVIEW 
  const handleSendReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productRating === 0) return toast.error("Mohon berikan rating produk!");
    
    setIsSubmitting(true);
    try {
      const BACKEND_URL = "https://niagajayaelectronic-admin.se2.web.id";
      const payload = {
        pesanan_id: order?.id,
        produk_id: order?.items && order.items.length > 0 ? (order.items[0].product_id || order.items[0].id) : null,
        nama_pembeli: order?.nama_penerima || "Pelanggan",
        rating: productRating, 
        komentar: reviewComment
      };

      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success("Ulasan Anda berhasil dikirim! Terima kasih.");
        setIsReviewed(true);
      } else {
        toast.error("Gagal mengirim ulasan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Berhasil disalin!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openWhatsApp = (type: "seller" | "warranty") => {
    if (!order) return;
    const phoneNumber = "6281319946436"; 
    const firstProductName = order.items && order.items.length > 0 ? order.items[0].nama_produk : "Produk";
    const text = type === "seller" 
      ? `Halo Admin Niaga Jaya, saya ingin bertanya tentang Nomor Pesanan *${order.order_id}*`
      : `Halo Admin Niaga Jaya, saya ingin mengajukan klaim garansi/komplain untuk Nomor Pesanan *${order.order_id}* dengan produk *${firstProductName}*`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "tiba": case "selesai": case "success": case "settlement": case "berhasil":
        return "bg-green-100 text-green-700 border-green-200";
      case "dikirim": 
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "dibatalkan": case "expire": case "cancel": 
        return "bg-red-100 text-red-700 border-red-200";
      default: 
        return "bg-amber-100 text-amber-700 border-amber-200"; 
    }
  };

  if (!mounted || !isLoaded) return null;

  if (!isSignedIn) {
    return (
      <Container>
        <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Lock size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Detail Pesanan Terkunci</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
            Untuk melihat detail pelacakan logistik, silakan masuk ke akun Anda terlebih dahulu.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-base font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
              Login Sekarang
            </Button>
          </SignInButton>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500 flex flex-col items-center justify-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-3"></div>
        <p className="text-sm font-bold text-slate-700">Menghubungkan ke server</p>
      </div>
    );
  }

  if (!order) return <div className="py-20 text-center font-bold text-red-500">Detail Pesanan Tidak Ditemukan</div>;

  // Cek apakah barang benar-benar sudah tiba/selesai (Untuk trigger form ulasan)
  const isOrderArrived = order.status_pesanan?.toLowerCase() === "selesai" || order.status_pengiriman?.toLowerCase() === "selesai";
  
  // Cek apakah pembayaran masih tertunda (Untuk trigger instruksi QR/VA)
  const isPendingPayment = order.status_pesanan?.toLowerCase() === "pending" || order.status_pesanan?.toLowerCase() === "menunggu";

  // Ekstraksi data response Midtrans
  const paymentResponse = order.payment_response;
  const qrAction = paymentResponse?.actions?.find((item: any) => item.name === "generate-qr-code");
  const vaNumber = paymentResponse?.va_numbers?.[0]?.va_number;
  const bankName = paymentResponse?.va_numbers?.[0]?.bank?.toUpperCase();
  const permataVA = paymentResponse?.permata_va_number;
  const billKey = paymentResponse?.bill_key;
  const billerCode = paymentResponse?.biller_code;

  return (
    <div className="bg-slate-50 min-h-screen py-6 md:py-10">
      <Container>
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-0">
          
          <Link href="/orders" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group text-sm md:text-base">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Pesanan Saya
          </Link>

          <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[40px] p-6 md:p-10 shadow-xl shadow-slate-100 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">No. Pesanan</span>
                <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight break-all">{order.order_id}</h1>
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg border ${getStatusColor(order.status_pembayaran || order.status_pesanan)}`}>
                  {order.status_pembayaran || order.status_pesanan}
                </span>
              </div>
              <p className="text-slate-400 font-bold text-xs sm:text-sm">
                Dibuat pada: {order.created_at ? new Date(order.created_at).toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' }) : '-'} 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
              <button onClick={() => openWhatsApp("seller")} className="w-full sm:w-auto flex-1 md:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <MessageSquare size={16} /> Hubungi Penjual
              </button>
              <button onClick={() => openWhatsApp("warranty")} className="w-full sm:w-auto flex-1 md:flex-initial bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <ShieldAlert size={16} /> Komplain
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-6 md:gap-8 items-start ${isOrderArrived ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
            
            <div className={`space-y-6 md:space-y-8 ${isOrderArrived ? "lg:col-span-2" : "lg:col-span-1"}`}>
              
              {/* TOMBOL BAYAR SEKARANG (HANYA MUNCUL JIKA PENDING) */}
              {isPendingPayment && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-[24px] md:rounded-[36px] p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm">
                  <div className="space-y-1 text-center sm:text-left w-full sm:w-auto">
                    <h3 className="font-black text-lg text-amber-900 flex items-center gap-2 justify-center sm:justify-start">
                      <CreditCard size={20} /> Selesaikan Pembayaran
                    </h3>
                    <p className="text-amber-700 text-sm font-medium">Pesanan menunggu pembayaran. Segera bayar agar barang dapat dikirim.</p>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto rounded-xl">
                          Batalkan
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="rounded-2xl mx-4 sm:mx-auto">
                        <DialogHeader>
                          <DialogTitle>Batalkan Pesanan?</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-slate-500">
                          Pesanan yang dibatalkan tidak dapat diproses kembali.
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" className="rounded-xl">Kembali</Button>
                          <Button variant="destructive" onClick={handleCancelOrder} className="rounded-xl">
                            Ya, Batalkan
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}

              <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[36px] p-6 sm:p-8 space-y-4">
                <h3 className="font-black text-base md:text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <MapPin size={18} className="text-blue-600" /> Alamat Pengiriman
                </h3>
                <div className="text-slate-700 space-y-1">
                  <p className="font-black text-base">{order.nama_penerima}</p>
                  <p className="text-sm font-bold text-slate-400">{order.nomor_telepon}</p>
                  <p className="text-sm leading-relaxed mt-2 text-slate-600">{order.alamat_lengkap}</p>
                </div>
              </div>

              {/* CARD INFORMASI PEMBAYARAN */}
              <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[36px] p-6 sm:p-8 space-y-4">
                <h3 className="font-black text-base md:text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <CreditCard size={18} className="text-blue-600" /> Informasi Pembayaran
                </h3>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 gap-4 sm:gap-0">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Metode Pembayaran</p>
                    <p className="font-bold text-slate-800 text-sm sm:text-base capitalize">
                      {order.metode_pembayaran && order.metode_pembayaran !== '-' 
                        ? order.metode_pembayaran.replace(/_/g, ' ') 
                        : "Pilih via Midtrans"}
                    </p>
                  </div>
                  
                  <div className="text-left sm:text-right space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                    <span className={`inline-block text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border shadow-sm ${getStatusColor(order.status_pesanan)}`}>
                      {order.status_pesanan?.toLowerCase() === 'success' || order.status_pesanan?.toLowerCase() === 'settlement' 
                        ? 'Berhasil' 
                        : order.status_pesanan?.toLowerCase() === 'pending' || order.status_pesanan?.toLowerCase() === 'menunggu'
                        ? 'Menunggu'
                        : order.status_pesanan}
                    </span>
                  </div>
                </div>

                {/* INSTRUKSI PEMBAYARAN HANYA MUNCUL JIKA STATUS PENDING */}
                {isPendingPayment && (
                  <div className="mt-6 bg-blue-50/50 rounded-2xl border border-blue-100 p-5 space-y-5">
                    
                    {/* QRIS INSTRUCTION */}
                    {order.metode_pembayaran === "qris" && qrAction && (
                      <>
                        <h3 className="font-bold text-slate-900 text-center mb-4 text-base md:text-lg">
                          Scan QRIS Pembayaran
                        </h3>
                        <div className="flex justify-center">
                          <img
                            src={qrAction.url}
                            alt="QRIS Pembayaran"
                            className="w-48 md:w-56 mx-auto rounded-xl border border-slate-200 p-2 bg-white"
                          />
                        </div>
                        <div className="mt-4 text-xs md:text-sm text-slate-600 space-y-2">
                          <p className="font-semibold text-slate-800">Cara Pembayaran:</p>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Buka aplikasi m-banking atau e-wallet (GoPay, DANA, OVO, ShopeePay, BCA Mobile, dll).</li>
                            <li>Pilih menu <strong>Scan QRIS</strong> dan arahkan kamera ke kode QR.</li>
                            <li>Periksa nominal dan konfirmasi pembayaran.</li>
                          </ol>
                        </div>
                        {paymentResponse?.expiry_time && (
                          <div className="mt-4 p-3 bg-red-50 text-red-600 text-center text-xs md:text-sm font-bold rounded-xl border border-red-100">
                            Berlaku sampai: {new Date(paymentResponse.expiry_time).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        )}
                      </>
                    )}

                    {/* PERMATA VA INSTRUCTION */}
                    {permataVA && (
                      <>
                        <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">
                          Virtual Account Permata
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white rounded-xl border border-slate-200 p-4 gap-3 sm:gap-0">
                          <span className="font-mono text-xl font-black text-blue-600 tracking-wider">
                            {permataVA}
                          </span>
                          <Button
                            onClick={() => copyToClipboard(permataVA)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
                          >
                            {isCopied ? "Tersalin!" : "Salin VA"}
                          </Button>
                        </div>
                        <div className="mt-4 text-xs md:text-sm text-slate-600 space-y-2">
                          <p className="font-semibold text-slate-800">Cara Pembayaran:</p>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Buka aplikasi PermataMobile X atau mesin ATM Permata.</li>
                            <li>Pilih menu <strong>Pembayaran Tagihan / Virtual Account</strong>.</li>
                            <li>Masukkan nomor Virtual Account di atas.</li>
                            <li>Konfirmasi pembayaran.</li>
                          </ol>
                        </div>
                      </>
                    )}

                    {/* MANDIRI BILL INSTRUCTION */}
                    {billKey && (
                      <>
                        <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">
                          Mandiri Bill Payment
                        </h3>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <span className="text-slate-500 text-sm font-medium">Biller Code</span>
                            <span className="font-mono text-lg font-black text-slate-900">{billerCode}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm font-medium">Bill Key</span>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-lg font-black text-blue-600 tracking-wider">{billKey}</span>
                              <Button variant="outline" size="sm" onClick={() => copyToClipboard(billKey)} className="rounded-lg h-8">
                                {isCopied ? "Tersalin!" : "Salin"}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-xs md:text-sm text-slate-600 space-y-2">
                          <p className="font-semibold text-slate-800">Cara Pembayaran:</p>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Buka aplikasi Livin' by Mandiri lalu pilih menu <strong>Bayar</strong>.</li>
                            <li>Cari institusi/biller menggunakan Biller Code (<strong>{billerCode}</strong>).</li>
                            <li>Masukkan Nomor Tagihan / Bill Key (<strong>{billKey}</strong>).</li>
                            <li>Konfirmasi pembayaran Anda.</li>
                          </ol>
                        </div>
                      </>
                    )}

                    {/* GENERIC VA (BCA, BNI, BRI, dll) INSTRUCTION */}
                    {order.metode_pembayaran !== "qris" && !permataVA && !billKey && vaNumber && (
                      <>
                        <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">
                          Virtual Account {bankName || ""}
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white rounded-xl border border-slate-200 p-4 gap-3 sm:gap-0">
                          <span className="font-mono text-xl font-black text-blue-600 tracking-wider">
                            {vaNumber}
                          </span>
                          <Button
                            onClick={() => copyToClipboard(vaNumber)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
                          >
                            {isCopied ? "Tersalin!" : "Salin VA"}
                          </Button>
                        </div>
                        <div className="mt-4 text-xs md:text-sm text-slate-600 space-y-2">
                          <p className="font-semibold text-slate-800">Cara Pembayaran:</p>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Buka aplikasi m-banking atau mesin ATM {bankName || "Bank Anda"}.</li>
                            <li>Pilih menu <strong>Transfer ke Virtual Account</strong>.</li>
                            <li>Masukkan nomor Virtual Account di atas.</li>
                            <li>Periksa nominal tagihan dan konfirmasi pembayaran.</li>
                          </ol>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* INFO LOGISTIK */}
              <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[36px] p-5 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
                <h4 className="font-black text-xs sm:text-sm text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Truck size={18} className="text-blue-500" /> Status Pengiriman
                </h4>

                <div className="overflow-x-auto pb-4">
                  <ShippingWizard status={order.status_pengiriman || 'dikemas'} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-slate-50">
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Kurir</p>
                      <p className="font-bold text-slate-800 text-sm">{order.kurir_pengiriman || "Regular Delivery"}</p>
                    </div>

                    {(order.status_pengiriman?.toLowerCase() === 'dikirim' || order.status_pengiriman?.toLowerCase() === 'selesai') && (
                      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Nomor Resi</p>
                          <p className="font-black text-slate-900 tracking-widest text-sm md:text-base">{order.nomor_resi || "-"}</p>
                        </div>
                        <Package size={24} className="text-blue-300" />
                      </div>
                    )}
                  </div>

                  {order.status_pengiriman?.toLowerCase() === 'dikirim' && (
                    <div className="flex flex-col justify-center mt-4 md:mt-0">
                      <Button 
                        onClick={handleTerimaPesananClick} 
                        disabled={isUpdatingStatus}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-6 md:py-8 rounded-2xl shadow-lg transition-all text-sm md:text-base whitespace-normal h-auto text-center"
                      >
                        {isUpdatingStatus ? "Memproses..." : "Konfirmasi Pesanan Diterima"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* CARD RINCIAN PRODUK */}
              <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[36px] p-6 sm:p-8 space-y-6">
                <h3 className="font-black text-base md:text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-50 pb-3">
                  <Package size={18} className="text-blue-600" /> Rincian Produk
                </h3>

                <div className="space-y-4">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="flex flex-row items-center gap-4 sm:gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 p-2 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                           <img 
                              src={
                                item.gambar_url ||
                                (item.gambar
                                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/products/${item.gambar}`
                                  : "/placeholder.png")
                              }                             
                            alt={item.nama_produk} 
                             className="object-contain w-full h-full" 
                             onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                           />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">{item.nama_produk}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.jumlah}x</p>
                        </div>
                        <div className="text-right text-xs sm:text-sm font-black whitespace-nowrap">
                          Rp {Number(item.harga_satuan || item.harga_jual || 0).toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-400 font-medium text-sm">Produk tidak ditemukan.</p>
                  )}
                </div>

                <div className="border-t pt-4 text-right">
                  <p className="text-xs text-slate-400 uppercase font-black">Total Keseluruhan</p>
                  <p className="text-lg md:text-xl font-black text-blue-600">
                    Rp {Number(order.total_bayar || order.total_harga || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

            </div>

            {/* FORM REVIEW - HANYA MUNCUL KETIKA BARANG SUDAH DITERIMA DIRUMAH */}
            {isOrderArrived && (
              <div className="lg:col-span-1 w-full">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-[24px] md:rounded-[36px] p-6 sm:p-8 shadow-2xl lg:sticky lg:top-10">
                  {!isReviewed ? (
                    <form onSubmit={handleSendReview} className="space-y-6">
                      <div>
                        <h3 className="font-black text-lg md:text-xl tracking-tight">Beri Ulasan</h3>
                        <p className="text-xs md:text-sm text-slate-400 mt-1 font-medium">Bagikan pengalaman belanja Anda!</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Kualitas Produk</label>
                        <div className="flex gap-1 md:gap-2 justify-start">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setProductRating(star)} className="focus:outline-none transition-transform active:scale-90 p-1">
                              <Star size={24} className="md:w-7 md:h-7" fill={productRating >= star ? '#eab308' : 'none'} color={productRating >= star ? "#eab308" : "#475569"} strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Komentar</label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Bagaimana kualitas produk dan pelayanannya?"
                          className="w-full bg-slate-800 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 text-xs md:text-sm resize-none placeholder:text-slate-500"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting || productRating === 0}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-xl md:rounded-2xl text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim Ulasan"} <Send size={16} />
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8 md:py-10 space-y-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={32} className="md:w-10 md:h-10" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg md:text-xl">Pesanan Selesai</h4>
                        <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium leading-relaxed">Terima kasih telah memberikan penilaian untuk pesanan ini di Niaga Jaya Electronic!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
        
        {/* MODAL KONFIRMASI TERIMA PESANAN */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200 mx-4">
              
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Package size={32} className="md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-black text-center text-slate-900 mb-2">Terima Pesanan?</h3>
              <p className="text-center text-slate-500 text-xs md:text-sm font-medium mb-6 md:mb-8 leading-relaxed">
                Apakah Anda yakin pesanan ini telah diterima dengan baik? Tindakan ini tidak dapat dibatalkan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-5 md:py-6 rounded-xl md:rounded-2xl transition-all"
                >
                  Batal
                </Button>
                <Button
                  onClick={processTerimaPesanan}
                  className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-5 md:py-6 rounded-xl md:rounded-2xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Ya, Saya Yakin
                </Button>
              </div>

            </div>
          </div>
        )}
      </Container>
    </div>
  );
}