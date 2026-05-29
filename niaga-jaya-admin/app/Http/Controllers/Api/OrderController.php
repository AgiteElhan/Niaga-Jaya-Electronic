<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $clerkId = $request->query('clerk_id');

        if (!$clerkId) {
            return response()->json(['error' => 'Parameter clerk_id wajib disertakan.'], 400);
        }

        try {
            $pesananUser = DB::table('pesanan')
                ->where('clerk_id', $clerkId)
                ->orderBy('created_at', 'desc')
                ->get();

            $data = $pesananUser->map(function($order) {
                $jumlahItem = DB::table('pesanan_item')->where('pesanan_id', $order->id)->count();
                
                // Ambil satu item utama untuk ditampilkan
                $item = DB::table('pesanan_item')
                    ->leftJoin('product', 'pesanan_item.produk_id', '=', 'product.id')
                    ->select('product.nama_produk', 'product.gambar')
                    ->where('pesanan_item.pesanan_id', $order->id)
                    ->first();

                return [
                    'id' => $order->id,
                    'order_id' => $order->nomor_pesanan,
                    'status_pesanan' => $order->status_pembayaran ?? 'menunggu',
                    'total_harga' => $order->total_bayar ?? 0,
                    'created_at' => $order->created_at,
                    'nama_produk' => $item->nama_produk ?? 'Produk Tidak Ditemukan',
                    'gambar_url' => $item->gambar ?? null,
                    'jumlah_item' => $jumlahItem // Tambahkan ini agar bisa dipakai di frontend
                ];
            });

            return response()->json($data, 200);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Backend Error: ' . $e->getMessage()], 500);
        }
    }
        
    public function show(Request $request, $order_id)
    {
        $clerkId = $request->query('clerk_id');

        // 1. Ambil data pesanan
        $order = DB::table('pesanan')
            ->where('nomor_pesanan', $order_id) 
            ->where('clerk_id', $clerkId)
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Pesanan tidak ditemukan'], 404);
        }

        // 2. AMBIL SEMUA PRODUK (Gunakan ->get(), BUKAN ->first())
        $items = DB::table('pesanan_item')
            ->join('product', 'pesanan_item.produk_id', '=', 'product.id')
            ->select('pesanan_item.*', 'product.nama_produk', 'product.gambar')
            ->where('pesanan_item.pesanan_id', $order->id)
            ->get(); // <--- GANTI JADI ->get()

        return response()->json([
            'id' => $order->id,
            'order_id' => $order->nomor_pesanan,
            'status_pesanan' => $order->status_pembayaran ?? 'menunggu',
            'created_at' => $order->created_at,
            'metode_pembayaran' => $order->metode_pembayaran ?? '-',
            'kurir_pengiriman' => $order->metode_pengiriman ?? '-',
            'nomor_resi' => 'Belum tersedia',
            'nama_penerima' => $order->nama_pembeli,
            'nomor_telepon' => $order->whatsapp_pembeli,
            'alamat_lengkap' => $order->alamat_kirim,
            
            // 3. KIRIM SEMUA ITEM SEBAGAI ARRAY
            'items' => $items, 
            
            'total_harga' => $order->total_bayar ?? 0,
        ], 200);
    }
   public function store(Request $request)
{
    // 1. Validasi semua field yang wajib ada di database 'pesanan'
    $request->validate([
        'order_id'         => 'required|string',
        'clerk_id'         => 'required|string',
        'customer_name'    => 'required|string',
        'customer_phone'   => 'required|string',
        'shipping_address' => 'required|string',
        'shipping_method'  => 'required|string',
        'grand_total'      => 'required|numeric',
        'items'            => 'required|array'
    ]);

    try {
        DB::beginTransaction();

        // 2. Simpan ke tabel 'pesanan' dengan semua kolom wajib
        $pesananId = DB::table('pesanan')->insertGetId([
            'nomor_pesanan'     => $request->order_id,
            'clerk_id'          => $request->input('clerk_id'),
            'nama_pembeli'      => $request->customer_name,
            'whatsapp_pembeli'  => $request->customer_phone,
            'alamat_kirim'      => $request->shipping_address,
            'metode_pengiriman' => $request->shipping_method,
            'total_bayar'       => $request->grand_total,
            'status_pembayaran' => 'menunggu',
            'metode_pembayaran' => $request->payment_type ?? 'Midtrans Gateway',
            'token_snap'        => null,
            'catatan'           => null,
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);

        // 3. Simpan ke tabel 'pesanan_item' (TANPA kolom nama_produk karena tidak ada di DB)
        foreach ($request->items as $item) {
            $subtotalItem = $item['harga_jual'] * $item['quantity'];
            
            DB::table('pesanan_item')->insert([
                'pesanan_id'   => $pesananId,
                'produk_id'    => $item['id'],
                'jumlah'       => $item['quantity'],
                'harga_satuan' => $item['harga_jual'],
                'subtotal'     => $subtotalItem,
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        }

        DB::commit();

        return response()->json([
            'message' => 'Pesanan berhasil dicatat di database lokal!',
            'db_pesanan_id' => $pesananId
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();
        // Log error untuk mempermudah pengecekan jika gagal lagi
        \Log::error('Gagal simpan pesanan: ' . $e->getMessage());
        
        return response()->json(['error' => 'Gagal simpan ke DB Lokal: ' . $e->getMessage()], 500);
    }
}
private function getFriendlyPaymentMethod($order)
{
    // Jika tidak ada data spesifik, kembali ke default
    if (empty($order->payment_type)) return 'Midtrans Gateway';

    $type = strtolower($order->payment_type);
    $bank = strtolower($order->bank ?? '');

    switch ($type) {
        case 'qris': 
            return 'QRIS (E-Wallet)';
        case 'gopay': 
            return 'GoPay';
        case 'bank_transfer': 
            return 'Transfer Bank (' . strtoupper($bank) . ')';
        case 'echannel': 
            return 'Mandiri Bill Payment';
        case 'shopeepay': 
            return 'ShopeePay';
        default: 
            return ucwords(str_replace('_', ' ', $type));
    }
}
}