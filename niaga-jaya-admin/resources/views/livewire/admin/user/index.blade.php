<div>
<div class="p-4"> <!-- ROOT -->

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center px-4">
            <h6 class="mb-0">Daftar User</h6>

            <button 
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahUser">
                <i class="ti ti-plus me-1"></i>
                Tambah
            </button>
        </div>

        <!-- BODY -->
        <div class="card-body">
                      <!-- SEARCH & SHOW -->
            <div class="row g-3 mb-3">

                <div class="col-6 col-md-3">
                    <label class="form-label small text-muted mb-1">Tampilkan</label>
                    <select wire:model.live="paginate" class="form-select form-select-sm">
                        <option>10 Data</option>
                        <option>25 Data</option>
                        <option>50 Data</option>
                        <option>100 Data</option>
                    </select>
                </div>

                <div class="col-6 col-md-9">
                    <label class="form-label small text-muted mb-1">Pencarian</label>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text search-icon">
                            <i class="ti ti-search"></i>
                        </span>
                        <input wire:model.live="search" type="text" class="form-control" placeholder="Cari user...">
                    </div>
                </div>
            </div>
            

            <!-- TABLE -->
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Nama User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                    @forelse ($dataUser as $index => $user)
                        <tr>
                            <td class="text-center">{{$index + 1}}</td>
                            <td>{{$user->name}}</td>
                            <td>{{$user->email}}</td>
                            <td>{{$user->role}}</td>
                            <td class="text-center">
                                <div class="btn-group gap-1">
                                    <!-- EDIT -->
                                    <button wire:click="edit({{$user->id}})"
                                        class="btn btn-warning btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditUser">
                                        <i class="ti ti-edit"></i>
                                    </button>

                                    <!-- DELETE -->
                                    <button wire:click="confirm({{$user->id}})"
                                        class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDeleteUser">
                                        <i class="ti ti-trash"></i>
                                    </button>

                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="11" class="text-center py-5">
                                <div class="empty-state">
                                    <div class="mb-3">
                                        <i class="bx bx-folder-open" style="font-size: 3.5rem; color: #b0b0b0;"></i>
                                    </div>
                                    <h5 class="text-muted mb-2">Tidak Ada Data</h5>
                                    <p class="text-muted mb-4">
                                        @if($search)
                                            Pencarian "{{ $search }}" tidak ditemukan
                                        @else
                                            Belum ada data User yang tersedia
                                         @endif
                                    </p>
                                    @if($search)
                                        <button wire:click="$set('search', '')" 
                                            class="btn btn-outline-secondary">
                                            <i class="bx bx-revision me-2"></i>
                                            Reset Pencarian
                                        </button>
                                    @else
                                        <button wire:click="create" 
                                            class="btn btn-primary" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalTambah">
                                            <i class="bx bx-plus me-2"></i>
                                            Tambah User Pertama
                                        </button>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
            </div>

            <!-- PAGINATION -->
            <div class="d-flex justify-content-between align-items-center mt-3 ps-4">
                <div class="text-muted small">
                    Menampilkan 
                        {{ $dataUser->firstItem() ?? 0 }}
                        sampai 
                        {{ $dataUser->lastItem() ?? 0 }}
                        dari
                        {{ $dataUser->total() }}
                </div>

                <nav>
                    <ul class="pagination pagination-sm mb-0 p-4">
                        {{ $dataUser->links() }}
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <!-- MODAL (nanti kamu bikin) -->
    @include('livewire.admin.user.create')
    @include('livewire.admin.user.edit')
    @include('livewire.admin.user.delete')

</div>
</div>