<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['kategori', 'merk'])->latest()->get();

        $products->transform(function($product) {
            // Gunakan fungsi asset() agar link otomatis benar (http://127.0.0.1:8000/...)
            // Tanpa kurung siku atau format markdown yang bikin error di Next.js
            if ($product->gambar) {
                $product->gambar_url = asset('storage/products/' . $product->gambar);
            } else {
                $product->gambar_url = asset('storage/products/placeholder.png');
            }
            
            return $product;
        });

        // 3. Kembalikan data dalam format JSON
        return response()->json($products);
    }

    public function show($id)
    {
        try {
            // 1. Ambil data dengan relasi kategori dan merk
            $product = Product::with(['kategori', 'merk'])->findOrFail($id);

            // 2. Transform URL gambar menjadi string BERSIH tanpa kurung siku/biasa
            // asset() otomatis akan menghasilkan http://127.0.0.1:8000/storage/products/nama_file.jpg
            if ($product->gambar) {
                $product->gambar_url = asset('storage/products/' . $product->gambar);
            } else {
                // Fallback jika gambar tidak ada di record
                $product->gambar_url = asset('storage/products/placeholder.png');
            }

            return response()->json($product);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Data tidak ada di database'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan server'], 500);
        }
    }
}