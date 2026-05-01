<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        // Hapus bagian ->where('is_active', true)
        $banners = Banner::all()->map(function($banner) {
            return [
                'id' => $banner->id,
                'nama_banner' => $banner->nama_banner,
                'image_url' => asset('storage/banner/' . ($banner->nama_gambar ?? $banner->gambar)),
            ];
        });

        return response()->json($banners);
    }
}