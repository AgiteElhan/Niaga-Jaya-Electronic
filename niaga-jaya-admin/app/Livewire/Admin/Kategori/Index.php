<?php

namespace App\Livewire\Admin\Kategori;

use Livewire\Component;
use App\Models\Kategori;
use Livewire\WithPagination;
use Carbon\Carbon;

class Index extends Component
{
    use WithPagination;

    public $nama_kategori;
    public $deskripsi;

    public $delete_id;
    public $kategori_id;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'nama_kategori'             => 'required',
        'deskripsi'                 => 'required',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'nama_kategori',
            'deskripsi',
        ]);
    }

    public function store()
    {
        $this->validate([
            'nama_kategori'            => 'required',
            'deskripsi'                => 'required',
        ],
        [
            'nama_kategori.required'           => 'Nama Kategori wajib diisi!',
            'deskripsi.required'               => 'Deskripsi wajib diisi!',
        ]);

        $kategori = new Kategori;
        $kategori->nama_kategori            = $this->nama_kategori;
        $kategori->deskripsi                = $this->deskripsi;
        $kategori->save();

        $this->dispatch('closeCreateModalKategori');

    }

    public function edit($id){
        $this->resetValidation();
        $kategori = Kategori::findOrFail($id);
        $this->nama_kategori                            = $kategori->nama_kategori;
        $this->deskripsi                                = $kategori->deskripsi;
        $this->kategori_id                              = $kategori->id;
    }

    public  function update(){
        $kategori = Kategori::findOrFail($this->kategori_id);
        $this->validate([
            'nama_kategori'             => 'required',
            'deskripsi'                 => 'required',
        ], 
        [
            'nama_kategori.required'            => 'Nama Kategori wajib diisi!',
            'deskripsi.required'                => 'Deskripsi wajib dipilih',
        ]);

        $kategori->nama_kategori            = $this->nama_kategori;
        $kategori->deskripsi                = $this->deskripsi;
        $kategori->save();

        $this->dispatch('closeEditModalKategori');
    }

    public function confirm($id = null){
        if(!$id) return;

        $kategori = Kategori::findOrFail($id);

        $this->nama_kategori = $kategori->nama_kategori;
        $this->deskripsi = $kategori->deskripsi;
        $this->kategori_id = $kategori->id;

        $this->dispatch('openDeleteModalKategori'); // 🔥 buka modal dari sini
    }

    public function destroy()
    {
        $kategori = Kategori::findOrFail($this->kategori_id);
        $kategori->delete();

        $this->dispatch('closeDeleteModalKategori');
    }
    

    public function render()
    {

        // if ($this->startDate && $this->endDate) {
        //     $sampah->whereBetween('created_at', [
        //         Carbon::parse($this->startDate)->startOfDay(),
        //         Carbon::parse($this->endDate)->endOfDay(),
        //     ]);
        // }

        $kategori = Kategori::query()
            ->when($this->search, function ($query) {
                $query->where('nama_kategori', 'like', '%' . $this->search . '%');
            })
            ->latest() // Sama dengan orderBy('created_at', 'desc')
            // 4. Paksa (int) pada paginate untuk menghindari error "non-numeric"
            ->paginate((int) $this->paginate); 

        return view('livewire.admin.kategori.index', [
            'dataKategori' => $kategori,
        ]);
    }
}
