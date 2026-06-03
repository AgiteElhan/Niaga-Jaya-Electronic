<div wire:ignore.self class="modal fade" id="modalDetailPesanan" tabindex="-1" aria-labelledby="modalDetailPesananLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="modalDetailPesananLabel">
                    <i class="ti ti-shopping-cart me-2"></i>Detail Pesanan #{{ $selectedOrder->nomor_pesanan ?? '' }}
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @if($selectedOrder)
                <div class="row mb-4">
                    <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                            <tr><td width="120" class="text-muted">Pelanggan</td><td>:</td><td class="fw-bold">{{ $selectedOrder->nama_pembeli }}</td></tr>
                            <tr><td class="text-muted">WhatsApp</td><td>:</td><td>{{ $selectedOrder->whatsapp_pembeli }}</td></tr>
                        </table>
                    </div>
                    
                    <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                            <tr>
                                <td width="120" class="text-muted">Status Bayar</td>
                                <td>:</td>
                                <td><span class="badge bg-info">{{ ucfirst($selectedOrder->status_pembayaran) }}</span></td>
                            </tr>
                            
                            <tr>
                                <td class="text-muted">Pengiriman</td>
                                <td>:</td>
                                <td>
                                    <span class="badge bg-warning">{{ ucfirst($selectedOrder->status_pengiriman ?? 'Menunggu') }}</span>
                                </td>
                            </tr>

                            @if(isset($selectedOrder->status_pengiriman) && $selectedOrder->status_pengiriman === 'dikirim')
                            <tr>
                                <td class="text-muted">Nomor Resi</td>
                                <td>:</td>
                                <td class="fw-bold text-success">{{ $selectedOrder->nomor_resi ?? '-' }}</td>
                            </tr>
                            @endif
                            
                            <tr>
                                <td class="text-muted">Total</td>
                                <td>:</td>
                                <td class="fw-bold text-primary">Rp {{ number_format($selectedOrder->total_bayar, 0, ',', '.') }}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <h6 class="fw-bold mb-3"><i class="ti ti-list-details me-2"></i>Rincian Produk</h6>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>Produk</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Harga</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($selectedOrder->items as $item)
                            <tr>
                                <td>{{ $item->product->nama_produk ?? 'Produk Tidak Ditemukan' }}</td>
                                <td class="text-center">{{ $item->jumlah }}</td>
                                <td class="text-end">Rp {{ number_format($item->harga_satuan, 0, ',', '.') }}</td>
                                <td class="text-end">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                @else
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                @if($selectedOrder)
                <a href="{{ route('admin.order.pdf', $selectedOrder->id) }}" target="_blank" class="btn btn-danger">
                    <i class="ti ti-file-type-pdf me-2"></i>Cetak Invoice
                </a>
                @endif
            </div>
        </div>
    </div>
</div>