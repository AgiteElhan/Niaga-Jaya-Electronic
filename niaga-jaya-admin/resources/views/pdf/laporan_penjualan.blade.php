<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Rekapitulasi Pesanan - Niaga Jaya Electronic</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #000; line-height: 1.4; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }
        .fw-bold { font-weight: bold; }
        
        /* KOP SURAT */
        .kop-table { width: 100%; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 20px; }
        .logo-area { width: 15%; vertical-align: top; }
        .info-area { width: 85%; text-align: left; padding-left: 15px; vertical-align: top; }
        .info-area h2 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-area p { margin: 2px 0 0 0; font-size: 10px; color: #333; }

        /* JUDUL */
        .judul-dokumen { text-align: center; font-size: 13px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; text-decoration: underline; }

        /* TABEL META */
        .meta-table { width: 100%; margin-bottom: 10px; }
        .meta-table td { font-size: 10px; padding: 2px 0; }
        
       /* TABEL UTAMA */
        .table { width: 100%; border-collapse: collapse; margin-top: 5px; table-layout: fixed; }
        .table th, .table td { border: 1px solid #000; padding: 6px 4px; vertical-align: middle; }
        .table th { background-color: #e6e6e6; font-weight: bold; text-transform: uppercase; font-size: 10px; }
        .table td { font-size: 10px; }
        
        /* Tambahan class untuk mencegah teks panjang nabrak garis */
        .break-word { word-wrap: break-word; word-break: break-all; }
        
        /* TTD */
        .ttd-area { margin-top: 40px; width: 100%; }
        .ttd-box { width: 30%; float: right; text-align: center; }
    </style>
</head>
<body>

    <table class="kop-table">
        <tr>
            <td class="logo-area">
                @if(file_exists(public_path('assets/images/niaga-jaya-logo.png')))
                    <img src="{{ public_path('assets/images/niaga-jaya-logo.png') }}" width="70" height="70">
                @else
                    <div style="width: 70px; height: 70px; border: 1px solid #000; text-align:center; line-height:70px; font-size:9px;">LOGO</div>
                @endif
            </td>
            <td class="info-area">
                <h2>Niaga Jaya Electronic</h2>
                <p>Ps. Cikupa, di Jl. Raya Serang No.KM 15, Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten</p>
                <p>Email: elektronikniagajaya@gmail.com • Telp: 0813-1994-6436</p>
            </td>
        </tr>
    </table>

    <div class="judul-dokumen">Laporan Rekapitulasi Pesanan Penjualan</div>

    <table class="meta-table">
        <tr>
            <td width="15%">Tanggal Cetak</td><td width="2%">:</td><td width="48%">{{ \Carbon\Carbon::now()->format('d F Y') }}</td>
            <td width="15%">Waktu Cetak</td><td width="2%">:</td><td width="18%">{{ \Carbon\Carbon::now()->format('H:i') }} WIB</td>
        </tr>
        <tr>
            <td>Klasifikasi</td><td>:</td><td>Dokumen Internal Toko</td>
            <td>Pencetak</td><td>:</td><td>Administrator</td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th width="3%" class="text-center">No</th>
                <th width="12%">No. Pesanan</th>
                <th width="12%">Pembeli</th>
                <th width="20%">Daftar Produk (Qty)</th>
                <th width="10%" class="text-center">Total (Rp)</th>
                <th width="10%">Status Bayar</th>
                <th width="10%">Pengiriman</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pesananData as $index => $row)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="fw-bold">{{ $row->nomor_pesanan }}</td>
                <td>{{ $row->nama_pembeli }}</td>
                <td>
                    <ul style="margin: 0; padding-left: 15px;">
                        @foreach($row->items as $item)
                            {{ $item->product->nama_produk ?? 'Produk' }} ({{ $item->jumlah }}x)
                        @endforeach
                    </ul>
                </td>
                <td class="text-right">{{ number_format($row->total_bayar, 0, ',', '.') }}</td>
                <td class="text-center">{{ ucfirst($row->status_pembayaran) }}</td>
                <td class="text-center">
                    {{ $row->status_pengiriman ? str_replace('_', ' ', ucfirst($row->status_pengiriman)) : '-' }}
                </td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <th colspan="4" class="text-right">TOTAL PENDAPATAN</th>
                <th class="text-right">{{ number_format($pesananData->sum('total_bayar'), 0, ',', '.') }}</th>
                <th colspan="2"></th>
            </tr>
        </tfoot>
    </table>

    <table class="ttd-area">
        <tr>
            <td></td>
            <td class="ttd-box">
                <p>Tangerang, {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
                <p style="margin-bottom: 60px;">Manager Toko,</p>
                <p class="fw-bold" style="text-decoration: underline;">( .................................... )</p>
            </td>
        </tr>
    </table>

</body>
</html>