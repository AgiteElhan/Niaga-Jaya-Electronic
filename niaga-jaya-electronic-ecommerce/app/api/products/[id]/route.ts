import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Menggunakan Promise agar merah hilang
) {
  try {
    // 1. Await params untuk mendapatkan ID
    const { id } = await params;

    // 2. Ambil data dari Laravel
    const response = await  fetch(`https://niagajayaelectronic-admin.se2.web.id/api/products/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Produk tidak ditemukan di Laravel" }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: "Gagal menyambung ke server backend" }, { status: 500 });
  }
}