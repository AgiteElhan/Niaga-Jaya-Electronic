<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ulasan extends Model
{
    protected $table = 'ulasan';

    protected $fillable = [
        'pesanan_id',
        'produk_id',
        'nama_pembeli',
        'rating',
        'komentar',
        'tampilkan',
    ];
}
