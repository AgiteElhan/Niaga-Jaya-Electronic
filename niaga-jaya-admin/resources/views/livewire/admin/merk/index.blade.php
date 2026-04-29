<div>
    <div class="p-4"> <div class="card"> <!-- ROOT -->

        <div class="card">

            <!-- HEADER -->
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">Daftar Merk</h6>

                <button 
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahMerk">
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
                            <input wire:model.live="search" type="text" class="form-control" placeholder="Cari produk...">
                        </div>
                    </div>
                </div>
                

                <!-- TABLE -->
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th width="50" class="text-center">No</th>
                                <th>Nama Merk</th>
                                <th>Keterangan</th>
                                <th width="120" class="text-center">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($dataMerk as $index => $merk)
                                <tr>
                                    <td class="text-center">{{$index + 1}}</td>
                                    <td>{{$merk->nama_merk}}</td>
                                    <td>{{$merk->keterangan}}</td>
                                    <td class="text-center">
                                        <div class="btn-group gap-1">
                                            <!-- EDIT -->
                                            <button wire:click="edit({{$merk->id}})"
                                                class="btn btn-warning btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEditMerk">
                                                <i class="ti ti-edit"></i>
                                            </button>

                                            <!-- DELETE -->
                                            <button wire:click="confirm({{$merk->id}})"
                                                class="btn btn-danger btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalDeleteMerk">
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
                                                        Belum ada data merk yang tersedia
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
                                                            data-bs-target="#modalTambahMerk">
                                                        <i class="bx bx-plus me-2"></i>
                                                        Tambah Merk Pertama
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
                    <div class="text-muted small text-center text-sm-start">
                        Menampilkan 
                        {{ $dataMerk->firstItem() ?? 0 }}
                        sampai 
                        {{ $dataMerk->lastItem() ?? 0 }}
                        dari
                        {{ $dataMerk->total() }}
                    </div>

                    <nav>
                        <ul class="pagination pagination-sm mb-0 p-4">
                            {{ $dataMerk->links() }}
                        </ul>
                    </nav>

                </div>

            </div>

        </div>

        <!-- MODAL (nanti kamu bikin) -->
        @include('livewire.admin.merk.create')
        @include('livewire.admin.merk.edit')
        @include('livewire.admin.merk.delete')

    </div>
</div>