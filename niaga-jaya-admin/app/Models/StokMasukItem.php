<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokMasukItem extends Model
{
    protected $table = 'stok_masuk_item';

    protected $fillable = [
        'stok_masuk_id',
        'produk_id',
        'jumlah',
    ];
    //
}
