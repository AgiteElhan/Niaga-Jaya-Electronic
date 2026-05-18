<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokMasuk extends Model
{
    protected $table = 'stok_masuk';

    protected $fillable = [
        'nomor_referensi',
        'supplier_id',
        'tanggal_masuk',
        'catatan',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'produk_id');
    }

    public function items()
    {
        return $this->hasMany(StokMasukItem::class, 'stok_masuk_id');
    }
}
