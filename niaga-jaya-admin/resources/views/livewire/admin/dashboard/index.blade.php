<div>
   <div class="container-fluid">
      <div class="row ">
        <div class="col-12">
          <div class="mb-6 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 class="fs-3 mb-1">Selamat Datang, {{ auth()->user()->name }} 👋</h1>
              <p class="mb-0 text-muted">Niaga Jaya Electronic Dashboard </p>
            </div>
            <div class="text-lg-end bg-white p-3 rounded-3 border shadow-sm">
              <div class="d-flex align-items-center gap-2 text-primary fw-bold">
                <i class="ti ti-clock fs-4"></i>
                <span id="realtime-clock" class="fs-4">00:00:00</span>
                <span class="badge bg-primary-subtle text-primary">WIB</span>
              </div>
              <div class="small text-muted" id="realtime-date"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
            <div class="col-lg-3 col-12">
                <div class="card p-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-2">
                    <div class="d-flex gap-3">
                        <div class="icon-shape icon-md bg-primary text-white rounded-2">
                            <i class="ti ti-report-analytics fs-4"></i>
                        </div>
                        <div>
                            <h2 class="mb-3 fs-6">Total Penjualan</h2>
                            <h3 class="fw-bold mb-0">Rp {{ number_format($totalPenjualan, 0, ',', '.') }}</h3>
                            <p class="text-primary mb-0 small">Transkasi Berhasil</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Stok Masuk -->
            <div class="col-lg-3 col-12">
                <div class="card p-4 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-2">
                    <div class="d-flex gap-3">
                        <div class="icon-shape icon-md bg-success text-white rounded-2">
                            <i class="ti ti-shopping-cart fs-4"></i>
                        </div>
                        <div>
                            <h2 class="mb-3 fs-6">Total Stok Masuk</h2>
                            <h3 class="fw-bold mb-0">{{ $totalPurchaseCount }}</h3>
                            <p class="text-success mb-0 small">Surat Jalan Terdata</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stok Menipis -->
            <div class="col-lg-3 col-12">
                <div class="card p-4 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-2">
                    <div class="d-flex gap-3">
                        <div class="icon-shape icon-md bg-danger text-white rounded-2">
                            <i class="ti ti-alert-triangle fs-4"></i>
                        </div>
                        <div>
                            <h2 class="mb-3 fs-6">Stok Menipis</h2>
                            <h3 class="fw-bold mb-0 text-danger">{{ $stokMenipis }}</h3>
                            <p class="text-danger mb-0 small">Perlu Re-stock Segera</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Jenis Produk -->
            <div class="col-lg-3 col-12">
                <div class="card p-4 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-2">
                    <div class="d-flex gap-3">
                        <div class="icon-shape icon-md bg-warning text-white rounded-2">
                            <i class="ti ti-box fs-4"></i>
                        </div>
                        <div>
                            <h2 class="mb-3 fs-6">Total Produk</h2>
                            <h3 class="fw-bold mb-0">{{ $totalProduk }}</h3>
                            <p class="text-warning mb-0 small">Jenis Barang Terdaftar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-lg-4 col-12">
            <div class="card">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                        <div>
                            <h3 class="fw-bold h4">Rp {{ number_format($totalProfit, 0, ',', '.') }}</h3>
                            <span>Total Penjualan</span>
                        </div>
                        <div>
                            <i class="ti ti-layers-subtract fs-1 text-primary"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small">
                        <div class="text-muted">Total pendapatan bruto</div>
                        <div><a href="{{ route('admin.laporan-penjualan') }}" class="link-primary text-decoration-underline">Detail</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-12">
            <div class="card">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                        <div>
                            <h3 class="fw-bold h4">{{ $totalReturns }}</h3>
                            <span>Pesanan Gagal</span>
                        </div>
                        <div>
                            <i class="ti ti-credit-card fs-1 text-danger"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small">
                        <div class="text-muted">Transaksi tidak terselesaikan</div>
                        <div><a href="#" class="link-primary text-decoration-underline">Lihat</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-12">
            <div class="card">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                        <div>
                            <h3 class="fw-bold h4">{{ $totalItemsSold }}</h3>
                            <span>Total Barang Masuk</span>
                        </div>
                        <div>
                            <i class="ti ti-cash-banknote fs-1 text-warning"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small">
                        <div class="text-muted">Total unit dari supplier</div>
                        <div><a href="{{ route('admin.stok-masuk') }}" class="link-primary text-decoration-underline">Cek Stok</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div class="row g-3 mb-3">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3">
              <h3 class="h5 mb-0">Sales vs Purchase</h3>
              <div>
                <select class="form-select form-select-sm">
                  <option selected>This Year</option>
                  <option>This Month</option>
                  <option>This Week</option>
                </select>
              </div>
            </div>
            <div class="card-body p-4">

              <div id="salesPurchaseChart"></div>
            </div>
          </div>
        </div>


        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3">
              <h3 class="h5 mb-0">Overall Information</h3>
              <div>
                <select class="form-select form-select-sm">
                  <option selected>Last 6 Months</option>
                  <option>This Month</option>
                  <option>This Week</option>
                </select>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="h6">Customers Overview</h3>
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div id="customerChart">

                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-6 border-end">
                      <div class="text-center ">
                        <h2 class="mb-1">5.5K</h2>
                        <p class="text-success mb-2">First Time</p>
                        <span class="badge bg-success"><i class="ti ti-arrow-up-left me-1"></i>25%</span>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-center">
                        <h2 class="mb-1">3.5K</h2>
                        <p class="text-warning mb-2">Return</p>
                        <span class="badge bg-success badge-xs d-inline-flex align-items-center"><i
                            class="ti ti-arrow-up-left me-1"></i>21%</span>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div class="row text-center border-top mt-4 pt-4">
                <div class="col-4 border-end">
                  <h3 class="fw-bold mb-2">6987</h3>
                  <small class="text-secondary">Suppliers</small>
                </div>
                <div class="col-4 border-end">
                  <h3 class="fw-bold mb-2">4896</h3>
                  <small class="text-secondary">Customers</small>
                </div>
                <div class="col-4">
                  <h3 class="fw-bold mb-2">487</h3>
                  <small class="text-secondary">Orders</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3">

        <!-- CARD 1 — Top Selling Products -->
        <div class="col-lg-4">
          <div class="card  h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Top Selling Products</h4>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ti ti-calendar"></i> Today
              </button>
            </div>

            <ul class="list-group list-group-flush">

              <!-- item -->
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-2.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Wireless Earphones</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">$89 </small>
                    <small>•</small>
                    <small>1,250 Units</small>
                  </div>
                </div>
                <span class="badge bg-danger-subtle text-danger border border-danger">18%</span>
              </li>

              <!-- repeat -->
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-1.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Gaming Joy Stick</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">$49 </small>
                    <small>•</small>
                    <small>5,420 Units</small>
                  </div>

                </div>
                <span class="badge bg-primary-subtle text-primary border border-primary">32%</span>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-3.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Smart Watch Pro</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">$98 </small>
                    <small>•</small>
                    <small>862 Units</small>
                  </div>

                </div>
                <span class="badge bg-info-subtle text-info border border-info">22%</span>
              </li>
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-4.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">USB-C Fast Charger</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">$35 </small>
                    <small>•</small>
                    <small>3,200 Units</small>
                  </div>

                </div>
                <span class="badge bg-success-subtle text-success border border-success">28%</span>
              </li>
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-5.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Portable Bluetooth Speaker</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">$65 </small>
                    <small>•</small>
                    <small>2,890 Units</small>
                  </div>

                </div>
                <span class="badge bg-warning-subtle text-warning border border-warning">25%</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 2 — Low Stock Products -->
        <div class="col-lg-4">
          <div class="card  h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <div class="d-flex align-items-center">

                <h4 class="mb-0 h5">Low Stock Products</h4>
              </div>
              <a href="#" class="small text-primary text-decoration-underline">View All</a>
            </div>

            <ul class="list-group list-group-flush">

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-8.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Wireless Headphones</p>
                  <small>ID: #554433</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">06</span>
                  <small class="text-muted">In Stock</small>
                </div>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-4.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">USB-C Cable Pack</p>
                  <small>ID: #887766</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">09</span>
                  <small class="text-muted">In Stock</small>
                </div>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-10.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Phone Screen Protector</p>
                  <small>ID: #332211</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">03</span>
                  <small class="text-muted">In Stock</small>
                </div>
              </li>
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-4.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Portable Charger 20000mAh</p>
                  <small>ID: #998877</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">07</span>
                  <small class="text-muted">In Stock</small>
                </div>
              </li>
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-6.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Mechanical Keyboard RGB</p>
                  <small>ID: #665544</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">02</span>
                  <small class="text-muted">In Stock</small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 3 — Recent Sales -->
        <div class="col-lg-4">
          <div class="card  h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Recent Sales</h4>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ti ti-calendar-event"></i> Weekly
              </button>
            </div>

            <ul class="list-group list-group-flush">

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-7.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">MacBook Pro 16"</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">Computers </small>
                    <small>•</small>
                    <small>2,$2,499</small>
                  </div>

                </div>
                <span class="badge bg-success-subtle text-success">Completed</span>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-9.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">AirPods Pro Max</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">Audio </small>
                    <small>•</small>
                    <small>$549</small>
                  </div>

                </div>
                <span class="badge bg-primary-subtle text-primary">Processing</span>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-8.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">iPad Air 11"</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">Tablets </small>
                    <small>•</small>
                    <small>$799</small>
                  </div>
                </div>
                <span class="badge bg-success-subtle text-success">Completed</span>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-3.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Apple Watch Ultra</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">Wearables </small>
                    <small>•</small>
                    <small>$799</small>
                  </div>
                </div>
                <span class="badge bg-warning-subtle text-warning">Pending</span>
              </li>

              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="./assets/images/product-6.png" class="rounded" width="48">
                <div class="flex-grow-1">
                  <p class="mb-1">Magic Keyboard</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">Accessories </small>
                    <small>•</small>
                    <small>$299</small>
                  </div>

                </div>
                <span class="badge bg-danger-subtle text-danger">Cancelled</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
</div>
<script>
  function updateClock() {
    const now = new Date();
    
    // Format Jam (WIB)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('realtime-clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Format Tanggal Indonesia
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('id-ID', options);
    document.getElementById('realtime-date').textContent = dateString;
  }

  // Jalankan setiap detik
  setInterval(updateClock, 1000);
  updateClock(); // Panggil langsung agar tidak menunggu 1 detik pertama
</script>