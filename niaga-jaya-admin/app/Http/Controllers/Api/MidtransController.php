<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pesanan;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.serverKey');
        $notification = new \Midtrans\Notification();

        $orderId = $notification->order_id;
        $transactionStatus = $notification->transaction_status;

        $pesanan = Pesanan::where('nomor_pesanan', $orderId)->first();

        if ($pesanan) {
            if ($transactionStatus == 'settlement' || $transactionStatus == 'capture') {
                $pesanan->update(['status_pembayaran' => 'berhasil']);
            } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'expire' || $transactionStatus == 'deny') {
                $pesanan->update(['status_pembayaran' => 'gagal']);
            }
        }

        return response()->json(['status' => 'success']);
    }
}
