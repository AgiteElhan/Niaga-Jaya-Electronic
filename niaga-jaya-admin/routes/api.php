<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BannerController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Pastikan penulisan Route dimulai dengan huruf kapital R
Route::get('/products', [ProductController::class, 'index']);

// Pastikan diletakkan di luar middleware auth agar bisa diakses Next.js publik
Route::get('/banners', [BannerController::class, 'index']);
