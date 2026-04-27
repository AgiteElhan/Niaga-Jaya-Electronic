<div class="modal fade" id="modalTambahSupplier" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-plus me-2 text-primary"></i>
                    Tambah Supplier
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="store">
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Nama Supplier</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="nama_supplier" class="form-control" @error('nama_supplier') is-invalid @enderror" placeholder="Contoh: PT.GLOBAL">

                        @error('nama_supplier')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Nomor Telpon</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="no_telp" class="form-control" @error('no_telp') is-invalid @enderror" placeholder="Contoh: 08XXXXXXX">

                         @error('no_telp')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    

                    <div class="mb-3">
                        <label class="form-label">Alamat</label>
                        <textarea class="form-control" wire:model="alamat" rows="3" @error('alamat') is-invalid @enderror" placeholder="Contoh: Jakarta"></textarea>

                        @error('alamat')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="cmb-3">
                        <label class="form-label">Status</label>
                        <span class="text-danger">*</span>
                            <select wire:model="status" id="status" class="form-control" @error('status') is-invalid @enderror>
                                <option selected>--Pilih Status--</option>
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Tidak Aktif</option>
                            </select>                       
                    </div>
                </div>

                <!-- FOOTER -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Batal
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>