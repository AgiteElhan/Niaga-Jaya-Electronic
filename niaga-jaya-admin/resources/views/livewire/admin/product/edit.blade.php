<div wire:ignore.self class="modal fade" id="modalEditProduk" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" style="max-height: 90vh;">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit Produk
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="update">
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <div class="mb-3">
                        <label class="form-label">Nama Produk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="nama_produk"
                            class="form-control @error('nama_produk') is-invalid @enderror"
                            placeholder="Nama Produk">

                        @error('nama_produk')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Kode Produk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="kode_produk"
                            class="form-control @error('kode_produk') is-invalid @enderror"
                            placeholder="Kode Produk">

                        @error('kode_produk')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Kategori</label>
                        <span class="text-danger">*</span>
                        <select wire:model.defer="kategori_id"
                            class="form-select @error('kategori_id') is-invalid @enderror">
                            <option value="">-- Pilih Kategori --</option>
                            @foreach($kategori ?? [] as $k)
                                <option value="{{ $k->id }}">
                                    {{ $k->nama_kategori }}
                                </option>
                            @endforeach
                        </select>

                        @error('kategori_id')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Merk</label>
                        <span class="text-danger">*</span>
                        <select wire:model.defer="merk_id"
                            class="form-select @error('merk_id') is-invalid @enderror">
                            <option value="">-- Pilih Merk --</option>
                            @foreach($merk ?? [] as $m)
                                <option value="{{ $m->id }}">
                                    {{ $m->nama_merk }}
                                </option>
                            @endforeach
                        </select>

                        @error('merk_id')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Harga Jual</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="harga_jual"
                            class="form-control @error('harga_jual') is-invalid @enderror"
                            placeholder="Rp.">

                        @error('harga_jual')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Harga Discount</label>
                        <input type="text" wire:model.defer="harga_discount"
                            class="form-control @error('harga_discount') is-invalid @enderror"
                            placeholder="Rp.">

                        @error('harga_discount')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Stok</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="stok"
                            class="form-control @error('stok') is-invalid @enderror"
                            placeholder="pcs">

                        @error('stok')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Deskripsi</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model.defer="deskripsi"
                            class="form-control @error('deskripsi') is-invalid @enderror"
                            placeholder="Deskripsi">

                        @error('deskripsi')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
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
                                <label class="form-label">Gambar Saat Ini</label><br>

                                <img src="{{ asset('storage/products/' . $gambar_lama) }}"
                                    alt="gambar produk"
                                    width="150"
                                    class="img-thumbnail">
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
                $wire.on('openEditModal', () => {
                    $('#modalEditProduk').modal('show');
                });

                $wire.on('closeEditModal', () => {
                    $('#modalEditProduk').modal('hide');
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