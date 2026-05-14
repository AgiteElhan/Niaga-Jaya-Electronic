<aside id="sidebar" class="sidebar">
    <div class="logo-area d-flex align-items-center py-2 px-3 mb-3">
        <a href="{{ route('admin.dashboard') }}" class="d-flex align-items-center text-decoration-none w-100">
            <div class="logo-icon flex-shrink-0">
                <img 
                    src="{{ asset('assets/images/niaga-jaya-logo.png') }}" 
                    alt="Niaga Jaya Electronic"
                    width="42"
                    class="img-fluid rounded shadow-sm">
            </div>
            <div class="ms-3 overflow-hidden text-nowrap">
                <h5 class="mb-0 fw-bold text-dark text-truncate" style="font-size: 1rem;">
                    Niaga Jaya
                </h5>
                <small class="text-muted d-block text-truncate" style="font-size: 0.75rem;">
                    Electronic Store
                </small>
            </div>
        </a>
    </div>

    <ul class="nav flex-column">
        <!-- DASHBOARD -->
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" 
               href="{{ route('admin.dashboard') }}">
                <i class="ti ti-home"></i>
                <span class="nav-text">Dashboard</span>
            </a>
        </li>

        <!-- KELOMPOK MASTER DATA -->
        <li class="nav-header mt-3 mb-2 px-3 text-uppercase text-muted fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">
            Master Data
        </li>
        
        <li>
            <a class="nav-link {{ request()->routeIs('admin.kategori') ? 'active' : '' }}" href="{{ route('admin.kategori') }}">
                <i class="ti ti-category"></i>
                <span class="nav-text">Kategori</span>
            </a>
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.merk') ? 'active' : '' }}" href="{{ route('admin.merk') }}">
                <i class="ti ti-tags"></i>
                <span class="nav-text">Merk</span>
            </a>
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.product') ? 'active' : '' }}" href="{{ route('admin.product') }}">
                <i class="ti ti-device-laptop"></i>
                <span class="nav-text">Produk</span>
            </a>
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.supplier') ? 'active' : '' }}" href="{{ route('admin.supplier') }}">
                <i class="ti ti-truck-delivery"></i>
                <span class="nav-text">Supplier</span>
            </a>
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.banner') ? 'active' : '' }}" href="{{ route('admin.banner') }}">
                <i class="ti ti-photo"></i>
                <span class="nav-text">Banner</span>
            </a>
        </li>

        <!-- KELOMPOK TRANSAKSI -->
        <li class="nav-header mt-3 mb-2 px-3 text-uppercase text-muted fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">
            Transaksi
        </li>

        <li>
            <a class="nav-link {{ request()->routeIs('admin.pesanan') ? 'active' : '' }}" href="{{ route('admin.pesanan') }}">
                <i class="ti ti-shopping-cart"></i>
                <span class="nav-text">Pesanan Masuk</span>
            </a>
        </li>
        <li>
            <!-- MENU BARU: Stok Masuk -->
            <a class="nav-link {{ request()->routeIs('admin.stok-masuk') ? 'active' : '' }}" href="{{ route('admin.stok-masuk') }}">
                <i class="ti ti-box-padding"></i>
                <span class="nav-text">Stok Masuk</span>
            </a>
        </li>

        <!-- KELOMPOK LAPORAN -->
        <li class="nav-header mt-3 mb-2 px-3 text-uppercase text-muted fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">
            Laporan
        </li>

        <li>
            <a class="nav-link {{ request()->routeIs('admin.laporan-penjualan') ? 'active' : '' }}" href="{{ route('admin.laporan-penjualan') }}">
                <i class="ti ti-file-analytics"></i>
                <span class="nav-text">Laporan Penjualan</span>
            </a>
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.laporan-stok') ? 'active' : '' }}" href="{{ route('admin.laporan-stok') }}">
                <i class="ti ti-clipboard-list"></i>
                <span class="nav-text">Laporan Stok</span>
            </a>
        </li>

        <!-- SISTEM -->
        <li class="nav-header mt-3 mb-2 px-3 text-uppercase text-muted fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">
            Sistem
        </li>
        <li>
            <a class="nav-link {{ request()->routeIs('admin.user') ? 'active' : '' }}" href="{{ route('admin.user') }}">
                <i class="ti ti-users"></i>
                <span class="nav-text">Manajemen User</span>
            </a>
        </li>
    </ul>
</aside>