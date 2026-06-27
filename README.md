# 🛒 Niaga Jaya Electronic

<p align="center">
  <img src="niaga-jaya-admin\public\assets\images\niaga-jaya-logo.png" width="150">
</p>

<p align="center">
Sistem Informasi Penjualan Elektronik Berbasis E-Commerce
</p>

---

## 📖 Tentang Project

Niaga Jaya Electronic merupakan aplikasi **E-Commerce Penjualan Elektronik** yang dikembangkan untuk membantu proses penjualan produk elektronik secara online.

Aplikasi ini menyediakan fitur pembelian produk, manajemen pesanan, pembayaran online menggunakan **Midtrans Payment Gateway**, serta dashboard admin untuk mengelola seluruh aktivitas toko.

Project ini dibangun menggunakan:

* Laravel 12
* Next.js 16
* Supabase PostgreSQL
* Midtrans Payment Gateway
* Tailwind CSS
* Clerk Authentication

---

# 👥 Role Pengguna

## 👤 User

User dapat melakukan:

* Registrasi / Login menggunakan Clerk
* Melihat produk
* Mencari produk
* Melihat detail produk
* Menambahkan produk ke keranjang
* Checkout produk
* Memilih metode pembayaran
* Melakukan pembayaran melalui Midtrans
* Melihat status pesanan
* Melihat riwayat pembelian
* Memberikan ulasan produk

---

## 👨‍💼 Admin

Admin dapat melakukan:

* Login Dashboard
* Dashboard Statistik
* Kelola Produk
* Kelola Kategori
* Kelola Brand
* Kelola Pesanan
* Update Status Pengiriman
* Input Nomor Resi
* Kelola Banner
* Kelola Ulasan
* Export Laporan PDF

---

# 💳 Payment Gateway

Project ini telah terintegrasi dengan **Midtrans Core API**.

Metode pembayaran yang tersedia:

* QRIS
* BCA Virtual Account
* BNI Virtual Account
* BRI Virtual Account
* CIMB Virtual Account
* Permata Virtual Account

---

# 🛠️ Tech Stack

## Backend

* Laravel 12
* PHP 8.4
* PostgreSQL (Supabase)
* Livewire 4

## Frontend

* Next.js
* React
* Tailwind CSS
* Clerk Authentication

## Payment

* Midtrans Core API

---

# 📂 Struktur Project

Backend

```
niaga-jaya-admin/
```

Frontend

```
niaga-jaya-user/
```

---

# ⚙️ Cara Instalasi

## Requirements

- PHP 8.2+
- Composer
- Node.js 20+
- Laragon / XAMPP
- MySQL / phpMyAdmin

---

## 1. Clone Repository

```bash
git clone https://github.com/AgitElhandinnata/niaga-jaya-electronic.git
```

---

## 2. Backend Installation

Masuk ke folder backend

```bash
cd niaga-jaya-admin
```

Install dependency

```bash
composer install
```

Copy file environment

```bash
cp .env.example .env
```

Generate key

```bash
php artisan key:generate
```

---

## 3. Konfigurasi Database

Buat database baru di phpMyAdmin dengan nama:

```
niaga-jaya-electronic
```

Kemudian ubah file `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=niaga-jaya-electronic
DB_USERNAME=root
DB_PASSWORD=
```

> **Catatan:** Jika menggunakan Laragon dan MySQL berjalan pada port `3307` atau port lain, sesuaikan nilai `DB_PORT` dengan konfigurasi MySQL Anda.

---

## 4. Jalankan Migration

```bash
php artisan migrate
```

---

## 5. Jalankan Seeder (Opsional)

Jika project menyediakan seeder:

```bash
php artisan db:seed
```

atau

```bash
php artisan migrate --seed
```

---

## 6. Storage Link

```bash
php artisan storage:link
```

---

## 7. Jalankan Backend

```bash
php artisan serve
```

Backend akan berjalan di

```
http://127.0.0.1:8000
```

---

# Frontend Installation

Masuk ke folder frontend

```bash
cd niaga-jaya-electronic-ecommerce
```

Install dependency

```bash
npm install
```

Jalankan project

```bash
npm run dev
```

Frontend akan berjalan di

```
http://localhost:3000
```

---

# Konfigurasi Midtrans

Tambahkan konfigurasi berikut pada file `.env`

```env
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
```

---

# Konfigurasi Clerk

Tambahkan konfigurasi berikut pada file `.env.local`

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
# Screenshot

## Landing Page

(Gambar)

## Produk

(Gambar)

## Checkout

(Gambar)

## Pembayaran

(Gambar)

## Dashboard Admin

(Gambar)

---

# Fitur

* Authentication
* Product Management
* Category Management
* Brand Management
* Shopping Cart
* Checkout
* Midtrans Payment Gateway
* Order Tracking
* Shipping Status
* Product Review
* PDF Report
* Responsive Design

---

# License

Project ini dibuat untuk kebutuhan pembelajaran dan pengembangan Sistem Informasi Penjualan Elektronik berbasis E-Commerce.
