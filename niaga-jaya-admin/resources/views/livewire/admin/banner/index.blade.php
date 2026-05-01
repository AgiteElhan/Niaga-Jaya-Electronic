    <div>
        <div class="p-4"> <div class="card">

            <div class="card">
                <!-- HEADER -->
                <div class="card-header d-flex justify-content-between align-items-center px-4">
                    <h6 class="mb-0">Daftar Banner</h6>

                    <button wire:click="create"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalTambahBanner">
                        <i class="ti ti-plus me-1"></i>
                        Tambah
                    </button>
                </div>

                <div class="card-body">
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
                                <input wire:model.live="search" type="text" class="form-control" placeholder="Cari Banner...">
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                     <table class="table table-hover table-bordered align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th width="50" class="text-center">No</th>
                                    <th width="180">Nama Banner</th>
                                    <th width="300">Preview Banner</th>
                                    <th width="20" class="text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                @forelse ($dataBanner as $index => $banner)
                                    <tr>
                                        <td class="text-center font-monospace">{{ $index + 1 }}</td>
                                        <td>
                                            <span class="fw-bold text-dark">{{ $banner->nama_banner }}</span>
                                        </td>
                                        <td>
                                            <div class="rounded-3 overflow-hidden border shadow-sm" style="background-color: #f8f9fa;">
                                                <img src="{{ asset('storage/banner/' . $banner->gambar) }}" 
                                                    alt="{{ $banner->banner }}"
                                                    class="img-fluid d-block"
                                                    style="width: 100%; height: 100px; object-fit: cover;">
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div class="btn-group gap-1">
                                                <button wire:click="edit({{$banner->id}})"
                                                    class="btn btn-warning btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalEditBanner">
                                                    <i class="ti ti-edit"></i>
                                                </button>

                                                <button wire:click="confirm({{$banner->id}})"
                                                    class="btn btn-danger btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalDeleteBanner">
                                                    <i class="ti ti-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="4" class="text-center py-5">
                                            <div class="empty-state text-center">
                                                <i class="bx bx-folder-open mb-3" style="font-size: 3.5rem; color: #cbd5e0;"></i>
                                                <h5 class="text-secondary">Tidak Ada Data Banner</h5>
                                                <p class="text-muted">Mulai tambahkan banner untuk slider di halaman depan.</p>
                                            </div>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div> 

                    <div class="d-flex justify-content-between align-items-center mt-3 ps-4">
                        <div class="text-muted small text-center text-sm-start">
                            Menampilkan 
                            {{ $dataBanner->firstItem() ?? 0 }}
                            sampai 
                            {{ $dataBanner->lastItem() ?? 0 }}
                            dari
                            {{ $dataBanner->total() }}
                            data
                        </div>

                        <nav>
                            <ul class="pagination pagination-sm mb-0 p-4">
                                {{ $dataBanner->links() }}
                            </ul>
                        </nav>

                    </div>

                </div>

            </div>

            @include('livewire.admin.banner.create')
            @include('livewire.admin.banner.edit')
            @include('livewire.admin.banner.delete')
        </div>
    </div>

               
