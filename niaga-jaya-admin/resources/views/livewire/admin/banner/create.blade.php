<div wire:ignore.self class="modal fade" id="modalTambahBanner" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="bx bx-plus me-2 text-primary"></i>
                    Tambah Banner
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="store">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Banner</label>
                        <span class="text-danger">*</span>

                        <input type="text"
                            wire:model="nama_banner"
                            class="form-control @error('nama_banner') is-invalid @enderror"
                            placeholder="Banner promo 3.3">

                        @error('nama_banner')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Gambar</label>
                        <span class="text-danger">*</span>
                        <input type="file" wire:model.live="gambar"
                            class="form-control @error('gambar') is-invalid @enderror">

                        @error('gambar')
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
                        $('#modalTambahBanner').modal('hide')
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