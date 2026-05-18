<?php

namespace App\Livewire\Admin\Dashboard;

use Livewire\Component;

class Index extends Component
{
    public function render()
    {
        $totalPenjualan = \App\Models\Pesanan::where('status_pembayaran', 'success')->sum('total_bayar');

        $totalPurchaseCount = \App\Models\StokMasuk::count();

        $stokMenipis = \App\Models\Product::where('stok', '<', 10)->count();

        $totalProduk = \App\Models\Product::count();
        $totalProfit = \App\Models\Pesanan::where('status_pembayaran', 'success')->sum('total_bayar');

        $totalReturns = \App\Models\Pesanan::where('status_pembayaran', 'failed')->count();

        $totalItemsSold = \App\Models\StokMasukItem::sum('jumlah_masuk'); // Contoh alternatif data pengeluaran

        return view('livewire.admin.dashboard.index', [
            'totalProfit' => $totalProfit,
            'totalReturns' => $totalReturns,
            'totalItemsSold' => $totalItemsSold,
            'totalPenjualan' => $totalPenjualan,
            'totalPurchaseCount' => $totalPurchaseCount,
            'stokMenipis' => $stokMenipis,
            'totalProduk' => $totalProduk,
        ]);
    }
    // public function render()
    // {
    //     // 1. Total Penjualan (Sum dari kolom total_bayar di tabel pesanan)
    //     $totalPenjualan = \App\Models\Pesanan::where('status_pembayaran', 'success')->sum('total_bayar');

    //     // 2. Total Purchase (Menghitung stok masuk - Anda bisa menyesuaikan logic biayanya)
    //     // Jika tidak ada kolom harga beli di stok_masuk, kita bisa hitung total transaksi stok masuk
    //     $totalPurchaseCount = \App\Models\StokMasuk::count();

    //     // 3. Stok Menipis (Contoh: Mengambil jumlah produk yang stoknya < 10)
    //     $stokMenipis = \App\Models\Product::where('stok', '<', 10)->count();

    //     // 4. Total Produk (Menghitung semua jenis produk di gudang)
    //     $totalProduk = \App\Models\Product::count();

    //     return view('livewire.admin.dashboard.index', [
            
    //     ]);
    // }
}
