<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <title>Login – Niaga Jaya Electronic</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/images/favicon_io/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/images/favicon_io/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/images/favicon_io/favicon-16x16.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <!-- Fonts Login -->
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/login.css') }}">

</head>

<body class="login-page">

<div class="login-bg"></div>
<div class="login-blob login-blob-1"></div>
<div class="login-blob login-blob-2"></div>
<div class="login-blob login-blob-3"></div>

<div class="login-wrapper">

    {{-- LEFT: Branding --}}
    <div class="login-left">
        <div class="login-badge">E-Commerce Platform</div>

        <h1>Selamat Datang di<br><span>Niaga Jaya</span><br>Electronic</h1>
        <p>Platform belanja elektronik terpercaya di Tangerang. Temukan televisi, kulkas, mesin cuci, dan aksesoris elektronik pilihan terbaik.</p>

        <div class="login-stats">
            <div class="login-stat">
                <span class="login-stat-num">500+</span>
                <span class="login-stat-label">Produk</span>
            </div>
            <div class="login-divider-v"></div>
            <div class="login-stat">
                <span class="login-stat-num">2K+</span>
                <span class="login-stat-label">Pelanggan</span>
            </div>
            <div class="login-divider-v"></div>
            <div class="login-stat">
                <span class="login-stat-num">100%</span>
                <span class="login-stat-label">Bergaransi</span>
            </div>
        </div>

        <div class="login-chips">
            <div class="login-chip">📺 Televisi</div>
            <div class="login-chip">❄️ Kulkas</div>
            <div class="login-chip">🫧 Mesin Cuci</div>
            <div class="login-chip">🔌 Aksesoris</div>
            <div class="login-chip">🎵 Audio</div>
        </div>
    </div>

    {{-- RIGHT: Login Form --}}
    <div class="login-right">
        <div class="login-card">

            <div class="login-logo-wrap">
                <div class="login-logo-icon">
                    <img src="{{ asset('assets/images/logo-icon.svg') }}" alt="Logo">
                </div>
                <div class="login-logo-text">
                    Niaga Jaya
                    <span>Electronic Store</span>
                </div>
            </div>

            <div class="login-title">Masuk ke Akun Anda</div>
            <div class="login-sub">Belanja elektronik terbaik, cukup dari rumah Anda.</div>

            @if ($errors->any() && !$errors->has('email') && !$errors->has('password'))
                <div class="login-alert">{{ $errors->first() }}</div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                {{-- EMAIL --}}
                <div class="login-field">
                    <label for="email">Email</label>
                    <div class="login-input-wrap">
                        <span class="login-input-icon">✉</span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value="{{ old('email') }}"
                            placeholder="nama@email.com"
                            autocomplete="email"
                            class="{{ $errors->has('email') ? 'is-invalid' : '' }}"
                            required
                        >
                    </div>
                    @error('email')
                        <span class="login-error">{{ $message }}</span>
                    @enderror
                </div>

                {{-- PASSWORD --}}
                <div class="login-field">
                    <label for="password">Password</label>
                    <div class="login-input-wrap">
                        <span class="login-input-icon">🔒</span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Masukkan password Anda"
                            autocomplete="current-password"
                            class="{{ $errors->has('password') ? 'is-invalid' : '' }}"
                            required
                        >
                        <button class="login-eye" type="button" onclick="togglePwd()">👁</button>
                    </div>
                    @error('password')
                        <span class="login-error">{{ $message }}</span>
                    @enderror
                </div>

                {{-- REMEMBER + FORGOT --}}
                <div class="login-options">
                    <label class="login-remember">
                        <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <div class="login-cb"></div>
                        <span class="login-remember-label">Ingat Saya</span>
                    </label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="login-forgot">Lupa Password?</a>
                    @endif
                </div>

                <button type="submit" class="login-btn">Login</button>
            </form>

            <div class="login-or">atau</div>

            <div class="login-register">
                Belum punya akun?
                <a href="{{ route('register') }}">Daftar Sekarang</a>
            </div>

        </div>
    </div>

</div>

<!-- JS -->

<script src="{{ asset('assets/js/main.js') }}"></script>
<script>
    function togglePwd() {
        const p = document.getElementById('password');
        p.type = p.type === 'password' ? 'text' : 'password';
    }
</script>

</body>
</html>