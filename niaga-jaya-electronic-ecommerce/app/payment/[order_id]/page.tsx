"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function PaymentPage() {
  const params = useParams();
  const orderId = params.order_id as string;
  const [payment, setPayment] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPayment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/${orderId}`
      );
      const data = await res.json();
      setPayment(data);
    } catch (error) {
      console.error("ERROR =", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchPayment();
  }, [orderId]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (s === "settlement" || s === "success" || s === "berhasil") return "bg-green-100 text-green-800 border-green-200";
    if (s === "expire" || s === "cancel" || s === "gagal") return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (isLoading && !payment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 flex items-center justify-center font-sans">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-24 bg-gray-200 rounded w-full mt-8"></div>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <p className="text-gray-500">Data pembayaran tidak ditemukan.</p>
      </div>
    );
  }

  const isSuccess = payment.status_pembayaran?.toLowerCase() === "settlement" || payment.status_pembayaran?.toLowerCase() === "success";
  const paymentResponse = payment.payment_response;
  
  const qrAction = paymentResponse?.actions?.find((item: any) => item.name === "generate-qr-code");
  const qrCodeUrl = qrAction?.url;
  
  const vaNumber = paymentResponse?.va_numbers?.[0]?.va_number;
  const bankName = paymentResponse?.va_numbers?.[0]?.bank?.toUpperCase();
  const permataVA = paymentResponse?.permata_va_number;
  const billKey = paymentResponse?.bill_key;
  const billerCode = paymentResponse?.biller_code;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 px-4 sm:px-6 py-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detail Pembayaran
          </h1>
          <p className="text-blue-100 text-sm mt-1">Niaga Jaya Electronic</p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Order Info */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-100 gap-1 sm:gap-0">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-semibold text-gray-900 break-all text-sm sm:text-base">{payment.order_id}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-100 gap-1 sm:gap-0">
              <span className="text-gray-500 text-sm">Metode Pembayaran</span>
              <span className="font-medium text-gray-900 uppercase text-sm sm:text-base">
                {payment.metode_pembayaran?.replace("_", " ")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-100 gap-2 sm:gap-0">
              <span className="text-gray-500 text-sm">Status</span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border inline-flex w-fit ${getStatusColor(payment.status_pembayaran)}`}>
                {payment.status_pembayaran?.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 gap-1 sm:gap-0">
              <span className="text-gray-500 font-medium">Total Bayar</span>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                {formatRupiah(payment.total_bayar)}
              </span>
            </div>
          </div>

          {/* Conditional Instructions if NOT Success */}
          {!isSuccess && (
            <div className="mt-8 bg-blue-50/50 rounded-xl border border-blue-100 p-5">
              
              {/* QRIS INSTRUCTION */}
              {payment.metode_pembayaran === "qris" && paymentResponse?.qr_string && (
                <>
                  <h3 className="font-bold text-gray-900 text-center mb-4 text-lg">
                    Scan QRIS
                  </h3>
                  <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <QRCode
                              value={paymentResponse.qr_string}
                              size={220}
                          />
                      </div>
                  </div>
                  
                  <div className="mt-5 text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800">Cara Pembayaran:</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Buka aplikasi m-banking atau e-wallet Anda (GoPay, DANA, OVO, ShopeePay, BCA Mobile, dll).</li>
                      <li>Pilih ikon/menu <strong>Scan QRIS</strong>.</li>
                      <li>Arahkan kamera ke kode QR di atas.</li>
                      <li>Periksa nominal pembayaran dan konfirmasi.</li>
                    </ol>
                  </div>

                  {paymentResponse?.expiry_time && (
                    <div className="mt-5 p-3 bg-red-50 text-red-600 text-center text-sm font-medium rounded-lg border border-red-100">
                      Berlaku sampai: {new Date(paymentResponse.expiry_time).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  )}
                </>
              )}

              {/* PERMATA VA INSTRUCTION */}
              {permataVA && (
                <>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Virtual Account Permata
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white rounded-lg border p-4 gap-3 sm:gap-0">
                    <span className="font-mono text-xl font-bold text-blue-600 tracking-wider">
                      {permataVA}
                    </span>
                    <button
                      onClick={() => copyToClipboard(permataVA)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      {isCopied ? "Tersalin!" : "Salin VA"}
                    </button>
                  </div>
                  
                  <div className="mt-5 text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800">Cara Pembayaran:</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Buka aplikasi PermataMobile X atau mesin ATM Permata.</li>
                      <li>Pilih menu <strong>Pembayaran Tagihan / Virtual Account</strong>.</li>
                      <li>Masukkan nomor Virtual Account di atas.</li>
                      <li>Pastikan nama tagihan sesuai, lalu konfirmasi pembayaran.</li>
                    </ol>
                  </div>
                </>
              )}

              {/* MANDIRI BILL INSTRUCTION */}
              {billKey && (
                <>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Mandiri Bill Payment
                  </h3>
                  <div className="bg-white rounded-lg border p-4 space-y-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <span className="text-gray-500">Biller Code</span>
                      <span className="font-mono text-lg font-bold">{billerCode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Bill Key</span>
                      <span className="font-mono text-lg font-bold text-blue-600 tracking-wider">{billKey}</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800">Cara Pembayaran (Livin' by Mandiri):</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Buka aplikasi Livin' by Mandiri.</li>
                      <li>Pilih menu <strong>Bayar</strong>.</li>
                      <li>Cari institusi/biller menggunakan Biller Code (<strong>{billerCode}</strong>).</li>
                      <li>Masukkan Nomor Tagihan / Bill Key (<strong>{billKey}</strong>).</li>
                      <li>Konfirmasi pembayaran Anda.</li>
                    </ol>
                  </div>
                </>
              )}

              {/* GENERIC VA (BCA, BNI, BRI, dll) INSTRUCTION */}
              {payment.metode_pembayaran !== "qris" && !permataVA && !billKey && vaNumber && (
                <>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Virtual Account {bankName || ""}
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white rounded-lg border p-4 gap-3 sm:gap-0">
                    <span className="font-mono text-xl font-bold text-blue-600 tracking-wider">
                      {vaNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(vaNumber)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      {isCopied ? "Tersalin!" : "Salin VA"}
                    </button>
                  </div>
                  
                  <div className="mt-5 text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800">Cara Pembayaran:</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Buka aplikasi m-banking (Internet Banking) atau mesin ATM {bankName || "Bank Anda"}.</li>
                      <li>Pilih menu <strong>Transfer ke Virtual Account</strong>.</li>
                      <li>Masukkan / Tempelkan nomor Virtual Account di atas.</li>
                      <li>Periksa nominal tagihan dan konfirmasi pembayaran.</li>
                    </ol>
                  </div>
                </>
              )}

            </div>
          )}

          <div className="pt-6 mt-4 flex flex-col gap-3">
            {!isSuccess && (
              <button 
                onClick={fetchPayment}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border-2 border-blue-600 rounded-xl shadow-sm text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 focus:outline-none transition-colors disabled:opacity-50"
              >
                {isLoading ? "Memperbarui..." : "Cek Status Pembayaran"}
              </button>
            )}
            
            <Link 
              href="/"
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}