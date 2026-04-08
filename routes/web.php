<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::view('/', 'auth.login');

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return view('auth.login');
    })->name('login'); 
    Route::post('/', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
    
});


Route::middleware(['auth','role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function ()  {

    Route::get('/dashboard', function () {
        return view('admin.dashboard.index');
    })->name('dashboard');

   // --- KATEGORI ---
    Route::get('/kategori', function () {
        return view('admin.kategori.index');
    })->name('kategori');

    Route::get('/kategori/create', function () {
        return view('admin.kategori.create');
    })->name('kategori.create');

    Route::post('/kategori', function () {
        // Untuk proses simpan data nanti
    })->name('kategori.store');

     // --- MERK ---
    Route::get('/merk', function () {
        return view('admin.merk.index');
    })->name('merk');

    // --- PRODUCT ---
    Route::get('/product', function () {
        return view('admin.product.index');
    })->name('product');

    // --- SUPPLIER ---
    Route::get('/supplier', function () {
        return view('admin.supplier.index');
    })->name('supplier');

     Route::get('/user', function () {
        return view('admin.user.index');
    })->name('user');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__.'/auth.php';
