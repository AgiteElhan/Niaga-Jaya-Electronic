<div class="modal fade" id="modalDeleteMerk" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content text-center p-3">

            <h5 class="text-danger">
                <i class="ti ti-trash me-2"></i>
                Hapus Merk?
            </h5>

            <p>Data tidak bisa dikembalikan</p>
            <strong>Samsung</strong>

            <form action="{{ route('merk.destroy', 1) }}" method="POST">
                @csrf
                @method('DELETE')

                <button class="btn btn-danger">Hapus</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            </form>

        </div>
    </div>
</div>