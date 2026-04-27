<div wire:ignore.self class="modal fade" id="modalEditUser" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-edit me-2 text-warning"></i>
                    Edit User
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- FORM -->
            <form wire:submit.prevent="update">
                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Nama User</label>
                        <span class="text-danger">*</span>
                        <input wire:model.defer="name" type="text" class="form-control" @error('name') is-invalid @enderror" placeholder="Contoh: Samsul">

                        @error('name')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <span class="text-danger">*</span>
                        <input wire:model.defer="email" type="email" class="form-control" @error('email') is-invalid @enderror" placeholder="Contoh: Samsul@gmail.com">

                        @error('email')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>

                        <input 
                            wire:model.defer="password" 
                            type="password" 
                            class="form-control @error('password') is-invalid @enderror"
                            placeholder="Kosongkan jika tidak diubah"
                        >
                        @error('password')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                    </div>

                    <div class="cmb-3">
                        <label class="form-label">Role</label>
                        <span class="text-danger">*</span>
                            <select wire:model.defer="role" id="role" class="form-control" @error('role') is-invalid @enderror>
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
                    <button type="submit" class="btn btn-warning">
                        Update
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>