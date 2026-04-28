<div wire:ignore.self class="modal fade" id="modalTambahKategori" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="bx bx-plus me-2 text-primary"></i>
                    Tambah Kategori
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="store">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Kategori</label>
                        <span class="text-danger">*</span>

                        <input type="text"
                            wire:model="nama_kategori"
                            class="form-control @error('nama_kategori') is-invalid @enderror"
                            placeholder="Contoh: Lampu LED">

                        @error('nama_kategori')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Deskripsi</label>
                        <span class="text-danger">*</span>

                        <input type="text"
                            wire:model="deskripsi"
                            class="form-control @error('deskripsi') is-invalid @enderror"
                            placeholder="Contoh: Deskripsi Singkat">

                        @error('deskripsi')
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
                        $('#modalTambahKategori').modal('hide')
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