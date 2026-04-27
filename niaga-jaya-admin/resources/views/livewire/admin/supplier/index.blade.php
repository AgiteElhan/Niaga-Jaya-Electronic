

<div>
<div class="p-4"> <!-- ROOT -->

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Daftar Supplier</h6>

            <button 
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahSupplier">
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
                        <input type="text" wire:model.live="search" class="form-control" placeholder="Cari supplier...">
                    </div>
                </div>
            </div>
            

            <!-- TABLE -->
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Kode Supplier</th>
                            <th>Nama Supplier</th>
                            <th>Nomor Telpon</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                    @forelse ($dataSupplier as $index => $supplier)
                         <tr>
                            <td class="text-center">{{$index + 1}}</td>
                            <td>{{$supplier -> kode_supplier}}</td>
                            <td>{{$supplier -> nama_supplier}}</td>
                            <td>{{$supplier -> no_telp}}</td>
                            <td>{{$supplier -> alamat}}</td>
                            <td>{{$supplier -> status}}</td>
                            <td class="text-center">
                                <div class="btn-group gap-1">
                                    <!-- EDIT -->
                                    <button wire:click="edit({{$supplier->id}})"
                                        class="btn btn-warning btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditSupplier">
                                        <i class="ti ti-edit"></i>
                                    </button>

                                    <!-- DELETE -->
                                    <button wire:click="confirm({{$supplier->id}})"
                                        class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDeleteSupplier">
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
                                            Belum ada data Supplier yang tersedia
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
                                            Tambah Supplier Pertama
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
                        {{ $dataSupplier->firstItem() ?? 0 }}
                        sampai 
                        {{ $dataSupplier->lastItem() ?? 0 }}
                        dari
                        {{ $dataSupplier->total() }}
                </div>

                <nav>
                    <ul class="pagination pagination-sm mb-0 p-4">
                        {{ $dataSupplier->links() }}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <!-- MODAL (nanti kamu bikin) -->
    @include('livewire.admin.supplier.create')
    @include('livewire.admin.supplier.edit')
    @include('livewire.admin.supplier.delete')
</div>
</div>