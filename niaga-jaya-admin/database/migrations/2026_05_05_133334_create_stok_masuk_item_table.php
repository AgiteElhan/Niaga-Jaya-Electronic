<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stok_masuk_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stok_masuk_id')->constrained('stok_masuk')->onDelete('cascade');
            $table->foreignId('produk_id')->constrained('product'); // Tabel product Anda
            $table->integer('jumlah_masuk');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stok_masuk_item');
    }
};
