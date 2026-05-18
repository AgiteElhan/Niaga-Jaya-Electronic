    <div>
        <div class="p-4"> <div class="card">

            <div class="card">
                <!-- HEADER -->
                <div class="card-header d-flex justify-content-between align-items-center px-4">
                    <h6 class="mb-0">Daftar Pesanan</h6>
{{-- 
                    <button wire:click="create"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalTambahPesanan">
                        <i class="ti ti-plus me-1"></i>
                        Tambah
                    </button> --}}
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
                                <input wire:model.live="search" type="text" class="form-control" placeholder="Cari Pesanan...">
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead class="table-light">
                                <tr>
                                <th width="50" class="text-center">No</th>
                                <th>Nomor Pesanan</th>
                                <th>Tanggal</th>
                                <th>Nama Pembeli</th>
                                <th>Total Bayar</th>
                                <th class="text-center">Status</th> <!-- Tambahan -->
                                <th class="text-center">Metode</th> <!-- Tambahan -->
                                <th width="150" class="text-center">Aksi</th>
                            </tr>
                            </thead>

                            <tbody>
                                @forelse ($dataPesanan as $index => $Pesanan)
                                    <tr>
                                        {{-- Penomoran yang mendukung Pagination --}}
                                        <td class="text-center">{{ $dataPesanan->firstItem() + $index }}</td>
                                        
                                        {{-- Nomor Pesanan --}}
                                        <td class="fw-bold text-primary">#{{ $Pesanan->nomor_pesanan }}</td>
                                        
                                        {{-- Nama Pembeli & WhatsApp --}}
                                        <td>
                                            <div class="fw-bold">{{ $Pesanan->nama_pembeli }}</div>
                                            <small class="text-muted">
                                                <i class="ti ti-brand-whatsapp text-success"></i> {{ $Pesanan->whatsapp_pembeli }}
                                            </small>
                                        </td>

                                        {{-- Tanggal Beli --}}
                                        <td>{{ $Pesanan->created_at->format('d/m/Y H:i') }}</td>

                                        {{-- Total Bayar --}}
                                        <td class="fw-bold">Rp {{ number_format($Pesanan->total_bayar, 0, ',', '.') }}</td>

                                        {{-- Status Pembayaran (Badge) --}}
                                        <td class="text-center">
                                            @if($Pesanan->status_pembayaran == 'success')
                                                <span class="badge bg-light-success text-success">Berhasil</span>
                                            @elseif($Pesanan->status_pembayaran == 'pending')
                                                <span class="badge bg-light-warning text-warning">Menunggu</span>
                                            @else
                                                <span class="badge bg-light-danger text-danger">Gagal</span>
                                            @endif
                                        </td>

                                        {{-- Kolom Aksi --}}
                                        <td class="text-center">
                                            <div class="btn-group gap-1">
                                                {{-- Tombol Mata untuk Lihat Detail --}}
                                                <button wire:click="showDetail({{ $Pesanan->id }})" 
                                                        class="btn btn-info btn-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDetailPesanan"
                                                        title="Lihat Detail">
                                                    <i class="ti ti-eye"></i>
                                                </button>

                                                {{-- Tombol Edit untuk Update Status --}}
                                                <button wire:click="editStatus({{ $Pesanan->id }})" 
                                                        class="btn btn-warning btn-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalUpdateStatus"
                                                        title="Update Status">
                                                    <i class="ti ti-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    {{-- Tampilan jika data kosong tetap dipertahankan --}}
                                    <tr>
                                        <td colspan="8" class="text-center py-5">
                                            <div class="empty-state">
                                                <div class="mb-3">
                                                    <i class="ti ti-folder-off" style="font-size: 3.5rem; color: #b0b0b0;"></i>
                                                </div>
                                                <h5 class="text-muted mb-2">Tidak Ada Data Pesanan</h5>
                                                <p class="text-muted mb-4">
                                                    @if($search)
                                                        Pencarian "{{ $search }}" tidak ditemukan
                                                    @else
                                                        Belum ada pesanan masuk dari aplikasi E-Commerce
                                                    @endif
                                                </p>
                                                @if($search)
                                                    <button wire:click="$set('search', '')" class="btn btn-outline-secondary">
                                                        <i class="ti ti-refresh me-2"></i> Reset Pencarian
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
                            {{ $dataPesanan->firstItem() ?? 0 }}
                            sampai 
                            {{ $dataPesanan->lastItem() ?? 0 }}
                            dari
                            {{ $dataPesanan->total() }}
                            data
                        </div>

                        <nav>
                            <ul class="pagination pagination-sm mb-0 p-4">
                                {{ $dataPesanan->links() }}
                            </ul>
                        </nav>

                    </div>

                </div>

            </div>
        </div>
    </div>

               
