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
    public $status_pengiriman; 
    public $produk; 
    public $nomor_resi;

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

        // 2. Load view laporan
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan_pesanan', [
            'pesananData' => $pesananData
        ])->setPaper('a4', 'landscape'); // <-- UBAH PORTRAIT MENJADI LANDSCAPE DI SINI

        // 3. Stream download
        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'Laporan_Pesanan_Niaga_Jaya_' . date('Ymd_His') . '.pdf');
    }


    public function updatingSearch()
    {
        $this->resetPage();
    }

   public function editStatus($id)
    {
        $pesanan = Pesanan::with('items.product')->findOrFail($id);

        $this->pesanan_id        = $pesanan->id;
        $this->nama_pembeli      = $pesanan->nama_pembeli;
        $this->whatsapp_pembeli  = $pesanan->whatsapp_pembeli; // <-- Sudah disesuaikan
        $this->total_bayar       = 'Rp ' . number_format($pesanan->total_bayar, 0, ',', '.'); // <-- Sudah disesuaikan
        $this->status_pengiriman = $pesanan->status_pengiriman; 
        $this->nomor_resi = $pesanan->nomor_resi; 

        // Logika Menggabungkan Produk menjadi 1 teks
        $daftarProduk = [];
        foreach ($pesanan->items as $item) {
            $nama = $item->product ? $item->product->nama_produk : 'Produk Dihapus/Tidak Valid';
            $daftarProduk[] = $nama . ' (x' . $item->jumlah . ')';
        }
        $this->produk = implode(', ', $daftarProduk);
        
        $this->dispatch('openUpdateStatusModal');
    }
    
   public function updateStatus()
    {
        // Validasi
        $rules = [
            'status_pengiriman' => 'required',
        ];

        // Jika statusnya dikirim, maka nomor resi Wajib diisi
        if ($this->status_pengiriman === 'dikirim') {
            $rules['nomor_resi'] = 'required';
        }

        $this->validate($rules, [
            'status_pengiriman.required' => 'Status pengiriman harus dipilih.',
            'nomor_resi.required' => 'Nomor Resi wajib diisi jika statusnya dikirim.'
        ]);

        $pesanan = Pesanan::with('items.product')->findOrFail($this->pesanan_id);

        $statusLama = $pesanan->status_pengiriman;

        $pesanan->status_pengiriman = $this->status_pengiriman;

        // Hanya simpan no resi jika statusnya dikirim
        if ($this->status_pengiriman === 'dikirim') {
            $pesanan->nomor_resi = $this->nomor_resi;
        }

        if ($statusLama !== 'dikirim' && $this->status_pengiriman === 'dikirim') {

            foreach ($pesanan->items as $item) {

                if ($item->product) {

                    $item->product->decrement('stok', $item->jumlah);

                }

            }

        }

        $pesanan->save();

        $this->dispatch('closeUpdateStatusModal');
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
