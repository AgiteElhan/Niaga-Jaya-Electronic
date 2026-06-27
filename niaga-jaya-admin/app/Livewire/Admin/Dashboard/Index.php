<?php

namespace App\Livewire\Admin\Dashboard;

use Livewire\Component;
use App\Models\Pesanan;
use App\Models\PesananItem;
use App\Models\Product;
use App\Models\StokMasuk;
use App\Models\StokMasukItem;
use Illuminate\Support\Facades\DB;


class Index extends Component
{
    public function render()
    {
        // Data yang sudah ada (jangan diubah)

        $totalPenjualan = Pesanan::where('status_pengiriman', 'selesai')->sum('total_bayar');
        $totalPurchaseCount = StokMasuk::count();
        $stokMenipis = Product::where('stok', '<', 10)->count();
        $totalProduk = Product::count();
        $totalProfit = Pesanan::where('status_pengiriman', 'selesai')->sum('total_bayar');
        $totalReturns = Pesanan::where('status_pembayaran', 'failed')->count();
        $totalItemsSold = StokMasukItem::sum('jumlah_masuk');

        // Data untuk 3 Card UI (Menggunakan collect() untuk mencegah error null)
        $topProducts = PesananItem::select('produk_id', DB::raw('sum(jumlah) as total_terjual'))
            ->groupBy('produk_id')
            ->orderBy('total_terjual', 'desc')
            ->limit(5)
            ->with('product')
            ->get();

        $lowStock = Product::where('stok', '<', 10)
            ->orderBy('stok', 'asc')
            ->limit(5)
            ->get();

        $recentSales = Pesanan::latest()
            ->limit(5)
            ->get();

        $driver = DB::getDriverName();

        if ($driver === 'pgsql') {

            $salesData = Pesanan::selectRaw("
                EXTRACT(MONTH FROM created_at) as month,
                SUM(total_bayar) as total
            ")
            ->whereYear('created_at', now()->year)
            ->groupByRaw("EXTRACT(MONTH FROM created_at)")
            ->orderByRaw("EXTRACT(MONTH FROM created_at)")
            ->pluck('total', 'month')
            ->toArray();

        } else {

            $salesData = Pesanan::selectRaw("
                MONTH(created_at) as month,
                SUM(total_bayar) as total
            ")
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month')
            ->toArray();

        }

        $salesChart = [];

        for ($i = 1; $i <= 12; $i++) {
            $salesChart[] = $salesData[$i] ?? 0;
        }

    
        return view('livewire.admin.dashboard.index', [
            'totalProfit' => $totalProfit,
            'totalReturns' => $totalReturns,
            'totalItemsSold' => $totalItemsSold,
            'totalPenjualan' => $totalPenjualan,
            'totalPurchaseCount' => $totalPurchaseCount,
            'stokMenipis' => $stokMenipis,
            'totalProduk' => $totalProduk,
            'topProducts' => $topProducts,
            'lowStock' => $lowStock,
            'recentSales' => $recentSales,
            'salesChart' => json_encode($salesChart),
        ]);
    }
}