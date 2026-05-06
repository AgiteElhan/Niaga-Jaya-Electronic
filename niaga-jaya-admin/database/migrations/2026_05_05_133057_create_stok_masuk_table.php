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
        Schema::create('stok_masuk', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_referensi')->unique(); 
            // Relasi ke tabel supplier yang sudah ada
            $table->foreignId('supplier_id')->constrained('supplier'); 
            
            $table->date('tanggal_masuk');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stok_masuk');
    }
};
