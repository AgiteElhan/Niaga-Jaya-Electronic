<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "product";

    protected $fillable = [
        'kode_produk',
        'nama_produk',
        'kategori_id',
        'merk_id',
        'harga_jual',
        'harga_discount',
        'stok',
        'deskripsi',
        'gambar',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    public function merk()
    {
        return $this->belongsTo(Merk::class, 'merk_id');
    }
}