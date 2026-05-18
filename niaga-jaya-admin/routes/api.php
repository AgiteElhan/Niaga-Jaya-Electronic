<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\UlasanController;
use App\Http\Controllers\Api\ClerkWebhookController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/banners', [BannerController::class, 'index']);

Route::get('/categories', [App\Http\Controllers\Api\CategoryController::class, 'index']);

Route::get('/products/{productId}/reviews', [UlasanController::class, 'getByProduct']);

Route::post('/clerk-webhook', [ClerkWebhookController::class, 'handleWebhook']);
