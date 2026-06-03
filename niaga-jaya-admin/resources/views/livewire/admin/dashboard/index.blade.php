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
              <div class="card h-100">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
                      <h3 class="h5 mb-0">Penjualan vs Pembelian</h3>
                  </div>
                  <div class="card-body p-4">
                      <div id="salesPurchaseChart" style="min-height: 350px;"></div>
                  </div>
              </div>
          </div>

          <div class="col-12 col-lg-6">
              <div class="card h-100">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
                      <h3 class="h5 mb-0">Informasi Keseluruhan</h3>
                  </div>
                  <div class="card-body p-4">
                      <h3 class="h6">Gambaran Pelanggan</h3>
                      <div class="row align-items-center">
                          <div class="col-sm-6">
                              <div id="customerChart"></div>
                          </div>
                          <div class="col-sm-6">
                              <div class="row text-center">
                                  <div class="col-6 border-end">
                                      <h2 class="mb-1">5.5K</h2>
                                      <p class="text-success mb-0 small">Pelanggan Baru</p>
                                  </div>
                                  <div class="col-6">
                                      <h2 class="mb-1">3.5K</h2>
                                      <p class="text-warning mb-0 small">Pelanggan Tetap</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row text-center border-top mt-4 pt-4">
                          <div class="col-4 border-end">
                              <h3 class="fw-bold mb-2">6987</h3>
                              <small class="text-secondary">Supplier</small>
                          </div>
                          <div class="col-4 border-end">
                              <h3 class="fw-bold mb-2">{{ \App\Models\Pesanan::count() }}</h3>
                              <small class="text-secondary">Pelanggan</small>
                          </div>
                          <div class="col-4">
                              <h3 class="fw-bold mb-2">{{ \App\Models\Pesanan::count() }}</h3>
                              <small class="text-secondary">Pesanan</small>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="row g-3">
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Produk Terlaris</h4>
            </div>
            <ul class="list-group list-group-flush">
              @forelse($topProducts ?? collect() as $item)
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="{{ asset('storage/products/'.($item->product->gambar ?? 'default.png')) }}" class="rounded" width="48" height="48" style="object-fit:cover">
                <div class="flex-grow-1">
                  <p class="mb-1 fw-bold">{{ $item->product->nama_produk ?? 'Produk Tidak Ditemukan' }}</p>
                  <small class="text-muted">{{ $item->total_terjual }} Terjual</small>
                </div>
              </li>
              @empty
              <li class="list-group-item text-center text-muted">Belum ada data penjualan</li>
              @endforelse
            </ul>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Stok Menipis</h4>
              <a href="{{ route('admin.product') }}" class="small text-primary text-decoration-underline">Lihat Semua</a>
            </div>
            <ul class="list-group list-group-flush">
              @forelse($lowStock ?? collect() as $prod)
              <li class="list-group-item d-flex align-items-center gap-3">
                <img src="{{ asset('storage/products/'.($prod->gambar ?? 'default.png')) }}" class="rounded" width="48" height="48" style="object-fit:cover">
                <div class="flex-grow-1">
                  <p class="mb-1 fw-bold">{{ $prod->nama_produk }}</p>
                  <small>ID: #{{ $prod->kode_produk }}</small>
                </div>
                <div class="d-flex flex-column align-items-center">
                  <span class="fw-semibold {{ $prod->stok == 0 ? 'text-danger' : 'text-primary' }}">{{ $prod->stok }}</span>
                  <small class="text-muted">Stok</small>
                </div>
              </li>
              @empty
              <li class="list-group-item text-center text-muted">Stok aman</li>
              @endforelse
            </ul>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Penjualan Terbaru</h4>
            </div>
            <ul class="list-group list-group-flush">
              @forelse($recentSales ?? collect() as $sale)
              <li class="list-group-item d-flex align-items-center gap-3">
                <div class="flex-grow-1">
                  <p class="mb-1 fw-bold">{{ $sale->nomor_pesanan }}</p>
                  <small class="text-muted">{{ $sale->nama_pembeli }} • Rp {{ number_format($sale->total_bayar, 0, ',', '.') }}</small>
                </div>
                <span class="badge 
                    {{ $sale->status_pengiriman == 'selesai' ? 'bg-success-subtle text-success' : 
                      ($sale->status_pengiriman == 'dikirim' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning') }}">
                    {{ ucfirst($sale->status_pengiriman) }}
                </span>
              </li>
              @empty
              <li class="list-group-item text-center text-muted">Belum ada transaksi</li>
              @endforelse
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


<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    // Grafik Penjualan (Sales vs Purchase)
    var options = {
        series: [{ name: 'Penjualan', data: {!! $salesChart ?? '[]' !!} }],
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        colors: ['#0d6efd'],
        plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'] }
    };
    new ApexCharts(document.querySelector("#salesPurchaseChart"), options).render();

    // Grafik Pelanggan (Customer Overview)
    var custOptions = {
        series: [70, 30],
        chart: { type: 'donut', height: 250 },
        labels: ['Baru', 'Tetap'],
        colors: ['#198754', '#ffc107']
    };
    new ApexCharts(document.querySelector("#customerChart"), custOptions).render();
});
</script>