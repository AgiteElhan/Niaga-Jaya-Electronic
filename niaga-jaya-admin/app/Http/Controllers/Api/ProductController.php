<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        // Mengambil data produk beserta relasi kategori dan merk
        // Menggunakan pagination atau get() sesuai kebutuhan Next.js
        $products = Product::with(['kategori', 'merk'])->latest()->get();

        // Menambahkan URL lengkap untuk gambar agar bisa dibaca Next.js
        $products->transform(function($product) {
            $product->gambar_url = asset('storage/products/' . $product->gambar);
            return $product;
        });

        return response()->json($products);
    }
}