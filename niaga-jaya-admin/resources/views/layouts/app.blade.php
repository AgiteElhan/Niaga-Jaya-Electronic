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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
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
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{ asset('assets/js/sidebar.js') }}"></script>
    <script src="{{ asset('assets/js/chart.js') }}"></script>
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

</html>