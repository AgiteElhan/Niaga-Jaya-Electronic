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
        Schema::create('ulasan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->constrained('pesanan')->onDelete('cascade');
    
            // Relasi ke produk (agar mudah query per produk)
            $table->foreignId('produk_id')->constrained('product')->onDelete('cascade');

            $table->string('nama_pembeli'); 
            $table->integer('rating'); // 1-5
            $table->text('komentar')->nullable();
            $table->boolean('tampilkan')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ulasan');
    }
};
