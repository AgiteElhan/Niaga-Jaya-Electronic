<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\UlasanController;
use App\Http\Controllers\Api\ClerkWebhookController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\MidtransController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/banners', [BannerController::class, 'index']);

Route::get('/categories', [App\Http\Controllers\Api\CategoryController::class, 'index']);

Route::get('/products/{productId}/reviews', [UlasanController::class, 'getByProduct']);

Route::post('/clerk-webhook', [ClerkWebhookController::class, 'handleWebhook']);

Route::post('/orders', [OrderController::class, 'store']);

Route::get('/orders/{order_id}', [OrderController::class, 'show']);

Route::get('/orders', [OrderController::class, 'index']);

Route::post('/reviews', [UlasanController::class, 'store']);

Route::post('/midtrans-callback', [MidtransController::class, 'callback']);

Route::post('/orders/{id}/receive', [OrderController::class, 'receiveOrder']);
Route::get('/filters', [ProductController::class, 'getFilters']);