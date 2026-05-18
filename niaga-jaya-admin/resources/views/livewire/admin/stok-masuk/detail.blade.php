<!-- Modal Detail Stok Masuk -->
<div wire:ignore.self class="modal fade" id="modalDetailStok" tabindex="-1" aria-labelledby="modalDetailStokLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-info text-white">
                <h5 class="modal-title" id="modalDetailStokLabel">
                    <i class="ti ti-file-description me-2"></i>Detail Stok Masuk
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @if($selectedStok)
                <!-- Header Informasi -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                            <tr>
                                <td width="150" class="text-muted">Nomor Referensi</td>
                                <td width="10">:</td>
                                <td class="fw-bold text-primary">{{ $selectedStok->nomor_referensi }}</td>
                            </tr>
                            <tr>
                                <td class="text-muted">Tanggal Masuk</td>
                                <td>:</td>
                                <td class="fw-bold">{{ \Carbon\Carbon::parse($selectedStok->tanggal_masuk)->format('d F Y') }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                            <tr>
                                <td width="150" class="text-muted">Supplier</td>
                                <td width="10">:</td>
                                <td class="fw-bold">{{ $selectedStok->supplier->nama_supplier ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="text-muted">Catatan</td>
                                <td>:</td>
                                <td>{{ $selectedStok->catatan ?? '-' }}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- Tabel Item Barang -->
                <h6 class="fw-bold mb-3"><i class="ti ti-package me-2"></i>Daftar Barang Masuk</h6>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-light">
                            <tr>
                                <th width="50" class="text-center">No</th>
                                <th>Nama Produk</th>
                                <th width="150" class="text-center">Jumlah Masuk</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($selectedStok->items as $index => $detail)
                            <tr>
                                <td class="text-center">{{ $index + 1 }}</td>
                                <td>
                                    <div class="fw-bold">{{ $detail->product->nama_produk }}</div>
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-primary-subtle text-primary fw-bold px-3 py-2">
                                        {{ $detail->jumlah_masuk }} Unit
                                    </span>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot class="table-light fw-bold">
                            <tr>
                                <td colspan="2" class="text-end">Total Keseluruhan</td>
                                <td class="text-center text-primary">{{ $selectedStok->items->sum('jumlah_masuk') }} Unit</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                @else
                <div class="text-center py-5">
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2 text-muted">Memuat data...</p>
                </div>
                @endif
            </div>
            <div class="modal-footer bg-light d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                
                <!-- Tombol Cetak PDF -->
                @if($selectedStok)
                <a href="#" target="_blank" class="btn btn-danger">
                    <i class="ti ti-file-type-pdf me-2"></i>Cetak PDF
                </a>
                @endif
            </div>
        </div>
    </div>
</div>

{{-- {{ route('admin.stok-masuk.pdf', $selectedStok->id) }} --}}