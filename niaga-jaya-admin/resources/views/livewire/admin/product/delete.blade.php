<div wire:ignore.self class="modal fade" id="modalDeleteProduk" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-trash me-2"></i>
                    Hapus Produk
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- BODY -->
            <div class="modal-body text-center">

                {{-- Preview Gambar --}}
                @if($gambar_lama)
                    <div class="mb-3">
                        <img 
                            src="{{ asset('storage/products/' . $gambar_lama) }}"
                            alt="gambar produk"
                            width="150"
                            class="img-thumbnail rounded">
                    </div>
                @endif

                <p>Apakah kamu yakin ingin menghapus Produk ini?</p>

                <strong class="text-danger">
                    {{ $nama_produk }}
                </strong>

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