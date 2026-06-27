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

## 1 Clone Repository

```bash
git clone https://github.com/username/niaga-jaya-electronic.git
```

---

## 2 Masuk ke Project Backend

```bash
cd niaga-jaya-admin
```

---

## 3 Install Dependency

```bash
composer install
```

---

## 4 Copy File Environment

```bash
cp .env.example .env
```

---

## 5 Generate Key

```bash
php artisan key:generate
```

---

## 6 Konfigurasi Database

Ubah konfigurasi database pada file `.env`.

### Menggunakan MySQL (Local)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=niaga-jaya-electronic
DB_USERNAME=root
DB_PASSWORD=
```

### Menggunakan Supabase PostgreSQL

```env
DB_CONNECTION=pgsql
DB_HOST=YOUR_SUPABASE_HOST
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

---

## 7 Import Database

Project ini menggunakan database MySQL.

Import file:

```
database/niaga-jaya-electronic.sql
```

ke phpMyAdmin terlebih dahulu.

Setelah database berhasil diimport, jalankan:

```bash
php artisan serve
```

---

# Frontend

Masuk ke folder frontend

```bash
cd niaga-jaya-user
```

Install dependency

```bash
npm install
```

Jalankan

```bash
npm run dev
```

---

# Midtrans

Tambahkan konfigurasi berikut pada file `.env`

```env
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
```

---

# Clerk

Tambahkan konfigurasi

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

# Storage

Jalankan

```bash
php artisan storage:link
```

---

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
