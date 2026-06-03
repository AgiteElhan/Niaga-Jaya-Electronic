<div>
    <div class="p-4">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                <h5 class="mb-0 fw-bold text-dark">Daftar Pesanan</h5>
                <div class="d-flex gap-2">
                        <div class="btn-group gap-2">
                            {{-- Tombol Cetak PDF via Livewire --}}
                            <button wire:click="exportPdf" wire:loading.attr="disabled" target="_blank" class="btn btn-danger btn-sm">
                                <span wire:loading.remove wire:target="exportPdf">
                                    <i class="ti ti-file-type-pdf me-1"></i> PDF
                                </span>
                                <span wire:loading wire:target="exportPdf">
                                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>...
                                </span>
                            </button>

                            {{-- Tombol Cetak Excel via Livewire --}}
                            <button wire:click="exportExcel" wire:loading.attr="disabled" class="btn btn-success btn-sm">
                                <span wire:loading.remove wire:target="exportExcel">
                                    <i class="ti ti-file-type-xls me-1"></i> Excel
                                </span>
                                <span wire:loading wire:target="exportExcel">
                                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>...
                                </span>
                            </button>
                        </div>
                    </div>
            </div>

            <div class="card-body">
                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <label class="form-label small fw-bold text-muted mb-1">Tampilkan</label>
                        <select wire:model.live="paginate" class="form-select form-select-sm">
                            <option value="10">10 Data</option>
                            <option value="25">25 Data</option>
                            <option value="50">50 Data</option>
                            <option value="100">100 Data</option>
                        </select>
                    </div>

                    <div class="col-6 col-md-9">
                        <label class="form-label small fw-bold text-muted mb-1">Pencarian</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text bg-light text-muted">
                                <i class="ti ti-search"></i>
                            </span>
                            <input wire:model.live="search" type="text" class="form-control" placeholder="Cari nomor pesanan, nama pembeli atau nomor WhatsApp...">
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive border rounded-3">
                    <table class="table table-hover table-striped table-bordered align-middle mb-0">
                        <thead class="table-light text-nowrap">
                            <tr>
                                <th width="60" class="text-center fw-bold">No</th>
                                <th class="fw-bold">Nomor Pesanan</th>
                                <th class="fw-bold">Tanggal</th>
                                <th class="fw-bold">Nama Pembeli</th>
                                <th class="fw-bold">Total Bayar</th>
                                <th width="120" class="text-center fw-bold">Status</th>
                                <th width="140" class="text-center fw-bold">Metode</th>
                                <th width="120" class="text-center fw-bold">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($dataPesanan as $index => $Pesanan)
                                <tr>
                                    {{-- Penomoran Pagination --}}
                                    <td class="text-center text-muted small">
                                        {{ $dataPesanan->firstItem() + $index }}
                                    </td>
                                    
                                    {{-- Nomor Pesanan --}}
                                    <td class="fw-bold text-primary">
                                        #{{ $Pesanan->nomor_pesanan }}
                                    </td>

                                    {{-- Tanggal Beli --}}
                                    <td class="text-nowrap small text-secondary">
                                        {{ $Pesanan->created_at ? $Pesanan->created_at->format('d/m/Y H:i') : '-' }}
                                    </td>
                                    
                                    {{-- Nama Pembeli & WhatsApp --}}
                                    <td>
                                        <div class="fw-bold text-dark">{{ $Pesanan->nama_pembeli }}</div>
                                        <small class="text-muted d-flex align-items-center gap-1 mt-0.5">
                                            <i class="ti ti-brand-whatsapp text-success fs-5"></i> {{ $Pesanan->whatsapp_pembeli }}
                                        </small>
                                    </td>

                                    {{-- Total Bayar --}}
                                    <td class="fw-bold text-dark text-nowrap">
                                        Rp {{ number_format($Pesanan->total_bayar, 0, ',', '.') }}
                                    </td>

                                    {{-- Status Pembayaran (Badge Dinamis Mengikuti Kolom DB Lu) --}}
                                    <td class="text-center text-nowrap">
                                        @if($Pesanan->status_pembayaran == 'berhasil' || $Pesanan->status_pembayaran == 'success' || $Pesanan->status_pembayaran == 'settlement')
                                            <span class="badge bg-success-subtle text-success px-2.5 py-1.5 rounded-2">Berhasil</span>
                                        @elseif($Pesanan->status_pembayaran == 'menunggu' || $Pesanan->status_pembayaran == 'pending')
                                            <span class="badge bg-warning-subtle text-warning px-2.5 py-1.5 rounded-2">Menunggu</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-2">Gagal</span>
                                        @endif
                                    </td>

                                    {{-- Metode Pengiriman (Riil dari DB) --}}
                                    <td class="text-center text-secondary small text-nowrap">
                                        <div class="fw-semibold text-muted">{{ $Pesanan->metode_pengiriman ?? 'Regular' }}</div>
                                    </td>

                                    {{-- Kolom Aksi --}}
                                    <td class="text-center">
                                        <div class="d-inline-flex gap-1.5">
                                            {{-- Tombol Lihat Detail --}}
                                            <button type="button" 
                                                    wire:click="viewOrder({{ $Pesanan->id }})" 
                                                    class="btn btn-sm btn-info" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalDetailPesanan">
                                                <i class="ti ti-eye fs-4"></i>
                                            </button>
                                            <button wire:click="editStatus({{ $Pesanan->id }})"
                                                        class="btn btn-warning btn-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalUpdateStatus"
                                                        title="Edit Data">
                                                    <i class="ti ti-edit"></i>
                                                </button>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                {{-- State Jika Data Kosong --}}
                                <tr>
                                    <td colspan="8" class="text-center py-5 bg-white">
                                        <div class="py-4">
                                            <div class="mb-3">
                                                <i class="ti ti-folder-off text-muted opacity-50" style="font-size: 3.5rem;"></i>
                                            </div>
                                            <h5 class="text-secondary fw-bold mb-1">Tidak Ada Data Pesanan</h5>
                                            <p class="text-muted small mb-3">
                                                @if($search)
                                                    Hasil pencarian untuk "{{ $search }}" tidak ditemukan.
                                                @else
                                                    Belum ada pesanan masuk dari aplikasi E-Commerce Niaga Jaya.
                                                @endif
                                            </p>
                                            @if($search)
                                                <button wire:click="$set('search', '')" class="btn btn-primary btn-sm rounded-2 px-3">
                                                    <i class="ti ti-refresh me-1"></i> Reset Pencarian
                                                </button>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                            @endforelse    
                        </tbody>
                    </table>
                </div>

                <div class="d-flex flex-col flex-sm-row justify-content-between align-items-center mt-4 gap-3">
                    <div class="text-muted small">
                        Menampilkan 
                        <span class="fw-bold text-dark">{{ $dataPesanan->firstItem() ?? 0 }}</span> 
                        sampai 
                        <span class="fw-bold text-dark">{{ $dataPesanan->lastItem() ?? 0 }}</span> 
                        dari 
                        <span class="fw-bold text-dark">{{ $dataPesanan->total() }}</span> 
                        data pesanan
                    </div>

                    @if($dataPesanan->hasPages())
                        <nav>
                            <div class="pagination-wrapper mb-0">
                                {{ $dataPesanan->links() }}
                            </div>
                        </nav>
                    @endif
                </div>

            </div>
        </div>
        @include('livewire.admin.pesanan.detail')
        @include('livewire.admin.pesanan.edit')

    </div>
</div>