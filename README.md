Dasbor Manajemen Produk - Tes Teknis SGT
Ini adalah proyek frontend yang dibuat untuk Tes Teknis Posisi Junior Frontend Dashboard Developer di Summit Global Teknologi. Aplikasi ini memungkinkan pengguna untuk mengelola data produk dan dilindungi oleh sistem autentikasi.

Fitur Utama
Manajemen Produk: Membuat, Membaca, dan Memperbarui (Create, Read, Update) data produk.

Tabel Interaktif: Menampilkan data produk menggunakan tabel dari Ant Design yang responsif.

Pencarian Real-time: Mencari produk berdasarkan judul, kategori, atau deskripsi dengan jeda (debounce) 300ms.

Pagination: Navigasi antar halaman untuk data yang banyak.

(Bonus) Autentikasi: Sistem login menggunakan Firebase Authentication.

(Bonus) Halaman Terproteksi: Dasbor produk hanya bisa diakses setelah pengguna berhasil login.

Persyaratan Sistem
Sebelum menjalankan proyek ini, pastikan lingkungan Anda memenuhi persyaratan berikut:

Node.js: v18.0 atau versi yang lebih baru.

Package Manager: yarn (disarankan) atau npm.

Backend: Server backend yang disediakan harus sudah berjalan di http://localhost:8001.

Panduan Instalasi & Setup
Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di lingkungan lokal Anda.

1. Clone Repositori
Pertama, clone repositori ini ke mesin lokal Anda:

git clone [https://github.com/nama-anda/nama-repositori.git](https://github.com/nama-anda/nama-repositori.git)
cd nama-repositori

2. Install Dependencies
Install semua library yang dibutuhkan oleh proyek dengan menjalankan salah satu perintah berikut:

# Menggunakan yarn (disarankan)
yarn install

# Atau jika Anda menggunakan npm
npm install

3. Konfigurasi Environment Firebase
Aplikasi ini memerlukan koneksi ke Firebase untuk fitur autentikasi.

Buat file baru di folder root proyek dengan nama .env.local.

Salin dan tempelkan firebaseConfig dari proyek Firebase Anda ke dalam file .env.local dengan format berikut:

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcde...

Catatan: Pastikan Anda sudah membuat proyek di Firebase Console dan mengaktifkan metode login Email/Password.

Menjalankan Proyek
Jalankan Server Backend: Pastikan server backend yang disediakan sudah berjalan (misalnya dengan yarn dev:firebase).

Jalankan Server Frontend: Di terminal proyek frontend, jalankan perintah berikut:

# Menggunakan yarn
yarn dev

# Atau jika Anda menggunakan npm
npm run dev

Buka Aplikasi: Buka browser Anda dan akses alamat http://localhost:3000. Anda akan otomatis diarahkan ke halaman login.