<div wire:ignore.self class="modal fade" id="modalDetailProduk" tabindex="-1" aria-labelledby="modalDetailProdukLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-info text-white">
                <h5 class="modal-title" id="modalDetailProdukLabel">
                    <i class="ti ti-info-circle me-2"></i> Detail Informasi Produk
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                @if($selectedProduct)
                    <div class="row g-4">
                        <div class="col-md-4 text-center">
                            <div class="p-2 border rounded bg-light mb-3">
                                <img src="{{ asset('storage/products/' . $selectedProduct->gambar) }}" 
                                     class="img-fluid rounded" 
                                     style="max-height: 220px; object-fit: contain;" 
                                     alt="Gambar {{ $selectedProduct->nama_produk }}">
                            </div>
                            
                            <div class="d-grid">
                                @if($selectedProduct->stok <= 0)
                                    <span class="btn btn-sm btn-danger disabled fw-bold">STOK HABIS</span>
                                @elseif($selectedProduct->stok < 10)
                                    <span class="btn btn-sm btn-warning disabled text-dark fw-bold">STOK MENIPIS</span>
                                @else
                                    <span class="btn btn-sm btn-success disabled fw-bold">STOK AMAN</span>
                                @endif
                            </div>
                        </div>

                        <div class="col-md-8">
                            <h4 class="fw-bold text-dark mb-1">{{ $selectedProduct->nama_produk }}</h4>

                            <table class="table table-sm table-borderless align-middle">
                                <tr>
                                    <td width="30%" class="text-muted py-2">Kode Barang</td>
                                    <td width="2%">:</td>
                                    <td class="fw-bold text-primary py-2">{{ $selectedProduct->kode_produk }}</td>
                                </tr>
                                <tr>
                                    <td class="text-muted py-2">Kategori</td>
                                    <td>:</td>
                                    <td class="fw-semibold py-2">{{ $selectedProduct->kategori->nama_kategori ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="text-muted py-2">Merk / Brand</td>
                                    <td>:</td>
                                    <td class="fw-semibold py-2">{{ $selectedProduct->merk->nama_merk ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="text-muted py-2">Harga Jual</td>
                                    <td>:</td>
                                    <td class="fw-bold text-dark py-2">
                                        Rp {{ number_format($selectedProduct->harga_jual, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-muted py-2">Posisi Sisa Stok</td>
                                    <td>:</td>
                                    <td class="fw-bold py-2">
                                        <span class="fs-5 text-dark">{{ $selectedProduct->stok }}</span> <small class="text-muted">pcs</small>
                                    </td>
                                </tr>
                            </table>

                            <div class="mt-3 border-top pt-3">
                                <label class="fw-bold text-muted small d-block mb-1">Deskripsi / Spesifikasi:</label>
                                <div class="p-3 bg-light rounded text-secondary small" style="white-space: pre-line; max-height: 120px; overflow-y: auto;">
                                    {{ $selectedProduct->deskripsi ?? 'Tidak ada deskripsi tambahan untuk produk ini.' }}
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <div class="text-center py-5">
                        <div class="spinner-border text-info mb-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="text-muted mb-0 small">Menghubungkan ke database gudang...</p>
                    </div>
                @endif
            </div>

            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary btn-sm px-3" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>