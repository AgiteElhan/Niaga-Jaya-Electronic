import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

// Inisialisasi Midtrans Snap client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, grandTotal } = body;

    if (!orderId || !grandTotal) {
      return NextResponse.json({ error: "Order ID dan Total Bayar wajib diisi" }, { status: 400 });
    }

    // Cukup kirimkan order_id lama dan gross_amount yang sama
    // Midtrans akan cerdas mengenali ini transaksi lama dan memberikan token yang sudah ada
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(grandTotal),
      }
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token
    });

  } catch (error: any) {
    console.error("MIDTRANS_REPAY_ERROR:", error);
    return NextResponse.json({ error: error.message || "Gagal memanggil ulang Midtrans" }, { status: 500 });
  }
}