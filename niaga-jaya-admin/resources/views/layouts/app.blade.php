<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>@yield('title')</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" sizes="180x180" href="{{asset('assets/images/favicon_io/apple-touch-icon.png')}}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{asset('assets/images/niaga-jaya-logo.png')}}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{asset('assets/images/niaga-jaya-logo.png')}}">
  <link rel="manifest" href="{{asset('assets/images/favicon_io/site.webmanifest')}}">
  <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
  @livewireStyles
</head>

<body>
  <div id="overlay" class="overlay"></div>
  <!-- TOPBAR -->
  @include('layouts.navbar')
  
  <!-- SIDEBAR -->
  @include('layouts.sidebar')

  <!-- MAIN CONTENT -->
  <main id="content" class="content py-10">
    @yield('content')
  </main>

  <div class="row">
        <div class="col-12">
            @include('layouts.footer')
        </div>
      </div>

    <!-- Bootstrap JS -->
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    {{-- <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> --}}
    <script src="{{ asset('assets/js/sidebar.js') }}"></script>
    @livewireScripts
    <script src="{{ asset('assets/js/alert.js')}}"></script>

    @if(session('success'))
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: "{{ session('success') }}",
            confirmButtonColor: '#71dd37'
        });
    </script>
    @endif

    @if($errors->any())
    <script>
        Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: 'Nama pengguna atau kata sandi salah!',
            confirmButtonColor: '#ff3e1d'
        });
    </script>
    @endif

    <script>
      function confirmLogout() {
          Swal.fire({
              title: 'Yakin ingin logout?',
              text: 'Anda akan keluar dari sistem',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#ff3e1d',
              cancelButtonColor: '#8592a3',
              confirmButtonText: 'Ya, Logout',
              cancelButtonText: 'Batal',
              reverseButtons: true
          }).then((result) => {
              if (result.isConfirmed) {
                  document.getElementById('logout-form').submit();
              }
          });
      }
    </script>

</body>
<div id="global-loader">
    <div class="loader-spinner"></div>
    <div class="loader-text">Memuat Data...</div>
</div>

<style>
    /* Styling untuk background putih yang menutupi seluruh layar */
    #global-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #ffffff; /* Warna background */
        z-index: 99999; /* Pastikan selalu paling atas */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    /* Styling untuk animasi lingkaran berputar */
    .loader-spinner {
        width: 60px;
        height: 60px;
        border: 6px solid #f3f3f3; /* Warna abu-abu terang */
        border-top: 6px solid #2563EB; /* Warna biru khas Niaga Jaya */
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }

    .loader-text {
        font-family: sans-serif;
        font-weight: bold;
        color: #64748b;
        letter-spacing: 1px;
    }

    /* Keyframe untuk animasi putaran */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Class tambahan yang akan dipanggil oleh JavaScript saat halaman selesai dimuat */
    .loader-hidden {
        opacity: 0;
        visibility: hidden;
    }
</style>

<script>
    // Script ini akan berjalan otomatis saat seluruh elemen (gambar, teks, dll) selesai dimuat
    window.addEventListener('load', function () {
        const loader = document.getElementById('global-loader');
        if (loader) {
            // Tambahkan class loader-hidden agar loading screen memudar dan menghilang
            loader.classList.add('loader-hidden');
            
            // Hapus elemen dari HTML setelah animasi memudar selesai (500ms) agar tidak mengganggu klik
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
</script>

</html>