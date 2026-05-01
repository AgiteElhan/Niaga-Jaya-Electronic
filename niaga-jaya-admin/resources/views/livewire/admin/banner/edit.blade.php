<div  wire:ignore.self class="modal fade" id="modalEditBanner" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit Banner
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="update">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama Banner</label>
                        <span class="text-danger">*</span>

                        <input wire:model.defer="nama_banner" type="text"
                            class="form-control @error('nama_banner') is-invalid @enderror">
                            @error('nama_banner') <small class="text-danger">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Gambar</label>
                        <span class="text-danger">*</span>

                        <input type="file" wire:model.defer="gambar"
                            class="form-control @error('gambar') is-invalid @enderror">

                        @error('gambar')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror

                        {{-- Preview gambar lama --}}
                        @if($gambar_lama)
                            <div class="mt-3">
                                <label class="form-label text-muted small">Gambar Saat Ini</label><br>
                                
                                <!-- Container dengan lebar maksimal agar tidak berantakan -->
                                <div class="rounded-3 overflow-hidden border shadow-sm" style="max-width: 100%;">
                                    <img src="{{ asset('storage/banner/' . $gambar_lama) }}" 
                                        alt="Preview Banner Niaga Jaya" 
                                        class="img-fluid d-block"
                                        style="width: 100%; max-height: 200px; object-fit: cover;">
                                </div>
                                
                                <div class="mt-1">
                                    <small class="text-muted italic">*Gambar yang sedang aktif di slider</small>
                                </div>
                            </div>
                        @endif
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
                        $('#modalEditBanner').modal('hide')
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