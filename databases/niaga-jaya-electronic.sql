-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jun 27, 2026 at 05:53 AM
-- Server version: 8.0.30
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `niaga-jaya-electronic`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_banner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `nama_banner`, `gambar`, `created_at`, `updated_at`) VALUES
(3, 'Promo New Year', '1777802511.png', '2026-05-03 03:01:51', '2026-05-03 03:01:51'),
(4, 'Promo Imlek', '1777802533.png', '2026-05-03 03:02:13', '2026-05-03 03:03:45'),
(5, 'Promo Ramadhan', '1777802578.png', '2026-05-03 03:02:31', '2026-05-03 03:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'mesin cuci', 'asakj', '2026-04-28 08:01:00', '2026-04-28 08:01:00'),
(2, 'Barang Ruang Tamu', 'Barang elektronik diruang tamu', '2026-05-06 07:48:12', '2026-05-06 07:48:12'),
(3, 'Barang Dapur', 'Barang elektronik dapur', '2026-05-06 07:48:30', '2026-05-06 07:48:30');

-- --------------------------------------------------------

--
-- Table structure for table `merk`
--

CREATE TABLE `merk` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_merk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `merk`
--

INSERT INTO `merk` (`id`, `nama_merk`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'asas', 'assa', '2026-04-28 08:01:08', '2026-04-28 08:01:08'),
(2, 'Sharp', 'elektronik', '2026-05-03 23:45:06', '2026-05-03 23:45:06'),
(3, 'Samsung', 'Elektronik', '2026-06-03 04:48:36', '2026-06-03 04:48:36');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_21_063425_create_merk_table', 1),
(5, '2026_04_21_133259_create_supplier_table', 1),
(6, '2026_04_22_141335_create_kategori_table', 1),
(7, '2026_04_22_141511_create_product_table', 1),
(8, '2026_05_01_130004_create_banners_table', 2),
(9, '2026_05_01_132938_rename_gambar_in_banners_table', 3),
(10, '2026_05_05_130048_create_pesanan_table', 4),
(11, '2026_05_05_130755_create_pesanan_item_table', 4),
(12, '2026_05_05_132218_create_ulasan_table', 5),
(13, '2026_05_05_133057_create_stok_masuk_table', 5),
(14, '2026_05_05_133334_create_stok_masuk_item_table', 5),
(15, '2026_05_18_221719_add_clerk_id_to_users_table', 6),
(16, '2026_05_27_141417_add_clerk_id_to_pesanan', 7),
(17, '2026_06_03_115736_add_status_pengiriman_to_pesanan_table', 8),
(18, '2026_06_03_121046_add_status_pengiriman_to_pesanan_table', 9),
(19, '2026_06_03_122138_add_nomor_resi_to_pesanan_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` bigint UNSIGNED NOT NULL,
  `nomor_pesanan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clerk_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_pembeli` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp_pembeli` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_kirim` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `metode_pengiriman` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_pengiriman` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'belum_dikirim',
  `total_bayar` decimal(12,2) NOT NULL,
  `status_pembayaran` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'menunggu',
  `metode_pembayaran` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_resi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_snap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_response` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `nomor_pesanan`, `clerk_id`, `nama_pembeli`, `whatsapp_pembeli`, `alamat_kirim`, `metode_pengiriman`, `status_pengiriman`, `total_bayar`, `status_pembayaran`, `metode_pembayaran`, `nomor_resi`, `token_snap`, `catatan`, `created_at`, `updated_at`, `transaction_id`, `payment_response`) VALUES
(1, 'NJE-1779865742158', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 07:09:02', '2026-05-27 07:09:02', NULL, NULL),
(2, 'NJE-1779866355873', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 07:19:16', '2026-05-27 07:19:16', NULL, NULL),
(4, 'NJE-1779871219438', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:40:20', '2026-05-27 08:40:20', NULL, NULL),
(5, 'NJE-1779871516064', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:45:16', '2026-05-27 08:45:16', NULL, NULL),
(6, 'NJE-1779871693693', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:48:14', '2026-05-27 08:48:14', NULL, NULL),
(7, 'NJE-1779871828882', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:50:29', '2026-05-27 08:50:29', NULL, NULL),
(8, 'NJE-1779872134229', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:55:35', '2026-05-27 08:55:35', NULL, NULL),
(9, 'NJE-1779872153692', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:55:54', '2026-05-27 08:55:54', NULL, NULL),
(10, 'NJE-1779872171894', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 08:56:12', '2026-05-27 08:56:12', NULL, NULL),
(11, 'NJE-1779872476615', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:01:17', '2026-05-27 09:01:17', NULL, NULL),
(12, 'NJE-1779872580595', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:03:01', '2026-05-27 09:03:01', NULL, NULL),
(13, 'NJE-1779872630429', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:03:51', '2026-05-27 09:03:51', NULL, NULL),
(15, 'NJE-1779872818379', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:06:59', '2026-05-27 09:06:59', NULL, NULL),
(16, 'NJE-1779872935311', NULL, 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:08:56', '2026-05-27 09:08:56', NULL, NULL),
(17, 'NJE-1779873533000', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-27 09:18:53', '2026-05-27 09:18:53', NULL, NULL),
(18, 'NJE-1780059860579', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:04:22', '2026-05-29 13:04:22', NULL, NULL),
(19, 'NJE-1780059883209', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:04:44', '2026-05-29 13:04:44', NULL, NULL),
(20, 'NJE-1780060127558', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:08:48', '2026-05-29 13:08:48', NULL, NULL),
(21, 'NJE-1780060462671', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:14:23', '2026-05-29 13:14:23', NULL, NULL),
(22, 'NJE-1780060638998', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'JNE Express - OKE', 'belum_dikirim', '384499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:17:19', '2026-05-29 13:17:19', NULL, NULL),
(23, 'NJE-1780061126966', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'SiCepat REG', 'belum_dikirim', '386499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:25:27', '2026-05-29 13:25:27', NULL, NULL),
(24, 'NJE-1780062284930', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3387498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:44:45', '2026-05-29 13:44:45', NULL, NULL),
(25, 'NJE-1780063136229', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '6387497.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-29 13:58:57', '2026-05-29 13:58:57', NULL, NULL),
(26, 'NJE-1780117844976', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'SiCepat REG', 'belum_dikirim', '3386498.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-30 05:10:47', '2026-05-30 05:10:47', NULL, NULL),
(27, 'NJE-1780118474947', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'berhasil', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-30 05:21:16', '2026-05-30 05:21:16', NULL, NULL),
(28, 'NJE-1780143290991', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-30 12:14:51', '2026-06-03 05:17:46', NULL, NULL),
(29, 'NJE-1780143440348', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'JNE Express - OKE', 'dikirim', '384499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-05-30 12:17:21', '2026-06-03 05:16:13', NULL, NULL),
(30, 'NJE-1780143866505', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'SiCepat REG', 'selesai', '386499.00', 'berhasil', 'Midtrans Gateway', 'JXT12324231221', NULL, NULL, '2026-05-30 12:24:27', '2026-06-03 06:22:16', NULL, NULL),
(31, 'NJE-1780550929909', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 05:28:52', '2026-06-04 05:28:52', NULL, NULL),
(32, 'NJE-1780551300441', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 05:35:02', '2026-06-04 05:35:02', NULL, NULL),
(33, 'NJE-1780551760714', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 05:42:41', '2026-06-04 05:42:41', NULL, NULL),
(34, 'NJE-1780551975562', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 05:46:16', '2026-06-04 05:46:16', NULL, NULL),
(35, 'NJE-1780552706862', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'success', 'bank_transfer', NULL, NULL, NULL, '2026-06-04 05:58:28', '2026-06-04 05:58:43', NULL, NULL),
(36, 'NJE-1780552753944', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'selesai', '387499.00', 'success', 'bank_transfer', 'JJKUKKJJJJJJ', NULL, NULL, '2026-06-04 05:59:14', '2026-06-04 06:03:19', NULL, NULL),
(37, 'NJE-1780553101762', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'qris', NULL, NULL, NULL, '2026-06-04 06:05:03', '2026-06-04 06:05:16', NULL, NULL),
(38, 'NJE-1780553194475', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'qris', NULL, NULL, NULL, '2026-06-04 06:06:36', '2026-06-04 06:08:16', NULL, NULL),
(39, 'NJE-1780561559078', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 08:26:01', '2026-06-04 08:26:01', NULL, NULL),
(40, 'NJE-1780561583439', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-04 08:26:24', '2026-06-04 08:26:24', NULL, NULL),
(41, 'NJE-1780648662333', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'dikirim', '3027499.00', 'success', 'bank_transfer', 'jJKASAKS', NULL, NULL, '2026-06-05 08:37:43', '2026-06-05 08:38:26', NULL, NULL),
(42, 'NJE-1780744963298', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'success', 'bank_transfer', NULL, NULL, NULL, '2026-06-06 11:22:44', '2026-06-06 11:31:26', NULL, NULL),
(43, 'NJE-1782213938424', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'Midtrans Gateway', NULL, NULL, NULL, '2026-06-23 11:25:39', '2026-06-23 11:25:39', NULL, NULL),
(44, 'NJE-1782215230953', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'gopay', NULL, NULL, NULL, '2026-06-23 11:47:11', '2026-06-23 11:47:11', NULL, NULL),
(49, 'NJE-1782216537564', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'menunggu', 'gopay', NULL, NULL, NULL, '2026-06-23 12:08:58', '2026-06-23 12:08:58', NULL, NULL),
(50, 'NJE-1782217003227', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'dibatalkan', 'bca_va', NULL, NULL, NULL, '2026-06-23 12:16:44', '2026-06-23 12:49:47', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"a235091e-8f67-4504-9f70-9038584c8620\",\"order_id\":\"NJE-1782217003227\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-23 19:16:44\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bca\",\"va_number\":\"62039379191452620703147\"}],\"expiry_time\":\"2026-06-24 19:16:44\"}'),
(51, 'NJE-1782282238715', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'menunggu', 'bca_va', NULL, NULL, NULL, '2026-06-24 06:24:00', '2026-06-24 06:24:00', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"c73fc793-3395-4540-b384-f2a5ed29091f\",\"order_id\":\"NJE-1782282238715\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-24 13:24:02\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bca\",\"va_number\":\"62039227943206109427868\"}],\"expiry_time\":\"2026-06-25 13:24:02\"}'),
(52, 'NJE-1782532798013', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 04:00:00', '2026-06-27 04:07:58', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"6e942bb1-2666-4c93-8144-a94b50527111\",\"order_id\":\"NJE-1782532798013\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 11:00:01\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"6200039787215870\",\"expiry_time\":\"2026-06-28 11:00:01\"}'),
(53, 'NJE-1782532825511', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'failed', 'qris', NULL, NULL, NULL, '2026-06-27 04:00:26', '2026-06-27 04:16:29', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"d6533d4f-0828-4efe-9daf-68a2bbe89b55\",\"order_id\":\"NJE-1782532825511\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 11:00:27\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/d6533d4f-0828-4efe-9daf-68a2bbe89b55\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A120260627040027RveSDZ1xK9ID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE52043745530336054063874995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A120260627040027RveSDZ1xK9ID0703A01630453C4\",\"expiry_time\":\"2026-06-27 11:15:27\"}'),
(54, 'NJE-1782532847007', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '3027499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 04:00:48', '2026-06-27 04:03:22', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"8c4b3cd5-17fa-45b9-a34d-4f6e2289a8b0\",\"order_id\":\"NJE-1782532847007\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"3027499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 11:01:04\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bca\",\"va_number\":\"62039207315039442222599\"}],\"expiry_time\":\"2026-06-28 11:01:04\"}'),
(57, 'NJE-1782533241938', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'failed', 'qris', NULL, NULL, NULL, '2026-06-27 04:07:23', '2026-06-27 04:23:26', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"908e1480-f818-4b60-98e4-a9443b33bf75\",\"order_id\":\"NJE-1782533241938\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 11:07:24\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/908e1480-f818-4b60-98e4-a9443b33bf75\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A120260627040724kLGABGFsaxID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE52043745530336054063874995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A120260627040724kLGABGFsaxID0703A01630427A5\",\"expiry_time\":\"2026-06-27 11:22:24\"}'),
(58, 'NJE-1782533340911', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'failed', 'qris', NULL, NULL, NULL, '2026-06-27 04:09:02', '2026-06-27 04:25:06', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"b1fc3866-03a1-410e-aba8-cd0d9b8e3fdc\",\"order_id\":\"NJE-1782533340911\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 11:09:03\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/b1fc3866-03a1-410e-aba8-cd0d9b8e3fdc\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A120260627040903FCUGHgZfktID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE52043745530336054063874995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A120260627040903FCUGHgZfktID0703A016304F974\",\"expiry_time\":\"2026-06-27 11:24:03\"}'),
(66, 'NJE-1782535622243', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'selesai', '3027499.00', 'success', 'qris', 'jx1234567', NULL, NULL, '2026-06-27 04:47:03', '2026-06-27 04:57:55', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"95e9ae55-5ed4-4adc-8221-942e1d62b0a2\",\"order_id\":\"NJE-1782535622243\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"3027499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 11:47:04\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/95e9ae55-5ed4-4adc-8221-942e1d62b0a2\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A120260627044704DJwn8UGAoHID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE520437455303360540730274995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A120260627044704DJwn8UGAoHID0703A016304655B\",\"expiry_time\":\"2026-06-27 12:02:04\"}'),
(67, 'NJE-1782536183166', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'failed', 'qris', NULL, NULL, NULL, '2026-06-27 04:56:24', '2026-06-27 05:12:27', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"d2240b83-c985-4b63-8b69-25114b8f077c\",\"order_id\":\"NJE-1782536183166\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 11:56:25\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/d2240b83-c985-4b63-8b69-25114b8f077c\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A120260627045625Qix6ZuPGZiID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE52043745530336054063874995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A120260627045625Qix6ZuPGZiID0703A0163047752\",\"expiry_time\":\"2026-06-27 12:11:25\"}'),
(68, 'NJE-1782536892170', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'failed', 'qris', NULL, NULL, NULL, '2026-06-27 05:08:13', '2026-06-27 05:24:17', NULL, '{\"status_code\":\"201\",\"status_message\":\"Qris transaction is created\",\"transaction_id\":\"1e85427c-38e2-4845-8dce-1ad3b7814634\",\"order_id\":\"NJE-1782536892170\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"qris\",\"transaction_time\":\"2026-06-27 12:08:14\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"actions\":[{\"name\":\"generate-qr-code\",\"method\":\"GET\",\"url\":\"https:\\/\\/api.sandbox.midtrans.com\\/v2\\/qris\\/1e85427c-38e2-4845-8dce-1ad3b7814634\\/qr-code\"},{\"name\":\"generate-qr-code-v2\",\"method\":\"GET\",\"url\":\"https:\\/\\/merchants-app.sbx.midtrans.com\\/v4\\/qris\\/gopay\\/A1202606270508147oBHB80FwQID\\/qr-code\"}],\"acquirer\":\"gopay\",\"qr_string\":\"00020101021226620014COM.GO-JEK.WWW011993600914378436203970210M7843620390303UKE51440014ID.CO.QRIS.WWW0215AID6273979873550303UKE52043745530336054063874995802ID5921Niaga Jaya Elektronik6007BANDUNG61054012162395028A1202606270508147oBHB80FwQID0703A0163041D9C\",\"expiry_time\":\"2026-06-27 12:23:14\"}'),
(69, 'NJE-1782537169217', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 05:12:50', '2026-06-27 05:12:52', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"272d8f6f-50d0-4d0e-bf1d-e6c67fc4ba84\",\"order_id\":\"NJE-1782537169217\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:12:51\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"6200053089098508\",\"expiry_time\":\"2026-06-28 12:12:51\"}'),
(70, 'NJE-1782537207215', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 05:13:28', '2026-06-27 05:13:31', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"2c6635b1-43c3-4c95-9924-c7051e262e3b\",\"order_id\":\"NJE-1782537207215\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:13:29\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"6200090041048749\",\"expiry_time\":\"2026-06-28 12:13:29\"}'),
(71, 'NJE-1782537272207', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 05:14:33', '2026-06-27 05:14:35', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"11204a68-06fe-4295-a53a-b17ec39bac69\",\"order_id\":\"NJE-1782537272207\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:14:34\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bca\",\"va_number\":\"62039122233170103931195\"}],\"expiry_time\":\"2026-06-28 12:14:34\"}'),
(72, 'NJE-1782537305191', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'echannel', NULL, NULL, NULL, '2026-06-27 05:15:06', '2026-06-27 05:15:08', NULL, '{\"status_code\":\"201\",\"status_message\":\"OK, Mandiri Bill transaction is successful\",\"transaction_id\":\"b00980d5-7202-4820-9d3b-eb1f683bc009\",\"order_id\":\"NJE-1782537305191\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"echannel\",\"transaction_time\":\"2026-06-27 12:15:07\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"bill_key\":\"265879123665\",\"biller_code\":\"70012\",\"expiry_time\":\"2026-06-28 12:15:07\"}'),
(73, 'NJE-1782537789632', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'pending', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 05:23:10', '2026-06-27 05:23:13', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"e3e294cd-1480-49bd-9488-48b140c886fe\",\"order_id\":\"NJE-1782537789632\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:23:11\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"6200049747867398\",\"expiry_time\":\"2026-06-28 12:23:11\"}'),
(74, 'NJE-1782537849328', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'belum_dikirim', '387499.00', 'success', 'bank_transfer', NULL, NULL, NULL, '2026-06-27 05:24:10', '2026-06-27 05:26:07', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"51751dc3-0a3c-445b-905f-b3951f22e3a5\",\"order_id\":\"NJE-1782537849328\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:24:11\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bsi\",\"va_number\":\"62039179312991434\"}],\"expiry_time\":\"2026-06-28 12:24:11\"}'),
(75, 'NJE-1782538037933', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'selesai', '387499.00', 'success', 'bank_transfer', 'rxhahh123', NULL, NULL, '2026-06-27 05:27:19', '2026-06-27 05:28:29', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"b6b9b3df-839f-4100-a66a-7ef6cf51bf9d\",\"order_id\":\"NJE-1782538037933\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"387499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:27:20\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"cimb\",\"va_number\":\"2039558210133246\"}],\"expiry_time\":\"2026-06-28 12:27:19\"}'),
(76, 'NJE-1782538211738', 'user_3EISCAnxbfrC2lz7ecttYmbck1U', 'Agit elhandinnata', '081234567857', 'Perumahan Bumi Asri Pasarkemis Blok B3 No. 24, RT 02/RW 08, Pasar Kemis, Kabupaten Tangerang, Banten', 'J&T Cargo - Regular', 'dikirim', '3027499.00', 'success', 'bank_transfer', 'rx123456', NULL, NULL, '2026-06-27 05:30:13', '2026-06-27 05:34:31', NULL, '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"0d05377b-737a-4f4d-8462-156b5ba2a5e9\",\"order_id\":\"NJE-1782538211738\",\"merchant_id\":\"M784362039\",\"gross_amount\":\"3027499.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2026-06-27 12:30:13\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9886203948412431\"}],\"expiry_time\":\"2026-06-28 12:30:13\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_item`
--

CREATE TABLE `pesanan_item` (
  `id` bigint UNSIGNED NOT NULL,
  `pesanan_id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `jumlah` int NOT NULL,
  `harga_satuan` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pesanan_item`
--

INSERT INTO `pesanan_item` (`id`, `pesanan_id`, `produk_id`, `jumlah`, `harga_satuan`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 1, '359999.00', '359999.00', '2026-05-27 07:09:02', '2026-05-27 07:09:02'),
(2, 2, 4, 1, '359999.00', '359999.00', '2026-05-27 07:19:16', '2026-05-27 07:19:16'),
(3, 4, 3, 1, '2999999.00', '2999999.00', '2026-05-27 08:40:20', '2026-05-27 08:40:20'),
(4, 5, 4, 1, '359999.00', '359999.00', '2026-05-27 08:45:16', '2026-05-27 08:45:16'),
(5, 6, 4, 1, '359999.00', '359999.00', '2026-05-27 08:48:14', '2026-05-27 08:48:14'),
(6, 7, 4, 1, '359999.00', '359999.00', '2026-05-27 08:50:29', '2026-05-27 08:50:29'),
(7, 8, 4, 1, '359999.00', '359999.00', '2026-05-27 08:55:35', '2026-05-27 08:55:35'),
(8, 9, 4, 1, '359999.00', '359999.00', '2026-05-27 08:55:54', '2026-05-27 08:55:54'),
(9, 10, 4, 1, '359999.00', '359999.00', '2026-05-27 08:56:12', '2026-05-27 08:56:12'),
(10, 11, 4, 1, '359999.00', '359999.00', '2026-05-27 09:01:17', '2026-05-27 09:01:17'),
(11, 11, 3, 1, '2999999.00', '2999999.00', '2026-05-27 09:01:17', '2026-05-27 09:01:17'),
(12, 12, 4, 1, '359999.00', '359999.00', '2026-05-27 09:03:01', '2026-05-27 09:03:01'),
(13, 12, 3, 1, '2999999.00', '2999999.00', '2026-05-27 09:03:01', '2026-05-27 09:03:01'),
(14, 13, 4, 1, '359999.00', '359999.00', '2026-05-27 09:03:51', '2026-05-27 09:03:51'),
(15, 15, 4, 1, '359999.00', '359999.00', '2026-05-27 09:06:59', '2026-05-27 09:06:59'),
(16, 15, 3, 1, '2999999.00', '2999999.00', '2026-05-27 09:06:59', '2026-05-27 09:06:59'),
(17, 16, 4, 1, '359999.00', '359999.00', '2026-05-27 09:08:56', '2026-05-27 09:08:56'),
(18, 16, 3, 1, '2999999.00', '2999999.00', '2026-05-27 09:08:56', '2026-05-27 09:08:56'),
(19, 17, 4, 1, '359999.00', '359999.00', '2026-05-27 09:18:53', '2026-05-27 09:18:53'),
(20, 17, 3, 1, '2999999.00', '2999999.00', '2026-05-27 09:18:53', '2026-05-27 09:18:53'),
(21, 18, 4, 1, '359999.00', '359999.00', '2026-05-29 13:04:22', '2026-05-29 13:04:22'),
(22, 19, 4, 1, '359999.00', '359999.00', '2026-05-29 13:04:44', '2026-05-29 13:04:44'),
(23, 20, 4, 1, '359999.00', '359999.00', '2026-05-29 13:08:48', '2026-05-29 13:08:48'),
(24, 20, 3, 1, '2999999.00', '2999999.00', '2026-05-29 13:08:48', '2026-05-29 13:08:48'),
(25, 21, 3, 1, '2999999.00', '2999999.00', '2026-05-29 13:14:23', '2026-05-29 13:14:23'),
(26, 22, 4, 1, '359999.00', '359999.00', '2026-05-29 13:17:19', '2026-05-29 13:17:19'),
(27, 23, 4, 1, '359999.00', '359999.00', '2026-05-29 13:25:27', '2026-05-29 13:25:27'),
(28, 24, 3, 1, '2999999.00', '2999999.00', '2026-05-29 13:44:45', '2026-05-29 13:44:45'),
(29, 24, 4, 1, '359999.00', '359999.00', '2026-05-29 13:44:45', '2026-05-29 13:44:45'),
(30, 25, 4, 1, '359999.00', '359999.00', '2026-05-29 13:58:57', '2026-05-29 13:58:57'),
(31, 25, 3, 1, '2999999.00', '2999999.00', '2026-05-29 13:58:57', '2026-05-29 13:58:57'),
(32, 25, 2, 1, '2999999.00', '2999999.00', '2026-05-29 13:58:57', '2026-05-29 13:58:57'),
(33, 26, 4, 1, '359999.00', '359999.00', '2026-05-30 05:10:47', '2026-05-30 05:10:47'),
(34, 26, 3, 1, '2999999.00', '2999999.00', '2026-05-30 05:10:47', '2026-05-30 05:10:47'),
(35, 27, 4, 1, '359999.00', '359999.00', '2026-05-30 05:21:16', '2026-05-30 05:21:16'),
(36, 28, 4, 1, '359999.00', '359999.00', '2026-05-30 12:14:51', '2026-05-30 12:14:51'),
(37, 29, 4, 1, '359999.00', '359999.00', '2026-05-30 12:17:21', '2026-05-30 12:17:21'),
(38, 30, 4, 1, '359999.00', '359999.00', '2026-05-30 12:24:27', '2026-05-30 12:24:27'),
(39, 31, 4, 1, '359999.00', '359999.00', '2026-06-04 05:28:52', '2026-06-04 05:28:52'),
(40, 32, 3, 1, '2999999.00', '2999999.00', '2026-06-04 05:35:02', '2026-06-04 05:35:02'),
(41, 33, 4, 1, '359999.00', '359999.00', '2026-06-04 05:42:41', '2026-06-04 05:42:41'),
(42, 34, 4, 1, '359999.00', '359999.00', '2026-06-04 05:46:16', '2026-06-04 05:46:16'),
(43, 35, 4, 1, '359999.00', '359999.00', '2026-06-04 05:58:28', '2026-06-04 05:58:28'),
(44, 36, 4, 1, '359999.00', '359999.00', '2026-06-04 05:59:14', '2026-06-04 05:59:14'),
(45, 37, 4, 1, '359999.00', '359999.00', '2026-06-04 06:05:03', '2026-06-04 06:05:03'),
(46, 38, 4, 1, '359999.00', '359999.00', '2026-06-04 06:06:36', '2026-06-04 06:06:36'),
(47, 39, 4, 1, '359999.00', '359999.00', '2026-06-04 08:26:01', '2026-06-04 08:26:01'),
(48, 40, 3, 1, '2999999.00', '2999999.00', '2026-06-04 08:26:24', '2026-06-04 08:26:24'),
(49, 41, 3, 1, '2999999.00', '2999999.00', '2026-06-05 08:37:43', '2026-06-05 08:37:43'),
(50, 42, 4, 1, '359999.00', '359999.00', '2026-06-06 11:22:44', '2026-06-06 11:22:44'),
(51, 43, 4, 1, '359999.00', '359999.00', '2026-06-23 11:25:39', '2026-06-23 11:25:39'),
(52, 44, 3, 1, '2999999.00', '2999999.00', '2026-06-23 11:47:11', '2026-06-23 11:47:11'),
(57, 49, 3, 1, '2999999.00', '2999999.00', '2026-06-23 12:08:58', '2026-06-23 12:08:58'),
(58, 50, 4, 1, '359999.00', '359999.00', '2026-06-23 12:16:44', '2026-06-23 12:16:44'),
(59, 51, 4, 1, '359999.00', '359999.00', '2026-06-24 06:24:00', '2026-06-24 06:24:00'),
(60, 52, 4, 1, '359999.00', '359999.00', '2026-06-27 04:00:00', '2026-06-27 04:00:00'),
(61, 53, 4, 1, '359999.00', '359999.00', '2026-06-27 04:00:26', '2026-06-27 04:00:26'),
(62, 54, 3, 1, '2999999.00', '2999999.00', '2026-06-27 04:00:48', '2026-06-27 04:00:48'),
(65, 57, 4, 1, '359999.00', '359999.00', '2026-06-27 04:07:23', '2026-06-27 04:07:23'),
(66, 58, 4, 1, '359999.00', '359999.00', '2026-06-27 04:09:02', '2026-06-27 04:09:02'),
(74, 66, 3, 1, '2999999.00', '2999999.00', '2026-06-27 04:47:03', '2026-06-27 04:47:03'),
(75, 67, 4, 1, '359999.00', '359999.00', '2026-06-27 04:56:24', '2026-06-27 04:56:24'),
(76, 68, 4, 1, '359999.00', '359999.00', '2026-06-27 05:08:13', '2026-06-27 05:08:13'),
(77, 69, 4, 1, '359999.00', '359999.00', '2026-06-27 05:12:50', '2026-06-27 05:12:50'),
(78, 70, 4, 1, '359999.00', '359999.00', '2026-06-27 05:13:28', '2026-06-27 05:13:28'),
(79, 71, 4, 1, '359999.00', '359999.00', '2026-06-27 05:14:33', '2026-06-27 05:14:33'),
(80, 72, 4, 1, '359999.00', '359999.00', '2026-06-27 05:15:06', '2026-06-27 05:15:06'),
(81, 73, 4, 1, '359999.00', '359999.00', '2026-06-27 05:23:10', '2026-06-27 05:23:10'),
(82, 74, 4, 1, '359999.00', '359999.00', '2026-06-27 05:24:10', '2026-06-27 05:24:10'),
(83, 75, 4, 1, '359999.00', '359999.00', '2026-06-27 05:27:19', '2026-06-27 05:27:19'),
(84, 76, 3, 1, '2999999.00', '2999999.00', '2026-06-27 05:30:13', '2026-06-27 05:30:13');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_produk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_produk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori_id` bigint UNSIGNED NOT NULL,
  `merk_id` bigint UNSIGNED NOT NULL,
  `harga_jual` decimal(12,2) NOT NULL,
  `harga_discount` decimal(12,2) DEFAULT NULL,
  `stok` int NOT NULL DEFAULT '0',
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `gambar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `nama_produk`, `kode_produk`, `kategori_id`, `merk_id`, `harga_jual`, `harga_discount`, `stok`, `deskripsi`, `gambar`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'sasas', 'saas', 1, 1, '2999999.00', NULL, 20, 'saas', '1777637838.jpg', 1, '2026-05-01 05:17:18', '2026-05-01 05:17:18'),
(3, 'Mesin cuci', 'MS-123', 1, 1, '2999999.00', NULL, 229, 'SAJJAS', '1777877072.jpg', 1, '2026-05-03 23:44:32', '2026-06-27 05:34:31'),
(4, 'Rice cooker', 'RC-SM021', 3, 2, '359999.00', NULL, 98, 'Sharp Indonesia menghadirkan rice cooker dengan desain modern dan fitur multifungsi yang memudahkan kegiatan memasak sehari-hari. Rice cooker Sharp dikenal memiliki kualitas panci yang tebal, lapisan anti lengket, serta teknologi pemanas yang merata sehingga nasi matang lebih pulen dan tahan lama. Beberapa seri digitalnya juga dilengkapi fitur LCD display, timer otomatis, hingga mode memasak seperti mengukus, membuat bubur, sup, dan kue.  Selain praktis digunakan, rice cooker Sharp juga hemat daya dan tersedia dalam berbagai kapasitas sesuai kebutuhan keluarga. Fitur keep warm mampu menjaga nasi tetap hangat dalam waktu lama tanpa mudah kering atau berubah warna. Desainnya yang elegan dan mudah dibersihkan membuat rice cooker Sharp menjadi salah satu pilihan favorit untuk perlengkapan dapur rumah tangga modern.', '1778157256.jpg', 1, '2026-05-07 05:34:16', '2026-05-30 05:28:12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('GjjufOBJbzF5nhOOQdv6u2QzRwJxm3uzvHTh1QZU', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVVBJM2xVejQxRGdibjBhckpsaXFsRXdGM0cyZFBsZ2hhWFpYeUZYWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wZXNhbmFuIjtzOjU6InJvdXRlIjtzOjEzOiJhZG1pbi5wZXNhbmFuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1782538493),
('Hf6n78JPRi5fT9Wu5KTFHnjQvbeUpcDHmJhHUwPG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieGxrNE9pRm92RkZvc0hGYVF3TTdVSkQwaXdMMFJQdGE1SXREc2VCUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9sYXBvcmFuLXN0b2siO3M6NToicm91dGUiO3M6MTg6ImFkbWluLmxhcG9yYW4tc3RvayI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1782283279);

-- --------------------------------------------------------

--
-- Table structure for table `stok_masuk`
--

CREATE TABLE `stok_masuk` (
  `id` bigint UNSIGNED NOT NULL,
  `nomor_referensi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_id` bigint UNSIGNED NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stok_masuk`
--

INSERT INTO `stok_masuk` (`id`, `nomor_referensi`, `supplier_id`, `tanggal_masuk`, `catatan`, `created_at`, `updated_at`) VALUES
(3, 'SM-121221', 1, '2026-05-14', 'Barang masuk', '2026-05-14 02:35:12', '2026-05-14 02:35:12'),
(4, 'SM-20260514-815', 1, '2026-05-14', 'barang masuk', '2026-05-14 03:03:44', '2026-05-14 03:03:44'),
(5, 'SM-20260514-533', 1, '2026-05-14', 'asaas', '2026-05-14 03:11:28', '2026-05-14 03:11:28'),
(6, 'SM-20260514-407', 1, '2026-05-14', 'saas', '2026-05-14 03:12:11', '2026-05-14 03:12:11'),
(7, 'SM-20260530-969', 1, '2026-05-30', 'barang baru', '2026-05-30 05:28:12', '2026-05-30 05:28:12');

-- --------------------------------------------------------

--
-- Table structure for table `stok_masuk_item`
--

CREATE TABLE `stok_masuk_item` (
  `id` bigint UNSIGNED NOT NULL,
  `stok_masuk_id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `jumlah_masuk` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stok_masuk_item`
--

INSERT INTO `stok_masuk_item` (`id`, `stok_masuk_id`, `produk_id`, `jumlah_masuk`, `created_at`, `updated_at`) VALUES
(2, 3, 4, 50, '2026-05-14 02:35:12', '2026-05-14 02:35:12'),
(3, 4, 4, 12, '2026-05-14 03:03:44', '2026-05-14 03:03:44'),
(4, 4, 3, 10, '2026-05-14 03:03:44', '2026-05-14 03:03:44'),
(5, 5, 3, 10, '2026-05-14 03:11:28', '2026-05-14 03:11:28'),
(6, 5, 4, 10, '2026-05-14 03:11:28', '2026-05-14 03:11:28'),
(7, 6, 4, 1, '2026-05-14 03:12:11', '2026-05-14 03:12:11'),
(8, 6, 3, 10, '2026-05-14 03:12:11', '2026-05-14 03:12:11'),
(9, 7, 4, 5, '2026-05-30 05:28:12', '2026-05-30 05:28:12');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_supplier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_supplier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('aktif','nonaktif') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `kode_supplier`, `nama_supplier`, `no_telp`, `alamat`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SAM001', 'Samsung', '08219821921', 'Jakarta Pusat', 'aktif', '2026-05-14 02:21:05', '2026-05-14 02:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `ulasan`
--

CREATE TABLE `ulasan` (
  `id` bigint UNSIGNED NOT NULL,
  `pesanan_id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `nama_pembeli` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `komentar` text COLLATE utf8mb4_unicode_ci,
  `tampilkan` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ulasan`
--

INSERT INTO `ulasan` (`id`, `pesanan_id`, `produk_id`, `nama_pembeli`, `rating`, `komentar`, `tampilkan`, `created_at`, `updated_at`) VALUES
(1, 27, 4, 'Agit elhandinnata', 5, 'baguss', 1, '2026-05-30 12:09:13', '2026-05-30 12:09:13'),
(2, 30, 4, 'Agit elhandinnata', 5, 'bagus banget pelayannya !!', 1, '2026-05-30 12:26:03', '2026-05-30 12:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clerk_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `clerk_id`, `email_verified_at`, `role`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin Niaga Jaya', 'admin@gmail.com', NULL, NULL, 'admin', '$2y$12$fyBET5SWQPNiSR5atxG5geK86LY4mm7WMPmIQ60JU44xj0ErCpBLS', NULL, '2026-04-28 07:58:07', '2026-04-28 07:58:07'),
(2, 'John Doe', 'user_2g7np7Hrk0SN6kj5EDMLDaKNL0S@niagajaya.com', 'user_2g7np7Hrk0SN6kj5EDMLDaKNL0S', NULL, 'user', '$2y$12$Z.c4v7PEAT9nVhbEs5jHxuZ1h/Tuseo4I0v.RCq2bMLMlOaDbpln6', NULL, '2026-05-18 15:43:39', '2026-05-18 15:43:39'),
(3, 'Agit elhandinnata', 'agitelhan@gmail.com', 'user_3Du8WhOt4usF6Fw8zCNf21FzjdG', NULL, 'user', '$2y$12$D/XVuOyOctO3poBqVP4k2e8jfmqsfGhDb7n2TDhceAVJ8TD63f7/u', NULL, '2026-05-18 16:10:36', '2026-05-18 16:10:36'),
(4, 'agit 02', 'agit02394@gmail.com', 'user_3Du8qkAWrkrrGf7skAN5URvT7Cr', NULL, 'user', '$2y$12$z5W1KxMgK2rXYfoYlBWHw.v8b4PPP2vnuDe0F6xz1UPjL5H1CDZH2', NULL, '2026-05-18 16:13:06', '2026-05-18 16:13:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merk`
--
ALTER TABLE `merk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pesanan_nomor_pesanan_unique` (`nomor_pesanan`);

--
-- Indexes for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pesanan_item_pesanan_id_foreign` (`pesanan_id`),
  ADD KEY `pesanan_item_produk_id_foreign` (`produk_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_kode_produk_unique` (`kode_produk`),
  ADD KEY `product_kategori_id_foreign` (`kategori_id`),
  ADD KEY `product_merk_id_foreign` (`merk_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `stok_masuk`
--
ALTER TABLE `stok_masuk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stok_masuk_nomor_referensi_unique` (`nomor_referensi`),
  ADD KEY `stok_masuk_supplier_id_foreign` (`supplier_id`);

--
-- Indexes for table `stok_masuk_item`
--
ALTER TABLE `stok_masuk_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stok_masuk_item_stok_masuk_id_foreign` (`stok_masuk_id`),
  ADD KEY `stok_masuk_item_produk_id_foreign` (`produk_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `supplier_kode_supplier_unique` (`kode_supplier`);

--
-- Indexes for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ulasan_pesanan_id_foreign` (`pesanan_id`),
  ADD KEY `ulasan_produk_id_foreign` (`produk_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `merk`
--
ALTER TABLE `merk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stok_masuk`
--
ALTER TABLE `stok_masuk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stok_masuk_item`
--
ALTER TABLE `stok_masuk_item`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ulasan`
--
ALTER TABLE `ulasan`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  ADD CONSTRAINT `pesanan_item_pesanan_id_foreign` FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pesanan_item_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_merk_id_foreign` FOREIGN KEY (`merk_id`) REFERENCES `merk` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stok_masuk`
--
ALTER TABLE `stok_masuk`
  ADD CONSTRAINT `stok_masuk_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `stok_masuk_item`
--
ALTER TABLE `stok_masuk_item`
  ADD CONSTRAINT `stok_masuk_item_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `stok_masuk_item_stok_masuk_id_foreign` FOREIGN KEY (`stok_masuk_id`) REFERENCES `stok_masuk` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD CONSTRAINT `ulasan_pesanan_id_foreign` FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ulasan_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
