<div class="modal fade" id="modalDeleteMerk" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title ">
                    <i class="ti ti-trash me-2"></i>
                    Hapus Merk
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- BODY -->
            <div class="modal-body text-center">
                <p>Apakah kamu yakin ingin menghapus merk ini?</p>
                <strong class="text-danger">{{ $nama_kategori ?? 'Samsung' }}</strong>

            </div>

            <!-- FOOTER -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Batal
                </button>
                <button type="button" class="btn btn-danger">
                    Hapus
                </button>
            </div>

        </div>
    </div>
</div>