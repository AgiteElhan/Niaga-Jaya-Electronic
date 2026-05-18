<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClerkWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        Log::info('=========================================');
        Log::info('🔥 ADA REQUEST MASUK KE ENDPOINT WEBHOOK!');
        Log::info('Payload: ', $request->all());

        $eventType = $request->input('type');
        $data = $request->input('data');

        try {
            // JALUR 1: Jika User Baru / Update Data (Membawa Array Email)
            if ($eventType === 'user.created' || $eventType === 'user.updated') {
                $email = $data['email_addresses'][0]['email_address'] ?? null;
                $clerkId = $data['id'] ?? null;

                if ($email && $clerkId) {
                    $user = User::updateOrCreate(
                        ['email' => $email],
                        [
                            'name' => trim(($data['first_name'] ?? '') . ' ' . ($data['last_name'] ?? '')) ?: 'User Niaga Jaya',
                            'clerk_id' => $clerkId,
                            'password' => bcrypt($clerkId),
                            'role' => 'user',
                        ]
                    );
                    Log::info('✅ SUKSES SIMPAN USER BARU: ' . $user->email);
                }
            }

            // JALUR 2: Jika User Lama Login Biasa (session.created)
            if ($eventType === 'session.created') {
                $clerkId = $data['user_id'] ?? null;

                if ($clerkId) {
                    // Karena login biasa tidak bawa email, kita sinkronisasi berdasarkan clerk_id
                    $user = User::where('clerk_id', $clerkId)->first();

                    if (!$user) {
                        // Jika karena suatu hal user belum ada di DB Laravel, kita buatkan recordnya
                        $user = User::create([
                            'name' => 'User Niaga Jaya',
                            'email' => 'clerk_' . $clerkId . '@niagajaya.com', // fallback email
                            'clerk_id' => $clerkId,
                            'password' => bcrypt($clerkId),
                            'role' => 'user',
                        ]);
                        Log::info('✅ USER OTOMATIS DIBUAT VIA SESSION ID: ' . $user->id);
                    } else {
                        Log::info('✅ USER LAMA BERHASIL LOGIN KEMBALI ID: ' . $user->id);
                    }
                }
            }

        } catch (\Exception $e) {
            Log::error('🚨 ERROR DATABASE: ' . $e->getMessage());
        }

        return response()->json(['status' => 'success'], 200);
    }
}