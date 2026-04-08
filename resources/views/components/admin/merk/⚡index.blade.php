<?php

use Livewire\Component;

new class extends Component
{
    //
};
?>

<div>
<div class="p-4"> <!-- ROOT -->

    <div class="card">

        <!-- HEADER -->
        <div class="card-header d-flex justify-content-between align-items-center px-4">
            <h6 class="mb-0">Daftar Merk</h6>

            <button 
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahMerk">
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
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Nama Merk</th>
                            <th>Keterangan</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="text-center">1</td>
                            <td>Samsung</td>
                            <td>Elektronik & Gadget</td>
                            <td class="text-center">
                                <div class="btn-group gap-1">

                                    <!-- EDIT -->
                                    <button 
                                        class="btn btn-warning btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditMerk">
                                        <i class="ti ti-edit"></i>
                                    </button>

                                    <!-- DELETE -->
                                    <button 
                                        class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDeleteMerk">
                                        <i class="ti ti-trash"></i>
                                    </button>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>

            <!-- PAGINATION -->
            <div class="d-flex justify-content-between align-items-center mt-3 ps-4">

                <div class="text-muted small">
                    Menampilkan 1 sampai 10 dari 100 data
                </div>

                <nav>
                    <ul class="pagination pagination-sm mb-0 p-4">
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

    <!-- MODAL (nanti kamu bikin) -->
    @include('components.admin.merk.create')
    @include('components.admin.merk.edit')
    @include('components.admin.merk.delete')

</div>
</div>