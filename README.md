# Aplikasi Sistem Informasi Apotek (Full Stack Web 2)

## 👤 Identitas

* **Nama:** Muhammad Kamil Marzuqi Aziz
* **NIM:** 25552012061
* **Mata Kuliah:** Pemrograman Web 2
* **Kelas:** TIF K 23B
* **Prodi:** Teknik Informatika
* **Universitas:** Universitas Teknologi Bandung

## Deskripsi Aplikasi

Aplikasi Sistem Informasi Apotek merupakan aplikasi berbasis web yang dibuat untuk membantu pengelolaan data dan transaksi pada apotek.

Aplikasi ini memiliki fitur pengelolaan data master seperti data obat, supplier, pelanggan, user, golongan obat, kelas terapi, dan sub kelas terapi. Selain itu, aplikasi juga menyediakan fitur transaksi pembelian dan penjualan obat.

Pada aplikasi ini, proses penambahan stok obat dilakukan melalui transaksi pembelian, sedangkan transaksi penjualan digunakan untuk mengurangi stok obat. Sistem dibangun menggunakan arsitektur full stack dengan frontend dan backend yang terpisah.

### Teknologi yang Digunakan

**Frontend**

* React JS
* Vite
* JavaScript
* CSS3
* Bootstrap

**Backend**

* Node.js
* Express.js

**Database**

* MySQL

---

# Cara Menjalankan Aplikasi

## Persiapan

Pastikan perangkat sudah memiliki:

* Node.js
* npm
* MySQL
* Visual Studio Code (opsional)

Clone repository:

```bash
git clone https://github.com/AresGrant/uas-full-stack-web2.git
```

Masuk ke folder project:

```bash
cd uas-full-stack-web2
```

---

# Menjalankan Backend

## 1. Masuk ke folder backend

```bash
cd backend
```

## 2. Install dependency

```bash
npm install
```

## 3. Konfigurasi Database

Buat database MySQL sesuai dengan konfigurasi project.

Pastikan konfigurasi database pada file:

```
backend/config/database.js
```

sudah sesuai dengan pengaturan MySQL lokal:

* Host
* Username
* Password
* Database

## 4. Jalankan backend

```bash
npm run dev
```

atau:

```bash
npm start
```

Jika berhasil, backend akan berjalan pada:

```
http://localhost:5000
```

---

# Menjalankan Frontend

## 1. Buka terminal baru

Masuk ke folder frontend:

```bash
cd feApps
```

## 2. Install dependency

```bash
npm install
```

## 3. Jalankan frontend

```bash
npm run dev
```

Jika berhasil, frontend akan berjalan pada:

```
http://localhost:5173
```

Buka alamat tersebut pada browser.

---

# Struktur Folder

```
uas-full-stack-web2
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── app.js
│
└── feApps
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── hooks
    │   ├── helpers
    │   └── routes
    └── package.json
```

---

# Fitur Aplikasi

## Master Data

* Data User
* Data Supplier
* Data Pelanggan
* Data Obat
* Data Golongan Obat
* Data Kelas Terapi
* Data Sub Kelas Terapi

## Transaksi

* Pembelian Obat
* Penjualan Obat

---

# Alur Sistem

## Pembelian

```
Supplier
    ↓
Pembelian
    ↓
Detail Pembelian
    ↓
Stok Obat Bertambah
```

## Penjualan

```
Pelanggan
    ↓
Penjualan
    ↓
Detail Penjualan
    ↓
Stok Obat Berkurang
```

---

# Catatan

Pastikan backend dan frontend dijalankan secara bersamaan menggunakan dua terminal berbeda.

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd feApps
npm run dev
```
