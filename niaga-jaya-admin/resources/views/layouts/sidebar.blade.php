<aside id="sidebar" class="sidebar">
    <div class="logo-area d-flex align-items-center py-2 px-3">
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
      <li>
        <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" 
          href="{{ route('admin.dashboard')}}">
          <i class="ti ti-home"></i>
          <span class="nav-text">Dashboard</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.kategori') ? 'active show' : '' }}" 
   href="{{route('admin.kategori')}}">
          <i class="ti ti-category"></i>
          <span class="nav-text">Kategori</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.merk') ? 'active' : '' }}" 
          href="{{route('admin.merk')}}">
          <i class="ti ti-tags"></i>
          <span class="nav-text">Merk</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.product') ? 'active' : '' }}" 
          href="{{route('admin.product')}}">
          <i class="ti ti-device-laptop"></i>
          <span class="nav-text">Produk</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.supplier') ? 'active' : '' }}" 
          href="{{route('admin.supplier')}}">
          <i class="ti ti-truck-delivery"></i>
          <span class="nav-text">Supplier</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.user') ? 'active' : '' }}" 
          href="{{route('admin.user')}}">
          <i class="ti ti-users"></i>
          <span class="nav-text">User</span>
        </a>
      </li>
      {{-- <li>
        <a class="nav-link" href="inventory.html">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Metode Pembayaran</span>
        </a>
      </li> --}}
      {{-- <li>
        <a class="nav-link" href="create-product.html">
          <i class="ti ti-plus"></i>
          <span class="nav-text">Add Product</span>
        </a>
      </li>
    <li>
      <a class="nav-link" href="reports.html">
        <i class="ti ti-receipt"></i>
        <span class="nav-text">Reports</span>
      </a>
    </li>
    <li>
      <a class="nav-link" href="404-error.html">
        <i class="ti ti-alert-circle"></i>
        <span class="nav-text">404 Error</span>
      </a>
    </li>
    <li>
      <a class="nav-link" href="docs.html">
        <i class="ti ti-file-text"></i>
        <span class="nav-text">Docs</span>
      </a>
    </li> --}}
  </ul>
  {{-- <div class="sidebar-user text-center py-3">
            <div class="fw-bold">
                {{ auth()->user()->name }}
            </div>

            <small class="text-muted text-capitalize">
                {{ auth()->user()->role }}
            </small>
        </div> --}}
</aside>