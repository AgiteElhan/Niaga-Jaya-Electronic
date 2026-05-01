<?php

namespace App\Livewire\Admin\Banner;

use Livewire\Component;
use Carbon\Carbon;
use App\Models\Banner;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;

class Index extends Component
{
    use WithFileUploads;
    use WithPagination;

    public $nama_banner;
    public $gambar;

    public $delete_id;
    public $banner_id;
    public $gambar_lama;
    public $paginate = 10;
    public $search = '';

    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'nama_gambar'                  => 'required',
        'gambar'                       => 'required|image|mimes:jpg,jpeg,png|max:2048',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'nama_banner',
            'gambar',
        ]);
    }

    public function store()
    {
        $this->validate([
            'nama_banner'    => 'required',
            'gambar'         => 'required|image|max:2048',
        ],[
            'nama_banner.required'   => 'Nama banner wajib diisi.',
            'gambar.required'        => 'Gambar wajib diisi.',
            'gambar.image'           => 'File harus berupa gambar.',
            'gambar.max'             => 'Ukuran gambar maksimal 2MB.',
        ]);

        $namaGambar = time() . '.' . $this->gambar->extension();
        $this->gambar->storeAs('banner', $namaGambar, 'public');

        $banner = new Banner;
        $banner->nama_banner       = $this->nama_banner;
        $banner->gambar            = $namaGambar; // simpan nama file saja
        $banner->save();

        $this->dispatch('closeCreateModalBanner');
    }

    public function edit($id)
    {
        $banner = Banner::findOrFail($id);

        $this->banner_id        = $banner->id;
        $this->nama_banner      = $banner->nama_banner;
        $this->gambar_lama      = $banner->gambar;
        $this->gambar           = null; // reset upload
    }

    public function update()
    {
        $this->validate([
            'nama_banner'    => 'required',
            'gambar'         => 'required|image|max:2048',
        ]);

        $banner = Banner::findOrFail($this->banner_id);

        // 🔥 cek apakah upload gambar baru
        if ($this->gambar) {

            // hapus gambar lama
            if ($this->gambar_lama) {
                Storage::disk('public')->delete('banner/' . $this->gambar_lama);
            }

            // simpan gambar baru
            $namaGambar = time() . '.' . $this->gambar->extension();
            $this->gambar->storeAs('banner', $namaGambar, 'public');

            $banner->gambar = $namaGambar;
        }

        // update data lain
        $banner->nama_banner   = $this->nama_banner;

        $banner->save();

        $this->dispatch('closeEditModalBanner');
    }

    public function confirm($id = null){
        if(!$id) return;

        $banner = Banner::findOrFail($id);

        $this->nama_banner         = $banner->nama_banner;
        $this->banner_id           = $banner->id;

        $this->dispatch('openDeleteModalBanner'); 
    }

    public function destroy()
    {
        $banner = Banner::findOrFail($this->banner_id);
        $banner->delete();

        $this->dispatch('closeDeleteModalBanner');
    }

    public function render()
    {
         $banner = Banner::query()
            ->when($this->search, function ($query) {
                $query->where('nama_banner', 'like', '%' . $this->search . '%');
            })
            ->latest() // Sama dengan orderBy('created_at', 'desc')
            // 4. Paksa (int) pada paginate untuk menghindari error "non-numeric"
            ->paginate((int) $this->paginate); 

        return view('livewire.admin.banner.index', [
            'dataBanner' => $banner,
        ]);
    }
}
