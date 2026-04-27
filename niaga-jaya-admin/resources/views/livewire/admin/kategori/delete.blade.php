<div wire:ignore.self class="modal fade" id="modalDeleteKategori" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-trash me-2 text-danger"></i>
                    Hapus Kategori
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- BODY -->
            <div class="modal-body text-center">
                <p>Apakah kamu yakin ingin menghapus kategori ini?</p>
                <strong class="text-danger">{{ $nama_kategori }}</strong>
            </div>

            <!-- FOOTER -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Batal
                </button>
                <button type="button" wire:click="destroy" class="btn btn-danger">
                    Hapus
                </button>
            </div>

        </div>
    </div>
</div>