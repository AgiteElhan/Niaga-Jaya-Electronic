<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Ulasan;

class UlasanController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pesanan_id' => 'required', // Ini adalah ID dari tabel pesanan
            'product_id' => 'required',
            'nama_pembeli' => 'required|string', // Sesuai kolom nama_pembeli
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string'
        ]);

        try {
            DB::table('ulasan')->insert([
                'pesanan_id' => $validated['pesanan_id'],
                'produk_id'  => $validated['product_id'],
                'nama_pembeli' => $validated['nama_pembeli'],
                'rating'     => $validated['rating'],
                'komentar'   => $validated['komentar'],
                'tampilkan'  => 1, // Default tampil
                'created_at' => now(),
            ]);

            return response()->json(['message' => 'Ulasan berhasil disimpan'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function getByProduct($productId)
    {
        // Hanya mengambil ulasan yang disetujui untuk ditampilkan (tampilkan = 1)
        $ulasan = Ulasan::where('produk_id', $productId)
                        ->where('tampilkan', 1)
                        ->latest()
                        ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $ulasan
        ], 200);
    }
}
