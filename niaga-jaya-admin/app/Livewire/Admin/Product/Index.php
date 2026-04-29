<?php

namespace App\Livewire\Admin\Product;

use Livewire\Component;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Kategori;
use App\Models\Merk;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;


class Index extends Component
{
    use WithFileUploads;
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

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'kode_produk',
            'nama_produk',
            'kategori_id',
            'merk_id',
            'harga_jual',
            'harga_discount',
            'stok',
            'deskripsi',
            'gambar',
        ]);
    }

    public function store()
    {
        $this->validate([
            'kode_produk'    => 'required|unique:product,kode_produk',
            'nama_produk'    => 'required',
            'kategori_id'    => 'required',
            'merk_id'        => 'required',
            'harga_jual'     => 'required|numeric|min:0',
            'harga_discount' => 'nullable|numeric|min:0',
            'stok'           => 'required|integer|min:0',
            'deskripsi'      => 'required', 
            'gambar'         => 'required|image|max:2048',
        ],[
            'kode_produk.required'   => 'Kode produk tidak boleh kosong.',
            'kode_produk.unique'     => 'Kode produk sudah terdaftar di sistem.',
            'nama_produk.required'   => 'Nama produk wajib diisi.',
            'kategori_id.required'   => 'Kategori wajib diisi.',
            'merk_id.required'       => 'Merk wajib diisi.',
            'harga_jual.required'    => 'Harga wajib diisi.',
            'harga_jual.numeric'     => 'Harga harus berupa angka.',
            'harga_jual.min'         => 'Harga tidak boleh negatif.',
            'stok.required'          => 'Stok wajib diisi.',
            'stok.integer'           => 'Stok harus berupa angka bulat.',
            'deskripsi.required'     => 'Deskripsi produk wajib diisi.',
            'gambar.required'        => 'Gambar wajib diisi.',
            'gambar.image'           => 'File harus berupa gambar.',
            'gambar.max'             => 'Ukuran gambar maksimal 2MB.',
        ]);

        $namaGambar = time() . '.' . $this->gambar->extension();
        $this->gambar->storeAs('products', $namaGambar, 'public');

        $product = new Product;
        $product->kode_produk   = $this->kode_produk;
        $product->nama_produk   = $this->nama_produk;
        $product->kategori_id    = $this->kategori_id;
        $product->merk_id        = $this->merk_id;
        $product->harga_jual     = $this->harga_jual;
        $product->harga_discount = $this->harga_discount;
        $product->stok           = $this->stok;
        $product->deskripsi      = $this->deskripsi;
        $product->gambar         = $namaGambar; // simpan nama file saja
        $product->save();

        $this->dispatch('closeCreateModalProduk');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        $this->product_id      = $product->id;
        $this->kode_produk    = $product->kode_produk;
        $this->nama_produk    = $product->nama_produk;
        $this->kategori_id     = $product->kategori_id;
        $this->merk_id         = $product->merk_id;
        $this->harga_jual      = $product->harga_jual;
        $this->harga_discount  = $product->harga_discount;
        $this->stok            = $product->stok;
        $this->deskripsi       = $product->deskripsi;

        $this->gambar_lama     = $product->gambar;
        $this->gambar          = null; // reset upload
    }

    public function update()
    {
        $this->validate([
            'kode_produk'   => 'required',
            'nama_produk'   => 'required',
            'kategori_id'    => 'required',
            'merk_id'        => 'required',
            'harga_jual'     => 'required',
            'harga_discount' => 'nullable',
            'stok'           => 'required',
            'deskripsi'      => 'required',
            'gambar'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $product = Product::findOrFail($this->product_id);

        // 🔥 cek apakah upload gambar baru
        if ($this->gambar) {

            // hapus gambar lama
            if ($this->gambar_lama) {
                Storage::disk('public')->delete('products/' . $this->gambar_lama);
            }

            // simpan gambar baru
            $namaGambar = time() . '.' . $this->gambar->extension();
            $this->gambar->storeAs('products', $namaGambar, 'public');

            $product->gambar = $namaGambar;
        }

        // update data lain
        $product->kode_produk   = $this->kode_produk;
        $product->nama_produk   = $this->nama_produk;
        $product->kategori_id    = $this->kategori_id;
        $product->merk_id        = $this->merk_id;
        $product->harga_jual     = $this->harga_jual;
        $product->harga_discount = $this->harga_discount;
        $product->stok           = $this->stok;
        $product->deskripsi      = $this->deskripsi;

        $product->save();

        $this->dispatch('closeEditModalProduk');
    }

    public function confirm($id = null){
        if(!$id) return;

        $product = Product::findOrFail($id);

        $this->kode_produk         = $product->kode_produk;
        $this->nama_produk         = $product->nama_produk;
        $this->kategori_id          = $product->kategori_id;
        $this->merk_id              = $product->merk_id;
        $this->harga_jual           = $product->harga_jual;
        $this->harga_discount       = $product->harga_discount;
        $this->stok                 = $product->stok;
        $this->deskripsi            = $product->deskripsi;
        $this->product_id              = $product->id;

        $this->dispatch('openDeleteModalProduk'); 
    }

    public function destroy()
    {
        $product = Product::findOrFail($this->product_id);
        $product->delete();

        $this->dispatch('closeDeleteModalProduk');
    }

    public function render()
    {
        // 1. Ambil data produk dengan relasi (Eager Loading)
        $product = Product::with(['kategori', 'merk'])
            ->when($this->search, function ($query) {
                $query->where('nama_produk', 'like', '%' . $this->search . '%')
                    ->orWhere('kode_produk', 'like', '%' . $this->search . '%'); // Tambahkan pencarian kode juga
            })
            ->latest()
            ->paginate((int) $this->paginate);

        return view('livewire.admin.product.index', [
            'dataProduct' => $product,
            // Gunakan cache atau batasi pengambilan jika data kategori/merk sangat banyak
            'kategori' => Kategori::orderBy('nama_kategori', 'asc')->get(),
            'merk' => Merk::orderBy('nama_merk', 'asc')->get(),
        ]);
    }
}