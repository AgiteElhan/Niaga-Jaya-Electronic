<div>
<div class="p-4">

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center bg-light">
            <h6 class="mb-0 fw-bold text-primary">
                <i class="ti ti-clipboard-list me-1"></i> Laporan Kondisi Stok Produk
            </h6>
            <div class="btn-group gap-2">
                {{-- Tombol Cetak PDF --}}
                <a href="{{ route('admin.laporan.stok.pdf') }}" target="_blank" class="btn btn-danger btn-sm">
                    <i class="ti ti-file-type-pdf me-1"></i> Cetak PDF
                </a>
                {{-- Tombol Cetak Excel --}}
                <button class="btn btn-success btn-sm">
                    <i class="ti ti-file-type-xls me-1"></i> Cetak Excel
                </button>
            </div>
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
                <table class="table table-striped table-bordered align-middle">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th width="80">Gambar</th>
                            <th>Kode Barang</th>
                            <th>Nama Produk</th>
                            <th class="text-center">Sisa Stok</th>
                            <th class="text-center">Keterangan</th>
                            <th width="100" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($dataProduct as $index => $product)
                            <tr>
                                <td class="text-center">{{ $index + 1 }}</td>
                                
                                {{-- Gambar Produk --}}
                                <td class="text-center">
                                    <img src="{{ asset('storage/products/' . $product->gambar) }}" 
                                        class="rounded border" 
                                        style="width: 60px; height: 60px; object-fit: cover;">
                                </td>

                                {{-- Kode & Nama --}}
                                <td class="fw-bold">{{ $product->kode_produk }}</td>
                                <td>{{ $product->nama_produk }}</td>

                                {{-- Jumlah Stok --}}
                                <td class="text-center fw-bold">
                                    {{ $product->stok }} <small class="text-muted">pcs</small>
                                </td>

                                {{-- Logika Keterangan Stok --}}
                                <td class="text-center">
                                    @if($product->stok <= 0)
                                        <span class="badge bg-danger px-3 py-2">
                                            <i class="ti ti-alert-triangle me-1"></i> Stok Habis
                                        </span>
                                    @elseif($product->stok < 10)
                                        <span class="badge bg-warning text-dark px-3 py-2">
                                            <i class="ti ti-alert-circle me-1"></i> Stok Menipis
                                        </span>
                                    @else
                                        <span class="badge bg-success px-3 py-2">
                                            <i class="ti ti-check me-1"></i> Stok Banyak
                                        </span>
                                    @endif
                                </td>

                                {{-- Aksi (Hanya Detail/Mata untuk Laporan) --}}
                                <td class="text-center">
                                    <button wire:click="showDetail({{ $product->id }})" 
                                            class="btn btn-info btn-sm"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalDetailProduk">
                                        <i class="ti ti-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center py-5">
                                    <div class="empty-state">
                                        <i class="ti ti-package-off text-muted mb-3" style="font-size: 3rem;"></i>
                                        <h6 class="text-muted">Data stok produk tidak ditemukan.</h6>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- PAGINATION -->
            <div class="d-flex justify-content-between align-items-center mt-3 ps-4">
                <div class="text-muted small">
                    Menampilkan 
                        {{ $dataProduct->firstItem() ?? 0 }}
                        sampai 
                        {{ $dataProduct->lastItem() ?? 0 }}
                        dari
                        {{ $dataProduct->total() }}                
                </div>

                <nav>
                    <ul class="pagination pagination-sm mb-0 p-4">
                        {{ $dataProduct->links() }}
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    @include('livewire.admin.laporan-stok.detail')


</div>
</div>