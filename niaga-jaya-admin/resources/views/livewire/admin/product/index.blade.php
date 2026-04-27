<div>
<div class="p-4">

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Daftar Produk</h6>

            <button 
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahProduk">
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
                <table class="table table-striped table-bordered align-middle">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Gambar</th>
                            <th>Kode Barang</th>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th>Merk</th>
                            <th>Harga Jual</th>
                            <th>Stok</th>
                            <th>Deskripsi</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($dataProduct as $index => $product)
                            <tr>
                                <td class="text-center">{{$index+1}}</td>
                                <td>
                                    <img src="{{ asset('storage/products/' . $product->gambar) }}" width="100">
                                </td>

                                <td>{{$product->kode_produk}}</td>
                                <td>{{$product->nama_produk}}</td>

                                <td>{{ $product->kategori->nama_kategori ?? '-' }}</td>
                                <td>{{ $product->merk->nama_merk ?? '-' }}</td>
                                
                                <td>
                                    Rp {{ number_format($product->harga_jual, 0, ',', '.') }}
                                </td>
                                <td>{{$product->stok}} pcs</td>
                                <td>{{$product->deskripsi}}</td>
                                <!-- AKSI -->
                                <td class="text-center">
                                    <div class="btn-group gap-1">

                                        <button wire:click="edit({{$product->id}})"
                                            class="btn btn-warning btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEditProduk">
                                            <i class="ti ti-edit"></i>
                                        </button>

                                        <button wire:click="confirm({{$product->id}})"
                                            class="btn btn-danger btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalDeleteProduk">
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
                                                Belum ada data Product yang tersedia
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
                                                    data-bs-target="#modalTambahProduk">
                                                <i class="bx bx-plus me-2"></i>
                                                Tambah Product Pertama
                                            </button>
                                        @endif
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

    <!-- MODAL (nanti bikin seperti sebelumnya) -->
    @include('livewire.admin.product.create')
    @include('livewire.admin.product.edit')
    @include('livewire.admin.product.delete')

</div>
</div>