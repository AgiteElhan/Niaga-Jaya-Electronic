<div class="modal fade" id="modalEditUser" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit User
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form>
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama User</label>
                        <span class="text-danger">*</span>
                        <input type="text" class="form-control" value="Zaki">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keterangan</label>
                        <textarea class="form-control" rows="3">Kasir</textarea>
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