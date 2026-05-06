<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';

    protected $fillable = [
        'nomor_pesanan', 
        'nama_pembeli', 
        'whatsapp_pembeli', 
        'alamat_kirim', 
        'metode_pengiriman', 
        'total_bayar', 
        'status_pembayaran', 
        'metode_pembayaran', 
        'token_snap', 
        'catatan'
    ];

    public function items() {
        return $this->hasMany(PesananItem::class, 'pesanan_id');
    }
}
