<div class="modal fade" id="modalEditKategori" tabindex="-1">
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
            <form>
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Kategori</label>
                        <span class="text-danger">*</span>

                        <input type="text"
                            class="form-control"
                            placeholder="Edit nama kategori"
                            value="Elektronik">
                    </div>

                         <div class="mb-3">
                        <label class="form-label">Keterangan</label>
                        <span class="text-danger">*</span>

                        <input type="text"
                            class="form-control"
                            placeholder="Edit Keterangan kategori"
                            value="Hidup Jokowi">
                    </div>

                </div>

                <!-- FOOTER -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Batal
                    </button>
                    <button type="button" class="btn btn-warning">
                        Update
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>