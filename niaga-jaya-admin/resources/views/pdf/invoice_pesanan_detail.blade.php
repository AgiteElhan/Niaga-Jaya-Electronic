<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice Pesanan {{ $order->nomor_pesanan }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #000; line-height: 1.4; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .fw-bold { font-weight: bold; }
        
        .kop-table { width: 100%; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 20px; }
        .logo-area { width: 15%; vertical-align: top; }
        .info-area { width: 85%; text-align: left; padding-left: 15px; vertical-align: top; }
        .info-area h2 { margin: 0; font-size: 18px; text-transform: uppercase; }
        .info-area p { margin: 2px 0 0 0; font-size: 10px; }

        .judul-dokumen { text-align: center; font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; text-decoration: underline; }
        
        .meta-table { width: 100%; margin-bottom: 20px; }
        .meta-table td { font-size: 11px; padding: 2px 0; }

        .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .table th, .table td { border: 1px solid #000; padding: 8px; }
        .table th { background-color: #e6e6e6; text-transform: uppercase; font-size: 11px; }
        
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
                <p>Email: elektronikniagajaya@gmail.com • Telp: 0813-1994-6436 </p>
            </td>
        </tr>
    </table>

    <div class="judul-dokumen">Invoice Pesanan Pelanggan</div>

    <table class="meta-table">
        <tr>
            <td width="15%">No. Pesanan</td><td width="2%">:</td><td>{{ $order->nomor_pesanan }}</td>
            <td width="15%">Pelanggan</td><td width="2%">:</td><td>{{ $order->nama_pembeli }}</td>
        </tr>
        <tr>
            <td>Tanggal</td><td>:</td><td>{{ \Carbon\Carbon::parse($order->created_at)->format('d F Y') }}</td>
            <td>WhatsApp</td><td>:</td><td>{{ $order->whatsapp_pembeli }}</td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th>Nama Produk</th>
                <th class="text-center">Jumlah</th>
                <th class="text-right">Harga</th>
                <th class="text-right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $item->product->nama_produk ?? 'Produk Tidak Ditemukan' }}</td>
                <td class="text-center">{{ $item->jumlah }}</td>
                <td class="text-right">Rp {{ number_format($item->harga_satuan, 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr class="fw-bold">
                <td colspan="4" class="text-right">Total Keseluruhan</td>
                <td class="text-right">Rp {{ number_format($order->total_bayar, 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>

    <table class="ttd-area">
        <tr>
            <td></td>
            <td class="ttd-box">
                <p>Tangerang, {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
                <p style="margin-bottom: 60px;">Hormat Kami,</p>
                <p class="fw-bold" style="text-decoration: underline;">( Admin Niaga Jaya )</p>
            </td>
        </tr>
    </table>

</body>
</html>