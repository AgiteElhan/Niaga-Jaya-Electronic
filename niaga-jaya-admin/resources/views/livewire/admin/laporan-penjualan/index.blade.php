<div>
    <div class="p-4">
        {{-- SUMMARY CARDS --}}
        <div class="row mb-4">
            <div class="col-12 col-md-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
                            <i class="ti ti-wallet fs-4"></i>
                        </div>
                        <div>
                            <small class="text-muted text-uppercase fw-bold fs-7">Total Pendapatan</small>
                            <h5 class="mb-0 fw-black">Rp {{ number_format($totalPendapatan, 0, ',', '.') }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body d-flex align-items-center">
                        <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
                            <i class="ti ti-shopping-cart fs-4"></i>
                        </div>
                        <div>
                            <small class="text-muted text-uppercase fw-bold fs-7">Total Transaksi</small>
                            <h5 class="mb-0 fw-black">{{ $totalTransaksi }} Pesanan</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body d-flex align-items-center">
                        <div class="bg-info bg-opacity-10 p-3 rounded-3 text-info me-3">
                            <i class="ti ti-package fs-4"></i>
                        </div>
                        <div>
                            <small class="text-muted text-uppercase fw-bold fs-7">Produk Terjual</small>
                            <h5 class="mb-0 fw-black">{{ $totalProduk }} Unit</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- TABEL LAPORAN --}}
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-light">
                <h6 class="mb-0 fw-bold text-primary">
                    <i class="ti ti-report-money me-1"></i> Laporan Data Penjualan
                </h6>
                <div class="btn-group gap-2">
                    <button wire:click="exportPdf" wire:loading.attr="disabled" target="_blank"  class="btn btn-danger btn-sm">
                        <i class="ti ti-file-type-pdf me-1"></i> Cetak PDF
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="row g-3 mb-3">
                    <div class="col-6 col-md-3">
                        <label class="form-label small text-muted mb-1">Tampilkan</label>
                        <select wire:model.live="paginate" class="form-select form-select-sm">
                            <option value="10">10 Data</option>
                            <option value="25">25 Data</option>
                            <option value="50">50 Data</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-9">
                        <label class="form-label small text-muted mb-1">Pencarian</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text"><i class="ti ti-search"></i></span>
                            <input wire:model.live="search" type="text" class="form-control" placeholder="Cari nomor pesanan, pembeli, atau produk...">
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-bordered align-middle">
                        <thead class="table-light">
                            <tr>
                                <th class="text-center">No</th>
                                <th>No Pesanan</th>
                                <th>Tanggal</th>
                                <th>Produk</th>
                                <th>Qty</th>
                                <th>Total Bayar</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($dataPenjualan as $index => $order)
                                <tr>
                                    <td class="text-center">{{ $dataPenjualan->firstItem() + $index }}</td>
                                    <td class="fw-bold text-primary">{{ $order->nomor_pesanan }}</td>
                                    <td>{{ $order->created_at->format('d M Y') }}</td>
                                    <td>
                                        <ul class="list-unstyled mb-0">
                                            @foreach($order->items as $item)
                                                <li>{{ $item->product->nama_produk ?? 'Produk Dihapus' }} ({{ $item->jumlah }}x)</li>
                                            @endforeach
                                        </ul>
                                    </td>
                                    <td class="text-center">{{ $order->items->sum('jumlah') }}</td>
                                    <td class="fw-bold">Rp {{ number_format($order->total_bayar, 0, ',', '.') }}</td>
                                    <td class="text-center">
                                        <span class="badge bg-success">Selesai</span>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5 text-muted">Data tidak ditemukan</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="text-muted small">
                        Menampilkan {{ $dataPenjualan->firstItem() ?? 0 }} sampai {{ $dataPenjualan->lastItem() ?? 0 }} dari {{ $dataPenjualan->total() }} data
                    </div>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            {{ $dataPenjualan->links() }}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>