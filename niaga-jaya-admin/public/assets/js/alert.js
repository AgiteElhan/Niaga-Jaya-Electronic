
// alert create Kategori
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalTambahKategori'))
              modal.show()
          })

          Livewire.on('closeCreateModalKategori', () => {
              const modalEl = document.getElementById('modalTambahKategori')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Kategori berhasil ditambahkan",
                  icon: "success"
              })
          })

      })

// alert edit Kategori
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalEditKategori'))
              modal.show()
          })

          Livewire.on('closeEditModalKategori', () => {
              const modalEl = document.getElementById('modalEditKategori')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Kategori berhasil diupdate",
                  icon: "success"
              })
          })

      })
// alert delete Kategori
document.addEventListener('livewire:init', () => {

          Livewire.on('openDeleteModalKategori', () => {
            new bootstrap.Modal(document.getElementById('modalDeleteKategori')).show();
        });

          Livewire.on('closeDeleteModalKategori', () => {
              const modalEl = document.getElementById('modalDeleteKategori')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Kategori berhasil dihapus",
                  icon: "success"
              })
          })

      })
// alert create Merk
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalTambahMerk'))
              modal.show()
          })

          Livewire.on('closeCreateModalMerk', () => {
              const modalEl = document.getElementById('modalTambahMerk')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Merk berhasil ditambahkan",
                  icon: "success"
              })
          })

      })

// alert edit Kategori
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalEditMerk'))
              modal.show()
          })

          Livewire.on('closeEditModalMerk', () => {
              const modalEl = document.getElementById('modalEditMerk')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Merk berhasil diupdate",
                  icon: "success"
              })
          })

      })
// alert delete Kategori
document.addEventListener('livewire:init', () => {

          Livewire.on('openDeleteModalMerk', () => {
            new bootstrap.Modal(document.getElementById('modalDeleteMerk')).show();
        });

          Livewire.on('closeDeleteModalMerk', () => {
              const modalEl = document.getElementById('modalDeleteMerk')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Merk berhasil dihapus",
                  icon: "success"
              })
          })

      })

// alert create Supplier
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalTambahSupplier'))
              modal.show()
          })

          Livewire.on('closeCreateModalSupplier', () => {
              const modalEl = document.getElementById('modalTambahSupplier')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Supplier berhasil ditambahkan",
                  icon: "success"
              })
          })

      })

// alert edit Supplier
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalEditSupplier'))
              modal.show()
          })

          Livewire.on('closeEditModalSupplier', () => {
              const modalEl = document.getElementById('modalEditSupplier')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Supplier berhasil diupdate",
                  icon: "success"
              })
          })

      })
// alert delete Supplier
document.addEventListener('livewire:init', () => {

          Livewire.on('openDeleteModalSupplier', () => {
            new bootstrap.Modal(document.getElementById('modalDeleteSupplier')).show();
        });

          Livewire.on('closeDeleteModalSupplier', () => {
            const modalEl = document.getElementById('modalDeleteSupplier');

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();

            // 🔥 HAPUS backdrop yang nyangkut
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

            // 🔥 BALIKIN scroll body
            document.body.classList.remove('modal-open');
            document.body.style = '';

            Swal.fire({
                title: "Berhasil!",
                text: "Data Supplier berhasil dihapus",
                icon: "success"
            });
        });

      })


// alert create User
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalTambahUser'))
              modal.show()
          })

          Livewire.on('closeCreateModalUser', () => {
              const modalEl = document.getElementById('modalTambahUser')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data User berhasil ditambahkan",
                  icon: "success"
              })
          })

      })

// alert edit User
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalEditUser'))
              modal.show()
          })

          Livewire.on('closeEditModalUser', () => {
              const modalEl = document.getElementById('modalEditUser')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data User berhasil diupdate",
                  icon: "success"
              })
          })

      })
// alert delete User
document.addEventListener('livewire:init', () => {

          Livewire.on('openDeleteModalUser', () => {
            new bootstrap.Modal(document.getElementById('modalDeleteUser')).show();
        });

          Livewire.on('closeDeleteModalUser', () => {
            const modalEl = document.getElementById('modalDeleteUser');

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();

            // 🔥 HAPUS backdrop yang nyangkut
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

            // 🔥 BALIKIN scroll body
            document.body.classList.remove('modal-open');
            document.body.style = '';

            Swal.fire({
                title: "Berhasil!",
                text: "Data User berhasil dihapus",
                icon: "success"
            });
        });

      })

// alert create Produk
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalTambahProduk'))
              modal.show()
          })

          Livewire.on('closeCreateModalProduk', () => {
              const modalEl = document.getElementById('modalTambahProduk')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Produk berhasil ditambahkan",
                  icon: "success"
              })
          })

      })

// alert edit Produk
document.addEventListener('livewire:init', () => {

          Livewire.on('openModal', () => {
              const modal = new bootstrap.Modal(document.getElementById('modalEditProduk'))
              modal.show()
          })

          Livewire.on('closeEditModalProduk', () => {
              const modalEl = document.getElementById('modalEditProduk')

              const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
              modal.hide()

              modalEl.querySelector('form').reset()

              Swal.fire({
                  title: "Berhasil!",
                  text: "Data Produk berhasil diupdate",
                  icon: "success"
              })
          })

      })
// alert delete Produk
document.addEventListener('livewire:init', () => {

          Livewire.on('openDeleteModalProduk', () => {
            new bootstrap.Modal(document.getElementById('modalDeleteProduk')).show();
        });

          Livewire.on('closeDeleteModalProduk', () => {
            const modalEl = document.getElementById('modalDeleteProduk');

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();

            // 🔥 HAPUS backdrop yang nyangkut
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

            // 🔥 BALIKIN scroll body
            document.body.classList.remove('modal-open');
            document.body.style = '';

            Swal.fire({
                title: "Berhasil!",
                text: "Data Produk berhasil dihapus",
                icon: "success"
            });
        });

      })