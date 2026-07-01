<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\CoreApi;
use Illuminate\Support\Facades\DB;
use Exception;

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
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Pesanan tidak ditemukan'], 404);
        }

        $order->payment_response =
        json_decode($order->payment_response, true);

        // 2. AMBIL SEMUA PRODUK 
        $items = DB::table('pesanan_item')
            ->join('product', 'pesanan_item.produk_id', '=', 'product.id')
            ->select('pesanan_item.*', 'product.nama_produk', 'product.gambar')
            ->where('pesanan_item.pesanan_id', $order->id)
            ->get(); 

        // 3. CEK APAKAH ULASAN SUDAH ADA UNTUK PESANAN INI
        $isReviewed = DB::table('ulasan')
            ->where('pesanan_id', $order->id)
            ->exists();

        return response()->json([
            'id' => $order->id,
            'order_id' => $order->nomor_pesanan,
            'status_pesanan' => $order->status_pembayaran ?? 'menunggu',
            'created_at' => $order->created_at,
            'metode_pembayaran' => $order->metode_pembayaran ?? '-',
            'kurir_pengiriman' => $order->metode_pengiriman ?? '-',
            
            // --- PERBAIKAN DI SINI ---
            'status_pengiriman' => $order->status_pengiriman ?? 'menunggu', // Tambahkan ini
            'nomor_resi' => $order->nomor_resi ?? '-', // Ganti agar mengambil dari database
            'payment_response' => $order->payment_response,

            'nama_penerima' => $order->nama_pembeli,
            'nomor_telepon' => $order->whatsapp_pembeli,
            'alamat_lengkap' => $order->alamat_kirim,
            
            // 4. KIRIM SEMUA ITEM SEBAGAI ARRAY
            'items' => $items, 
            
            'total_harga' => $order->total_bayar ?? 0,

            // 5. STATUS ULASAN DIKIRIM KE REACT
            'is_reviewed' => $isReviewed,
        ], 200);
    }

    public function paymentDetail($orderId)
    {
        $order = DB::table('pesanan')
            ->where('nomor_pesanan', $orderId)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan'
            ], 404);
        }

        $paymentResponse = null;

        if (!empty($order->payment_response)) {
            $paymentResponse = json_decode($order->payment_response, true);
        }

        return response()->json([
            'order_id' => $order->nomor_pesanan,
            'total_bayar' => $order->total_bayar,
            'status_pembayaran' => $order->status_pembayaran,
            'metode_pembayaran' => $order->metode_pembayaran,
            'payment_response' => $paymentResponse
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id'         => 'required|string',
            'clerk_id'         => 'required|string',
            'customer_name'    => 'required|string',
            'customer_phone'   => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_method'  => 'required|string',
            'payment_type'     => 'required|string',
            'grand_total'      => 'required|numeric',
            'items'            => 'required|array'
        ]);

        try {
            DB::beginTransaction();

            foreach ($request->items as $item) {
                $produk = DB::table('product')->where('id', $item['id'])->first();
                if (!$produk) {
                    DB::rollBack();
                    return response()->json(['error' => "Produk tidak ditemukan di sistem."], 404);
                }

                if ($item['quantity'] > $produk->stok) { 
                    DB::rollBack(); // Batalkan semua proses simpan
                    return response()->json([
                        'error' => "Maaf, stok '{$produk->nama_produk}' tidak mencukupi. Sisa stok: {$produk->stok}"
                    ], 400); 
                }
            }

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

            Config::$serverKey = config('services.midtrans.serverKey');
            Config::$isProduction = config('services.midtrans.isProduction');
            Config::$isSanitized = config('services.midtrans.isSanitized');
            Config::$is3ds = config('services.midtrans.is3ds');

            $midtransPayload = [];

            $paymentType = $request->payment_type;

            switch ($paymentType) {

                case 'qris':

                    $midtransPayload = [
                        'payment_type' => 'qris',
                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | BCA Virtual Account
                |--------------------------------------------------------------------------
                */
                case 'bca_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'bca'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | BNI Virtual Account
                |--------------------------------------------------------------------------
                */
                case 'bni_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'bni'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | BRI Virtual Account
                |--------------------------------------------------------------------------
                */
                case 'bri_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'bri'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | Mandiri Bill Payment
                |--------------------------------------------------------------------------
                */
                case 'mandiri_va':

                    $midtransPayload = [
                        'payment_type' => 'echannel',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'echannel' => [
                            'bill_info1' => 'Payment',
                            'bill_info2' => 'Niaga Jaya Electronic'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | Permata VA
                |--------------------------------------------------------------------------
                */
                case 'permata_va':

                    $midtransPayload = [
                        'payment_type' => 'permata',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | CIMB Niaga VA
                |--------------------------------------------------------------------------
                */
                case 'cimb_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'cimb'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | BSI VA
                |--------------------------------------------------------------------------
                */
                case 'bsi_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'bsi'
                        ]
                    ];

                    break;


                /*
                |--------------------------------------------------------------------------
                | SeaBank VA
                |--------------------------------------------------------------------------
                */
                case 'seabank_va':

                    $midtransPayload = [
                        'payment_type' => 'bank_transfer',

                        'transaction_details' => [
                            'order_id' => $request->order_id,
                            'gross_amount' => (int)$request->grand_total,
                        ],

                        'bank_transfer' => [
                            'bank' => 'seabank'
                        ]
                    ];

                    break;


                default:

                    throw new Exception("Metode pembayaran tidak didukung.");
            }
        



            \Log::info('MIDTRANS PAYLOAD', $midtransPayload);

         \Log::info('MIDTRANS CONFIG', [
    'server_key' => \Midtrans\Config::$serverKey,
    'is_production' => \Midtrans\Config::$isProduction,
    'merchant_id' => config('services.midtrans.merchantId'),
]);

\Log::info('MIDTRANS PAYLOAD', $midtransPayload);

$midtransResponse = CoreApi::charge($midtransPayload);

\Log::info('MIDTRANS RESPONSE', json_decode(json_encode($midtransResponse), true));           
            DB::commit();

            DB::table('pesanan')
                ->where('id', $pesananId)
                ->update([
                    'payment_response' => json_encode($midtransResponse)
                ]);

            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat',

                'order_id' => $request->order_id,

                'payment_type' => $request->payment_type,

                'payment_data' => $midtransResponse

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
    /**
     * Memperbarui status pesanan menjadi selesai (diterima oleh pembeli)
     */
    public function receiveOrder(Request $request, $id)
    {
        try {
            $pesanan = \App\Models\Pesanan::find($id);

            if (!$pesanan) {
                return response()->json(['message' => 'Pesanan tidak ditemukan.'], 404);
            }

            // Cukup update status_pengiriman saja
            // Karena status pembayaran sudah dipegang oleh Midtrans
            $pesanan->status_pengiriman = 'selesai'; 
            
            $pesanan->save();

            return response()->json([
                'success' => true,
                'message' => 'Pesanan telah diterima oleh pembeli.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupdate status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function cancelOrder($id)
    {
        $pesanan = DB::table('pesanan')
            ->where('id', $id)
            ->first();

        if (!$pesanan) {
            return response()->json([
                'message' => 'Pesanan tidak ditemukan'
            ], 404);
        }

        if ($pesanan->status_pembayaran !== 'menunggu') {
            return response()->json([
                'message' => 'Pesanan tidak dapat dibatalkan'
            ], 400);
        }

        DB::table('pesanan')
            ->where('id', $id)
            ->update([
                'status_pembayaran' => 'dibatalkan',
                'updated_at' => now()
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibatalkan'
        ]);
    }
}