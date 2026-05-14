<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokMasukItem extends Model
{
    protected $table = 'stok_masuk_item';

    protected $fillable = [
        'stok_masuk_id',
        'produk_id',
        'jumlah_masuk',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'produk_id');
    }
}
