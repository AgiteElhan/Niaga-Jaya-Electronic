<div class="modal fade" id="modalTambahProduk">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Tambah Produk</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form action="{{ route('product.store') }}" method="POST">
                @csrf

                <div class="modal-body">

                    <input name="nama_barang" class="form-control mb-2" placeholder="Nama Barang">

                    <select name="kategori_id" class="form-control mb-2">
                        <option>-- Pilih Kategori --</option>
                        @foreach($kategori as $k)
                            <option value="{{ $k->id }}">{{ $k->nama_kategori }}</option>
                        @endforeach
                    </select>

                    <select name="merk_id" class="form-control mb-2">
                        <option>-- Pilih Merk --</option>
                        @foreach($merk as $m)
                            <option value="{{ $m->id }}">{{ $m->nama_merk }}</option>
                        @endforeach
                    </select>

                    <input name="kode" class="form-control mb-2" placeholder="Kode">
                    <input name="harga_jual" type="number" class="form-control mb-2" placeholder="Harga">

                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button class="btn btn-primary">Simpan</button>
                </div>

            </form>

        </div>
    </div>
</div>