<?php

namespace App\Livewire\Admin\Supplier;

use Livewire\Component;
use App\Models\Supplier;
use Livewire\WithPagination;
use Carbon\Carbon;

class Index extends Component
{
    use WithPagination;

    public $kode_supplier;
    public $nama_supplier;
    public $no_telp;
    public $alamat;
    public $status;

    public $delete_id;
    public $supplier_id;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;

     protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'kode_supplier'             => 'required',
        'nama_supplier'             => 'required',
        'no_telp'                   => 'required',
        'alamat'                    => 'required',
        'status'                    => 'required',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'kode_supplier',
            'nama_supplier',
            'no_telp',
            'alamat',
            'status',
        ]);
    }

    public function store()
    {
        $this->validate([
            'nama_supplier' => 'required',
            'no_telp' => 'required',
            'alamat' => 'required',
            'status' => 'required',
        ]);

        $clean = preg_replace('/\s+/', '', $this->nama_supplier);
        $prefix = strtoupper(substr($clean, 0, 3));

        if (strlen($prefix) < 3) {
            $prefix = str_pad($prefix, 3, 'X');
        }

        $last = Supplier::latest('id')->first();
        $nextId = $last ? $last->id + 1 : 1;

        $number = str_pad($nextId, 3, '0', STR_PAD_LEFT);

        $kode_supplier = $prefix . $number;

        $supplier = new Supplier;
        $supplier->kode_supplier        = $kode_supplier;
        $supplier->nama_supplier        = $this->nama_supplier;
        $supplier->no_telp              = $this->no_telp;
        $supplier->alamat               = $this->alamat;
        $supplier->status               = $this->status;
        $supplier->save();

        $this->dispatch('closeCreateModalSupplier');
    }

    public function edit($id)
    {
        $this->resetValidation();

        $supplier = Supplier::findOrFail($id);

        $this->supplier_id   = $supplier->id;
        $this->nama_supplier = $supplier->nama_supplier;
        $this->no_telp       = $supplier->no_telp;
        $this->alamat        = $supplier->alamat;
        $this->status        = $supplier->status;
    }

    public function update()
    {
        $supplier = Supplier::findOrFail($this->supplier_id);

        $this->validate([
            'nama_supplier' => 'required',
            'no_telp'       => 'required',
            'alamat'        => 'required',
            'status'        => 'required',
        ], [
            'nama_supplier.required' => 'Nama Supplier wajib diisi!',
            'no_telp.required'       => 'Nomor Telpon wajib diisi!',
            'alamat.required'        => 'Alamat wajib diisi!',
            'status.required'        => 'Status wajib dipilih!',
        ]);

        $supplier->update([
            'nama_supplier' => $this->nama_supplier,
            'no_telp'       => $this->no_telp,
            'alamat'        => $this->alamat,
            'status'        => $this->status,
        ]);

        $this->dispatch('closeEditModalSupplier');

        // optional biar bersih setelah update
        $this->reset(['supplier_id', 'nama_supplier', 'no_telp', 'alamat', 'status']);
    }

    public function confirm($id = null){
        if(!$id) return;

        $supplier = Supplier::findOrFail($id);

        $this->kode_supplier    = $supplier->kode_supplier;
        $this->nama_supplier    = $supplier->nama_supplier;
        $this->no_telp          = $supplier->no_telp;
        $this->alamat           = $supplier->alamat;
        $this->status           = $supplier->status;
        $this->supplier_id      = $supplier->id;

        $this->dispatch('openDeleteModalSupplier'); // 🔥 buka modal dari sini
    }

    public function destroy()
    {
        $supplier = Supplier::findOrFail($this->supplier_id);
        $supplier->delete();

        $this->dispatch('closeDeleteModalSupplier');
    }

    public function render()
    {
         // if ($this->startDate && $this->endDate) {
        //     $sampah->whereBetween('created_at', [
        //         Carbon::parse($this->startDate)->startOfDay(),
        //         Carbon::parse($this->endDate)->endOfDay(),
        //     ]);
        // }

        $supplier = Supplier::query()
            ->when($this->search, function ($query) {
                $query->where('nama_supplier', 'like', '%' . $this->search . '%');
            })
            ->latest() // Sama dengan orderBy('created_at', 'desc')
            // 4. Paksa (int) pada paginate untuk menghindari error "non-numeric"
            ->paginate((int) $this->paginate); 

        return view('livewire.admin.supplier.index', [
            'dataSupplier' => $supplier,
        ]);
    }
}
