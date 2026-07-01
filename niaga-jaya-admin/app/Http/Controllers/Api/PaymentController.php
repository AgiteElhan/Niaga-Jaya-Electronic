<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pesanan; 
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function handleCallback(Request $request)
    {
        Log::info('CALLBACK MASUK', [
    'headers' => $request->headers->all(),
    'body' => $request->getContent(),
    'parsed' => $request->all(),
]);
        $serverKey = config('services.midtrans.serverKey');

        if (!$serverKey) {
            Log::error('Midtrans Server Key tidak ditemukan di config.');
            return response()->json(['message' => 'Server key missing'], 500);
        }
        $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        Log::info('MIDTRANS DEBUG', [
            'request' => $request->all(),
            'server_key' => $serverKey,
            'local_hash' => $hashed,
        ]);

        Log::info('Signature dari Midtrans: ' . $request->signature_key);
        if ($hashed !== $request->signature_key) {
            Log::error('Midtrans Callback: Invalid Signature Key');
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // 3. Cari data di table 'pesanan' berdasarkan 'nomor_pesanan'
        $pesanan = Pesanan::where('nomor_pesanan', $request->order_id)->first();

        // Jika pesanan tidak ditemukan di database
        if (!$pesanan) {
            Log::error("Midtrans Callback: Pesanan {$request->order_id} tidak ditemukan.");
            return response()->json(['message' => 'Order not found'], 404);
        }

        // 4. Ambil status transaksi dan metode pembayaran dari Midtrans
        $transactionStatus = $request->transaction_status;
        $paymentType = $request->payment_type; // cth: 'bank_transfer', 'qris', 'gopay'

        // 5. Update kolom 'status_pembayaran' di tabel 'pesanan'
        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            // Jika sukses dibayar
            $pesanan->status_pembayaran = 'success';
            
            // OPSIONAL: Logika kurangi stok produk bisa ditambahkan di sini
            // foreach($pesanan->pesananItems as $item) {
            //     $item->product->decrement('stok', $item->jumlah);
            // }

        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            // Jika gagal/batal/kedaluwarsa
            $pesanan->status_pembayaran = 'failed';

        } elseif ($transactionStatus == 'pending') {
            // Jika masih menunggu pembayaran
            $pesanan->status_pembayaran = 'pending';
        }

        // Simpan juga metode pembayaran yang dipakai customer (opsional tapi bagus untuk laporan)
        if ($paymentType) {
            $pesanan->metode_pembayaran = $paymentType;
        }

        // Simpan perubahan ke database
        $pesanan->save();

        Log::info("Midtrans Callback: Pesanan {$pesanan->nomor_pesanan} sukses diupdate jadi {$pesanan->status_pembayaran}.");

        return response()->json(['message' => 'Callback handled successfully']);
    }
}
