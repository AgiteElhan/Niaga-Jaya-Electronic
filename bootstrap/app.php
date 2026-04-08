<?php

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Ini alias yang sudah kamu punya
        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);

        // TAMBAHKAN INI:
        // Ini adalah "Buku Alamat" otomatis Laravel
        $middleware->redirectTo(
            guests: '/',                // Kalau orang asing (belum login), lempar ke pintu depan
            users: '/admin/dashboard'   // Kalau Bos (sudah login), lempar ke Dashboard Admin
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
