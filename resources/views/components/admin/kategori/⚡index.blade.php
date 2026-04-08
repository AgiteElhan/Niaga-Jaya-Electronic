<?php

use Livewire\Component;

new class extends Component
{
    public function create()
    {
        // nanti bisa dipakai reset form
    }
};
?>

<div>
<div class="p-4"> <div class="card">

        <div class="card-header d-flex justify-content-between align-items-center px-4">
            <h6 class="mb-0">Daftar Kategori</h6>

            <button wire:click="create"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahKategori">
                <i class="ti ti-plus me-1"></i>
                Tambah
            </button>
        </div>

        <div class="card-body">
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
                        <input type="text" class="form-control" placeholder="Cari kategori...">
                    </div>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th width="50" class="text-center">No</th>
                            <th>Nama Kategori</th>
                            <th>Keterangan</th>
                            <th width="120" class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="text-center">1</td>
                            <td>Elektronik</td>
                            <td>Hidup Jokowi</td>
                            <td class="text-center">
                                <div class="btn-group gap-1">
                                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditKategori">
                                        <i class="ti ti-edit"></i>
                                    </button>

                                    <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalDeleteKategori">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div> 

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

    @include('components.admin.kategori.create')
    @include('components.admin.kategori.edit')
    @include('components.admin.kategori.delete')

</div>
</div>

@script
<script>
    $wire.on('closeCreateModal', () => {
        $('#modalTambahKategori').modal('hide')
        Swal.fire({
            title: "Berhasil!",
            text: "Kategori berhasil ditambahkan!",
            icon: "success"
        });
    });
</script>
@endscript