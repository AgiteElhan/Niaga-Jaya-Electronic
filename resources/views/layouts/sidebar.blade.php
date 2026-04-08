<aside id="sidebar" class="sidebar">
    <div class="logo-area">
      <a href="index.html" class="d-inline-flex">
      <img src="{{asset('assets/images/logo-icon.svg')}}" alt="" width="24">
        <span class="logo-text ms-2">
          <img src="{{asset('assets/images/logo.svg')}}" alt="">
        </span>
      </a>
    </div>
    <ul class="nav flex-column">
      <li class="px-4 py-2">
        <small class="nav-text">Main</small>
      </li>
      
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
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Kategori</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.merk') ? 'active' : '' }}" 
          href="{{route('admin.merk')}}">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Merk</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.product') ? 'active' : '' }}" 
          href="{{route('admin.product')}}">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Produk</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.supplier') ? 'active' : '' }}" 
          href="{{route('admin.supplier')}}">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Supplier</span>
        </a>
      </li>

      <li>
        <a class="nav-link {{ request()->routeIs('admin.user') ? 'active' : '' }}" 
          href="{{route('admin.user')}}">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">User</span>
        </a>
      </li>
      {{-- <li>
        <a class="nav-link" href="inventory.html">
          <i class="ti ti-box-seam"></i>
          <span class="nav-text">Metode Pembayaran</span>
        </a>
      </li> --}}
      <li>
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
    </li>
    <li class="px-4 pt-4 pb-2">
      <small class="nav-text">Account</small>
    </li>
    <li>
      <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
          @csrf
      </form>
      <a class="nav-link" href="{{ route('logout') }}" 
        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        <i class="ti ti-logout"></i>
        <span class="nav-text">Log out</span>
      </a>
    </li>
    <!-- <li>
      <a class="nav-link" href="signup.html">
        <i class="ti ti-user-plus"></i>
        <span class="nav-text">Sign up</span>
      </a>
    </li> -->
  </ul>
</aside>