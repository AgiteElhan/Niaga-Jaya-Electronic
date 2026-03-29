<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>@yield('title')</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" sizes="180x180" href="{{asset('assets/images/favicon_io/apple-touch-icon.png')}}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{asset('assets/images/favicon_io/favicon-32x32.png')}}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{asset('assets/images/favicon_io/favicon-16x16.png')}}">
  <link rel="manifest" href="{{asset('assets/images/favicon_io/site.webmanifest')}}">
  <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet">
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
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{ asset('assets/js/sidebar.js') }}"></script>
    <script src="{{ asset('assets/js/chart.js') }}"></script>
</body>

</html>