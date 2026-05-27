import { NextResponse } from "next/server";
// @ts-ignore
import midtransClient from "midtrans-client";

// Inisialisasi Midtrans Snap client
const snap = new midtransClient.Snap({
  isProduction: false, // Set ke true kalau nanti sudah mau rilis live (Production)
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products, address, shippingFee, adminFee, grandTotal } = body;

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
    }

    // 1. Buat ID Transaksi Unik (contoh: NJE-1715692389)
    const orderId = `NJE-${Date.now()}`;

    // 2. Format list item sesuai spesifikasi objek Midtrans
    const itemDetails = products.map((item: any) => ({
      id: item.id.toString(),
      price: Number(item.harga_jual),
      quantity: item.quantity,
      name: item.nama_produk.substring(0, 50), // Batasi nama max 50 karakter agar aman
    }));

    // Tambahkan ongkir dan biaya admin ke rincian item Midtrans
    itemDetails.push({
      id: "SHIPPING_FEE",
      price: shippingFee,
      quantity: 1,
      name: "Ongkos Kirim",
    });

    itemDetails.push({
      id: "ADMIN_FEE",
      price: adminFee,
      quantity: 1,
      name: "Biaya Jasa Sistem",
    });

    // 3. Konfigurasi Parameter Transaksi Lengkap
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grandTotal, // Total wajib sama dengan jumlah kalkulasi item_details
      },
      item_details: itemDetails,
      customer_details: {
        first_name: address.name,
        phone: address.phone,
        shipping_address: {
          first_name: address.name,
          phone: address.phone,
          address: address.fullAddress,
          city: address.city,
        },
      },
      // Opsional: Membatasi jenis pembayaran yang nampil di widget Snap
      enabled_payments: ["credit_card", "gopay", "shopeepay", "bca_va", "bni_va", "bri_va", "mandiri_va", "other_va"],
    };

    // 4. Request Token ke Midtrans
    const transaction = await snap.createTransaction(parameter);

    // Kembalikan snap token ke frontend
    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId: orderId
    });

  } catch (error: any) {
    console.error("MIDTRANS_API_ERROR:", error);
    return NextResponse.json({ error: error.message || "Gagal memproses token pembayaran" }, { status: 500 });
  }
}