<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Merk extends Model
{
    protected $table = 'merk';

    protected $fillable = [
        'nama_merk',
        'keterangan',
    ];

    public function products()
{
    return $this->hasMany(Product::class, 'merk_id');
}
}
