<?php

namespace App\Livewire\Admin\LaporanPenjualan;

use Livewire\Component;
use App\Models\Pesanan;
use App\Models\PesananItem;
use Livewire\WithPagination;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;


class Index extends Component
{
    use WithPagination;

    public $search = '';
    public $paginate = 10;
    

    public function updatingSearch() { $this->resetPage(); }

    public function exportPdf()
    {
        $pesananData = \App\Models\Pesanan::with(['items.product'])
            ->where('status_pengiriman', 'selesai')
            ->where(function ($query) {
                $query->where('nama_pembeli', 'like', '%' . $this->search . '%')
                    ->orWhere('nomor_pesanan', 'like', '%' . $this->search . '%');
            })
            ->latest()
            ->get();

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan_penjualan', [
            'pesananData' => $pesananData
        ])->setPaper('a4', 'landscape'); 

        // 3. Stream download
        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'Laporan_Penjualan_Niaga_Jaya_' . date('Ymd_His') . '.pdf');
    }
    public function render()
    {
        // 1. Query dasar
        $query = Pesanan::query()
            ->where('status_pengiriman', 'selesai');

        // 2. Pencarian (tambahkan relasi jika perlu)
        if (!empty($this->search)) {
            $query->where(function($q) {
                $q->where('nomor_pesanan', 'like', '%' . $this->search . '%')
                ->orWhere('nama_pembeli', 'like', '%' . $this->search . '%')
                ->orWhereHas('items.product', function($sub) {
                    $sub->where('nama_produk', 'like', '%' . $this->search . '%');
                });
            });
        }

        $dataPenjualan = $query->with(['items.product']) 
                            ->latest()
                            ->paginate((int) $this->paginate);

        $statsQuery = clone $query;
        $totalPendapatan = (clone $query)->sum('total_bayar');
        $totalTransaksi = (clone $query)->count();
        $totalProduk = PesananItem::whereIn(
            'pesanan_id',
            (clone $query)->pluck('id')
        )->sum('jumlah');

        return view('livewire.admin.laporan-penjualan.index', [
            'dataPenjualan'   => $dataPenjualan,
            'totalPendapatan' => $totalPendapatan,
            'totalTransaksi'  => $totalTransaksi,
            'totalProduk'     => $totalProduk
        ]);
    }
}
