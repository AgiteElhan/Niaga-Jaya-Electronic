<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Ambil data dari tabel kategori
        return response()->json(Kategori::all());
    }
}
