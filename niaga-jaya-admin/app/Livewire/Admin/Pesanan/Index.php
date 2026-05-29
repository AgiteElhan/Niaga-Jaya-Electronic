<?php

namespace App\Livewire\Admin\Pesanan;

use App\Models\Pesanan;
use App\Models\PesananItem;
use Livewire\Component;
use Livewire\WithPagination;
use Barryvdh\DomPDF\Facade\Pdf;



class Index extends Component
{
    use WithPagination;

    public $nama_pembeli;
    public $nomor_pesanan;
    public $whatsapp_pembeli;
    public $alamat_kirim;
    public $metode_pengiriman;	
	public $total_bayar;
    public $status_pembayaran;	
	public $metode_pembayaran;
	public $token_snap;
	public $catatan;
    public $pesanan_id;
	public $produk_id;
	public $jumlah;	
	public $harga_satuan;	
	public $subtotal;

    public $selectedOrder; 

    public $delete_id;
    public $id_pesanan;
    public $id_pesanan_item;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'nama_pembeli'                  => 'required',
        'nomor_pesanan'                 => 'required',
    ];


    public function viewOrder($id)
    {
        // Menggunakan Eager Loading agar data items dan product ikut terbawa
        $this->selectedOrder = Pesanan::with(['items.product'])->find($id);
        
        // Memberitahu browser untuk menampilkan modal (asumsi menggunakan JS standar)
        $this->dispatch('show-order-modal'); 
    }
    public function exportPdf()
    {
        // 1. Ambil data pesanan beserta relasi item dan produk
        // Kita gunakan 'latest()' agar yang terbaru muncul di atas
        $pesananData = \App\Models\Pesanan::with(['items.product'])
            ->where(function ($query) {
                $query->where('nama_pembeli', 'like', '%' . $this->search . '%')
                    ->orWhere('nomor_pesanan', 'like', '%' . $this->search . '%');
            })
            ->latest()
            ->get();

        // 2. Load view laporan (Anda bisa membuat file baru: resources/views/pdf/laporan-pesanan.blade.php)
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan_pesanan', [
            'pesananData' => $pesananData
        ])->setPaper('a4', 'portrait');

        // 3. Stream download
        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'Laporan_Pesanan_Niaga_Jaya_' . date('Ymd_His') . '.pdf');
    }


    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function render()
    {
        $pesanan = Pesanan::query()
            ->when($this->search, function ($query) {
                $query->where(function ($subQuery) {
                    $subQuery->where('nama_pembeli', 'like', '%' . $this->search . '%')
                            ->orWhere('nomor_pesanan', 'like', '%' . $this->search . '%') // Sesuaikan nama kolom nomor pesanan
                            ->orWhere('whatsapp_pembeli', 'like', '%' . $this->search . '%'); // Sesuaikan nama kolom WA
                });
            })
            ->latest()
            ->paginate((int) $this->paginate);

        return view('livewire.admin.pesanan.index', [
            'dataPesanan' => $pesanan,
        ]);
    }
}
