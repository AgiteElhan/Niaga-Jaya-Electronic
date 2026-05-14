<div wire:ignore.self class="modal fade" id="modalTambahStokMasuk" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" style="max-height: 90vh;">

            <div class="modal-header">
                <h5 class="modal-title">Tambah Stok Produk</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form wire:submit.prevent="store">
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <!-- Header: No Referensi, Supplier, Tanggal -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Nomor Referensi <span class="text-danger">*</span></label>
                            <input type="text" wire:model="nomor_referensi" class="form-control @error('nomor_referensi') is-invalid @enderror">
                            @error('nomor_referensi') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tanggal Masuk <span class="text-danger">*</span></label>
                            <input type="date" wire:model="tanggal_masuk" class="form-control @error('tanggal_masuk') is-invalid @enderror">
                            @error('tanggal_masuk') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Supplier <span class="text-danger">*</span></label>
                        <select wire:model="supplier_id" class="form-select @error('supplier_id') is-invalid @enderror">
                            <option value="">-- Pilih Supplier --</option>
                            @foreach($supplier ?? [] as $s)
                                <option value="{{ $s->id }}">{{ $s->nama_supplier }}</option>
                            @endforeach
                        </select>
                        @error('supplier_id') <small class="text-danger">{{ $message }}</small> @enderror
                    </div>

                    <hr>
                    <h6 class="fw-bold mb-3 text-primary">Daftar Produk yang Dikirim</h6>

                    <!-- Bagian Multi-Item -->
                    @foreach($itemBarang as $index => $item)
                        <div class="row align-items-end mb-3 border-bottom pb-3">
                            <div class="col-md-6">
                                <label class="form-label small">Nama Produk</label>
                                <select wire:model="itemBarang.{{ $index }}.produk_id" class="form-select @error('itemBarang.'.$index.'.produk_id') is-invalid @enderror">
                                    <option value="">-- Pilih Produk --</option>
                                    @foreach($product ?? [] as $p)
                                        <option value="{{ $p->id }}">{{ $p->nama_produk }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small">Jumlah (Pcs)</label>
                                <input type="number" wire:model="itemBarang.{{ $index }}.jumlah_masuk" class="form-control @error('itemBarang.'.$index.'.jumlah_masuk') is-invalid @enderror">
                            </div>
                            <div class="col-md-2">
                                @if(count($itemBarang) > 1)
                                    <button type="button" wire:click="removeInput({{ $index }})" class="btn btn-outline-danger w-100">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                @endif
                            </div>
                        </div>
                    @endforeach

                    <button type="button" wire:click="addInput" class="btn btn-outline-primary btn-sm mb-3">
                        <i class="ti ti-plus"></i> Tambah Baris Produk
                    </button>

                    <div class="mb-3">
                        <label class="form-label">Catatan Tambahan</label>
                        <textarea wire:model="catatan" class="form-control" rows="2" placeholder="Contoh: Barang titipan, bonus, dll"></textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary px-4">
                        <i class="ti ti-device-floppy me-1"></i> Simpan Stok Masuk
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>