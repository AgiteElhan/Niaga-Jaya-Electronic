<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanan', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_pesanan')->unique(); // NJE-20260505-001
            
            // Data Pembeli
            $table->string('nama_pembeli');
            $table->string('whatsapp_pembeli');
            $table->text('alamat_kirim');
            $table->string('metode_pengiriman'); // Ambil di Toko / Kurir Toko
            
            // Total Keseluruhan
            $table->decimal('total_bayar', 12, 2);
            
            // Midtrans & Status
            $table->string('status_pembayaran')->default('menunggu'); 
            $table->string('metode_pembayaran')->nullable();
            $table->string('token_snap')->nullable(); 
            
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanan');
    }
};
