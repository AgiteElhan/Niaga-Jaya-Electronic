    <div>
        <div class="p-4"> <div class="card">

            <div class="card">
                <!-- HEADER -->
                <div class="card-header d-flex justify-content-between align-items-center px-4">
                    <h6 class="mb-0">Daftar Stok Masuk</h6>

                    <button wire:click="create"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalTambahStokMasuk">
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
                                <input wire:model.live="search" type="text" class="form-control" placeholder="Cari Stok Masuk...">
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped t able-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th width="50" class="text-center">No</th>
                                    <th>Nomor Referensi</th>
                                    <th>Tanggal Masuk</th>
                                    <th>Supplier</th>
                                    <th>Produk</th>
                                    <th>Catatan</th> <!-- Kolom Baru -->
                                    <th class="text-center">Jumlah</th>
                                    <th width="120" class="text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                @forelse ($dataStokMasuk as $index => $item)
                                    <tr>
                                        <td class="text-center">{{ $dataStokMasuk->firstItem() + $index }}</td>
                                        <td class="fw-bold text-primary">{{ $item->nomor_referensi }}</td>
                                        <td>{{ \Carbon\Carbon::parse($item->tanggal_masuk)->format('d/m/Y') }}</td>
                                        <td class="fw-semibold text-dark">
                                            {{ $item->supplier->nama_supplier ?? 'Tanpa Supplier' }}
                                        </td>
                                        <td>
                                            @if($item->items->count() > 0)
                                                <div class="fw-bold text-dark">{{ $item->items->first()->product->nama_produk ?? 'Produk Tidak Ditemukan' }}</div>
                                                @if($item->items->count() > 1)
                                                    <span class="badge bg-light-info text-info border border-info-subtle" style="font-size: 0.7rem;">
                                                        +{{ $item->items->count() - 1 }} Produk Lainnya
                                                    </span>
                                                @endif
                                            @else
                                                <span class="text-danger small fst-italic">Tidak ada item</span>
                                            @endif
                                        </td>
                                        <td>
                                            <span class="text-muted small">
                                                {{ $item->catatan ?? '-' }}
                                            </span>
                                        </td>
                                        {{-- Kolom Jumlah dengan warna biru "Stok" --}}
                                        <td class="text-center">
                                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle fw-bolder px-3 py-2" style="font-size: 0.85rem;">
                                                {{ $item->items->sum('jumlah_masuk') }} <small>unit</small>
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <div class="btn-group gap-1">
                                                <button wire:click="showDetail({{ $item->id }})" 
                                                        class="btn btn-info btn-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDetailStok"
                                                        title="Detail Barang">
                                                    <i class="ti ti-eye"></i>
                                                </button>
                                                {{-- <button wire:click="edit({{ $item->id }})" 
                                                        class="btn btn-warning btn-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalEditStok"
                                                        title="Edit Data">
                                                    <i class="ti ti-edit"></i>
                                                </button> --}}
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="8" class="text-center py-5"> <!-- Colspan jadi 8 karena tambah kolom -->
                                            <div class="empty-state">
                                                <div class="mb-3">
                                                    <i class="ti ti-package-off text-muted" style="font-size: 3.5rem;"></i>
                                                </div>
                                                <h5 class="text-muted">Data Kosong</h5>
                                                <p class="text-muted">
                                                    @if($search)
                                                        Hasil pencarian "{{ $search }}" tidak ditemukan.
                                                    @else
                                                        Belum ada riwayat stok masuk yang tercatat.
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
                                                            data-bs-target="#modalTambahStokMasuk">
                                                        <i class="bx bx-plus me-2"></i>
                                                        Tambah Stok Produk
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

                    <div class="d-flex justify-content-between align-items-center mt-3 ps-4">
                        <div class="text-muted small text-center text-sm-start">
                            Menampilkan 
                            {{ $dataStokMasuk->firstItem() ?? 0 }}
                            sampai 
                            {{ $dataStokMasuk->lastItem() ?? 0 }}
                            dari
                            {{ $dataStokMasuk->total() }}
                            data
                        </div>

                        <nav>
                            <ul class="pagination pagination-sm mb-0 p-4">
                                {{ $dataStokMasuk->links() }}
                            </ul>
                        </nav>
                    </div>

                </div>

            </div>
                @include('livewire.admin.stok-masuk.create')
                @include('livewire.admin.stok-masuk.detail')

        </div>
    </div>

               
