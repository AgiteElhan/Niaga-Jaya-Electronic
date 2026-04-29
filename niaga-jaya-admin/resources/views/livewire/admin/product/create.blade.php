<div wire:ignore.self class="modal fade" id="modalTambahProduk" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" style="max-height: 90vh;">

            <div class="modal-header">
                <h5 class="modal-title">Tambah Produk</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form wire:submit.prevent="store">
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <div class="mb-3">
                        <label class="form-label">Nama Produk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="nama_produk"
                            class="form-control @error('nama_produk') is-invalid @enderror"
                            placeholder="Nama Produk">

                        @error('nama_produk')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Kode Produk</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="kode_produk"
                            class="form-control @error('kode_produk') is-invalid @enderror"
                            placeholder="Kode Produk">

                        @error('kode_produk')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Kategori</label>
                        <span class="text-danger">*</span>
                        <select wire:model="kategori_id"
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
                        <select wire:model="merk_id"
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
                        <input type="text" wire:model="harga_jual"
                            class="form-control @error('harga_jual') is-invalid @enderror"
                            placeholder="Rp.">

                        @error('harga_jual')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Harga Discount</label>
                        <input type="text" wire:model="harga_discount"
                            class="form-control @error('harga_discount') is-invalid @enderror"
                            placeholder="Rp.">

                        @error('harga_discount')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Stok</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="stok"
                            class="form-control @error('stok') is-invalid @enderror"
                            placeholder="pcs">

                        @error('stok')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Deskripsi</label>
                        <span class="text-danger">*</span>
                        <input type="text" wire:model="deskripsi"
                            class="form-control @error('deskripsi') is-invalid @enderror"
                            placeholder="Deskripsi">

                        @error('deskripsi')
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
    </div>
</div>