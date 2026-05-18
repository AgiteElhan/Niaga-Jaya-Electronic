<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Stok Masuk Niaga Jaya Electronic</title>
    <style>
        body { 
            font-family: Arial, Helvetica, sans-serif; 
            font-size: 11px; 
            color: #000; 
            line-height: 1.4;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .fw-bold { font-weight: bold; }
        
        /* KOP SURAT FORMAL */
        .kop-table {
            width: 100%;
            border-bottom: 3px double #000; /* Garis ganda khas laporan formal */
            padding-bottom: 12px;
            margin-bottom: 20px;
        }
        .logo-area {
            width: 15%;
            vertical-align: top;
        }
        .info-area {
            width: 85%;
            text-align: left;
            padding-left: 15px;
            vertical-align: top;
        }
        .info-area h2 { 
            margin: 0; 
            font-size: 18px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
        }
        .info-area p { 
            margin: 2px 0 0 0; 
            font-size: 10px; 
            color: #333; 
        }

        /* JUDUL DOKUMEN */
        .judul-dokumen {
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15px;
            text-decoration: underline;
        }

        /* METADATA LAPORAN */
        .meta-table {
            width: 100%;
            margin-bottom: 10px;
        }
        .meta-table td {
            font-size: 10px;
            padding: 2px 0;
        }

        /* TABEL DATA HITAM PUTIH */
        .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 5px; 
        }
        .table th, .table td { 
            border: 1px solid #000; /* Garis solid hitam */
            padding: 7px 6px; 
            vertical-align: middle; 
        }
        .table th { 
            background-color: #e6e6e6; /* Abu-abu formal untuk header */
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 10px; 
        }
        
        /* Tanda Tangan / Prosedur Dokumen */
        .ttd-area {
            margin-top: 40px;
            width: 100%;
        }
        .ttd-box {
            width: 30%;
            float: right;
            text-align: center;
        }
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

    <div class="judul-dokumen">Laporan Rekapitulasi Barang Masuk (Logistik)</div>

    <table class="meta-table">
        <tr>
            <td width="15%">Tanggal Cetak</td>
            <td width="2%">:</td>
            <td width="48%">{{ \Carbon\Carbon::now()->format('d F Y') }}</td>
            <td width="15%">Waktu Cetak</td>
            <td width="2%">:</td>
            <td width="18%">{{ \Carbon\Carbon::now()->format('H:i') }} WIB</td>
        </tr>
        <tr>
            <td>Klasifikasi</td>
            <td>:</td>
            <td>Dokumen Internal Toko</td>
            <td>Pencetak</td>
            <td>:</td>
            <td>Administrator</td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th width="30" class="text-center">No</th>
                <th width="120">No. Referensi</th>
                <th width="90" class="text-center">Tanggal Masuk</th>
                <th>Nama Supplier</th>
                <th width="120" class="text-center">Jumlah Jenis Barang</th>
                <th>Catatan Masuk</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stokMasukData as $index => $row)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="fw-bold">{{ $row->nomor_referensi }}</td>
                <td class="text-center">{{ \Carbon\Carbon::parse($row->tanggal_masuk)->format('d/m/Y') }}</td>
                <td>{{ $row->supplier->nama_supplier ?? 'Supplier Tidak Diketahui' }}</td>
                <td class="text-center">{{ $row->items->count() }} Jenis Produk</td>
                <td>{{ $row->catatan ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <table class="ttd-area">
        <tr>
            <td></td>
            <td class="ttd-box">
                <p>Tangerang, {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
                <p style="margin-bottom: 60px;">Petugas Gudang,</p>
                <p class="fw-bold" style="text-decoration: underline;">( .................................... )</p>
                <p style="font-size: 10px; margin-top: -3px;">Staff Administrasi</p>
            </td>
        </tr>
    </table>

</body>
</html>