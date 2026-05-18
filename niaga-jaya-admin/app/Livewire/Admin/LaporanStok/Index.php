<?php

namespace App\Livewire\Admin\LaporanStok;

use Livewire\Component;
use App\Models\Product;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public $kode_produk;
    public $nama_produk;
    public $kategori_id;
    public $merk_id;
    public $harga_jual;
    public $harga_discount;
    public $stok;
    public $deskripsi;
    public $gambar;
    public $selectedProduct;


    public $delete_id;
    public $product_id;
    public $gambar_lama;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'kode_produk'                  => 'required',
        'nama_produk'                  => 'required',
        'kategori_id'                   => 'required',
        'merk_id'                       => 'required',
        'harga_jual'                    => 'required',
        'harga_discount'                => 'nullable',
        'stok'                          => 'required',
        'deskripsi'                     => 'required',
        'gambar'                        => 'required|image|mimes:jpg,jpeg,png|max:2048',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function showDetail($id)
    {
        // Mengambil data produk beserta relasi kategori dan merknya
        $this->selectedProduct = \App\Models\Product::with(['kategori', 'merk'])->find($id);
    }
    public function render()
    {
        $product = Product::with(['kategori', 'merk'])
            ->when($this->search, function ($query) {
                $query->where('nama_produk', 'like', '%' . $this->search . '%')
                    ->orWhere('kode_produk', 'like', '%' . $this->search . '%'); // Tambahkan pencarian kode juga
            })
            ->latest()
            ->paginate((int) $this->paginate);

        return view('livewire.admin.laporan-stok.index', [
            'dataProduct' => $product,
        ]);
    }
}
