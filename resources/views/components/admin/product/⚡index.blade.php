<?php

use Livewire\Component;

new class extends Component
{
    //
};
?>

<div>

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Daftar Produk</h6>

            <button 
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahProduk">
                <i class="ti ti-plus me-1"></i>
                Tambah
            </button>
        </div>

        <!-- BODY -->
        <div class="card-body">

            <!-- SEARCH & SHOW -->
            <div class="row g-3 mb-3">

                <div class="col-6 col-md-3">
                    <label class="form-label small text-muted mb-1">Tampilkan</label>
                    <select class="form-select form-select-sm">
                        <option>10 Data</option>
                        <option>25 Data</option>
                        <option>50 Data</option>
                        <option>100 Data</option>
                    </select>
                </div>

                <div class="col-6 col-md-9">
                    <label class="form-label small text-muted mb-1">Pencarian</label>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-primary text-white">
                            <i class="ti ti-search"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Cari produk...">
                    </div>
                </div>

            </div>

            <!-- TABLE -->
            <div class="table-responsive">
                <table class="table table-striped table-bordered align-middle">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Gambar</th>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th>Merk</th>
                            <th>Kode</th>
                            <th>Harga Jual</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="text-center">1</td>

                            <!-- GAMBAR -->
                            <td>
                                <img src="https://via.placeholder.com/60" 
                                     class="rounded" 
                                     width="60">
                            </td>

                            <td>TV LED 32 Inch</td>
                            <td>Elektronik</td>
                            <td>Samsung</td>
                            <td>PRD-001</td>
                            <td>1.000,000</td>

                            <!-- AKSI -->
                            <td class="text-center">
                                <div class="btn-group gap-1">

                                    <button 
                                        class="btn btn-warning btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditProduk">
                                        <i class="ti ti-edit"></i>
                                    </button>

                                    <button 
                                        class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDeleteProduk">
                                        <i class="ti ti-trash"></i>
                                    </button>

                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            <!-- PAGINATION -->
            <div class="d-flex justify-content-between align-items-center mt-3">

                <div class="text-muted small">
                    Menampilkan 1 sampai 10 dari 100 data
                </div>

                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled"><a class="page-link">«</a></li>
                        <li class="page-item active"><a class="page-link">1</a></li>
                        <li class="page-item"><a class="page-link">2</a></li>
                        <li class="page-item"><a class="page-link">3</a></li>
                        <li class="page-item"><a class="page-link">»</a></li>
                    </ul>
                </nav>

            </div>

        </div>

    </div>

    <!-- MODAL (nanti bikin seperti sebelumnya) -->
    @include('components.admin.product.create')
    @include('components.admin.product.edit')
    @include('components.admin.product.delete')

</div>