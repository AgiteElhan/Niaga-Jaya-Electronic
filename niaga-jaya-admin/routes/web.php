<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanCetakController;


// Route::get('/', function () {
//     return view('welcome');
// });

Route::view('/', 'auth.login');

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

    Route::get('/banner', function () {
        return view('admin.banner.index');
    })->name('banner');

    Route::get('/pesanan', function () {
        return view('admin.pesanan.index');
    })->name('pesanan');

    Route::get('/stok-masuk', function () {
        return view('admin.stok-masuk.index');
    })->name('stok-masuk');

    Route::get('/laporan-penjualan', function () {
        return view('admin.laporan-penjualan.index');
    })->name('laporan-penjualan');

    Route::get('/laporan-stok', function () {
        return view('admin.laporan-stok.index');
    })->name('laporan-stok');

    Route::get('/laporan/stok/pdf', [LaporanCetakController::class, 'cetakStokProduk'])->name('laporan.stok.pdf');

    Route::get('/stok-masuk/{id}/pdf', [LaporanCetakController::class, 'cetakNotaStokMasuk'])->name('stok-masuk.pdf');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
