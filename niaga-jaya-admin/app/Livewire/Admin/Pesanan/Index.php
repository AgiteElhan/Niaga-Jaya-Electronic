<?php

namespace App\Livewire\Admin\Pesanan;

use App\Models\Pesanan;
use App\Models\PesananItem;
use Livewire\Component;
use Livewire\WithPagination;


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
