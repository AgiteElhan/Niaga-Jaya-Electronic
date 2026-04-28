<div  wire:ignore.self class="modal fade" id="modalEditKategori" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit Kategori
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="update">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Kategori</label>
                        <span class="text-danger">*</span>

                        <input wire:model.defer="nama_kategori" type="text"
                            class="form-control @error('nama_kategori') is-invalid @enderror">
                            @error('nama_kategori') <small class="text-danger">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keterangan</label>
                        <span class="text-danger">*</span>

                        <input wire:model.defer="deskripsi" type="text"
                            class="form-control @error('deskripsi') is-invalid @enderror">
                            @error('deskripsi') <small class="text-danger">{{ $message }}</small> @enderror
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
                    $wire.on('closeEditModal', () => {
                        $('#modalEditKategori').modal('hide')
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