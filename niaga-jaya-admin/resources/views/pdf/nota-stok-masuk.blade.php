<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nota Stok Masuk - {{ $stok->nomor_referensi }}</title>
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
            border-bottom: 3px double #000;
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
            margin-bottom: 15px;
        }
        .meta-table td {
            font-size: 11px;
            padding: 3px 0;
        }

        /* TABEL DATA HITAM PUTIH */
        .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 5px; 
        }
        .table th, .table td { 
            border: 1px solid #000; 
            padding: 8px 7px; 
            vertical-align: middle; 
        }
        .table th { 
            background-color: #e6e6e6; 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 10px; 
        }
        
        /* Tanda Tangan */
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

    <div class="judul-dokumen">Rincian Lembar Barang Masuk</div>

    <table class="meta-table">
        <tr>
            <td width="18%">No. Referensi</td>
            <td width="2%">:</td>
            <td width="40%" class="fw-bold text-primary">#{{ $stok->nomor_referensi }}</td>
            <td width="15%">Nama Supplier</td>
            <td width="2%">:</td>
            <td width="23%" class="fw-bold">{{ $stok->supplier->nama_supplier ?? '-' }}</td>
        </tr>
        <tr>
            <td>Tanggal Masuk</td>
            <td>:</td>
            <td>{{ \Carbon\Carbon::parse($stok->tanggal_masuk)->format('d F Y') }}</td>
            <td>Catatan</td>
            <td>:</td>
            <td>{{ $stok->catatan ?? '-' }}</td>
        </tr>
        <tr>
            <td>Waktu Cetak Dokumen</td>
            <td>:</td>
            <td>{{ \Carbon\Carbon::now()->format('d F Y H:i') }} WIB</td>
            <td>Pencetak</td>
            <td>:</td>
            <td>Administrator</td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th width="30" class="text-center">No</th>
                <th width="120">Kode Barang</th>
                <th>Nama Produk / Deskripsi Barang</th>
                <th width="120" class="text-center">Jumlah Masuk</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stok->items as $index => $detail)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="fw-bold">{{ $detail->product->kode_produk }}</td>
                <td>{{ $detail->product->nama_produk }}</td>
                <td class="text-center fw-bold">{{ $detail->jumlah_masuk }} Unit</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot style="font-weight: bold; background-color: #f5f5f5;">
            <tr>
                <td colspan="3" class="text-right" style="padding-right: 15px;">Total Keseluruhan Barang Masuk :</td>
                <td class="text-center">{{ $stok->items->sum('jumlah_masuk') }} Unit</td>
            </tr>
        </tfoot>
    </table>

    <table class="ttd-area">
        <tr>
            <td></td>
            <td class="ttd-box">
                <p>Tangerang, {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
                <p style="margin-bottom: 60px;">Petugas Gudang,</p>
                <p class="fw-bold" style="text-decoration: underline;">( .................................... )</p>
                <p style="font-size: 10px; margin-top: -3px;">Staff Logistik</p>
            </td>
        </tr>
    </table>

</body>
</html>