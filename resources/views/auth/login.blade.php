<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Signin - InApp Inventory Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/images/favicon_io/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/images/favicon_io/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/images/favicon_io/favicon-16x16.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">

</head>

<body>

<div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card" style="max-width:420px; width:100%;">
        <div class="card-body p-5">

            <div class="text-center mb-4">
                <img src="{{ asset('assets/images/logo-icon.svg') }}" width="36">
                <h5 class="mt-3">Sign in to your account</h5>
            </div>

            <!-- 🔥 FORM LOGIN -->
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <!-- EMAIL -->
                <div class="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" value="{{ old('email') }}" class="form-control" required>
                    
                    @error('email')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- PASSWORD -->
                <div class="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" class="form-control" required>

                    @error('password')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- REMEMBER -->
                <div class="mb-3 form-check">
                    <input type="checkbox" name="remember" class="form-check-input">
                    <label class="form-check-label">Remember me</label>
                </div>

                <!-- BUTTON -->
                <button type="submit" class="btn btn-primary w-100">
                    Login
                </button>

            </form>

            <!-- REGISTER -->
            <div class="text-center mt-3">
                <small>
                    Belum punya akun?
                    <a href="{{ route('register') }}">Daftar</a>
                </small>
            </div>

        </div>
    </div>
</div>

<!-- JS -->
<script src="{{ asset('assets/js/main.js') }}"></script>

</body>
</html>