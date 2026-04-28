<?php

namespace App\Livewire\Admin\Merk;

use Livewire\Component;
use Carbon\Carbon;
use App\Models\Merk ;
use Livewire\WithPagination;


class Index extends Component
{
    use WithPagination;

    public $nama_merk;
    public $keterangan;

    public $delete_id;
    public $merk_id;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'nama_merk'                  => 'required',
        'keterangan'                 => 'required',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'nama_merk',
            'keterangan',
        ]);
    }

    public function store()
    {
        $this->validate([
            'nama_merk'                     => 'required',
            'keterangan'                    => 'required',
        ],
        [
            'nama_merk.required'            => 'Nama Merk wajib diisi!',
            'keterangan.required'           => 'Keterangan wajib diisi!',
        ]);

        $merk = new Merk;
        $merk->nama_merk                    = $this->nama_merk;
        $merk->keterangan                   = $this->keterangan;
        $merk->save();

        $this->dispatch('closeCreateModalMerk');
    }

    public function edit($id){
        $this->resetValidation();
        $merk = Merk::findOrFail($id);
        $this->nama_merk                            = $merk->nama_merk;
        $this->keterangan                           = $merk->keterangan;
        $this->merk_id                              = $merk->id;
    }

    public function update(){
        $merk = Merk::findOrFail($this->merk_id);
        $this->validate([
            'nama_merk'                     => 'required',
            'keterangan'                    => 'required',
        ], 
        [
            'nama_merk.required'            => 'Nama Merk wajib diisi!',
            'keterangan.required'           => 'Keterangan wajib dipilih',
        ]);

        $merk->nama_merk                    = $this->nama_merk;
        $merk->keterangan                   = $this->keterangan;
        $merk->save();

        $this->dispatch('closeEditModalMerk');
    }

    public function confirm($id = null){
        if(!$id) return;

        $merk = Merk::findOrFail($id);

        $this->nama_merk = $merk->nama_merk;
        $this->keterangan = $merk->keterangan;
        $this->merk_id = $merk->id;

        $this->dispatch('openDeleteModalKategori'); // 🔥 buka modal dari sini
    }

    public function destroy()
    {
        $merk = Merk::findOrFail($this->merk_id);
        $merk->delete();

        $this->dispatch('closeDeleteModalMerk');
    }


    public function render()
    {
         // if ($this->startDate && $this->endDate) {
        //     $sampah->whereBetween('created_at', [
        //         Carbon::parse($this->startDate)->startOfDay(),
        //         Carbon::parse($this->endDate)->endOfDay(),
        //     ]);
        // }

        $merk = Merk::query()
            ->when($this->search, function ($query) {
                $query->where('nama_merk', 'like', '%' . $this->search . '%');
            })
            ->latest() // Sama dengan orderBy('created_at', 'desc')
            // 4. Paksa (int) pada paginate untuk menghindari error "non-numeric"
            ->paginate((int) $this->paginate); 

        return view('livewire.admin.merk.index', [
            'dataMerk' => $merk,
        ]);
    }
}
