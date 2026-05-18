<?php

namespace App\Livewire\Admin\StokMasuk;

use Livewire\Component;
use App\Models\StokMasuk;
use App\Models\StokMasukItem;
use App\Models\Product;
use App\Models\Supplier;
use Livewire\WithPagination;
use Barryvdh\DomPDF\Facade\Pdf;


class Index extends Component
{
    use WithPagination;

    public $nomor_referensi;
	public $supplier_id;	
	public $tanggal_masuk;	
	public $catatan;
    public $stok_masuk_id;	
	public $produk_id;	
	public $jumlah_masuk;

    public $selectedStok; 
    public $delete_id;
    public $id_stok_masuk;
    public $id_stok_masuk_item;
    public $paginate = 10;
    public $search = '';
    public $itemBarang = []; 


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'nomor_referensi'                   =>'required',
        'supplier_id'                       =>'required',
        'tanggal_masuk'                     =>'required',
        'catatan'                           =>'required',
        'produk_id'                         =>'required',
        'jumlah_masuk'                      =>'required',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function showDetail($id)
    {
        $this->selectedStok = StokMasuk::with(['supplier', 'items.product'])->find($id);
    }

    public function exportPdf()
    {
        // Ambil data stok masuk beserta relasi supplier dan itemnya
        $stokMasukData = StokMasuk::with(['supplier', 'items.product'])
            ->where('nomor_referensi', 'like', '%' . $this->search . '%')
            ->latest()
            ->get();

        // Load view khusus cetakan PDF formal
        $pdf = Pdf::loadView('pdf.laporan-stok-masuk', [
            'stokMasukData' => $stokMasukData
        ])->setPaper('a4', 'portrait'); // <-- UBAH DI SINI: dari 'landscape' menjadi 'portrait'

        // Mengunduh berkas secara instan memanfaatkan stream internal bawaan Livewire
        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, 'Laporan_Stok_Masuk_' . date('Ymd_His') . '.pdf');
    }


    public function create()
    {
        $this->resetValidation();
        $this->reset(['nomor_referensi', 'supplier_id', 'tanggal_masuk', 'catatan']);
        
        // Inisialisasi 1 baris kosong saat modal dibuka
        $this->itemBarang = [
            ['produk_id' => '', 'jumlah_masuk' => 1]
        ];
        
        $this->tanggal_masuk = date('Y-m-d');
        $this->nomor_referensi = 'SM-' . date('Ymd') . '-' . rand(100, 999);
    }

    public function addInput()
    {
        $this->itemBarang[] = ['produk_id' => '', 'jumlah_masuk' => 1];
    }

    public function removeInput($index)
    {
        if (count($this->itemBarang) > 1) {
            unset($this->itemBarang[$index]);
            $this->itemBarang = array_values($this->itemBarang); // Reset index array
        }
    }

    public function store()
    {
        $this->validate([
            'nomor_referensi'               => 'required|unique:stok_masuk,nomor_referensi',
            'supplier_id'                   => 'required',
            'tanggal_masuk'                 => 'required|date',
            'itemBarang.*.produk_id'        => 'required',
            'itemBarang.*.jumlah_masuk'     => 'required|numeric|min:1',
        ], [
            'itemBarang.*.produk_id.required'       => 'Produk wajib dipilih!',
            'itemBarang.*.jumlah_masuk.required'    => 'Jumlah wajib diisi!',
        ]);

        \DB::transaction(function () {
            // 1. Simpan Header (stok_masuk)
            $stokMasuk = StokMasuk::create([
                'nomor_referensi' => $this->nomor_referensi,
                'supplier_id'     => $this->supplier_id,
                'tanggal_masuk'   => $this->tanggal_masuk,
                'catatan'         => $this->catatan,
            ]);

            // 2. Loop simpan Item dan Update Stok
            foreach ($this->itemBarang as $item) {
                $stokMasuk->items()->create([
                    'produk_id'    => $item['produk_id'],
                    'jumlah_masuk' => $item['jumlah_masuk'],
                ]);

                // Update stok di tabel produk
                $produk = Product::find($item['produk_id']);
                $produk->increment('stok', $item['jumlah_masuk']);
            }
        });

        $this->dispatch('closeCreateModalStokMasuk');
    }

    public function render()
    {
        $stokMasuk = StokMasuk::query()
            ->with(['supplier']) 
            ->when($this->search, function ($query) {
                $query->where(function ($subQuery) {
                    $subQuery->where('nomor_referensi', 'like', '%' . $this->search . '%')
                            ->orWhere('catatan', 'like', '%' . $this->search . '%')
                            // Jika ingin mencari berdasarkan nama supplier dari relasi
                            ->orWhereHas('supplier', function ($q) {
                                $q->where('nama_supplier', 'like', '%' . $this->search . '%');
                            })
                            ->orWhereHas('items.product', function ($p) {
                                $p->where('nama_produk', 'like', '%' . $this->search . '%');
                            });
                });
            })
            ->latest('tanggal_masuk') // Mengurutkan berdasarkan tanggal masuk terbaru
            ->paginate((int) $this->paginate);

        return view('livewire.admin.stok-masuk.index', [
            'dataStokMasuk' => $stokMasuk,
            // Gunakan cache atau batasi pengambilan jika data kategori/merk sangat banyak
            'product' => Product::orderBy('nama_produk', 'asc')->get(),
            'supplier' => Supplier::orderBy('nama_supplier', 'asc')->get(),
        ]);
    }
}
