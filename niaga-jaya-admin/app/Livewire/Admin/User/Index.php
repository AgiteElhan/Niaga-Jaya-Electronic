<?php

namespace App\Livewire\Admin\User;

use Livewire\Component;
use App\Models\User;
use Livewire\WithPagination;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;


class Index extends Component
{
    use WithPagination;

    public $name;
    public $email;
    public $role;
    public $password;

    public $delete_id;
    public $user_id;
    public $paginate = 10;
    public $search = '';
    // public $startDate;
    // public $endDate;


    protected $paginationTheme = 'bootstrap';

    protected $rules = [
        'name'                  => 'required',
        'email'                 => 'required',
        'role'                  => 'required',
        'password'              => 'required',
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset([
            'name',
            'email',
            'role',
            'password',
        ]);
    }

    public function store()
    {
        $this->validate([
            'name'                      => 'required',
            'email'                     => 'required',
            'role'                      => 'required',
            'password'                      => 'required',
        ],
        [
            'name.required'             => 'Nama Merk wajib diisi!',
            'email.required'            => 'Keterangan wajib diisi!',
            'role.required'             => 'Keterangan wajib diisi!',
            'password.required'         => 'Password wajib diisi!',
        ]);

        $user = new User;
        $user->name                     = $this->name;
        $user->email                    = $this->email;
        $user->role                     = $this->role;
        $user->password                 = $this->password;
        $user->save();

        $this->dispatch('closeCreateModalUser');
    }

    public function edit($id){
        $this->resetValidation();
        $user = User::findOrFail($id);
        $this->name                             = $user->name;
        $this->email                            = $user->email;
        $this->role                             = $user->role;
        $this->password                         = $user->password;
        $this->user_id                          = $user->id;
    }


    public function update()
    {
        $user = User::findOrFail($this->user_id);

        $this->validate([
            'name'  => 'required',
            'email' => 'required|email',
            'role'  => 'required',
            'password' => 'nullable',
        ], [
            'name.required'  => 'Nama wajib diisi!',
            'email.required' => 'Email wajib diisi!',
            'role.required'  => 'Role wajib dipilih!',
        ]);

        $user->name  = $this->name;
        $user->email = $this->email;
        $user->role  = $this->role;

        // 🔥 hanya update password kalau diisi
        if (!empty($this->password)) {
            $user->password = Hash::make($this->password);
        }

        $user->save();

        $this->dispatch('closeEditModalUser');

        // reset biar bersih
        $this->reset(['user_id', 'name', 'email', 'role', 'password']);
    }

     public function confirm($id = null){
        if(!$id) return;

        $user = User::findOrFail($id);

        $this->name                 = $user->name;
        $this->email                = $user->email;
        $this->role                 = $user->role;
        $this->password             = $user->password;
        $this->user_id              = $user->id;

        $this->dispatch('openDeleteModalUser'); // 🔥 buka modal dari sini
    }

    public function destroy()
    {
        $user = User::findOrFail($this->user_id);
        $user->delete();

        $this->dispatch('closeDeleteModalUser');
    }

    public function render()
    {
         // if ($this->startDate && $this->endDate) {
        //     $sampah->whereBetween('created_at', [
        //         Carbon::parse($this->startDate)->startOfDay(),
        //         Carbon::parse($this->endDate)->endOfDay(),
        //     ]);
        // }

        $user = User::query()
            ->when($this->search, function ($query) {
                $query->where('name', 'like', '%' . $this->search . '%');
            })
            ->latest() // Sama dengan orderBy('created_at', 'desc')
            // 4. Paksa (int) pada paginate untuk menghindari error "non-numeric"
            ->paginate((int) $this->paginate); 

        return view('livewire.admin.user.index', [
            'dataUser' => $user,
        ]);
    }
}
