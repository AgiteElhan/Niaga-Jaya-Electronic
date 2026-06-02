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
            'pesanan_id' => 'required',
            'produk_id' => 'required',
            'nama_pembeli' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string'
        ]);

        // Menggunakan Model (pastikan kolom ada di $fillable di model Ulasan)
        Ulasan::create([
            'pesanan_id'   => $validated['pesanan_id'],
            'produk_id'    => $validated['produk_id'],
            'nama_pembeli' => $validated['nama_pembeli'],
            'rating'       => $validated['rating'],
            'komentar'     => $validated['komentar'],
            'tampilkan'    => 1,
        ]);

        return response()->json(['message' => 'Ulasan berhasil disimpan'], 201);
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
