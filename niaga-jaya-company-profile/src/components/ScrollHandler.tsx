"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Komponen ini dipasang di page.tsx halaman utama (/)
// Tugasnya: deteksi ?scroll=xxx lalu scroll ke section yang sesuai
export default function ScrollHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const scrollTo = searchParams.get("scroll");
    if (!scrollTo) return;

    // Tunggu sebentar agar halaman selesai render
    const timer = setTimeout(() => {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Hapus query param dari URL setelah scroll (biar URL bersih)
      router.replace("/", { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  // Komponen ini tidak render apapun ke layar
  return null;
}
