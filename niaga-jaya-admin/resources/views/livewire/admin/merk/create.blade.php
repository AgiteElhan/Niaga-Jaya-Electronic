<div class="modal fade" id="modalTambahMerk" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-plus me-2 text-primary"></i>
                    Tambah Merk
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="store">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Merk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="nama_merk" class="form-control"  @error('nama_merk') is-invalid @enderror" placeholder="Contoh: Samsung">

                        @error('nama_merk')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keterangan</label>
                        <textarea class="form-control" wire:model="keterangan" rows="3"  @error('keterangan') is-invalid @enderror" placeholder="Contoh: Elektronik & Gadget"></textarea>

                        @error('keterangan')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
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
                @script
                <script>
                    $wire.on('closeCreateModal', () => {
                        $('#modalTambahMerk').modal('hide')
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Berhasil Menambahkan Data!",
                            icon: "success"
                        });
                    });
                </script>
                @endscript
    </div>
</div>