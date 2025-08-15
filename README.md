Berikut versi **README** yang sudah distyling dan lebih rapi agar mudah dibaca dan profesional:

---

# Dasbor Manajemen Produk - Tes Teknis SGT

Ini adalah proyek frontend untuk **Tes Teknis Posisi Junior Frontend Dashboard Developer** di **Summit Global Teknologi**.
Aplikasi ini memungkinkan pengguna untuk **mengelola data produk** dan dilindungi oleh sistem autentikasi.

---

## Fitur Utama

* **Manajemen Produk:** Membuat, Membaca, dan Memperbarui data produk (Create, Read, Update).
* **Tabel Interaktif:** Menampilkan data produk menggunakan tabel dari **Ant Design** yang responsif.
* **Pencarian Real-time:** Mencari produk berdasarkan judul, kategori, atau deskripsi dengan jeda **300ms** (debounce).
* **Pagination:** Navigasi antar halaman untuk data yang banyak.
* **(Bonus) Autentikasi:** Sistem login menggunakan **Firebase Authentication**.
* **(Bonus) Halaman Terproteksi:** Dasbor produk hanya bisa diakses setelah login berhasil.

---

## Persyaratan Sistem

Sebelum menjalankan proyek ini, pastikan lingkungan Anda memenuhi persyaratan berikut:

* **Node.js:** v18.0 atau lebih baru
* **Package Manager:** `yarn` (disarankan) atau `npm`
* **Backend:** Server backend yang disediakan harus berjalan di `http://localhost:8001`

---

## Panduan Instalasi & Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal.

### 1. Clone Repositori

```bash
git clone https://github.com/Aditia372/dashboardtest-aditia.git
cd dashboardtest-aditia
```

### 2. Install Dependencies

Install semua library yang dibutuhkan:

```bash
# Menggunakan yarn (disarankan)
yarn install

# Atau jika menggunakan npm
npm install
```

### 3. Konfigurasi Environment Firebase

Aplikasi ini memerlukan koneksi ke **Firebase** untuk autentikasi:

1. Buat file `.env.local` di folder root proyek.
2. Salin konfigurasi Firebase Anda ke dalam file `.env.local` dengan format berikut:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcde...
```

> **Catatan:** Pastikan Anda sudah membuat proyek di **Firebase Console** dan mengaktifkan metode login **Email/Password**.

---

## Menjalankan Proyek

1. **Jalankan Server Backend**
   Pastikan server backend sudah berjalan, misalnya:

   ```bash
   yarn dev:firebase
   ```

2. **Jalankan Server Frontend**

   ```bash
   # Menggunakan yarn
   yarn dev

   # Atau menggunakan npm
   npm run dev
   ```

3. **Buka Aplikasi**
   Akses aplikasi melalui browser:

   ```
   http://localhost:3000/products
   ```


