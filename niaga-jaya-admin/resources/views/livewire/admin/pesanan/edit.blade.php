<div wire:ignore.self class="modal fade" id="modalUpdateStatus" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" style="max-height: 90vh;">

            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-truck me-2 text-warning"></i>
                    Update Status Pengiriman
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form wire:submit.prevent="updateStatus">
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    
                    <table class="table table-bordered align-middle">
                        <tbody>
                            <tr>
                                <th style="width: 35%; background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Nama Pembeli</label>
                                </th>
                                <td>
                                    <input type="text" value="{{ $nama_pembeli }}" class="form-control bg-light" readonly>
                                </td>
                            </tr>

                            <tr>
                                <th style="background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Produk</label>
                                </th>
                                <td>
                                    <textarea class="form-control bg-light" rows="2" readonly>{{ $produk }}</textarea>
                                </td>
                            </tr>

                            <tr>
                                <th style="background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Total Pembayaran</label>
                                </th>
                                <td>
                                    <input type="text" value="{{ $total_bayar }}" class="form-control bg-light" readonly>
                                </td>
                            </tr>

                            <tr>
                                <th style="background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Nomor WhatsApp</label>
                                </th>
                                <td>
                                    <input type="text" value="{{ $whatsapp_pembeli }}" class="form-control bg-light" readonly>
                                </td>
                            </tr>

                            <tr>
                                <th style="background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Status Pengiriman</label>
                                    <span class="text-danger">*</span>
                                </th>
                                <td>
                                    <select wire:model.live="status_pengiriman" class="form-select border-warning @error('status_pengiriman') is-invalid @enderror">
                                        <option value="">-- Pilih Status Pengiriman --</option>
                                        <option value="dikemas">Sedang Dikemas</option>
                                        <option value="dikirim">Sedang Dikirim</option>
                                        <option value="selesai">Selesai / Tiba</option>
                                        <option value="batal">Dibatalkan</option>
                                    </select>

                                    @error('status_pengiriman')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </td>
                            </tr>

                            @if($status_pengiriman === 'dikirim')
                            <tr>
                                <th style="background-color: #f8f9fa;">
                                    <label class="form-label mb-0">Nomor Resi</label>
                                    <span class="text-danger">*</span>
                                </th>
                                <td>
                                    <input type="text" wire:model.defer="nomor_resi" class="form-control border-primary @error('nomor_resi') is-invalid @enderror" placeholder="Masukkan Nomor Resi Pengiriman">
                                    
                                    @error('nomor_resi')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </td>
                            </tr>
                            @endif

                        </tbody>
                    </table>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Tutup
                    </button>
                    <button type="submit" class="btn btn-warning">
                        Update Status
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>