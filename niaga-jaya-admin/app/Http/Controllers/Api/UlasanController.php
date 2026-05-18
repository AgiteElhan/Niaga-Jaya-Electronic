<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ulasan;

class UlasanController extends Controller
{
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
