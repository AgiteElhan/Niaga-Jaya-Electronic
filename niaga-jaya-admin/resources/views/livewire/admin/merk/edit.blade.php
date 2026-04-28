<div wire:ignore.self class="modal fade" id="modalEditMerk" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit Merk
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="update">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Merk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="nama_merk" class="form-control"  @error('nama_merk') is-invalid @enderror">

                        @error('nama_merk') <small class="text-danger">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keterangan</label>
                        <textarea class="form-control" wire:model.defer="keterangan" rows="3"
                         @error('keterangan') is-invalid @enderror"></textarea>

                        @error('keterangan') <small class="text-danger">{{ $message }}</small> @enderror
                    </div>

                </div>

                <!-- FOOTER -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Batal
                    </button>
                    <button type="submit" class="btn btn-warning">
                        Update
                    </button>
                </div>
            </form>

        </div>
        @script
            <script>
                $wire.on('openEditModal', () => {
                    $('#modalEditMerk').modal('show');
                });

                $wire.on('closeEditModal', () => {
                    $('#modalEditMerk').modal('hide');
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Berhasil Mengupdate Data!",
                        icon: "success"
                    });
                });
            </script>
        @endscript
    </div>
</div>