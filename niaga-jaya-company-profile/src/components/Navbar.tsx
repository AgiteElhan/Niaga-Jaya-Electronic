"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/?scroll=home", sectionId: null },
  { label: "Tentang Kami", href: "/about", sectionId: null },
  { label: "Produk Kami", href: "/?scroll=produk", sectionId: "produk" },
  { label: "Kontak Kami", href: "/?scroll=contact", sectionId: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent, sectionId: string | null) => {
    // Kalau tidak ada sectionId (Home & About), biarkan Link jalan normal
    if (!sectionId) return;

    // Kalau sudah di halaman "/" → scroll langsung, tidak perlu pindah halaman
    if (pathname === "/") {
      e.preventDefault();
      setOpen(false);
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Kalau di halaman lain (misal /about) → biarkan href "/?scroll=produk" berjalan
    // ScrollHandler di page.tsx yang akan handle scroll-nya
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#2563EB] font-extrabold text-lg tracking-tight"
        >
          Niaga Jaya Elektronik
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href && !link.sectionId
                    ? "text-[#2563EB] font-semibold"
                    : "text-gray-600 hover:text-[#2563EB]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.sectionId);
                    setOpen(false);
                  }}
                  className="block text-sm font-medium text-gray-700 hover:text-[#2563EB] py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
