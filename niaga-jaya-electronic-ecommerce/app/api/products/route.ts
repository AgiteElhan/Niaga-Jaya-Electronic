// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Ambil data dari backend Laravel Anda
    const response = await fetch('http://localhost:8000/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Agar data selalu fresh dari database Niaga Jaya
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Gagal mengambil data dari Laravel' }, { status: 500 });
    }

    const data = await response.json();

    // 2. Kirim kembali data ke Frontend Next.js
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}