<div class="modal fade" id="modalTambahUser" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-plus me-2 text-primary"></i>
                    Tambah User
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="store">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama User</label>
                        <span class="text-danger">*</span>
                        <input wire:model="name" type="text" class="form-control" @error('name') is-invalid @enderror" placeholder="Contoh: Samsul">

                        @error('name')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <span class="text-danger">*</span>
                        <input wire:model="email" type="email" class="form-control" @error('email') is-invalid @enderror" placeholder="Contoh: Samsul@gmail.com">

                        @error('email')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <span class="text-danger">*</span>
                        <input wire:model="password" type="password" class="form-control" @error('password') is-invalid @enderror" placeholder="**********">

                        @error('password')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="cmb-3">
                        <label class="form-label">Role</label>
                        <span class="text-danger">*</span>
                            <select wire:model="role" id="role" class="form-control" @error('role') is-invalid @enderror>
                                <option selected>--Pilih Role--</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>                       
                    </div>
                </div>

                <!-- FOOTER -->
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