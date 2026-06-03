<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Kategori extends Model
{
    protected $table = 'kategori';

    protected $fillable = [
        'nama_kategori',
        'deskripsi',
    ];
    public function products()
    {
        return $this->hasMany(Product::class, 'merk_id');
    }
}
