<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PesananItem extends Model
{

    protected $table = 'pesanan_item';

    protected $fillable = [
        'pesanan_id', 
        'produk_id', 
        'jumlah', 
        'harga_satuan', 
        'subtotal', 
    ];
    

    public function pesanan() {
        return $this->belongsTo(Pesanan::class, 'pesanan_id');
    }

    public function product() {
        return $this->belongsTo(Product::class, 'produk_id');
    }
}
