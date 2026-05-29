<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\StokMasuk;
use App\Models\StokMasukItems;
use App\Models\Pesanan;
use App\Models\PesananItem;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanCetakController extends Controller
{
    public function cetakStokProduk()
    {
        // Ambil semua data produk diurutkan dari yang stoknya paling sedikit
        $products = Product::orderBy('stok', 'asc')->get();

        // Load view khusus cetakan PDF dan kirim datanya
        $pdf = Pdf::loadView('pdf.laporan-stok', compact('products'))
                  ->setPaper('a4', 'portrait');

        // Stream file ke browser agar bisa langsung diprint/didownload
        return $pdf->stream('Laporan_Stok_Niaga_Jaya_' . date('Ymd') . '.pdf');
    }

    public function cetakNotaStokMasuk($id)
    {
        // Ambil data stok masuk berdasarkan ID beserta relasi supplier dan item produknya
        $stok = StokMasuk::with(['supplier', 'items.product'])->findOrFail($id);
        
        // Load view template PDF dan set kertas menjadi A4 Portrait
        $pdf = Pdf::loadView('pdf.nota-stok-masuk', compact('stok'))
                  ->setPaper('a4', 'portrait');
                  
        // Stream hasilnya ke browser agar siap diprint
        return $pdf->stream('Nota_Stok_Masuk_' . $stok->nomor_referensi . '.pdf');
    }

    public function cetakInvoice($id)
    {
        // Ambil data pesanan beserta relasi item dan produknya
        $order = Pesanan::with(['items.product'])->findOrFail($id);

        // Load view PDF yang sudah kita buat tadi
        $pdf = Pdf::loadView('pdf.invoice_pesanan_detail', ['order' => $order])
                  ->setPaper('a4', 'portrait');

        return $pdf->stream('Invoice-' . $order->nomor_pesanan . '.pdf');
    }
}
